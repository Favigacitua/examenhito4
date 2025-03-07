import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { UserContext } from "../../../Context/UserContext";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "./destinodetailcard.css";

export const DestinoDetailCard = () => {
  const { viajes} = useContext(MyContext);
  const { id } = useParams();
  const { addFavoritos, user,  token  } = useContext(UserContext);
  const [viaje, setViaje] = useState(null);
  const [mensajeFavorito, setMensajeFavorito] = useState("");



  useEffect(() => {
    console.log(" Buscando viaje con ID:", id);
    console.log(" Lista de viajes disponibles:", viajes);

    if (viajes.length > 0) {
      const selectedViaje = viajes.find((v) => v.id === Number(id));
      if (selectedViaje) {
        console.log(" Viaje encontrado:", selectedViaje);
        setViaje(selectedViaje);
      } else {
        console.log(" No se encontró un viaje con ese ID.");
      }
    }
  }, [id, viajes]);

  if (!viaje) {
    return <p>Cargando detalles del crucero...</p>;
  }

  const handleAddToFavorites = () => {
    if (!user) { 
      setMensajeFavorito(" Debes iniciar sesión para añadir favoritos.");
      setTimeout(() => setMensajeFavorito(""), 3000);
      return;
    }


  if (!token) {
    console.error(" No hay token disponible.");
    setMensajeFavorito("Debes iniciar sesión para añadir favoritos.");
    setTimeout(() => setMensajeFavorito(""), 3000);
    return;
  }
  
    addFavoritos(viaje.id);
    setMensajeFavorito("✅ Favorito añadido con éxito");
  
    setTimeout(() => setMensajeFavorito(""), 3000);
  };

  return (
    <div className="destino-detail-card">
      {viaje?.imagen ? (
        <img
          src={viaje.imagen}
          alt={viaje.nombre}
          className="destino-detail-image"
        />
      ) : (
        <p>No hay imagen disponible</p>
      )}

      <div className="destino-detail-info">
        <h2>{viaje?.nombre || "Nombre no disponible"}</h2>
        <p>{viaje?.descripcion || "Descripción no disponible"}</p>
        <p>
          <strong>Precio por persona:</strong> $
          {viaje?.precio || "Precio no disponible"}
        </p>
        <p>
          <strong>Fechas:</strong>{" "}
          {viaje?.fecha_salida
            ? new Date(viaje.fecha_salida).toLocaleDateString()
            : "Fecha no disponible"}
        </p>
        <p>
          <strong>Duracion:</strong> {viaje?.duracion || "Fecha no disponible"}{" "}
          dias
        </p>
        <p>
          <strong>Capacidad:</strong>{" "}
          {viaje?.capacidad || "Capacidad no disponible"}
        </p>

        <p>
          <strong>Destinos:</strong>
        </p>
        {Array.isArray(viaje?.destino) && viaje.destino.length > 0 ? (
          <ListGroup className="list-group-flush">
            {viaje.destino.map((destination, index) => (
              <ListGroup.Item key={index}>{destination}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Destinos no disponibles</p>
        )}
        <br />
        <p>
          <strong>Características:</strong>{" "}
          {Array.isArray(viaje?.features)
            ? viaje.features.join(", ")
            : "Características no disponibles"}
        </p>

        {mensajeFavorito && (
          <p
            style={{
              color: user ? "green" : "red", 
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {mensajeFavorito}
          </p>
        )}

        <Button
          className="añadirfavoritos"
          style={{
            backgroundColor: "#0DBCAD",
            border: "2px solid #0DBCAD",
            color: "white",
            margin: "1rem",
          }}
          onClick={handleAddToFavorites}
        >
          Añadir a favoritos
        </Button>
      </div>
    </div>
  );
};

export default DestinoDetailCard;
