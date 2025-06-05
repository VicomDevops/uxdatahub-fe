//REACT IMPORT
import React from 'react'
//LIBRARY IMPORT
import { Spinner } from 'reactstrap'
import PropTypes from 'prop-types';
//COMPONENT IMPORT
import Modals from '../../../common/modals/modal';

/**
 * Renders a loading modal with a notification header.
 * 
 * @param {boolean} open - Determines if the modal is visible.
 * @param {function} onToggleClose - Function to toggle the modal visibility.
 * 
 * The modal displays a loading message and three animated spinners
 * indicating that a process is ongoing.
 */
const RenderLoadingModal = ({ open, onToggleClose }) => {
    //RENDER
    return (
        <Modals
            show={open}
            toggleopen={onToggleClose}
            header='Notification'
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ textAlign: 'center' }}>
                    En cours de traitement...
                </span>
                <br />
                <div>
                    <Spinner type="grow" color="success" className='' style={{ width: '1.5rem', height: '1.5rem' }} />
                    <Spinner type="grow" color="success" className='' style={{ width: '1.5rem', height: '1.5rem' }} />
                    <Spinner type="grow" color="success" className='' style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <br />
            </div>
        </Modals>
    )
}

//PROPTYPES
RenderLoadingModal.propTypes = {
    open: PropTypes.bool,
    onToggleClose: PropTypes.func
};

//EXPORT
export default RenderLoadingModal;