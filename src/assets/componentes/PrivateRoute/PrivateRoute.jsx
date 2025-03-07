import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../../Context/UserContext';

export const PrivateRoute = ({ children }) => {
  const { token } = useUserContext();
  return token ? children : <Navigate to="/login" />;
 

};

export default PrivateRoute