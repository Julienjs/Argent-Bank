import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { disconnected, reset } from '../feature/auth/authSlice';
import { resetUser } from '../feature/user/usersSlice';

/**
 * Error page that displays an error message and a link back to the connection page
 * @returns  an error message and a link back to the login page
 */

const Error = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /**
     * Link that removes the token and user data from redux and returns to the login page.
     * @return {*}  that removes the token and user data from redux and returns to the login page.
     */

    const handleLink = () => {
        dispatch(reset())
        dispatch(disconnected())
        dispatch(resetUser())
        navigate("/")
    }

    return (
        <section>
            <article className='error-message'>
                <h1>404</h1>
                <p>Oups! La page que vous demandez n'existe pas.</p>
            </article>
            <article className='link'>
                <p onClick={handleLink}>Retourner sur la page de connection</p>
            </article>
        </section>
    );

};

export default Error;