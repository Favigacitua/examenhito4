import React from 'react';
import Card from 'react-bootstrap/Card';

import { NavLink } from 'react-router-dom';
import './cardviaje.css'

function CardViaje({ viaje }) {

  console.log("📌 Viaje recibido en CardViaje:", viaje)

  return (
    <div className='carddestino'>
    <Card className='cardviaje' style={{ maxWidth:"18rem", maxHeight:"500px" }}>
      <Card.Img variant="top"   src={viaje.imagen}  alt={viaje.nombre} />
      <Card.Body>
        <Card.Title >{viaje.nombre}</Card.Title>
        <Card.Text>{viaje.descripcion}</Card.Text>
        <br />
        <p><strong>Precio por persona:</strong> ${viaje.precio}</p>
      </Card.Body>
      <div className='linkdestino'>
      <Card.Link as={NavLink} to={`/viaje/${viaje.id}`} className={({ isActive }) => isActive ? "active" : ""}>
Ver más información</Card.Link>
      </div>
    </Card>
    </div>
  );
}

export default CardViaje;