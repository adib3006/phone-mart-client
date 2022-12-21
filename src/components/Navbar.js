import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div className="navbar bg-white/75 px-2 md:px-20 backdrop-blur-lg sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white/75 rounded-box w-52">
                        <li><Link to='/blog'>Blog</Link></li>
                        {
                            user ?
                                <>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <button className='btn btn-ghost'>Log Out</button>
                                </> :
                                <>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/signup'>Sign Up</Link></li>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                </>
                        }
                    </ul>
                </div>
                <Link to='/' className="text-xl md:text-2xl font-semibold">Phone <span className='text-lime-400'> Mart</span></Link>
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
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Sign Up</Link></li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;