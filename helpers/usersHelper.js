import bcrypt from 'bcrypt';
import pool from "../config/dbConnection.js";


async function getUsers() {
  try {
    const consulta = "SELECT id, nombre, apellido, email FROM usuario";
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    console.error(" Error en getUsers:", error.message);
    throw error;
  }
}


async function getUserById(id) {
  try {
    const consulta = "SELECT id, nombre, apellido, email, imagen FROM usuario WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);

    if (rows.length === 0) {
      return null; 
    }

    return rows[0];
  } catch (error) {
    console.error(" Error en getUserById:", error.message);
    throw error;
  }
}

async function userLogin(email, password) {
  console.log(`🔍 Buscando usuario en la BD con email: ${email}`);

  const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);

  if (result.rows.length === 0) {
    console.log(" Usuario no encontrado.");
    return { error: "Usuario no encontrado", status: 404 };
  }

  const user = result.rows[0];

  
  console.log(" Contraseña ingresada:", password);
  console.log(" Contraseña en BD:", user.password);

  
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log("🔍 ¿Contraseña válida?", passwordMatch);

  if (!passwordMatch) {
    return { error: "Contraseña incorrecta", status: 401 };
  }

  return { user };
}


async function postUsers(nombre, apellido, email, password) {
  try {
    
    const userExists = await pool.query("SELECT id FROM usuario WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      throw new Error("El email ya está registrado");
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const consulta = 'INSERT INTO usuario (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING id, nombre, apellido, email';
    const values = [nombre, apellido, email, hashedPassword];

    const { rows } = await pool.query(consulta, values);
    
    console.log("✅ Usuario creado:", rows[0]);

    return rows[0]; 
  } catch (error) {
    console.error(" Error en postUsers:", error.message);
    throw error;
  }
}

const putUser = async (userId, { nombre, apellido, email, password, imagen }) => {
  try {
    const updateFields = [];
    const values = [];
    let query = "UPDATE usuario SET ";

    if (nombre) {
      updateFields.push("nombre = $" + (values.length + 1));
      values.push(nombre);
    }
    if (apellido) {
      updateFields.push("apellido = $" + (values.length + 1));
      values.push(apellido);
    }
    if (email) {
      updateFields.push("email = $" + (values.length + 1));
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = $" + (values.length + 1));
      values.push(hashedPassword);
    }
    if (imagen) {
      updateFields.push("imagen = $" + (values.length + 1));
      values.push(imagen);
    }

    if (updateFields.length === 0) {
      return { error: "No se enviaron datos para actualizar" };
    }

    query += updateFields.join(", ") + " WHERE id = $" + (values.length + 1) + " RETURNING *";
    values.push(userId);

    console.log(" Query generada:", query);
    console.log(" Valores enviados:", values);

    const result = await pool.query(query, values);
    return { success: true, user: result.rows[0] };
  } catch (error) {
    console.error(" Error en updateUser:", error);
    return { error: "Error interno del servidor" };
  }
};



const getUserProfile = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, apellido, email, imagen FROM usuario WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return { error: "Usuario no encontrado" };
    }

    const user = result.rows[0];
    if (user.imagen) {
      user.imagen = `http://localhost:3000/uploads/${user.imagen}`;
    }

    return { success: true, user };
  } catch (error) {
    console.error(" Error en getUserProfile:", error);
    return { error: "Error interno del servidor" };
  }
};

async function getFavoritos(id_usuario) {
  try {
      const consulta = `
          SELECT f.id, v.id AS id_viaje, v.nombre, v.descripcion, v.precio, v.imagen 
          FROM favoritos f
          JOIN viajes v ON f.id_viaje = v.id
          WHERE f.id_usuario = $1
      `;
      const { rows } = await pool.query(consulta, [id_usuario]);
      return rows;
  } catch (error) {
      console.error(" Error al obtener favoritos:", error);
      throw new Error("Error interno del servidor");
  }
}

async function addFavorito(id_usuario, id_viaje) {
  try {
      const consulta = `
          INSERT INTO favoritos (id_usuario, id_viaje) VALUES ($1, $2)
          RETURNING *;
      `;
      const { rows } = await pool.query(consulta, [id_usuario, id_viaje]);
      return rows[0];
  } catch (error) {
      console.error(" Error al agregar favorito:", error);
      throw new Error("Error interno del servidor");
  }
}

async function removeFavorito(id_usuario, id_viaje) {
  try {
      const query = `DELETE FROM favoritos WHERE id_usuario = $1 AND id_viaje = $2 RETURNING *`;
      const { rows } = await pool.query(query, [id_usuario, id_viaje]);

      if (rows.length === 0) {
          return { error: "El favorito no existe o ya fue eliminado." };
      }

      return { success: true, message: "Favorito eliminado con éxito" };
  } catch (error) {
      console.error(" Error al eliminar favorito:", error);
      throw new Error("Error interno del servidor");
  }
}





export {removeFavorito,addFavorito, getUsers, postUsers, getUserById, userLogin, putUser,getUserProfile, getFavoritos };
