//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A React component that displays audit data information.
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.data - The array containing audit data objects.
 * 
 * This component renders details of an audit item, including preconisations,
 * step, citation, number of users, and argument, derived from the first 
 * element of the data array.
*/
const AuditDataItem = ({ data }) => {
    /*RENDER */
    return(
        <>
        {
            data?.preconisations && 
                <div className='mt-4'>
                    <p className='text-bold'>{data?.preconisations}:</p>
                    <ul className='recommendation-list'>
                        <li>Etape: {data?.step}</li>
                        <li>Citation: "{data?.citation}"</li>
                        <li>Nombre d'utilisateurs: {data?.users_number}</li>
                        <li className='argument'>Argument: {data?.argument}</li>
                    </ul>
                </div>
        }
        </>
    )
}

//PROPTYPES
AuditDataItem.propTypes = {
    data: PropTypes.object.isRequired
};

//EXPORT
export default AuditDataItem;