import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div className="navbar bg-base-100 px-10 md:px-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/blog'>Blog</Link></li>
                        {
                            user ?
                                <>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <button className='btn btn-ghost'>Log Out</button>
                                </> :
                                <li><Link to='/login'>Login</Link></li>
                        }
                    </ul>
                </div>
                <Link to='/' className="text-2xl font-semibold">Phone <span className='text-lime-400'> Mart</span></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/blog'>Blog</Link></li>
                    {
                        user ?
                            <>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <button onClick={logOut} className='btn btn-ghost'>Log Out</button>
                            </> :
                            <li><Link to='/login'>Login</Link></li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;