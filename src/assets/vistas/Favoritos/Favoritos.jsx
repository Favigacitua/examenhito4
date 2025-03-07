import React, { useEffect } from "react";
import { useUserContext } from "../../../Context/UserContext";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./favoritos.css";

const Favoritos = () => {
  const { user, fetchUserFavoritos, removeFavoritos } = useUserContext();
  const favoritos = user?.favoritos || [];

  useEffect(() => {
    fetchUserFavoritos();
  }, []);

  console.log(" Favoritos obtenidos:", favoritos); 

  if (!favoritos) {
    return <p>Cargando favoritos...</p>; 
  }

  if (!Array.isArray(favoritos)) {
    console.warn(" `favoritos` no es un array, inicializándolo como vacío.");
    return <p>Cargando favoritos...</p>;
  }

  return (
    <div className="misfavoritos">
      <div >
      
        <p
          style={{
            fontWeight: "bold",
            color: "#0DBCAD",
            textAlign: "center",
            paddingTop: "2rem",
          }}
        >
          Estos son tus destinos favoritos
        </p>
        <br />
        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>
          Mis Favoritos
        </h2>
        <br />
        {favoritos.length > 0 ? (
          <Row className="cardcontainer">
            {favoritos.map((viaje) => (
              <Col key={`${user.id}-${viaje.id_viaje}`}  xs={12} sm={6} md={4} lg={2} style={{minWidth:"18rem", paddingBottom:"2rem"}} >
                <Card className="cardviaje">
                  <Card.Img
                    variant="top"
                    src={viaje.imagen}
                    alt={viaje.nombre}
                  />
                  <Card.Body>
                    <Card.Title>{viaje.nombre}</Card.Title>
                    <Card.Text>{viaje.descripcion}</Card.Text>
                    <br />
                    <p>
                      <strong>Precio por persona:</strong> ${viaje.precio}
                    </p>
                    
                  </Card.Body>
                  <div className="linkdestino" style={{ display:"flex", justifyContent:"space-between", alignItems:"center",margin:"0.5rem"}}>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        cursor: "pointer",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius:"10px"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(
                          " Clic detectado en el botón de eliminar"
                        ); 
                        console.log(
                          " Eliminando favorito con ID:",
                          viaje.id_viaje
                        );
                        removeFavoritos(viaje.id_viaje);
                      }}
                    >
                      X
                    </button>
                    <Card.Link as={NavLink} to={`/viaje/${viaje.id_viaje}`}>
                      Ver más información
                    </Card.Link>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p style={{padding:"2rem"}}>No tienes viajes favoritos aún :(</p>
        )}
     
      <div className="descargalaapp">
        <img className="imagen" src="/descargalaapp.png" alt="descargalaapp" />
      </div>
      <div className="ofertasalcorreo">
        <img
          className="imagen"
          src="/ofertasalcorreo.png"
          alt="ofertasalcorreo"
        />
      </div>
      </div>
    </div>
  );
};

export default Favoritos;
