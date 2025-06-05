//REACT IMPORTS
import React from 'react';
//LIBRARIES IMPORTS
import { Label, Progress } from "reactstrap";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
//ASSETS IMPORTS
import Edit from '../../../../assets/edit.svg';
import Play from "../../../../assets/tdb/play.svg"


/**
 * Renders a table component for displaying step analysis data.
 *
 * @param {Object} stepAnalyse - The step analysis data.
 * @param {function} onRowClick - The function to be called when a row is clicked.
 * @param {number} selectedRow - The index of the selected row.
 * @return {JSX.Element} The rendered table component.
*/
const AnalysesTestersStepTable = ({ stepAnalyse, handleOpenModal, setComment, setCommentId, handleOpenVideoModal }) => {

    //VARIABLES
    const columns = [
        { title: "Testeur", field: 'tester', cellStyle: {backgroundColor: '#F3FBF7',color: '#000', fontWeight: '400'}},
        { title: "Score", field: 'score',render: rowData => 
            <div style={{ color: rowData.score >= 0 ? 'green' : 'red' }}>{rowData.score}</div> },
        { title: "Intensité", field: '',  render: rowData => 
            rowData.magnitude >= .5 ? 
                <Progress className='progress_bar' color='info' value={parseFloat((rowData.magnitude * 100).toFixed(2))}>{parseFloat((rowData.magnitude * 100).toFixed(2))}%</Progress> 
            : 
                <Progress className='progress_bar' color='warning' value={parseFloat((rowData.magnitude * 100).toFixed(2))}>{parseFloat((rowData.magnitude * 100).toFixed(2))}%</Progress> 
        },
        { title: "Durée", field: 'duration', render: rowData => 
            <div> 
                <span>
                    {`${Math.floor(rowData.duration / 60) > 0 ? Math.floor(rowData.duration / 60) + 'min :' : ''} ${Math.floor(rowData.duration) % 60} sec`}
                </span>
            </div>
        },
    ]

    const actions = [ 
        rowData => ({
            icon: () => rowData?.clientComment === "" || rowData?.clientComment === null || rowData?.clientComment === undefined ? 
                <img style={{ width: "17px" }} src={Edit} alt="update_icon_inactive" /> 
            : 
                <div className='analyseComment'> 
                    <img style={{ width: "17px" }} src={Edit} alt="update_icon_active" /> 
                </div>,
            tooltip: 'Commentaire',
            onClick: (event, rowData) =>  { 
                setCommentId(rowData.id)
                setComment(rowData.clientComment)
                handleOpenModal() 
            }
        }),
        rowData => ({
            icon: () => <img style={{ width: "28px"}} src={Play} alt="update_icon_inactive" className={rowData?.duration === "" && 'tableIconsAnalyseVideoDisabled'} />,
            tooltip : rowData?.duration !== "" ? 'Voir Video' : 'Vidéo indisponible',
            onClick: (event, rowData) =>  { 
                rowData.duration && handleOpenVideoModal(rowData) 
            },
        })
    ]


    //RENDER
    return (
        <MaterialTable
            style={{backgroundColor: "white", border: "0px", boxShadow: "none", width: '94%'}}
            title={
                <Label style={{ fontSize: "1.4em", color: "#000", fontWeight: "500", fontFamily: 'sans-serif', cursor: "help" }}
                    data-tip='Détail des différents scores des testeurs pour chaque étape'
                    data-background-color="#F3FBF7"
                    data-text-color='#000'
                    data-multiline={true}
                    data-type='info'>
                    Analyse par étape
                </Label>
            }
            columns={columns}
            data={stepAnalyse}
            actions={actions}
            detailPanel={rowData => (
                <div style={{
                    padding: "10px 15px",
                    backgroundColor: "#F3FBF7",
                }}>
                    <span className='fw-bold'>Réponse du testeur:</span> {rowData?.answer}
                </div>
            )}
            localization={{
                body: {
                    emptyDataSourceMessage: 'Aucune donnée à afficher',
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'lignes',
                    labelRowsPerPage: 'lignes par page:',
                    firstAriaLabel: 'Première page',
                    firstTooltip: 'Première page',
                    previousAriaLabel: 'Page précédente',
                    previousTooltip: 'Page précédente',
                    nextAriaLabel: 'Page suivante',
                    nextTooltip: 'Page suivante',
                    lastAriaLabel: 'Dernière page',
                    lastTooltip: 'Dernière page'
                },
            }}
            options={{
                pageSize: 5,
                pageSizeOptions: [5, 10, 15],
                actionsColumnIndex: -1,
                cellStyle: {
                    padding: "10px",
                    lineHeight: "1",
                    textAlign: "start",
                },
                headerStyle: {
                    backgroundColor: "#f3fbf7",
                    fontWeight: "bold",
                },
                detailPanelColumnStyle: {
                    padding: "5px", 
                    backgroundColor: "#f3fbf7",
                },
                searchFieldStyle: {
                    color: "#00a359",
                    MuiInputUnderline: "none",
                },
            }}
        />
    )
}

//PROPTYPES
AnalysesTestersStepTable.propTypes = {
    stepAnalyse: PropTypes.array.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    setComment: PropTypes.func,
    setCommentId: PropTypes.func.isRequired,
    handleOpenVideoModal: PropTypes.func.isRequired
};

//EXPORT
export default AnalysesTestersStepTable;