//REACT IMPORT
import React, { memo } from "react";
//LIBRARY IMPORT
import PropTypes from "prop-types";

/**
 * Component that renders a welcome message with the name of the user.
 * @prop {string} data - The name of the user.
 * @returns {ReactElement}
*/
const Welcome = ({ userName }) => {
    //RENDER
    return (
      <h2 className="green-text mt-5">Bienvenue {userName}</h2>
    )
  }

  //PROPTYPES
  Welcome.propTypes = {
    userName: PropTypes.string.isRequired
};

//EXPORT
export default memo(Welcome);