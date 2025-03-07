import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {UserContext} from "../../../Context/UserContext"; 
import { useNavigate } from "react-router-dom";
import './register.css'

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { register } = useContext(UserContext);

    
    function onInputChange({ target }) {
        const { value, name } = target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'apellido') {
            setApellido(value);
        
        } else if (name === 'password2') {
            setPassword2(value);
        } else if (name === 'nombre') {
            setNombre(value);
        }
    }

   
    async function onSubmitHandler(event) {
        event.preventDefault();

        
        if (email === '' || password === '' || password2 === '' || nombre === '' || apellido === '') {
            setError('Todos los campos son obligatorios');
            alert('Todos los campos son obligatorios');
            return;
        } else if (password.length < 6 || password2.length < 6) {
            setError('El password debe tener al menos 6 caracteres');
            alert('El password debe tener al menos 6 caracteres');
            return;
        } else if (password !== password2) {
            setError('Las contraseñas no coinciden');
            alert('Las contraseñas no coinciden');
            return;
        }

        
        const response = await register(nombre, apellido, email, password );

        if (!response.success) {
            setError(response.message || 'Error desconocido');
            alert(response.message || 'Error desconocido');
        } else {
            alert('Te has registrado correctamente');
            navigate("/login");
        }

        
        setEmail('');
        setPassword('');
        setPassword2('');
        setNombre('');
        setApellido('');
        setError(false);
    }

    return (
        <>
            <div>
                <h1 style={{ margin: '3rem', paddingLeft: '3rem', fontWeight: 'bold', color:'#0DBCAD' }}> Registro</h1>
                <div style={{ margin: '3rem', paddingLeft: '3rem' }}>
                    {error && <h6 style={{ color: 'red' }}>{error}</h6>}
                </div>
                <Form className='registerform' style={{ padding: '3rem', margin: '3rem' }} onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Introduce tu correo electrónico"
                            onChange={onInputChange}
                            value={email}
                            name="email"
                        />
                        <Form.Text className="text-muted">
                            Nunca compartiremos tu correo con nadie más.
                        </Form.Text>
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce tu primer nombre"
                            onChange={onInputChange}
                            value={nombre}
                            name="nombre"
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduce tu apellido"
                            onChange={onInputChange}
                            value={apellido}
                            name="apellido"
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Introduce tu contraseña"
                            onChange={onInputChange}
                            value={password}
                            name="password"
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Repita el password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repite tu contraseña"
                            onChange={onInputChange}
                            value={password2}
                            name="password2"
                        />
                    </Form.Group>
    
                    <Button type="submit" style={{ width: '7rem', backgroundColor: '#0DBCAD', border: '2px solid #0DBCAD', textAlign:'center' }}>
                        Registrarse
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Register;
