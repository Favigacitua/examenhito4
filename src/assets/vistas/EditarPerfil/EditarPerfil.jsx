import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import  {useUserContext} from "../../../Context/UserContext"; 
import "./editarperfil.css";

export const EditarPerfil = () => {
  const { token, user, setUser, fetchUserProfile } = useUserContext(); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    email: user?.email || "",
    password: "",
    repetirPassword: "",
    imagen: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password.trim()) {
      alert(" Debes ingresar una contraseña para actualizar el perfil.");
      return;
    }

    if (formData.password !== formData.repetirPassword) {
      alert("  Las contraseñas no coinciden");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("apellido", formData.apellido);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.imagen) {
      formDataToSend.append("imagen", formData.imagen);
    }

    try {
      console.log(" Token enviado al backend:", token);
      console.log(" Datos que se envían:", [...formDataToSend.entries()]);

      const response = await fetch(import.meta.env.VITE_API_URL + '/api/perfil', {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(" Error en la respuesta del backend:", errorData);
        throw new Error(errorData.message || "Error al actualizar el perfil");
      }

    

      const data = await response.json();  
      console.log(" Respuesta del backend:", data);

      if (!data.user) {
        throw new Error(" La respuesta del backend no contiene `user`");
      }
  

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      console.log(" Antes de setUser:", user);

      setUser((prevUser) => ({
        ...prevUser,
        ...data.user
      }));

      console.log(" Después de setUser:", user);

      await fetchUserProfile();  

      alert("Perfil actualizado correctamente");

      navigate("/perfil");
      
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al actualizar el perfil");
    }
  };

  return (
    <div>
      <h1 className="titulo">Editar</h1>

      <Form className="formularioeditar" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="apellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imagen">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="repetirPassword">
          <Form.Label>Repetir Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repetir Password"
            name="repetirPassword"
            value={formData.repetirPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button style={{ backgroundColor: "#0DBCAD", border: "2px solid #0DBCAD" }} type="submit">
          Enviar Cambios
        </Button>
      </Form>
    </div>
  );
};

export default EditarPerfil;
