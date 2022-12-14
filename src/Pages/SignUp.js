import React, { useContext, useState } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useToken from '../hooks/useToken';
import SmallSpinner from './../components/SmallSpinner';

const SignUp = () => {
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const email = form.email.value;
        const role = form.role.value;
        const password = form.password.value;
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                createUser(email, password)
                    .then(result => {
                        updateUser(name, imageData.data.display_url)
                            .then(() => {
                                const user = {
                                    userName: name,
                                    email,
                                    photoURL: imageData.data.display_url,
                                    role,
                                    status: "notVerified"
                                }

                                fetch('https://phone-mart-server.vercel.app/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(user)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.acknowledged) {
                                            form.reset();
                                            setCreatedUserEmail(email);
                                            setLoading(false);
                                            toast.success('user added successfully');
                                        }
                                    })
                                    .catch(err => console.error(err))

                                toast.success('User created successfully');
                                //navigate(from, { replace: true });
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => console.log(err))

    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const { email, displayName, photoURL } = result.user;
                const user = {
                    userName: displayName,
                    email,
                    photoURL,
                    role: "buyer",
                    status: "notVerified"
                }

                axios('https://phone-mart-server.vercel.app/users', {
                    method: 'POST',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            setCreatedUserEmail(email);
                            toast.success('user added successfully');
                        }
                    })
                    .catch(err => console.error(err))
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
                            <label htmlFor='image' className='mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
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
                        <div className='w-full'>
                            <label htmlFor='role' className='text-sm mb-2'>
                                Choose your role
                            </label>
                            <select name='role' className="select select-bordered w-full">
                                <option value='buyer'>Buyer</option>
                                <option value='seller'>Seller</option>
                            </select>
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
                            {
                                loading ? <SmallSpinner></SmallSpinner> : "Sign Up"
                            }
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