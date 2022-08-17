import React from 'react';
import ReactLoading from 'react-loading';

/**
 * component that displays the page load 
 * @returns the page load 
 */

const Loader = () => {
    const list = {
        type: "balls",
        color: "#E0E6ED"
    }
    return (
        <span className='loader-container'>
            <p >loading</p>
            <ReactLoading type={list.type} color={list.color} />
        </span>
    );
};

export default Loader;