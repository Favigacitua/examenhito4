import React, { useState, useContext } from 'react'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {UserContext} from "../../../Context/UserContext"; 
import './login.css'


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  
  const { login } = useContext(UserContext);

  
  const onInputChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setError('Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios');
      return;
    } else if (password.length < 6) {
      setError('El password debe tener al menos 6 caracteres');
      alert('El password debe tener al menos 6 caracteres');
      return;
    }

    
    const response = await login(email, password);

    if (!response.success) {
      setError(response.message || 'Error desconocido');
      alert(response.message || 'Error desconocido');
    } else {
      alert('Has ingresado correctamente');
    }

   
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div>
        <h1 style={{ margin: '3rem', paddingLeft: '3rem', fontWeight: 'bold', color:'#0DBCAD' }}>Login</h1>
        <div style={{ margin: '3rem', paddingLeft: '3rem' }}>
          {error && <h6 style={{ color: 'red' }}>{error}</h6>}
        </div>
        <Form className='loginform' style={{ padding: '3rem', margin: '3rem' }} onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduce tu correo electrónico"
              onChange={onInputChange}
              value={email}
              name="email"
            />
            <Form.Text className="text-muted">
              No compartiremos nunca tu contraseña con alguien más.
            </Form.Text>
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
          <Button  type="submit" style={{ width: '6rem' , backgroundColor: '#0DBCAD', border: '2px solid #0DBCAD'  }}>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
