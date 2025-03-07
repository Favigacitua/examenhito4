import { Router } from "express";
import { removeFavoritoController,addFavoritoController, getFavoritosController,getUsersController, postUsersController, getUserByIdController,loginController, putUserController, getUserProfileController } from "../controllers/users.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 
import upload from "../middlewares/uploadMiddleware.js";


const router = Router();



router.get('/users', authMiddleware, getUsersController);
router.get('/mis_favoritos', getFavoritosController); 
router.post('/mis_favoritos', addFavoritoController); 
router.get('/users/:id', authMiddleware, getUserByIdController)
router.post('/login', loginController)
router.post('/users',  postUsersController);
router.get("/perfil", authMiddleware, getUserProfileController);
router.put('/perfil', authMiddleware, upload.single("imagen"), putUserController);
router.delete('/mis_favoritos/:id_viaje', authMiddleware, removeFavoritoController);

export { router };