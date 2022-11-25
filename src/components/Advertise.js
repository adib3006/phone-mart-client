import React from 'react';

const Advertise = () => {
    return (
        <div>
            <h3 className="text-3xl text-center font-bold my-4">Advertized</h3>
            <div className="hero border shadow-2xl mb-10">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://i.ibb.co/ZTV9ZSs/samsung.jpg" className="max-w-sm rounded-lg shadow-xl md:mr-36" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Title</h1>
                        <p className="py-2">Resell Price : 200$</p>
                        <p className="py-2">Original Price : 400$</p>
                        <p className="py-2">Location : Dhaka</p>
                        <p className="py-2">Years of Use : 2 years</p>
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertise;