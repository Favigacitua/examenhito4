import React, { useContext } from 'react';
import { MyContext } from '../../../Context/Context';
import CardViaje from '../CardViaje/CardViaje';
import './grid.css';

export const Grid = ({ maxItems }) => {
  const { viajes } = useContext(MyContext);  
  console.log(" Viajes disponibles en Grid:", viajes);

  return (
    <div className='viajes'>
      {viajes && viajes.length > 0 ? (
        viajes.slice(0, maxItems || viajes.length).map((viaje) => (
          <CardViaje key={viaje.id} viaje={viaje} />
        ))
      ) : (
        <p>No hay viajes disponibles</p>
      )}
    </div>
  );
};