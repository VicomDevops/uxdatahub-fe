//REACT IMPORTS
import React, { useCallback, useState } from "react";
//LIBRARIES IMPORTS
import { Label } from "reactstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
//ASSETS IMPORTS
import Eye from '../../../assets/eye.svg';
import Download from "../../../assets/dwnld.png";
//STYLE IMPORTS
import "./header.css";
//SERVICES IMPORTS
import statServices from "../../../services/statServices.js";
//UTILS IMPORTS
import { capitalizeFirstLetter, formatTime } from "../../../utils/helpers.js";
//COMPONENTS IMPORTS
import SkeletonHeader from "./skeletonHeader.jsx";
import HeaderScoreModal from "./HeaderScoreModal.jsx";
import HeaderItem from "./HeaderItem.jsx";

/**
 * Renders the ScenarioDetails component which displays various
 * details about a scenario, including steps, testers, panel type,
 * score, and duration. It conditionally renders modals and download
 * buttons based on the provided renderType.
 *
 * @param {Object} skeleton - The skeleton object for loading states.
 * @param {Object} header - The header object containing scenario details.
 * @param {number} nbrTester - The number of testers.
 * @param {Object} analyseObj - Object containing analysis data.
 * @param {boolean} excel - Flag indicating if Excel download is available.
 * @param {Array} arrayOftesters - Array of testers for the scenario.
 * @param {string} renderType - Determines the type of rendering (e.g., 'analyse' or 'allData').
 * @returns {JSX.Element} The rendered ScenarioDetails component.
 */
const HeaderItems = ({ skeleton, header, analyseObj, excel, arrayOftesters, renderType }) => {

    /* HOOKS */
    const [open, setOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    /* FUNCTIONS */

    /**
     * Handles the opening of the modal.
    */
    const handleOpenModal = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, [setOpen]);

    /**
     * Download all data in excel format
     * @returns {Promise<void>}
     */
    const handleDownloadAllData = useCallback(async () => {
        let url;
        try {
            setIsDownloading(true);
            if(!arrayOftesters.length ){
                toast.error("Excel non disponible");
                return;
            }
            const res = await statServices.downloadExcel(header.id, arrayOftesters);            
            if (res?.header?.code === 400) {
                toast.error(res?.header?.message);
                return;
            }

            url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `allData_${header?.title || "data"}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Fichier téléchargé avec succès");
        } catch (error) {
            console.error("ERROR", error);
        } finally {
            setIsDownloading(false);
            URL.revokeObjectURL(url);
        }
    }, [header, arrayOftesters]);    
    
    /**
     * Renders the header based on the renderType prop.
     * If renderType is 'analyse', renders the score modal and the download button.
     * If renderType is 'allData', renders the download button.
     * If renderType is neither of the above, returns null.
     * @return {JSX.Element} The JSX element representing the header component.
     */
    const onHeaderRender = useCallback(() => {    
        if(renderType === 'analyse'){ 
            return(
                <>
                    <div className='header-item-img'>
                        <Label className="header_label">Résumé</Label>
                        {
                            skeleton ?  
                                <SkeletonHeader /> 
                            : 
                                header?.score &&
                                    <span className='header_span'>
                                        <img src={Eye} alt="2M-advisory" style={{ width: '35px', cursor: 'pointer' }} onClick={handleOpenModal} />
                                    </span>
                        }
                    </div>
                    {
                        open &&  <HeaderScoreModal open={open} handleOpenModal={handleOpenModal} header={header} analyseObj={analyseObj} />
                    }
                </>
            )
        }else if(renderType === 'allData'){
            return(
                <>
                {
                    excel && (
                        <div className='header-item-img'>
                            <Label className="header_label">Télécharger</Label>
                            {
                                skeleton ?  
                                    <SkeletonHeader /> 
                                : 
                                    header?.testers &&
                                        <span className='header_span'>
                                            {
                                                isDownloading ? 
                                                    <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>
                                                : 
                                                    <img src={Download} alt="" style={{ width: "1.5rem", cursor: "pointer" }} onClick={handleDownloadAllData} />
                                            }
                                        </span>
                            }
                        </div>
                    )
                }
                </>
            )
        }else{
            return null
        }
    }, [renderType, skeleton, header, open, handleOpenModal, analyseObj, excel, handleDownloadAllData, isDownloading]);


    
    //RENDER
    return(
        <div className='header-items'>
            <HeaderItem
                label="Etapes"
                value={header?.steps}
                condition={header?.steps}
                skeleton={skeleton}
            />
            <HeaderItem
                label="Testeurs"
                value={`${header?.testersDone}/${header?.testers}`}
                condition={header?.testers}
                skeleton={skeleton}
                className={header?.testersDone === header?.testers ? 'completTest' : 'encoursTest'}
            />
            <HeaderItem
                label="Panel"
                value={header?.type}
                condition={header?.type}
                skeleton={skeleton}
                formatValue={capitalizeFirstLetter}
            />
            <HeaderItem
                label="Score"
                value={header?.score}
                condition={header?.score}
                skeleton={skeleton}
                className={header?.score >= 0 ? 'green' : 'red'}
            />
            <HeaderItem
                label="Durée"
                value={header?.duration}
                condition={header?.duration}
                skeleton={skeleton}
                formatValue={formatTime}
            />
            {onHeaderRender()}
        </div>
    );
}

//PROPTYPES
HeaderItems.propTypes = {
    header: PropTypes.object,
    scenarios: PropTypes.array,
    onChangeScenario: PropTypes.func,
    renderType: PropTypes.string,
};

//EXPORT
export default HeaderItems;