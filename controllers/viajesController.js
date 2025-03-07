import { getViajes, getViajeId, getMisViajes, postViajesFavoritos} from "../helpers/viajesHelper.js";
import pool from "../config/dbConnection.js"; 

const getViajesController = async (req, res) =>{
    try {
        const viajes = await getViajes(); 
        res.json({ viajes }); 
    } catch (error) {
        console.log("❌ Error en getViajesController:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

const  getViajeIdController = async (req, res) =>{
    try {
        const { id } = req.params;  
        if (!id) {
            return res.status(400).json({ error: "ID de viaje requerido" });
        }

        const viaje = await getViajeId(id);  

        if (!viaje) {
            return res.status(404).json({ error: "Viaje no encontrado" });
        }

        res.json({ viaje });  

    } catch (error) {
        console.error("Error al obtener el viaje:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const getMisViajesController = async (req, res) =>{
    try {
        const token = req.headers.authorization; 
        if (!token) {
            return res.status(401).json({ error: "Token de autenticación requerido" });
        }
        const viajes = await getMisViajes(token);
        res.json({ viajes });

    } catch (error) {
        console.error("Error al obtener viajes:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}  


const postViajesFavoritosController = async (req,res) =>{
    try {

        const token = req.headers.authorization; 
        if (!token) {
            return res.status(401).json({ error: "Token de autenticación requerido" });
        }
        const {id_viaje} = req.body
        const consultaUsuario = 'SELECT id FROM usuarios WHERE token = $1';
        const { rows: usuarioRows } = await pool.query(consultaUsuario, [token]);
        if (usuarioRows.length === 0) {
            return res.status(401).json({ error: "Token inválido o usuario no encontrado" });
        }
        const id_usuario = usuarioRows[0].id;

        const favorito = await postViajesFavoritos(id_usuario, id_viaje);

        return res.status(201).json({ message: "Viaje agregado a favoritos", favorito });


    } catch (error) {
        console.error("Error al agregar favorito:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }

}


export {
    getMisViajesController,
    getViajeIdController,
    getViajesController,
    postViajesFavoritosController
}
