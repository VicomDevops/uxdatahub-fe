//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * ClientInfo component
 * 
 * @param {string} title - The title of the client information
 * @param {string} payload - The payload of the client information
 * 
 * @returns {JSX.Element} The ClientInfo component
 */
const ClientInfo = ({title, payload}) => {
    return (
        <div className="client">
            <div className="spanTitleWidth">
                {title} 
            </div> 
            {
                title === "URL" ? 
                    <span> 
                        : <a className="link" href={payload} target="_blank" rel="noreferrer">{payload}</a> 
                    </span>
                :
                    <div>
                        <span className='text-bold'> 
                            : {payload} 
                        </span>
                    </div>
            }
        </div>
    )
};

//PROPTYPES
ClientInfo.propTypes = {
    title: PropTypes.string,
    payload: PropTypes.string
};

//EXPORT
export default ClientInfo;