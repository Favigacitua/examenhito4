import multer from "multer";
import dotenv from "dotenv";

dotenv.config(); 


const storage = multer.diskStorage({
    destination: process.env.UPLOADS_DIR || "uploads/", 
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); 
    },
});


const upload = multer({ storage });

export default upload;