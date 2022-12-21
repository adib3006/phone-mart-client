import React from 'react';

const Banner = () => {
    return (
        <div className="carousel w-full mb-5">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/PF0kzX5/banner1.jpg" className="w-full" alt=''/>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle btn-ghost text-white">❮</a>
                    <a href="#slide2" className="btn btn-circle btn-ghost text-white">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/zmYmNZs/banner2.jpg" className="w-full" alt=''/>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle btn-ghost text-white">❮</a>
                    <a href="#slide3" className="btn btn-circle btn-ghost text-white">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/3MDC2Yn/banner3.jpg" className="w-full" alt=''/>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle btn-ghost text-white">❮</a>
                    <a href="#slide1" className="btn btn-circle btn-ghost text-white">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;