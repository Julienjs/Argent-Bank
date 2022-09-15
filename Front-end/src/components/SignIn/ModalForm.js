import React, { useEffect } from 'react';
import IconClose from "../../img/icon-close.png"
import { motion } from "framer-motion"
import { signin } from '../../feature/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import Loader from '../Loader';

/**
 * Component that displays a modal to connect to the application
 * @param {Object} props 
 * @returns a modal to connect to the application
 */

const ModalForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, setError, handleSubmit, formState: { errors } } = useForm()

    const { token, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    console.log("token", token);
    /**
     * Function that checks if the fields correspond to a user in the database and sends the user to the profile page
     * @param {Object} value 
     */

    useEffect(() => {
        if (isError) {
            message === "Error: Password is invalid" ?
                setError('password', { type: "manual", message: message }) :
                setError('email', { type: "manual", message: message })
        }
        if (isSuccess || token) {
            props.setTrigger(false)
            navigate('/profil')
        }
    }, [token, isError, isSuccess, message, navigate, dispatch, props, setError])

    const handleSignIn = value => {
        const userlogin = async () => {
            const data = { email: value.email, password: value.password }
            dispatch(signin(data))
        }
        userlogin()
    }

    const modal = {
        hidden: { y: "-100vh", opacity: 0 },
        visible: { y: "0px", opacity: 1, transition: { delay: 0.2 } },
        exit: { y: "+100vh", }
    }

    return (isLoading ?
        <Loader />
        :
        <div className="main modale-bg-dark">
            <motion.section className="sign-in-content"
                variants={modal}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <img src={IconClose} className='close-modal' alt="close icon" onClick={() => props.setTrigger(false)} />
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="exemple@gmail.com"
                            {...register("email", { required: "Champs requis" })}
                        />
                        {errors.email && <span className='error'>{errors.email.message}</span>}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            placeholder="Mot de passe"
                            {...register("password", { required: "Champs requis" })}
                        />
                        {errors.password && <span className='error'>{errors.password.message}</span>}
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </motion.section>
        </div>
    )
};

export default ModalForm;