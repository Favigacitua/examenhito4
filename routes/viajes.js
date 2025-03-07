import {  Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { request } from "../schema/postuserSchema.js";
import { getViajesController, getViajeIdController, getMisViajesController, postViajesFavoritosController } from "../controllers/viajesController.js";

const viajesRouter = Router()


viajesRouter.get('/viajes', getViajesController);
viajesRouter.get('/viajes/:id', getViajeIdController);
viajesRouter.get('/mis_viajes', getMisViajesController);
viajesRouter.post('/favoritos',[schemaValidation(request.payload.favoritos.post.request)], postViajesFavoritosController)

export { viajesRouter }