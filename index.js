
import express from 'express';
import cors from 'cors';
import path from "path";
import dotenv from "dotenv";
import { router as userRouter } from './routes/users.js';
import { viajesRouter } from "./routes/viajes.js";
import { resenasRouter } from "./routes/resenas.js";
import contactoRouter from "./routes/contacto.js"

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", resenasRouter);
app.use("/api", viajesRouter);
app.use("/api", userRouter);
app.use(contactoRouter);




console.log("📌 Rutas registradas en Express:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`➡️ ${r.route.path}`);
  }
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}



export default app













