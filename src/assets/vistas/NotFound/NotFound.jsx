import React from 'react'
import Button from 'react-bootstrap/Button';
import './notFound.css'
import { NavLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div style={{display:'flex', width:'100vw', height:'100vh', flexDirection:'column', paddingLeft:'4rem', alignItems:'flex-start', justifyContent:'flex-start', gap:'10px'}}>

      <div className='notFoundText'>
        <h1 style={{ fontSize:'150px', fontWeight:'bolder'}}>404</h1>
        <div style={{width:'400px'}}>
        <p>Esto es un error :( </p>
        <p style={{marginBottom:'0'}
        }>No encontramos la pagina, </p>
        <p>ni a los tripulantes en el servidor.</p>
        <div className='notFoundImg' >
        <img src="./notfound.jpg" alt='' style={{width:'71%', paddingTop:'3rem'}}/>
      </div>

        <Button size="sm" style={{marginTop:'1rem', padding:'10px',backgroundColor: '#0DBCAD', border: '2px solid #0DBCAD' }
        } as={NavLink}
        to="/">
        Pero siempre puedes volver al Home uwu
        </Button>
        
        </div>
      </div>
    

    </div>
  )
}


export default NotFound