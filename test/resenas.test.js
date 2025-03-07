import request from 'supertest';
import app from '../index.js';
import pool from '../config/dbConnection.js';
import jwt from 'jsonwebtoken';
import { secretKey } from '../secretKey.js';
import bcrypt from 'bcrypt';

describe('POST /api/mis_resenas', () => {
    let token;
    let userId;
    let viajeId;
    let resenaId;
    const userEmail = "reseña@example.com";
    const userPassword = "password123";

    beforeEach(async () => {
        console.log("🔍 Buscando un viaje existente...");
        const viajeResult = await pool.query("SELECT id FROM viajes LIMIT 1");

        if (viajeResult.rows.length === 0) {
            throw new Error(" No hay viajes en la BD. Agrega uno antes de correr el test.");
        }

        viajeId = viajeResult.rows[0].id;
        console.log("✅ Usando el viaje con ID:", viajeId);

        console.log("🔍 Eliminando usuario de prueba...");
        await pool.query("DELETE FROM usuario WHERE email = $1", [userEmail]);

        console.log("🔍 Creando usuario de prueba con contraseña encriptada...");
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const userResult = await pool.query(
            "INSERT INTO usuario (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
            ["Tester", "Reseñas", userEmail, hashedPassword]
        );
        userId = userResult.rows[0].id;
        console.log("✅ Usuario de prueba creado con ID:", userId);

        console.log("🔍 Generando token JWT...");
        token = jwt.sign({ id: userId, email: userEmail }, secretKey, { expiresIn: "1h" });

        if (!token) {
            throw new Error("No se pudo obtener un token válido.");
        }
    });

    afterEach(async () => {
        console.log("🧹 Eliminando reseña creada en la prueba...");
        if (resenaId) {
            await pool.query("DELETE FROM mis_resenas WHERE id = $1", [resenaId]);
            console.log(" Reseña eliminada.");
        }
    });

    it('Debería crear una nueva reseña correctamente', async () => {
        const res = await request(app)
            .post('/api/mis_resenas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_viaje: viajeId,
                valoracion: 5,
                descripcion: "Excelente viaje, recomendado!"
            });

        console.log("🔍 Respuesta del servidor para POST /mis_resenas:", res.statusCode, res.body);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', "Reseña agregada");
        expect(res.body.resena).toHaveProperty('id_usuario', userId);
        expect(res.body.resena).toHaveProperty('id_viaje', viajeId);
        expect(res.body.resena).toHaveProperty('valoracion', 5);
        expect(res.body.resena).toHaveProperty('descripcion', "Excelente viaje, recomendado!");

        
        resenaId = res.body.resena.id;
    });

    it('Debería devolver error 400 si faltan campos', async () => {
        const res = await request(app)
            .post('/api/mis_resenas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_viaje: viajeId,
                valoracion: 5
                // Falta la descripción
            });

        console.log("🔍 Respuesta del servidor cuando faltan campos:", res.statusCode, res.body);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', "Faltan campos obligatorios");
    });
});