import React from 'react'
import { Grid } from '../../componentes/Grid/Grid'
import './inicio.css'


export const Inicio = () => {
  return (
   <>
   
   <div className="loquenosdiferencia">
            <img className="imagen" src='/loquenosdiferencia.png' alt="imagendeperfil" />
    </div>
   <div className='destinos'>
     <h2 style={{fontWeight:'lighter', paddingBottom:'2rem'}}>Mira estas ideas...</h2> 
     <Grid  maxItems={3} />
     </div> 

     <div className='banners'>
     <div className="protocoloseguridad">
            <img className="imagen" src='/protocoloseguridad.png' alt="protocolosdeseguridad" />
    </div>
    <div className="descargalaapp" >
            <img className="imagen" src='/descargalaapp.png' alt="descargalaapp" />
    </div>
    <div className="ofertasalcorreo">
            <img className="imagen" src='/ofertasalcorreo.png' alt="ofertasalcorreo" />
    </div>
    </div>


   </>
    
  )
}

export default Inicio