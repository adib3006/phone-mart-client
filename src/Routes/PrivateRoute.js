import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Spinner></Spinner>
    }

    if(user && user.uid){
        return children;
    }
    
    return <Navigate to='/login' state={{from : location}} replace/>;
};

export default PrivateRoute;