import React from 'react'

const OnGoing = () => {
  return (
    <div style={{display:'flex', width:'100vw', height:'100%', flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'auto',padding:'auto', gap:'2rem'}}>
      
      <div className='ongoing'style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <img src="/construccion.png" alt='estamostrabajando' style={{width:'25%'}}/>
      </div>
      <div className='ongoing'style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <img src="/ongoing.png" alt='estamostrabajando' style={{width:'75%'}}/>
      </div>






    </div>
  )
}

export default OnGoing