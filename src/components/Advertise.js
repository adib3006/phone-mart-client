import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BuyModal from './BuyModal';

const Advertise = () => {
    const [phoneData, setPhoneData] = useState(null);
    const { data: phone = {}, refetch } = useQuery({
        queryKey: ['phone'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/phone');
            const data = await res.json();
            return data;
        }
    })

    console.log(phone.length);
    console.log(phone[0]);

    const handleBook = () => {
        setPhoneData(phone[0]);
    }

    return (
        <div>
            {phone[0]?._id ? 
            <>
                <h3 className="text-5xl text-center font-bold my-4">Advertized</h3>
            <div className="hero shadow-lg mb-10">
                <div className="hero-content flex-col lg:flex-row lg:justify-around">
                    <img src={phone[0].image} className="max-w-sm rounded-lg" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">{phone[0].name}</h1>
                        <p className="py-2">Resell Price : {phone[0].resellPrice}$</p>
                        <p className="py-2">Original Price : {phone[0].originalPrice}$</p>
                        <p className="py-2">Location : {phone[0].location}</p>
                        <p className="py-2">Years of Use : {phone[0].yearsOfUse} years</p>
                        <label onClick={handleBook} htmlFor="buy-modal" className="btn btn-primary">Buy</label>
                    </div>
                </div>
            </div>
            {phoneData && <BuyModal refetch={refetch} phoneData={phone[0]} setPhoneData={setPhoneData}></BuyModal>}
            </> : <></>}
        </div>
    );
};

export default Advertise;