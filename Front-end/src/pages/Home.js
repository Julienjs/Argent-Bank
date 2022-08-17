import React from 'react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
const Home = () => {

    /**
     * Home pages that display the components (heroes, features) 
     * @returns  the components (heroes, features)
     */

    return (
        <main>
            <Hero />
            <Features />
        </main>
    );
};

export default Home;