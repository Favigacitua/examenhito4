import {
  removeFavorito,
  getUsers,
  postUsers,
  getUserById,
  userLogin,
  putUser,
  getUserProfile,
  getFavoritos,
  addFavorito,
} from "../helpers/usersHelper.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../secretKey.js";


const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    console.error(" Error al obtener los usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};


const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.imagen) {
      user.imagen = `http://localhost:3000/uploads/${user.imagen}`;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(" Error en GET /users/:id:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const loginController = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    console.log(`🔍 Intentando login con: ${email}`);

    
    const { user, error, status } = await userLogin(email, password); 

    if (error) {
      return res.status(status).json({ error });
    }

    
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);

    console.log("✅ Login exitoso. Token generado.");

    res.status(200).json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        imagen: user.imagen
          ? `http://localhost:3000/uploads/${user.imagen}`
          : "/sinimagen.png",
      },
    });
  } catch (error) {
    console.error("❌ Error en loginController:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


const postUsersController = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const user = await postUsers(nombre, apellido, email, password);

    console.log("✅ Usuario registrado:", user);

   
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.error("❌ Error en postUsersController:", error.message);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const putUserController = async (req, res) => {
  console.log("🔹 PUT /perfil fue llamado");

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const decoded = jwt.verify(token, secretKey);

    const userId = decoded.id;

    const { email, nombre, apellido, password } = req.body;
    const imagen = req.file ? req.file.filename : null;
    console.log("📌 Datos recibidos:", {
      email,
      nombre,
      apellido,
      password,
      imagen,
    });

    const result = await putUser(userId, {
      email,
      nombre,
      apellido,
      password,
      imagen,
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json({ message: "Perfil actualizado", user: result.user });
  } catch (error) {
    console.error("Error en updateProfile:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getUserProfileController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const result = await getUserProfile(userId);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.json(result.user);
  } catch (error) {
    console.error("❌ Error en getUserProfileController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getFavoritosController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Token de autenticación requerido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const id_usuario = decoded.id;

    const favoritos = await getFavoritos(id_usuario);

    res.json({ favoritos });
  } catch (error) {
    console.error("❌ Error en getFavoritosController:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const addFavoritoController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Token de autenticación requerido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const id_usuario = decoded.id;

    const { id_viaje } = req.body;

    if (!id_viaje) {
      return res.status(400).json({ error: "ID de viaje requerido" });
    }

    const favorito = await addFavorito(id_usuario, id_viaje);
    res.status(201).json({ message: "Favorito agregado", favorito });
  } catch (error) {
    console.error("❌ Error en addFavoritoController:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const removeFavoritoController = async (req, res) => {
  try {
    console.log("📌 DELETE /mis_favoritos alcanzado");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Token de autenticación requerido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const { id_viaje } = req.params;

    if (!id_viaje) {
      return res.status(400).json({ error: "ID de viaje requerido" });
    }

    const result = await removeFavorito(decoded.id, id_viaje);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Error en deleteFavoritoController:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export {
  removeFavoritoController,
  addFavoritoController,
  getFavoritosController,
  getUsersController,
  postUsersController,
  getUserByIdController,
  loginController,
  putUserController,
  getUserProfileController,
};
