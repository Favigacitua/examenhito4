
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Inicio } from './assets/vistas/Inicio/Inicio'
import { Contacto } from './assets/vistas/Contacto/Contacto'
import { Destino } from './assets/vistas/Destino/Destino'
import { Destinos } from './assets/vistas/Destinos/Destinos'
import { EditarPerfil } from './assets/vistas/EditarPerfil/EditarPerfil'
import  Favoritos  from './assets/vistas/Favoritos/Favoritos'
import { Login } from './assets/vistas/Login/Login'
import { Perfil } from './assets/vistas/Perfil/Perfil'
import { Register } from './assets/vistas/Register/Register'
import { NotFound } from './assets/vistas/NotFound/NotFound'
import { NavBar } from './assets/componentes/NavBar/NavBar'
import { Footer } from './assets/componentes/Footer/Footer'
import { Context } from './Context/Context'
import { UserProvider } from './Context/UserContext' 
  
import Home from './assets/componentes/Home/Home'
import { useLocation} from 'react-router-dom';
import OnGoing from './assets/vistas/OnGoing/OnGoing'
import PrivateRoute from './assets/componentes/PrivateRoute/PrivateRoute'
import PublicRoute from './assets/componentes/PublicRoute/PublicRoute'



function App() {
  const location = useLocation(); 
  

  return (
    <>
    <Context>
      <UserProvider>
      {location.pathname !== '/' && <NavBar />}
      
      <Routes>     
        {/* Rutas públicas */}
        <Route path="/" element={ <><Home/><Inicio/></> } />
        <Route path="/contacto" element={<PublicRoute><Contacto /></PublicRoute>} />
        <Route path="/viaje/:id" element={<PublicRoute><Destino /></PublicRoute>} />
        <Route path="/destinos" element={<PublicRoute><Destinos /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/ongoing" element={<PublicRoute><OnGoing /></PublicRoute>} />
        
        {/* Rutas privadas */}
        <Route path="/editarperfil" element={<PrivateRoute><EditarPerfil /></PrivateRoute>} />
        <Route path="/favoritos" element={<PrivateRoute><Favoritos /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        
        {/* Ruta para manejar cualquier otra URL no válida */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </UserProvider>
    </Context>
    </>
  ) 
}

export default App