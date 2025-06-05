/**
 * Reacts import
 */
import React from 'react';

/**
 * reactstrap imports
 */
import { Label } from "reactstrap";

/**
 * others imports
 */
import MaterialTable from "material-table";

/**
 * Images imports
 */
import Edit from '../../../assets/edit.svg';
import Play from "../../../assets/tdb/play.svg"
import View from "../../../assets/insightdata_statistique.svg"




/**
 * Renders a table component for displaying step analysis data.
 *
 * @param {Object} stepAnalyse - The step analysis data.
 * @param {function} onRowClick - The function to be called when a row is clicked.
 * @param {number} selectedRow - The index of the selected row.
 * @return {JSX.Element} The rendered table component.
*/
const AnalyzeEmotionsTestersStepTables = ({ stepAnalyse, handleOpenModal, setComment, setCommentId, handleOpenVideoModal, handleOpenSlideFaceshotsModal}) => {
    /* VARIABLES */
    const columns = [
        { title: "Testeur", field: 'tester', cellStyle: {backgroundColor: '#F3FBF7',color: '#000', fontWeight: '400'}, width: "50%" },
        { title: "Joie", field: 'score', width: "15%", render: rowData => 
            <div style={{ color: rowData.happy >= 0 ? 'green' : 'red' }}>{rowData.happy??'Aucune données'}
            </div> 
        },
        { title: "Calme", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.calm >= 0 ? 'green' : 'red' }}>{rowData.calm??'Aucune données'}
        </div> 
        },
        { title: "Tristesse", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.sad >= 0 ? 'green' : 'red' }}>{rowData.sad??'Aucune données'}
        </div> 
        },
        { title: "Confus", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.confused >= 0 ? 'green' : 'red' }}>{rowData.confused??'Aucune données'}
        </div> 
        },
        { title: "Dégouté", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.disgusted >= 0 ? 'green' : 'red' }}>{rowData.disgusted??'Aucune données'}
        </div> 
        },
        { title: "Surpris", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.surprised >= 0 ? 'green' : 'red' }}>{rowData.surprised??'Aucune données'}
        </div> 
        },
        { title: "Peur", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.fear >= 0 ? 'green' : 'red' }}>{rowData.fear??'Aucune données'}
        </div> 
        },
        { title: "Colère", field: 'score', width: "15%", render: rowData => 
        <div style={{ color: rowData.angry >= 0 ? 'green' : 'red' }}>{rowData.angry??'Aucune données'}
        </div> 
        },
        { title: "Réponse", field: 'answer', width: "35%", render: 
            rowData => 
                <div style={{ height: "2rem", overflow: "auto", display: 'flex', alignItems: 'center' }}> 
                    <span style={{textOverflow: "ellipsis"}}>{rowData.answer}</span>
                </div> },
        { title: "Durée", field: 'duration', width: "15%" , render: 
            rowData => 
            <div style={{ height: "2rem", overflow: "auto", display: 'flex', alignItems: 'center' }}> 
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
        }),
        rowData => ({
            icon: () => <img style={{ width: "28px"}} src={View} alt="update_icon_inactive" className={rowData?.happy === null && 'tableIconsAnalyseVideoDisabled'} />,
            tooltip : rowData?.happy !== "" ? 'Voir images et sentiments' : 'Images indisponible',
            onClick: (event, rowData) =>  { 
                rowData.happy && handleOpenSlideFaceshotsModal(rowData) 
            }, 
        })
    ]


    /* RENDER */
    return (
        <MaterialTable
            style={{
                backgroundColor: "white", border: "none ", boxShadow: "none", borderCollapse: "separate", borderSpacing: "0 15px", width: '90%'
            }}
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
                fixedColumns: {
                    left: 0, 
                    right:0
                },
                cellStyle: {
                    lineHeight: "1 ",
                    textAlign: "start",
                },
                headerStyle: {
                    lineHeight: "1 ",
                    textAlign: "start",
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

export default AnalyzeEmotionsTestersStepTables;