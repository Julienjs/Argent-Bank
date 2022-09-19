import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTransactionData } from '../../feature/transactionSlice';
import { InfoTransaction } from '../../data/InfoTransactions';

/**
 * Component that displays the account section in the application
 * @param {String} account.title title of profile account
 * @param {String} account.amount amount of the profile account
 * @param {String} account.amountDescription description of the profile account
 * @param {Number} account.id id of profile account
 * @returns the account section in the application
 */

const Account = () => {
    const accounts = useSelector(state => state.account)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLink = (id) => {
        navigate(`/transaction/${id}`)
        dispatch(setTransactionData(InfoTransaction))
    }

    return (
        accounts.map((account, index) =>
            < section key={`${account}-${index}`} className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">{account.title}</h3>
                    <p className="account-amount">{account.amount}</p>
                    <p className="account-amount-description">{account.amountDescription}</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button" onClick={() => handleLink(account.id)}>View transactions</button>
                </div>
            </section >
        )
    );
};

export default Account;