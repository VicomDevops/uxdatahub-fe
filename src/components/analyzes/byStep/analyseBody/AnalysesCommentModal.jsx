//REACT IMPORTS
import React from 'react';
//COMPONENTS IMPORTS
import CommentaireForm from '../../commentaire';
import Modals from '../../../common/modals/modal';
import PropTypes from 'prop-types';

/**
 * Renders the AnalysesCommentModal component.
 *
 * @param {object} props - The props object.
 * @param {string} props.comment - The comment value.
 * @param {string} props.answerId - The answer ID value.
 * @param {boolean} props.show - The show value.
 * @param {function} props.toggle - The toggle function.
 * @param {function} props.onChangeComment - The onChangeComment function.
 * @param {function} props.onSubmit - The onSubmit function.
 * @return {JSX.Element} The rendered AnalysesCommentModal component.
 */
const AnalysesCommentModal = ({ comment, answerId, show, toggleShow, onChangeComment, onSubmit }) => {

    //VARIABLES
    const clientComment = comment || '';

    //RENDER
    return (
        <Modals
            show={show}
            toggleShow={toggleShow}
            header='Ajouter un commentaire'
            fullscreen={true}
        >
            <CommentaireForm
                id={answerId}
                handleSubmit={onSubmit}
                onchange={onChangeComment}
                comment={clientComment}
            />
        </Modals>
    )
}

//PROPTYPES
AnalysesCommentModal.propTypes = {
    comment: PropTypes.string,
    answerId: PropTypes.string,
    show: PropTypes.bool,
    toggleShow: PropTypes.func,
    onChangeComment: PropTypes.func,
    onSubmit: PropTypes.func
};

//EXPORT
export default AnalysesCommentModal;