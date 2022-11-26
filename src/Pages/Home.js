import React from 'react';
import Advertise from '../components/Advertise';
import Awards from '../components/Awards';
import Banner from '../components/Banner';
import Categories from '../components/Categories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertise></Advertise>
            <Categories></Categories>
            <Awards></Awards>
        </div>
    );
};

export default Home;