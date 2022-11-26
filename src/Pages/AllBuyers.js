import React from 'react';
import { useQuery } from '@tanstack/react-query';

const AllBuyers = () => {
    const { data: sellers = [] } = useQuery({
        queryKey: ['all-sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/dashboard/all-sellers');
            const data = await res.json();
            return data;
        }
    })
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
                            <th>Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.userName}</td>
                                <td>{seller.email}</td>
                                <td><button className='btn'>Delete</button></td>
                                <td>{(seller.status === 'notVerified') ? 
                                <button className='btn'>Verify</button> : 
                                <p>Verified</p>}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;