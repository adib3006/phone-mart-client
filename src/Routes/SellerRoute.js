import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import useSeller from './../hooks/useSeller';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const SellerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();
    
    if (loading || isSellerLoading) {
        return <Spinner></Spinner>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;