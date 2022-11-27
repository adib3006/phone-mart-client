import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const AllSellers = () => {
    const { data: sellers = [],refetch } = useQuery({
        queryKey: ['all-sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/dashboard/all-sellers');
            const data = await res.json();
            return data;
        }
    })

    const handleVerifySeller = (id) => {
        fetch(`http://localhost:5000/all-seller/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller Verified');
                    refetch();
                }
            })
    }

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('User deleted from Database');
                    refetch();
                }
            })
    }

    return (
        <div>
            <h1 className="text-5xl text-center font-bold">All Sellers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Remove Action</th>
                            <th>Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr key={seller?._id}>
                                <th>{i + 1}</th>
                                <td>{seller?.userName}</td>
                                <td>{seller?.email}</td>
                                <td><button onClick={()=>{handleDeleteUser(seller?._id)}} className='btn btn-error'>Delete</button></td>
                                <td>{(seller?.status === 'notVerified') ? 
                                <button onClick={()=>{handleVerifySeller(seller?._id)}} className='btn'>Verify</button> : 
                                <p>Verified</p>}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;