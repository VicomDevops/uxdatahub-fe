//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

//CONSTANTS
const Note = {
  TOP : "top",
  NEUTRE : "neutre",
  FLOP : "flop"
}

/**
 * Renders the StepChips component with the given labels and data.
 *
 * @param {string} labels - The labels to display.
 * @param {number} data - The data value to display.
 * @param {function} handleChangeEtape - The function to handle the change in etape.
 * @return {JSX.Element} The rendered StepChips component. 
 */
const StepChips = ({ labels, data, handleChangeEtape=()=>{},  labelClassName="", classNameContainer="" }) => {
  //RENDER
  return (
    <div className={classNameContainer} onClick={() => handleChangeEtape(labels)}>
      <div className={`${data && data > 0 ? Note.TOP : data === 0 ? Note.NEUTRE : Note.FLOP}`}> 
        { data }
      </div>
      <div className={labelClassName}> 
        { labels } 
      </div>
    </div>
  )
};

//PROPTYPES
StepChips.propTypes = {
  stepAnalyse: PropTypes.array,
  handleOpenModal: PropTypes.func,
  handleOpenVideoModal: PropTypes.func,
  setCommentId: PropTypes.func,
  setComment: PropTypes.func
};

//EXPORT
export default StepChips;