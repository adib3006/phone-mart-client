import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BuyModal from './BuyModal';

const Advertise = () => {
    const {data:phone = []} = useQuery({
        queryKey:['phone'],
        queryFn: async ()=>{
            const res = await fetch('http://localhost:5000/phone');
            const data = await res.json();
            return data;
        }
    })
    console.log(phone);
    const { image, name, resellPrice, originalPrice, location, yearsOfUse } = phone;
    const handleBook = () => {
        console.log('clicked');
    }
    return (
        <div>
            <h3 className="text-5xl text-center font-bold my-4">Advertized</h3>
            <div className="hero shadow-lg mb-10">
                <div className="hero-content flex-col lg:flex-row lg:justify-around">
                    <img src={image} className="max-w-sm rounded-lg" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">{name}</h1>
                        <p className="py-2">Resell Price : {resellPrice}$</p>
                        <p className="py-2">Original Price : {originalPrice}$</p>
                        <p className="py-2">Location : {location}</p>
                        <p className="py-2">Years of Use : {yearsOfUse} years</p>
                        <label onClick={handleBook} htmlFor="buy-modal" className="btn btn-primary">Buy</label>
                    </div>
                </div>
            </div>
            <BuyModal phoneData={phone}></BuyModal>
        </div>
    );
};

export default Advertise;