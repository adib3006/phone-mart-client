import React from 'react';
import { format, parseISO } from 'date-fns';

const PhoneCard = ({ phone, setPhoneData }) => {
    const { id, image, name, loation, resellPrice, originalPrice, yearsOfUse, postDate, sellerName } = phone;
    const date1 = parseISO("2022-11-10T14:25:51.407Z");
    const date = new Date();
    const handleBook = () => {
        console.log("clicked");
        setPhoneData(phone);
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            {
                phone ?
                    <>
                        <figure><img className='h-[300px] w-[400px]' src={image} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <p>Location: {loation}</p>
                            <p>Price: {resellPrice}</p>
                            <p>Original Price: {originalPrice}</p>
                            <p>Years of use: {yearsOfUse}</p>
                            <p>Posted on: {format(date1, 'Pp')}</p>
                            <p>Seller Name: {sellerName}</p>
                            <div className="card-actions justify-end">
                                <label onClick={handleBook} htmlFor="buy-modal" className="btn btn-primary">Buy</label>
                            </div>
                        </div>
                    </> : <p>no phones available</p>
            }
        </div>
    );
};

export default PhoneCard;