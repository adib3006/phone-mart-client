import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://phone-mart-server.vercel.app/orders?email=${user?.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h1 className="text-5xl text-center font-bold">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, i) => <tr key={order._id}>
                                <th>{i + 1}</th>
                                <td><img className='w-16 h-16 rounded-xl' src={order.image} alt="" /></td>
                                <td>{order.phoneName}</td>
                                <td>{order.price}</td>
                                <td>{order.payment ?
                                    <p className='text-lime-500'>Paid</p> :
                                    <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-info btn-sm'>Pay</button></Link>}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;