import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from '../../feature/user/usersSlice';
import { motion } from "framer-motion"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

/**
 * Component that allows to modify the firstname and lastname 
 * @param {Object} props 
 * @returns the firstname and lastname 
 */

const EditName = (props) => {
    const userData = useSelector((state) => state.user.user)
    const { token } = useSelector((state) => state.auth)
    const { isError, isLoading, isSuccess, message } = ((state) => state.user.user)
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const dispatch = useDispatch()
    const inputFirstName = useRef()
    const inputLastName = useRef()
    const navigate = useNavigate()


    const data = {
        firstName: firstName || userData.firstName,
        lastName: lastName || userData.lastName
    }

    /**
     * Function that validates the modification of the user's name and surname 
     */

    const handleEdit = () => {
        dispatch(userUpdate(data, token))
        props.setTrigger(false)
        inputFirstName.current.value === "" && inputLastName.current.value === "" ?
            toast.info("Aucune modification n'a été effectué ", { autoClose: 3000 })
            : toast.success("Profil modifié avec succès", { autoClose: 3000 })
    }

    useEffect(() => {
        if (isError) {
            toast.error(message, { autoClose: 3000 })
        }
        if (!token) {
            navigate('/')
        }
    }, [token, navigate, isError, message, dispatch, isSuccess])

    const openForm = {
        visible: { scale: 1, transition: { duration: 0.2 } },
        hidden: { scale: 0, transition: { duration: 0.2 } },
        exit: { scale: 0, transition: { duration: 0.2 } }
    }

    return (isLoading ? <Loader /> :
        <motion.div className='edit-name'
            variants={openForm}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <form>
                <label htmlFor='firstName' />
                <input
                    ref={inputFirstName}
                    type="text"
                    id="firstName"
                    placeholder={data.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <label htmlFor='lastName' />
                <input
                    ref={inputLastName}
                    type="text"
                    id="lastName"
                    placeholder={data.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                ></input>
            </form>
            <div className='edit-name-button'>
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => props.setTrigger(false)
                }>Cancel</button>
            </div>
        </motion.div>
    );
};

export default EditName;