import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
import ArgentBankLogo from '../img/argentBankLogo.png'
import ModalForm from './SignIn/ModalForm';
import { disconnected, reset } from '../feature/auth/authSlice';
import { resetUser } from '../feature/user/usersSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/**
 * Component that displays the navigation bar and the logo 
 * if the user is not logged in a button to open the modalform component will be displayed 
 * if the user is logged in his name and a button to log out will be present in the navigation bar
 * @returns the navigation bar and the platform logo
 */
const Navbar = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const { token } = useSelector((state) => state.auth)

    /**
     * Function allows the user to log out of the application
     */
    const handleDisconnect = () => {
        dispatch(disconnected())
        dispatch(reset())
        dispatch(resetUser())
        navigate('/')
        localStorage.removeItem("persist:root")

        toast.success(`À bientôt ${user.firstName} 👋`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }


    return (
        <header>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={ArgentBankLogo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                {token ?
                    <div>
                        <NavLink to='/profil'>
                            <span className="main-nav-item" href="./user.html">
                                <i className="fa fa-user-circle"></i>
                                {user.firstName}
                            </span>
                        </NavLink>
                        <span className="main-nav-item" onClick={handleDisconnect} >
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </span>
                    </div>
                    :
                    <div>
                        <div className="main-nav-item" href="./sign-in.html" onClick={() => setModal(true)}>
                            <i className="fa fa-user-circle" ></i>
                            Sign In
                        </div>
                    </div>
                }
            </nav>
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {modal &&
                    <ModalForm trigger={modal} setTrigger={setModal} />
                }
            </AnimatePresence>
            <ToastContainer />

        </header>

    );
};

export default Navbar;