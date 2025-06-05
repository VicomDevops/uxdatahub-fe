//REACT IMPORT
import React from 'react'
//LIBRARY IMPORT
import PropTypes from 'prop-types';
import { Button } from "reactstrap"

/**
 * Render a button with optional loading state and name.
 *
 * @param {boolean} loading - flag to indicate loading state
 * @param {string} name - the name to display on the button
 * @return {JSX.Element} the rendered button component
*/
const LoaderButton = ({loading, name, ...props}) => {
  return (
    <Button {...props} disabled={loading}>
        {name}
        {"    "}
        {loading && <i className="fa fa-refresh fa-spin mr-2" />}
    </Button>
  )
}

//PROPTYPES
LoaderButton.propTypes = {
    loading: PropTypes.bool,
    name: PropTypes.string
};

//EXPORT
export default LoaderButton;