import React from 'react';
import Advertise from '../components/Advertise';
import Awards from '../components/Awards';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import HomePhoneSectionOne from '../components/HomePhoneSectionOne';
import HomePhoneSectionThree from '../components/HomePhoneSectionThree';
import HomePhoneSectionTwo from '../components/HomePhoneSectionTwo';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertise></Advertise>
            <Categories></Categories>
            <HomePhoneSectionOne></HomePhoneSectionOne>
            <HomePhoneSectionTwo></HomePhoneSectionTwo>
            <HomePhoneSectionThree></HomePhoneSectionThree>
            <Awards></Awards>
        </div>
    );
};

export default Home;