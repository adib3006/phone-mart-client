import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PhoneCard from './PhoneCard';
import BuyModal from './BuyModal';

const HomePhoneSectionOne = () => {
    const id = '6381e01842f81d772ed21e24';
    const [phoneData, setPhoneData] = useState(null);
    const [category, setCategory] = useState('');
    const { data: phones = [], refetch } = useQuery({
        queryKey: ['categories',id],
        queryFn: async () => {
            const res = await fetch(`https://phone-mart-server.vercel.app/categories/${id}`);
            const data = await res.json();
            setCategory(data.name);
            const newData = data.phoneCategory.slice(0,3);
            return newData;
        }
    })
    return (
        <div className='mt-20'>
            <h1 className="text-5xl font-bold mt-10 mb-10 ml-2 md:ml-20"><span className='text-lime-400'>|</span> {category}</h1>
            <div className='ml-5 md:ml-10 grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    phones.map(phone => <PhoneCard key={phone._id} phone={phone} setPhoneData={setPhoneData}></PhoneCard>)
                }
            </div>
            {phoneData && <BuyModal refetch={refetch} phoneData={phoneData} setPhoneData={setPhoneData}></BuyModal>}
        </div>
    );
};

export default HomePhoneSectionOne;