import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * Component that displays the transaction title section 
 * @param {Number} id
 * @param {String} header.title
 * @param {String} header.amount
 * @param {String} header.amountDescription
 * @param {Object} accounts
 * @returns the transaction title section 
 */

const Header = () => {
    const { id } = useParams()
    const accounts = useSelector(state => state.account)
    const headers = accounts.filter((t) => t.id === Number(id))

    return (headers.map((header, index) =>
        < section className='transaction-title' key={`${header}-${index}`}>
            <h4>{header.title}</h4>
            <h1>{header.amount}</h1>
            <p>{header.amountDescription}</p>
        </section >
    )

    );
};

export default Header;