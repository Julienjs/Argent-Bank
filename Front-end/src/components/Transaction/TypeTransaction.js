import React from 'react';
import IconPencil from '../../img/icon-pencil.png'
import { motion } from "framer-motion"

/**
 * Component that displays the transaction type
 * @param {Object} types
 * @returns the transaction type
 */
const TypeTransaction = ({ types }) => {

    const visibilityType = {
        hidden: { height: "0" },
        visible: { height: "100px" },
    }

    const visibilityText = {
        hidden: { opacity: "0" },
        visible: { opacity: "1" }
    }

    return (
        <motion.div className="type"
            variants={visibilityType}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div className='edit-container'
                variants={visibilityText}
                initial="hidden"
                animate="visible"
                exit="hidden">
                <p>Transaction Type: <span>{types.transactionType}</span></p>
                <div className='pencilImg category'>
                    <p >Category:</p>
                    <img src={IconPencil} alt="edit" />
                </div>
                <div className='pencilImg'>
                    <p>Notes:<span>{types.notes}</span></p>
                    <img src={IconPencil} alt="edit" />
                </div>
            </motion.div>
        </motion.div>
    )
};

export default TypeTransaction;