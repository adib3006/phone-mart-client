import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import errorImg from "../assets/error.jpg";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='flex flex-col items-center'>
            <h1 className="text-8xl text-center text-red-500 font-bold my-20">{error.status}</h1>
            <img src={errorImg} className="w-20 md:w-60 mb-5" alt="" />
            <p className='text-4xl text-gray-800 font-bold'>{error.statusText}</p>
            <p className='text-4xl'>Go to <Link className='text-red-500 hover:underline' to='/'>Home</Link></p>
        </div>
    );
};

export default ErrorPage;