//REACT IMPORT
import PropTypes from 'prop-types';
import React from 'react'

const RapportTable = ({ data }) => {
    return (
        <>
            {
                data &&
                <div className="table-response-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="table-header">Testeur</th>
                                <th className="table-header">Réponse et Commentaires</th>
                                <th className="table-header">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? "evenRow" : "oddRow"}>
                                    <td className="table-cell">{row.client_name}</td>
                                    <td className="table-cell">
                                        <div>
                                            <div>
                                                {row.answer}
                                            </div>
                                            <div>
                                                {row.comment}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="table-cell">{row.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

//PROPTYPES
RapportTable.propTypes = {
    data: PropTypes.array.isRequired
};

//EXPORT
export default RapportTable;