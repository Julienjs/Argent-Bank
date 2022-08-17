import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import EditName from './EditName';

/**
 * Component that displays a welcome message with the user's lastname and firstname and a button that can open the editname component
 * @returns a welcome message with the user's lastname and firstname and a button that can open the editname component
 */

const Header = () => {
    const userData = useSelector((state) => state.user.user)
    const [form, setForm] = useState(false);

    return (userData ?
        <div className="header">
            <h1>Welcome back  </h1><br />
            {!form &&
                <>
                    <p>{`${userData.firstName} ${userData.lastName}`}</p>
                    <button className="edit-button" onClick={() => setForm(true)}>Edit Name</button>
                </>
            }
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {form &&
                    <EditName setTrigger={setForm} />
                }
            </AnimatePresence>
            <ToastContainer />
        </div>
        : null
    );
};

export default Header;