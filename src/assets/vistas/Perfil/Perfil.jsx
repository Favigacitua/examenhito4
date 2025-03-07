import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, ListGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useUserContext } from "../../../Context/UserContext";
import "./perfil.css";

export const Perfil = () => {
  const {
    user,
    token,
    fetchUserProfile,
    fetchUserReviews,
    fetchUserviajes,
    postReview,
    deleteResena
  } = useUserContext();

  const misDestinos = useRef(null);
  const mispublicaciones = useRef(null);

  const [nombre, setNombre] = useState("");
  const [destino, setDestino] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [viajes, setViajes] = useState([]);
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    console.log(" Cargando perfil desde el backend...");
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!token) {
      console.warn(" No hay token disponible todavía. Esperando...");
      return;
    }

    console.log(" Token encontrado, cargando datos del usuario...");
    fetchUserReviews(); 
    fetchUserviajes(); 
  }, [token]);

  useEffect(() => {
    console.log("📌 Usuario actualizado en el perfil:", user);
    if (user) {
      setViajes(user.viajes || []);
      setReseñas(user.resenas || []);
    }
  }, [user]);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 1 && value <= 5)) {
      setCalificacion(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Error: No se pudo obtener la información del usuario.");
      return;
    }

    if (!destino || !calificacion || !comentario) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    console.log("📌 Enviando reseña con:", {
      id_viaje: Number(destino), 
      valoracion: Number(calificacion), 
      descripcion: comentario
    });

    const resultado = await postReview(Number(destino), Number(calificacion), comentario);

    if (resultado && resultado.success) {
      alert("Reseña enviada con éxito.");
      setDestino("");
      setCalificacion("");
      setComentario("");
      fetchUserReviews(); 
    } else {
      alert(` Error: ${resultado?.message || "Error desconocido al enviar la reseña."}`);
    }
  };

  const handleDeleteResena = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta reseña?");
    if (!confirmacion) return;

    const resultado = await deleteResena(id);
    if (resultado.success) {
      alert(" Reseña eliminada correctamente.");
      fetchUserReviews(); 
    } else {
      alert(` Error: ${resultado.message}`);
    }
  };


  return (
    <div className="container-fluid" style={{padding:"0px"}}>
    <div className="perfilcontainer">
      <div className="datos">
        <h1
          style={{
            color: "#0DBCAD",
            fontSize: "clamp(50px, 4vw, 24px)",
            padding: "2rem",
          }}
        >
          {user ? `${user.nombre} ${user.apellido}` : "Cargando..."}
        </h1>
        <div className="botonesperfil">
          <Button
            className="misdestinos"
            style={{
              backgroundColor: "lightgrey",
              border: "2px solid grey",
              color: "#0DBCAD",
              margin: "0.5rem",
            }}
            onClick={() => scrollToSection(misDestinos)}
          >
            Mis destinos
          </Button>
          <Button
            className="mispublicaciones"
            style={{
              backgroundColor: "lightgrey",
              border: "2px solid grey",
              color: "#0DBCAD",
              margin: "0.5rem",
            }}
            onClick={() => scrollToSection(mispublicaciones)}
          >
            Mis Publicaciones
          </Button>
          <Button
            className="Editar perfil"
            style={{
              backgroundColor: "#0DBCAD",
              border: "2px solid #0DBCAD",
              margin: "0.5rem",
            }}
            as={NavLink}
            to="/editarperfil"
          >
            Editar perfil
          </Button>
        </div>
        
        <div>
          <div className="imagendeperfil">
            <img
               src={user.imagen || "/sinimagen.png"}
              alt="Imagen de perfil"
              onError={(e) => e.target.src = "/sinimagen.png"} 
            />
          </div>
        </div>
      </div>
      <div className="misexperiencias">
        <div className="misdestinos" ref={misDestinos}>
          <h3 style={{ color: "#0DBCAD", padding:"4rem"}}>Mis Destinos</h3>

          <div className="destinos-container">
            {viajes.length > 0 ? (
              viajes.map((viaje) => (
                <Card
                  key={viaje.id}
                  className="cardviaje"
                  style={{ width: "18rem", minWidth: "18rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={viaje.imagen}  alt={viaje.nombre}
                    
                  />
                  <Card.Body>
                    <Card.Title>{viaje.nombre}</Card.Title>
                    <Card.Text>{viaje.descripcion}</Card.Text>
                    <p>
                      <strong>Precio por persona:</strong> ${viaje.precio}
                    </p>
                  </Card.Body>
                  <div className="linkdestino">
                    <Card.Link
                      as={NavLink}
                      to={`/viaje/${viaje.id}`}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Ver más información
                    </Card.Link>
                  </div>
                </Card>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: "1.2rem",
                }}
              >
                No has reservado ningún viaje aún.
              </p>
            )}
          </div>
        </div>

        <div className="mispublicaciones" ref={mispublicaciones}>
          <h3 style={{ color: "#0DBCAD",  padding:"4rem" }}>Mis Publicaciones</h3>
          <div className="reseñas-container">
            {reseñas.length > 0 ? (
              reseñas.map((resena) => (
                <Card key={resena.id} style={{ width: "18rem"}}>
                  <Card.Body style={{height:"auto", margin:"1rem"}}>
                    <Card.Title>({resena.valoracion} estrellas)</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {resena.nombre_viaje}
                    </Card.Subtitle>
                    <Card.Text>{resena.descripcion}</Card.Text>
                    
                    <Button
                  variant="danger"
                  onClick={() => handleDeleteResena(resena.id)}
                >
                  Eliminar Reseña
                </Button>
               
                
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: "1.2rem",
                }}
              >
                No has hecho una reseña aún.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="enviarpublicacion">
        <h1
          className="titulo"
          style={{
            color: "#0DBCAD",
            fontSize: "clamp(50px, 4vw, 24px)",
            padding: "2rem",
          }}
        >
          Califica tus viajes
        </h1>

        <Form className="formulariopublicacion" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Destino</Form.Label>
            <Form.Select
              value={destino}
              onChange={(e) => setDestino(Number(e.target.value))} 
            >
              <option value="">Selecciona un destino</option>
              {viajes.map((viaje) => (
                <option key={viaje.id} value={viaje.id}>
                  {viaje.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Calificación</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese una calificación (1-5)"
              value={calificacion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cuenta tu experiencia</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Cuenta tu experiencia"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </Form.Group>

          <Button
            style={{ backgroundColor: "#0DBCAD", border: "2px solid #0DBCAD" }}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default Perfil;
