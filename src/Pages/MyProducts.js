import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [], refetch } = useQuery({
        queryKey: ['my-products', user.email],
        queryFn: async () => {
            const res = await fetch(`https://phone-mart-server.vercel.app/dashboard/my-products?email=${user.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAvailable = (id) => {
        fetch(`https://phone-mart-server.vercel.app/my-products/sold/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Sold Status updated successfully');
                    refetch();
                }
            })
    }

    const handleAdvertise = (id) => {
        fetch(`https://phone-mart-server.vercel.app/my-products/ad/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Sold Status updated successfully');
                    refetch();
                }
            })
    }

    const handleMarkSold = (id) => {
        fetch(`https://phone-mart-server.vercel.app/orders/phone/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Phones updated successfully');
                    refetch();
                }
            })
    }

    const handlePriceRemove = (id) => {
        fetch(`https://phone-mart-server.vercel.app/my-products/price/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Sold Status updated successfully');
                    refetch();
                }
            })
    }

    return (
        <div>
            <h1 className="text-5xl text-center font-bold">My Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Availability status</th>
                            <th>Advertise status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><img className='w-16 h-16 rounded-xl' src={product.image} alt="" /></td>
                                <td>{product.name}</td>
                                <td>{
                                        (product?.resellPrice !== "N/A") ? 
                                        <>{product.resellPrice} 
                                        <button onClick={()=>handlePriceRemove(product._id)} className='btn rounded-full ml-2'>X</button></> 
                                        : 
                                        <>{product.resellPrice}</>
                                    }
                                </td>
                                <td>{product.sold ?
                                    <>
                                        <p className='text-orange-500 pl-6'>Status: Sold</p>
                                        <button onClick={() => handleMakeAvailable(product._id)} className='btn btn-outline'>Make available</button>
                                    </> :
                                    <>
                                        <p className='text-lime-500 pl-5'>Status: Available</p>
                                        <button onClick={() => handleMarkSold(product._id)} className='btn btn-outline btn-error'>Mark sold</button>
                                    </>}
                                </td>
                                <td>{product.advertise ?
                                    <p className='text-lime-500'>Already Advertized</p> :
                                    <>
                                        {product.sold ? <p>Make available to advertized</p>
                                            :
                                            <button onClick={() => handleAdvertise(product._id)} className='btn btn-info'>Advertize</button>}
                                    </>}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;