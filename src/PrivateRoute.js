import React, {useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: component, ...rest }) => {
    const token = localStorage.getItem("token");
    if (!token) alert("Login first")
    return token ? <Outlet /> : <Navigate to="/" />;
};
  
export default PrivateRoute;