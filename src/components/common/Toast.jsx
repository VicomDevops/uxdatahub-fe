//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import { ToastContainer } from 'react-toastify';

/**
 * A react-toastify ToastContainer to display toast notifications.
 * @prop {string} position - Where to display the toast container. Defaults to 'top-right'.
 * @prop {number} autoClose - How long to wait before automatically closing a toast. Defaults to 3000.
 * @prop {boolean} hideProgressBar - Whether or not to show the progress bar. Defaults to false.
 * @prop {boolean} newestOnTop - Whether or not to show the newest toast on top. Defaults to false.
 * @prop {boolean} closeOnClick - Whether or not to close the toast on click. Defaults to true.
 * @prop {boolean} rtl - Whether or not to position the toast container with right-to-left orientation. Defaults to false.
 * @prop {boolean} pauseOnVisibilityChange - Whether or not to pause the toast on visibility change. Defaults to true.
 * @prop {boolean} draggable - Whether or not to allow the user to drag the toast. Defaults to true.
 * @prop {boolean} pauseOnHover - Whether or not to pause the toast on hover. Defaults to true.
 * @returns {ReactElement} A ToastContainer element.
*/
const Toast = () => {
    //RENDER
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </div>
    );
};

//EXPORT
export default Toast;
