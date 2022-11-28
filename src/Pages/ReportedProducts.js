import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const ReportedProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://phone-mart-server.vercel.app/reported-products');
            const data = await res.json();
            return data;
        }
    })

    const handleSolved = (id) => {
        fetch(`https://phone-mart-server.vercel.app/reported-products/resolve/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Resolved and added back to database');
                    refetch();
                }
            })
    }

    const handleDelete = (id) => {
        fetch(`https://phone-mart-server.vercel.app/reported-products/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Phone deleted from Database');
                    refetch();
                }
            })
    }

    return (
        <div>
            <h1 className="text-5xl text-center font-bold">Reported Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Seller</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><img className='w-16 h-16 rounded-xl' src={product.image} alt="" /></td>
                                <td>{product.name}</td>
                                <td>{product?.resellPrice}</td>
                                <td>{product.sellerEmail}</td>
                                <td>
                                    <button onClick={()=>handleSolved(product._id)} className='btn btn-primary mr-5'>
                                        Solved</button>
                                    <button onClick={()=>handleDelete(product._id)} className='btn btn-error'>
                                        Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;