//REACT IMPORT
import React from 'react';
//PROPTYPES IMPORT
import PropTypes from 'prop-types';
//COMPONENTS IMPORT
import Modals from '../modals/modal.jsx';
import RecapForm from '../../analyzes/byStep/recap.jsx';


/**
 * 
 * @returns 
 * UI Modal resume
 * Returns a UI component. It retrieves some data and a header from the component's state. It then sorts the data and maps over it to create an array of labels and scores.
 * Finally, it returns a UI component that renders a modal with a form, passing in the retrieved data, sorted data, and labels as props.
*/
const HeaderScoreModal = ({ open, handleOpenModal, header, analyseObj }) => {

    //DATA
    const dataAndLabels = [];

    analyseObj.forEach(obj => {
        dataAndLabels.push({ average: parseFloat(obj.average), labels: obj.labels });
    });

    dataAndLabels.sort((a, b) => a.average - b.average);

    const data = dataAndLabels.map(item => item.average);
    const labels = dataAndLabels.map(item => item.labels);
    const {score, duration} =  header;

    //RENDER
    return (
        <Modals
            // modalSize="modal-lg"
            show={open}
            toggleShow={handleOpenModal}
            header='Résumé scénario'
            fullscreen={true}
        >
            <RecapForm
                score={score}
                duration = {duration}
                dataAv={data}
                labelsAv={labels}
            />
        </Modals>
    )
}

//PROPTYPES
HeaderScoreModal.propTypes = {
    open: PropTypes.bool,
    handleOpenModal: PropTypes.func,
    header: PropTypes.object,
    analyseObj: PropTypes.array
};

//EXPORT
export default HeaderScoreModal;