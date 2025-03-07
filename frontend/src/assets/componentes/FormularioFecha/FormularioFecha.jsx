import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from '../../../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import './formularioFecha.css';

const FormularioFecha = () => {
  const {actualizarFiltroDestino, actualizarFiltroFecha } = useContext(MyContext);
  const [destino, setDestino] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null); 
  const location = useLocation(); 
  console.log(" Ruta actual en FormularioFecha:", location.pathname);

  
  useEffect(() => {
      console.log("Ruta actual:", location.pathname); 
    if (location.pathname === "/destinos") {
      console.log("Reseteando filtros..."); 
      setDestino(""); 
      setFechaInicio(null);  
      actualizarFiltroDestino("");  
      actualizarFiltroFecha(null);  
    }
  }, [location]);

  const handleDestinoChange = (e) => {
    setDestino(e.target.value);
  };

  const handleFechaChange = (date) => {
    setFechaInicio(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!destino && !fechaInicio) {
      alert('Debes colocar la fecha o el destino');
      return;
    }

    
    if (destino) {
      actualizarFiltroDestino(destino);
    }
    if (fechaInicio) {
      actualizarFiltroFecha(fechaInicio);
    }
  };

  return (
    <Container className='formulario'>
      <Form onSubmit={handleSubmit} className="d-flex flex-row align-items-center">
        <Form.Group controlId="destino" className='destino'>
          <FontAwesomeIcon icon={faLocationDot} style={{ margin: 'auto' }} />
          <Form.Control
            type="text"
            placeholder="Destino"
            value={destino}
            onChange={handleDestinoChange}
            className="form-control"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white'
            }}
          />
        </Form.Group>

        <p style={{ color: 'white', margin: '5px', }}>|</p>

        <Form.Group controlId="fechaInicio" className='inicio'>
          <FontAwesomeIcon icon={faCalendarDays} style={{ margin: 'auto' }} />
          <DatePicker
            selected={fechaInicio}
            onChange={handleFechaChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha"
            className="form-control"
          />
        </Form.Group>

        <Button type="submit" className='button' style={{ backgroundColor: '#0DBCAD', border: '2px solid #0DBCAD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='buttonicon' style={{ textAlign: 'center' }} />
        </Button>
      </Form>
    </Container>
  );
};

export default FormularioFecha;
