import {  Router } from "express";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { request } from "../schema/postuserSchema.js";
import { getMisResenasController, getResenasController, getResenasPorViajeController, postResenasController,deleteResenaController } from "../controllers/resenasController.js";


const resenasRouter = Router()

resenasRouter.get('/resenas', getResenasController);
resenasRouter.get('/resenas/viaje/:id_viaje', getResenasPorViajeController)
resenasRouter.get('/mis_resenas', getMisResenasController)
resenasRouter.post ('/mis_resenas',[schemaValidator(request.payload.misreseñas.post.request)], postResenasController)
resenasRouter.delete("/mis_resenas/:id", authMiddleware, deleteResenaController);

export {
    resenasRouter
}