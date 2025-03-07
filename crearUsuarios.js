import pool from './config/dbConnection.js'; 
import bcrypt from 'bcrypt';

const usuarios = [
  { nombre: "Romina", apellido: "Gacitúa", email: "romina.gacitua@hotmail.com", password: "romi5678" },
  { nombre: "Faviana", apellido: "López", email: "faviana.lopez@yahoo.com", password: "favi9012" },
  { nombre: "Carlos", apellido: "Reyes", email: "carlos.reyes@gmail.com", password: "carlospass" },
  { nombre: "Maria", apellido: "Pérez", email: "maria.perez@gmail.com", password: "mas1234" },
  { nombre: "Juan", apellido: "Gacitúa", email: "juan.gacitua@hotmail.com", password: "gaci5277" },
  { nombre: "Ana", apellido: "López", email: "ana.lopez@yahoo.com", password: "ana1523" },
  { nombre: "Franco", apellido: "Reyes", email: "franco.reyes@gmail.com", password: "fran78542" },
  { nombre: "Ana", apellido: "Torres", email: "ana.torres@hotmail.com", password: "torres2023" },
  { nombre: "Cecilia", apellido: "Torres", email: "ceci.torres@hotmail.com", password: "ceci2023" },
  { nombre: "Juan", apellido: "Pérez", email: "juan@example.com", password: "password123" }
];

async function crearUsuarios() {
  try {
    for (const user of usuarios) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await pool.query(
        "INSERT INTO usuario (nombre, apellido, email, password) VALUES ($1, $2, $3, $4)",
        [user.nombre, user.apellido, user.email, hashedPassword]
      );

      console.log(`✅ Usuario creado: ${user.email}`);
    }
    console.log("🎉 Todos los usuarios han sido creados con contraseñas encriptadas.");
  } catch (error) {
    console.error("❌ Error al crear los usuarios:", error);
  } finally {
    pool.end(); 
  }
}

crearUsuarios();

