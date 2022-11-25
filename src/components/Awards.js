import React from 'react';

const Awards = () => {
    return (
        <div className='my-10'>
            <h1 className='text-5xl font-semibold text-center mb-5'>Award <span className='text-lime-400'>&</span> Achievements</h1>
            <p className='text-xl font-semibold text-center mb-10'>The lastest recognition for our services gives a clear understanding of our efforts and quality of service that we provide.</p>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://i.ibb.co/wWyz2rg/award.jpg" className="max-w-sm rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Best Resell Website <span className='text-lime-400'>Award</span> 2022</h1>
                        <p className="py-6 text-lg">"Their service is top of the line an they provide extra 6 months service warrenty support for free. Definately the best resell websites for mobile phones."</p>
                        <p className='italic font-semibold'><small>- The TechLanders.</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Awards;