import pool from "../config/dbConnection.js"
import jwt from "jsonwebtoken";
import { secretKey } from "../secretKey.js";


async function getViajes() {
    try {
        const result = await pool.query("SELECT * FROM viajes");
        console.log("📌 Viajes obtenidos desde la base de datos:", result.rows);
        return result.rows;
      } catch (error) {
        console.error(" Error al obtener viajes:", error);
        throw new Error("Error interno del servidor");
      }
}


async function getViajeId(id) {
    const consulta = 'SELECT * FROM viajes WHERE id = $1'
    const { rows } = await pool.query(consulta, [id])
    return rows[0] || null
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
        SELECT v.id, v.nombre, v.descripcion, v.precio, v.imagen
        FROM mis_viajes mv
        JOIN viajes v ON mv.id_viaje = v.id
        WHERE mv.id_usuario = $1
    `;
    const { rows: viajesRows } = await pool.query(consultaViajes, [usuarioId]);

    return viajesRows;
}


async function postViajesFavoritos(id_usuario, id_viaje ) {
    const consulta = 'INSERT INTO favoritos (id_usuario, id_viaje) VALUES($1,$2) RETURNING *'
    const values = [id_usuario, id_viaje]
    const { rows } = await pool.query(consulta, values)
    return { rows }

}



export {
    getViajes,
    getViajeId,
    getMisViajes,
    postViajesFavoritos
} 