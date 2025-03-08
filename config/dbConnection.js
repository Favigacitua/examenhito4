import 'dotenv/config'
import pkg from "pg";

const { Pool } = pkg


//  console.log("🔍 Cargando configuración de la base de datos:");
// console.log("Host:", process.env.DB_HOST);
// console.log("Database:", process.env.DB_DATABASE);
//  console.log("User:", process.env.DB_USER);
// console.log("Password:", process.env.DB_PASSWORD ? "******" : "NO DEFINIDA")


const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: true,
    ssl: true

    
})

(async () => {
    try {
        const res = await pool.query('SHOW SERVER_ENCODING;');
        console.log(`✅ Codificación de la base de datos: ${res.rows[0].server_encoding}`);
    } catch (error) {
        console.error('❌ Error al verificar codificación:', error);
    }
})();

export default pool;