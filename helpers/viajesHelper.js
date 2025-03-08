import pool from "../config/dbConnection.js"
import jwt from "jsonwebtoken";
import { secretKey } from "../secretKey.js";


async function getViajes() {
    try {
        const consulta = `
        SELECT id, 
               nombre, 
               destino,
               encode(descripcion::bytea, 'escape') AS descripcion,
               precio,
               imagen,
               fecha_salida,
               duracion,
               capacidad,
               features
        FROM viajes
    `;

    
    const { rows } = await pool.query(consulta);

    const viajesCorregidos = rows.map(viaje => ({
        ...viaje,
        descripcion: Buffer.from(viaje.descripcion, 'binary').toString('utf8')
    }));


        console.log("📌 Viajes obtenidos desde la base de datos:",  viajesCorregidos);
        return  viajesCorregidos;
      } catch (error) {
        console.error(" Error al obtener viajes:", error);
        throw new Error("Error interno del servidor");
      }
}


async function getViajeId(id) {
    try {
        const consulta = `
            SELECT id, 
                   nombre, 
                   destino,
                   encode(descripcion::bytea, 'escape') AS descripcion,
                   precio,
                   imagen,
                   fecha_salida,
                   duracion,
                   capacidad,
                   features
            FROM viajes
            WHERE id = $1
        `;
        const { rows } = await pool.query(consulta, [id]);

        if (!rows[0]) return null;

        
        const viaje = {
            ...rows[0],
            descripcion: Buffer.from(rows[0].descripcion, 'binary').toString('utf8')
        };

        return viaje;
    } catch (error) {
        console.error("❌ Error en getViajeId:", error.message);
        throw new Error("Error interno del servidor");
    }
}

async function getMisViajes(authHeader) {
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Token de autenticación requerido");
    }
    const extraerToken = authHeader.split(" ")[1]; 
    let usuarioId;
    
    try {
        const decoded = jwt.verify(extraerToken, secretKey);
        usuarioId = decoded.id; 
    } catch (error) {
        throw new Error("Token inválido o expirado");
    }
    
    const consultaViajes = `
        SELECT v.id, 
               v.nombre, 
               encode(v.descripcion::bytea, 'escape') AS descripcion, 
               v.precio, 
               v.imagen
        FROM mis_viajes mv
        JOIN viajes v ON mv.id_viaje = v.id
        WHERE mv.id_usuario = $1
    `;

    const { rows: viajesRows } = await pool.query(consultaViajes, [usuarioId]);

    
    const viajesCorregidos = viajesRows.map(viaje => ({
        ...viaje,
        descripcion: Buffer.from(viaje.descripcion, 'binary').toString('utf8')
    }));

    return viajesCorregidos;
}


async function postViajesFavoritos(id_usuario, id_viaje ) {
    try {
        const consulta = 'INSERT INTO favoritos (id_usuario, id_viaje) VALUES($1,$2) RETURNING *';
        const values = [id_usuario, id_viaje];
        const { rows } = await pool.query(consulta, values);
        
        if (rows.length === 0) {
            throw new Error("No se pudo agregar el viaje a favoritos");
        }

        console.log("✅ Viaje agregado a favoritos:", rows[0]);
        return { rows };
    } catch (error) {
        console.error("❌ Error en postViajesFavoritos:", error.message);
        throw new Error("Error interno del servidor");
    }
}



export {
    getViajes,
    getViajeId,
    getMisViajes,
    postViajesFavoritos
} 