import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BuyModal = ({ refetch, phoneData, setPhoneData }) => {
    const { user } = useContext(AuthContext);
    const { name, resellPrice, image, _id } = phoneData;
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value;
        const email = form.email.value;
        const phoneName = form.phoneName.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const order = {
            userName,
            email,
            phoneName,
            price,
            phone,
            location,
            image,
            productId: _id,
            payment: false
        };
        console.log(order);

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch(`http://localhost:5000/orders/phone/${_id}`, {
                        method: 'PATCH'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                refetch();
                            }
                        })
                }
            })
            .catch(err => console.error(err))

        setPhoneData(null);
        toast.success('Booking done !');
    }
    return (
        <div>
            <input type="checkbox" id="buy-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="buy-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {
                        user?.uid ?
                            <>
                                <h3 className="text-lg font-bold">Book your product</h3>
                                <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3'>
                                    <input name='userName' type="text" value={user?.displayName} disabled className="input w-full input-bordered" />
                                    <input name='email' type="email" defaultValue={user?.email} disabled className="input w-full input-bordered" />
                                    <input name='phoneName' type="text" defaultValue={name} disabled className="input w-full input-bordered" />
                                    <input name='price' type="text" defaultValue={resellPrice} disabled className="input w-full input-bordered" />
                                    <input name='phone' type="text" placeholder="Phone" className="input w-full input-bordered" required />
                                    <input name='location' type="text" placeholder="Meeting Location" className="input w-full input-bordered" required />
                                    <input type="submit" value="Submit" className='w-full btn btn-primary' />
                                </form>
                            </>
                            :
                            <><p>Please <Link className='text-lime-500 underline font-semibold' to='/login'>log in</Link> to place order.</p></>
                    }
                </div>
            </div>
        </div>
    );
};

export default BuyModal;