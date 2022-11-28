import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PhoneCard from '../components/PhoneCard';
import BuyModal from '../components/BuyModal';

const PhoneCategories = () => {
    const { id } = useParams();
    const [phoneData, setPhoneData] = useState(null);
    const [category, setCategory] = useState('');
    const { data: phones = [], refetch } = useQuery({
        queryKey: ['categories', id],
        queryFn: async () => {
            const res = await fetch(`https://phone-mart-server.vercel.app/categories/${id}`);
            const data = await res.json();
            setCategory(data.name);
            return data.phoneCategory;
        }
    })
    return (
        <div>
            <h1 className="text-5xl font-bold text-center mt-10 mb-10">{category}</h1>
            <div className='ml-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    phones.map(phone => <PhoneCard key={phone._id} phone={phone} setPhoneData={setPhoneData}></PhoneCard>)
                }
            </div>
            {phoneData && <BuyModal refetch={refetch} phoneData={phoneData} setPhoneData={setPhoneData}></BuyModal>}
        </div>
    );
};

export default PhoneCategories;