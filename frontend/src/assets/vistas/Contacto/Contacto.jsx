import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyContext from '../../../Context/Context'
import './contacto.css'

export const Contacto = () => {
  const { enviarFormularioContacto, mensajeEnviado } = useContext(MyContext);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarFormularioContacto(formData); 
    setFormData({ nombre: '', apellido: '', email: '', mensaje: '' });
  };



  return (
    <div>
      <h1 className='titulo' style={{color:'#0DBCAD'}}>¡Contáctanos!</h1>

      <Form className='formulariocontacto' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" placeholder="Ingresa tu nombre" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" name="apellido" placeholder="Ingresa tu apellido" value={formData.apellido} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" name="mensaje" rows={5} placeholder="Dejanos tus comentarios y dudas" value={formData.mensaje} onChange={handleChange} required />
        </Form.Group>
        <Button style={{ backgroundColor: '#0DBCAD', border: '2px solid #0DBCAD' }} type="submit">
          Enviar
        </Button>

        {mensajeEnviado && (
          <p style={{ color: mensajeEnviado.success ? 'green' : 'red', marginTop: '10px' }}>
            {mensajeEnviado.message}
          </p>
        )}
      </Form>
    </div>
  );
}

export default Contacto
