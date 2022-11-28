import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const AllBuyers = () => {
    const { data: buyers = [],refetch } = useQuery({
        queryKey: ['all-buyers'],
        queryFn: async () => {
            const res = await fetch('https://phone-mart-server.vercel.app/dashboard/all-buyers',{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteUser = (id) => {
        fetch(`https://phone-mart-server.vercel.app/delete/${id}`, {
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
            <h1 className="text-5xl text-center font-bold">All Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Remove Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) => <tr key={buyer?._id}>
                                <th>{i + 1}</th>
                                <td>{buyer?.userName}</td>
                                <td>{buyer?.email}</td>
                                <td><button onClick={()=>{handleDeleteUser(buyer?._id)}} className='btn btn-error'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;