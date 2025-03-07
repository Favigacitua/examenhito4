import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext); 
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    try {
      return savedToken ? JSON.parse(savedToken) : null; 
    } catch (error) {
      console.error('Error parsing token:', error);
      return null; 
    }
  });



  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : {favoritos: []}; 
    } catch (error) {
      console.error('Error parsing user:', error);
      return {favoritos: []}; 
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    console.log("Token actual:", localStorage.getItem("token"));
  }, [token, user]);


 

  const register = async (nombre, apellido, email, password) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario registrado correctamente');
        return { success: true };
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify({ email, password }),
      });

      

      const data = await response.json();

      console.log(" Respuesta del backend:", data.user);

      if (response.ok) {
        setToken(data.token); 
        setUser(data.user);
        
        console.log(" Usuario guardado en el contexto:", data.user); 
        console.log(" Estado actualizado de `user` en UserContext:", user); 

        return { success: true }; 
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setToken(null); 
    setUser(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
  };

  const fetchUserProfile = async () => {
    try {

      if (!token) {
        console.warn(" No hay token disponible, esperando autenticación...");
        return;
      }
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/perfil', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.error || "Error al obtener perfil");
      }

      console.log(" Perfil recibido:", data);

      setUser((prevUser) => ({
        ...prevUser,
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        imagen: data.imagen,
        token: token, 
      }));
      
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateUserProfile = async (updatedData) => {
    if (!token) {
      return { success: false, message: 'Token no disponible. Inicia sesión.' };
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
       
        setUser(data);
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message || 'Error al actualizar perfil.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

 

  const postReview = async (id_viaje, valoracion, descripcion) => {

    if (!token || !user || !user.id) {
      console.error(" No hay token o usuario disponible.");
      return { success: false, message: "No estás autenticado." };
    }

    console.log("📌 Datos enviados al backend:", { 
      id_viaje: Number(id_viaje),  
      valoracion: Number(valoracion),       
      descripcion 
    });

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/mis_resenas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          id_viaje: Number(id_viaje), 
          valoracion: Number(valoracion), 
          descripcion 
        }),
      });
  
      const result = await response.json();
      console.log(" Respuesta del backend:", result);
  
      if (!response.ok) {
        console.error(" Error en la petición:", result);
        return { success: false, message: result.message || "Error al enviar la reseña." };
      }
  
      console.log(" Reseña enviada con éxito:", result.resena);
      return { success: true, message: "Reseña agregada con éxito." };
  
    } catch (error) {
      console.error(" Error al enviar reseña:", error);
      return { success: false, message: "Error al enviar la reseña." };
    }
  };

  const fetchUserFavoritos = async () => {
    if (!token) {
        console.error(" No hay token disponible para autenticar la solicitud.");
        return;
    }

    try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/mis_favoritos', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al obtener favoritos");
        }

        console.log(" Favoritos del usuario obtenidos:", data.favoritos);

        setUser((prevUser) => ({
          ...prevUser,
          //favoritos: [...new Map([...prevUser.favoritos, ...data.favoritos].map(v => [v.id_viaje, v])).values()],
          favoritos: data.favoritos || [], 
  
        }));
    } catch (error) {
        console.error(" Error al obtener favoritos del usuario:", error);
    }
};

  const addFavoritos = async (id_viaje) => {
    if (!token) {
      console.error(" No hay token disponible para autenticar la solicitud.");
      return;
  }

  try {
    if (!Array.isArray(user.favoritos)) {
      console.warn(" `user.favoritos` no es un array. Inicializando...");
      setUser((prevUser) => ({ ...prevUser, favoritos: [] }));
    }

    if (user.favoritos.some((fav) => fav.id_viaje === id_viaje)) {
      alert(" Este viaje ya está en favoritos.");
      return;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + '/api/mis_favoritos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_viaje }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al agregar favorito.");
    }

    console.log("✅ Favorito añadido con éxito:", data);

    setUser((prevUser) => ({
      ...prevUser,
      favoritos: [...prevUser.favoritos, data.favorito],
    }));

  } catch (error) {
    console.error(" Error al añadir favorito:", error.message);
  }
};

  const removeFavoritos = async (id_viaje) => {

    if (!token) {
      console.error(" No hay token disponible para autenticar la solicitud.");
      return;
  }

  console.log(` Intentando eliminar favorito con ID: ${id_viaje}`);

    try {
      const response = await fetch(`import.meta.env.VITE_API_URL + '/api/mis_favoritos/${id_viaje}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

        if (!response.ok) {
            console.error(" Error al eliminar favorito:", result);
            return;
        }

        console.log("🗑 Favorito eliminado con éxito:", id_viaje);

        setUser((prevUser) => ({
          ...prevUser,
          favoritos: Array.isArray(prevUser.favoritos)
            ? prevUser.favoritos.filter((fav) => fav.id_viaje !== id_viaje)
            : [],
        }));
    } catch (error) {
      console.error(" Error en removeFavorito:", error);
    }
  };

  const fetchUserReviews = async () => {
     if (!token) {
    console.error(" No hay token disponible para autenticar la solicitud.");
    return;
  }
  
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/mis_resenas', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener reseñas");
      }
  
      console.log(" Reseñas del usuario obtenidas:", data.resenas);
  
      setUser((prevUser) => ({
        ...prevUser,
        resenas: data.resenas || [],
      }));
    } catch (error) {
      console.error(" Error al obtener reseñas del usuario:", error);
    }
  };

  const fetchUserviajes = async () => {
    if (!token) {
      console.error(" No hay token disponible para autenticar la solicitud.");
      return;
    }
  
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api//mis_viajes', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener viajes");
      }
  
      console.log(" Viajes del usuario obtenidos:", data.viajes);
  
      setUser((prevUser) => ({
        ...prevUser,
        viajes: data.viajes || [], 
      }));
    } catch (error) {
      console.error(" Error al obtener viajes del usuario:", error);
    }
  };
  
  const deleteResena = async (idResena) => {
    if (!token) {
      console.error(" No hay token disponible para autenticar la solicitud.");
      return { success: false, message: "No estás autenticado." };
    }
  
    try {
      const response = await fetch(`import.meta.env.VITE_API_URL + '/api/mis_resenas/${idResena}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar la reseña.");
      }
  
      console.log(" Reseña eliminada:", data);
  
      
      setUser((prevUser) => ({
        ...prevUser,
        resenas: prevUser.resenas.filter((resena) => resena.id !== idResena),
      }));
  
      return { success: true, message: "Reseña eliminada correctamente." };
    } catch (error) {
      console.error(" Error al eliminar reseña:", error.message);
      return { success: false, message: "Error al eliminar la reseña." };
    }
  };




  const value = {
    token,
    setToken,
    user,
    setUser,
    register,
    login,
    logout,
    fetchUserProfile,
    fetchUserviajes,
    updateUserProfile,
    fetchUserReviews, 
    postReview,          
    fetchUserFavoritos,     
    addFavoritos,         
    removeFavoritos, 
    deleteResena   
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


export {UserContext}; 