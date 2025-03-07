import React from 'react'
import { Grid } from '../../componentes/Grid/Grid'


export const Destinos = () => {
  return (
    <div>
     <p style={{fontWeight:'bold', color: '#0DBCAD', textAlign:'center', paddingTop:'2rem'}}>Te ayudo a encontrar tu proximo destino</p>
     <h2 style={{fontWeight:'lighter', textAlign:'center'}}>Mira estas ideas</h2> 
    <br /><br />
    < Grid />
    <br /><br />

    <div className="ofertasalcorreo">
            <img className="imagen" src='/ofertasalcorreo.png' alt="ofertasalcorreo" style={{ width: '100vw', margin: 'auto'}} />
    </div>
      </div>
  )
}