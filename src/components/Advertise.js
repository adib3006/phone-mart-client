import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BuyModal from './BuyModal';

const Advertise = () => {
    const [phoneData, setPhoneData] = useState(null);
    const { data: phone = {}, refetch } = useQuery({
        queryKey: ['phone'],
        queryFn: async () => {
            const res = await fetch('https://phone-mart-server.vercel.app/phone');
            const data = await res.json();
            return data;
        }
    })

    const handleBook = () => {
        setPhoneData(phone[0]);
    }

    return (
        <div className='py-10'>
            {phone[0] && <h3 className="text-5xl font-bold mb-10 ml-2 md:ml-20"><span className='text-lime-400'>|</span> Advertized</h3>}
            <div className='flex justify-center'>
                {phone[0]?._id ?
                    <div className='w-2/3 rounded-md backdrop-blur bg-white/75'>
                        <div className="hero shadow-lg">
                            <div className="hero-content flex-col lg:flex-row lg:justify-around">
                                <img src={phone[0].image} className="rounded-lg" alt='' />
                                <div>
                                    <h1 className="text-2xl md:text-5xl font-bold">{phone[0].name}</h1>
                                    <p className="py-2">Resell Price : {phone[0].resellPrice}$</p>
                                    <p className="py-2">Original Price : {phone[0].originalPrice}$</p>
                                    <p className="py-2">Location : {phone[0].location}</p>
                                    <p className="py-2">Years of Use : {phone[0].yearsOfUse} years</p>
                                    <label onClick={handleBook} htmlFor="buy-modal" className="btn btn-primary">Buy</label>
                                </div>
                            </div>
                        </div>
                        {phoneData && <BuyModal refetch={refetch} phoneData={phone[0]} setPhoneData={setPhoneData}></BuyModal>}
                    </div> : <></>}
            </div>
        </div>
    );
};

export default Advertise;