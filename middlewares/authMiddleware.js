import jwt from "jsonwebtoken";
import { secretKey } from "../secretKey.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; 
  
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

export default authMiddleware;