import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-hot-toast';

const PhoneCard = ({ phone, setPhoneData }) => {
    const { _id, image, name, location, resellPrice, originalPrice, yearsOfUse, postDate, sellerName, sellerEmail } = phone;
    const [status, setStatus] = useState('hidden');
    
    useEffect(()=>{
        fetch(`https://phone-mart-server.vercel.app/users?email=${sellerEmail}`)
        .then(res=>res.json())
        .then(data=>{
            if(data[0].status === 'verified'){
                setStatus('block')
            }
        })
    },[sellerEmail])

    const date = parseISO(postDate);
    const handleBook = () => {
        setPhoneData(phone);
    }

    const handleReport = (id) => {
        fetch(`https://phone-mart-server.vercel.app/report/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Reported to admin for review');
                }
            })
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            {
                phone ?
                    <>
                        <figure><img className='h-[300px] w-[400px]' src={image} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <p>Location: {location}</p>
                            <p>Price: {resellPrice}</p>
                            <p>Original Price: {originalPrice}</p>
                            <p>Years of use: {yearsOfUse}</p>
                            <p>Posted on: {format(date, 'Pp')}</p>
                            <p className='flex'>
                                <span>Seller Name: {sellerName}</span>
                                <img className={`w-5 h-5 p-1 mt-0.5 ml-1 bg-slate-200 rounded-full ${status}`} src="https://i.ibb.co/Ldhzq2s/blue-tick.png" alt="" />
                            </p>
                            <div className="card-actions justify-end">
                                <label onClick={handleBook} htmlFor="buy-modal" className="btn btn-primary">Buy</label>
                                <button onClick={()=>handleReport(_id)} className='btn btn-error'>Report</button>
                            </div>
                        </div>
                    </> : <p>no phones available</p>
            }
        </div>
    );
};

export default PhoneCard;