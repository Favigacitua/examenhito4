import pool from "../config/dbConnection.js"


async function getResenas() {
    try {


        const consulta = `
            SELECT r.id, r.valoracion, r.descripcion, r.id_viaje, u.nombre, u.apellido
            FROM resenas r
            JOIN usuario u ON r.id_usuario = u.id
        `;
        const { rows } = await pool.query(consulta);
        return rows;
    } catch (error) {
        console.error("❌ Error al obtener reseñas:", error);
        throw new Error("Error interno del servidor");
    }
}

async function getResenasPorViaje(id_viaje) {
    try {

        console.log("📌 Buscando reseñas para el viaje ID:", id_viaje)

        const consulta = `
            SELECT r.id, r.valoracion, r.descripcion, r.id_viaje, u.nombre, u.apellido
            FROM resenas r
            JOIN usuario u ON r.id_usuario = u.id
            WHERE r.id_viaje = $1
        `;
        console.log("📌 Ejecutando consulta SQL:", consulta);

        const values = [id_viaje];
        const { rows } = await pool.query(consulta, values);

        console.log("📌 Resultado obtenido:", rows); 

        return rows;
    } catch (error) {
        console.error("❌ Error al obtener reseñas por viaje:", error);
        throw new Error("Error interno del servidor");
    }
}

async function getMisResenas(id_usuario) {
    try {
        const consulta = `
            SELECT r.id, r.valoracion, r.descripcion, v.nombre AS nombre_viaje
            FROM resenas r
            JOIN viajes v ON r.id_viaje = v.id
            WHERE r.id_usuario = $1
        `;
        const { rows } = await pool.query(consulta, [id_usuario]);
        return rows;
    } catch (error) {
        console.error("❌ Error al obtener mis reseñas:", error);
        throw new Error("Error interno del servidor");
    }
}

async function postResenas(id_usuario, id_viaje, valoracion, descripcion) {
    try {
        const consulta = `
            INSERT INTO resenas (id_usuario, id_viaje, valoracion, descripcion)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await pool.query(consulta, [id_usuario, id_viaje, valoracion, descripcion]);
        return rows[0];
    } catch (error) {
        console.error(" Error al agregar reseña:", error);
        throw new Error("Error interno del servidor");
    }
}


async function deleteResena (idResena, idUsuario)  {
    try {
      const consulta = "DELETE FROM resenas WHERE id = $1 AND id_usuario = $2 RETURNING *";
      const { rows } = await pool.query(consulta, [idResena, idUsuario]);
  
      if (rows.length === 0) {
        return null; 
      }
  
      return rows[0]; 
    } catch (error) {
      console.error("❌ Error en deleteResena:", error.message);
      throw error;
    }
  };


export {
    getResenas,
    getResenasPorViaje,
    getMisResenas,
    postResenas,
    deleteResena
}