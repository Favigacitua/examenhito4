import React from 'react';
import { useParams } from 'react-router-dom';
import DestinoDetailCard from '../../componentes/DestinoDetailCard/DestinoDetailCard';
import CardReseña from '../../componentes/CardReseña/CardReseña';
import './destino.css';

export const Destino = () => {
  const { id } = useParams();
  const viajeId = Number(id); 

  console.log(`🔍 Renderizando Destino con viajeId:`, viajeId);

  return (
    <div>
      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"center"}}>
      <div>
        <DestinoDetailCard id={viajeId} />
      </div>
      </div>
      <br />
      <hr style={{ border: '2px solid gray', margin: 'auto', width:'90%' }} />
      <br />
      <div className='resena'>
      <div className="reseñas" >
        <CardReseña viajeId={viajeId} />
      </div>
      </div>
    </div>
  );
};

export default Destino;