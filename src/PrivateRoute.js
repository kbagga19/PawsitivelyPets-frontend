import React, {useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: component, ...rest }) => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" />;
};
  
export default PrivateRoute;