import 'dotenv/config';
import { Router } from 'express'
import nodemailer from 'nodemailer'

const router = Router()



console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Cargada' : 'No cargada');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

router.post('/api/contacto', async (req, res) => {
    const { nombre, apellido, email, mensaje } = req.body;

    if (!nombre || !apellido || !email || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: 'nautilusprestige@gmail.com', 
            replyTo: email,
            subject: `Nuevo mensaje de contacto de ${nombre} ${apellido}`,
            text: `Nombre: ${nombre} ${apellido}\nCorreo: ${email}\nMensaje: ${mensaje}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado con éxito' });

    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

export default router;