import React from 'react';
import Advertise from '../components/Advertise';
import Banner from '../components/Banner';
import Categories from '../components/Categories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertise></Advertise>
            <Categories></Categories>
        </div>
    );
};

export default Home;