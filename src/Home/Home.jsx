import React from 'react';
import Bannar from './Bannar';
import Category from './Category/Category';
import DiscoutProduct from './Discout/DiscoutProduct';
import ReveiwsClient from './Reveiws/ReveiwsClient';
import ClientReiws from './Reveiws/ClientReiws';
import HomeCard from './HomeCard/HomeCard';
import HelmetSet from '../CommonComponent/HelmetSet';

const Home = () => {
    return (
        <div>
            <HelmetSet sub1='MediStore' sub2='Home'></HelmetSet>
            <Bannar></Bannar>
            <HomeCard></HomeCard>
            <DiscoutProduct></DiscoutProduct>
            <ReveiwsClient></ReveiwsClient>
            <ClientReiws></ClientReiws>
            
        </div>
    );
};

export default Home;