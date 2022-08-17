import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import IconChevron from '../../img/icon-chevron.png'
import TypeTransaction from './TypeTransaction';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Component that displays the different user transactions
 * @returns the different user transactions
 */

const TransactionSection = () => {
    const transactions = useSelector((state) => state.transaction.transaction)
    const navigate = useNavigate()
    const [active, setActive] = useState(-1);

    /**
     * function that opens and closes the transaction type component
     * @param {Number} index 
     * @returns the transaction type component
     */
    const handleToggle = (index) => {
        if (index === active) {
            setActive(-1)
            return
        } else {
            setActive(index)
        }
    }

    /**
     * function that allows a return to the previous page
     */
    const handleBack = () => {
        navigate('/profil')
    }

    const chevronRotate = {
        initial: { rotate: "0" },
        animate: { rotate: "180deg" }
    }

    return (
        <section className='transaction-section'>
            <div className='legend'>
                <p className='legend-date'>DATE</p>
                <p className='legend-description'>DESCRIPTION</p>
                <p className='legend-amount'>AMOUNT</p>
                <p className='legend-balance'>BALANCE</p>
            </div>
            {transactions.map((transaction, index) =>
                <div className="type-transaction" key={`${transaction}-${index}`} style={{ borderBottom: active === index ? "none" : "1px solid #C3CFD9 " }} >
                    <article onClick={() => handleToggle(index)}>
                        <div className='transaction-contains'>
                            <div className='date-container'>
                                <motion.img src={IconChevron} alt='chevron bas'
                                    variants={active === index && chevronRotate}
                                    initial="initial"
                                    animate="animate"
                                />
                                <p className='date'>{transaction.date}</p>
                            </div>
                            <p>{transaction.description}</p>
                            <p className='amount'>{transaction.amount}</p>
                            <p>{transaction.balance}</p>
                        </div>
                    </article>
                    <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                        {active === index &&
                            <TypeTransaction types={transaction.type} index={index} active={active} />
                        }
                    </AnimatePresence>

                </div>
            )
            }
            <button className='transaction-button' onClick={handleBack}>Back</button>
        </section >

    );
};

export default TransactionSection;