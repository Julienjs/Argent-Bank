import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Transaction/Header';
import TransactionSection from '../components/Transaction/TransactionSection';
import { getUser, resetUser } from '../feature/user/usersSlice';

/**
 * Transactions pages that display the components (headers, transactionsection) 
 * @returns the components (headers, transactionsection) 
 */

const Transactions = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isError, message } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.auth)
    const locToken = localStorage.getItem("user")

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!token || !locToken) {
            navigate('/')
        }
        dispatch(getUser())

        return () => {
            dispatch(resetUser())
        }
    }, [token, navigate, isError, message, dispatch, locToken])

    return (isLoading ?
        <Loader />
        :
        <main >
            <Header />
            <TransactionSection />
        </main>
    );
};

export default Transactions;