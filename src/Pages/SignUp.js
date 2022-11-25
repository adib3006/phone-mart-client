import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const SignUp = () => {
    const { createUser, updateUserInfo, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photoURL, email, password);
        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                updateUserInfo(name, photoURL)
                    .then(() => {
                        navigate(from, { replace: true });
                    })
                    .catch((error) => { console.error(error) })
            })
            .catch((error) => { console.error(error) })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((error) => { console.error(error) })
    }
    return (
        <div className='flex justify-center items-center pt-8 my-10'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 border shadow-lg'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-gray-400'>
                        Sign Up to unlock possibilities
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
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                Full Name
                            </label>
                            <input
                                type='name'
                                name='name'
                                id='name'
                                placeholder='Enter Your Full Name'
                                className='w-full px-3 py-2 border rounded-md border-gray-300'
                                data-temp-mail-org='0'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
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
                    <div>
                        <button
                            type='submit'
                            className='w-full px-8 py-3 font-semibold rounded-md bg-lime-600 hover:bg-lime-500 hover:text-white text-gray-100'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Sign Up with social accounts
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
                    Already on Phone Mart?{' '}
                    <Link to='/signup' className='hover:underline text-lime-400'>
                        Log In
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;