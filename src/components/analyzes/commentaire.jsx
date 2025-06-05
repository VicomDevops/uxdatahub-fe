//REACT IMPORT
import PropTypes from 'prop-types';
import React from 'react';
//LIBRARY IMPORT
import { Button, Col, Row, Input } from 'reactstrap';


/**
 * Renders a form for adding comments.
 *
 * @param {function} handleSubmit - The function to be called when the form is submitted.
 * @param {string} comment - The current value of the comment.
 * @param {function} onchange - The function to be called when the value of the comment changes.
 * @return {JSX.Element} - The rendered form component.
*/
const CommentaireForm = ({ handleSubmit, comment, onchange, id }) => {
    //RENDER
    return (
        <>
            <Col md='12'>
                <div className='modal__form'>
                    <Input type="textarea" name="text" id="lastName" key={id} onChange={onchange} value={comment} style={{ height: "5em" }} />
                    <br />
                    <Row className='row___sc' >
                        <Button className='info__button' onClick={handleSubmit}> Confirmer </Button>
                    </Row>
                </div>
            </Col>
        </>
    );
}

//PROPTYPES
CommentaireForm.propTypes = {
    handleSubmit: PropTypes.func,
    comment: PropTypes.string,
    onchange: PropTypes.func,
    id: PropTypes.string
};

//EXPORT
export default CommentaireForm;

