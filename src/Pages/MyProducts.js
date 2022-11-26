import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [] } = useQuery({
        queryKey: ['categories', user.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/dashboard/my-products?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })
    console.log(products);
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
                                <td>{product.resellPrice}</td>
                                <td>{product.sold ?
                                    <p className='text-orange-500'>Sold</p> :
                                    <p className='text-lime-500'>Available</p>}
                                </td>
                                <td>{product.advertise ?
                                    <p className='text-lime-500'>Advertized</p> :
                                    <p className='text-orange-500'>Not Advertized</p>}
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