import React, { useEffect } from 'react';
import Home from './Home';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Profil/Header';
import Account from '../components/Profil/Account';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { getUser, resetUser } from '../feature/user/usersSlice';

/**
 * Profile pages that display the components (header, account) if the token is valid otherwise it is returned to the home page
 * @returns the components (header,account)
 */

const Profil = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const locToken = localStorage.getItem("user")
    const { isLoading, isError, message } = useSelector((state) => state.user)

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

    return (
        isLoading ? <Loader />
            :
            token || locToken ?
                <main className="main bg-dark" style={{ paddingBottom: "20px" }}>
                    <Header />
                    <Account />
                </main>
                : <Home />
    );
};

export default Profil;