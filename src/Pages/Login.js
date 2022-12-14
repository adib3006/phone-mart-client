import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SmallSpinner from '../components/SmallSpinner';
import { AuthContext } from './../contexts/AuthProvider';
import useToken from './../hooks/useToken';

const Login = () => {
    const { signIn, googleSignIn, passwordReset } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const [userEmail, setUserEmail] = useState('');
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        fetch(`https://phone-mart-server.vercel.app/users?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if(data[0]?.email === email){
                    signIn(email, password)
                    .then((result) => {
                        setLoginUserEmail(email);
                        setLoading(false);
                        //navigate(from, { replace: true });
                        setError('');
                        form.reset();
                    })
                    .catch((error) => { setError(error.message) })
                }
                else{
                    toast.error("User doesn't exist");
                    form.reset();
                }
            })
    }

    const handlePasswordReset = () => {
        passwordReset(userEmail)
            .then((result) => {
                toast.info('Reset Password link sent to your email')
            })
            .catch((error) => console.error(error))
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                setLoginUserEmail(result.user.email);
                //navigate(from, { replace: true });
                setError('');
            })
            .catch((error) => { setError(error.message) })
    }

    return (
        <div className='flex justify-center items-center pt-8 my-10'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 border shadow-lg'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log in</h1>
                    <p className='text-sm text-gray-400'>
                        Log in to get full access
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                onBlur={(e) => { setUserEmail(e.target.value) }}
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300'
                                data-temp-mail-org='0'
                                required
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300'
                            />
                        </div>
                    </div>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                    <div>
                        { loading ? <button
                            type='submit'
                            className='w-full px-8 py-3 font-semibold rounded-md bg-lime-600 hover:bg-lime-500 hover:text-white text-gray-100'
                            disabled={loading}
                        >
                            <SmallSpinner></SmallSpinner>
                        </button> 
                        : 
                        <button
                            type='submit'
                            className='w-full px-8 py-3 font-semibold rounded-md bg-lime-600 hover:bg-lime-500 hover:text-white text-gray-100'
                        >
                            Log in
                        </button>}
                    </div>
                </form>
                <div className='space-y-1'>
                    <button onClick={handlePasswordReset} className='text-xs hover:underline text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div className='flex justify-center space-x-4'>
                    <button onClick={handleGoogleSignIn} aria-label='Log in with Google' className='p-3 rounded-sm'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 32 32'
                            className='w-5 h-5 fill-current'
                        >
                            <path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
                        </svg>
                    </button>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link to='/signup' className='hover:underline text-lime-400'>
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;