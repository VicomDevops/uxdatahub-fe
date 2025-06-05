//REACT IMPORT
import React, { useMemo, useState } from 'react';
//HELPERS IMPORT
import { generatedMultiplePagePDF_Portrait } from '../../../../utils/generatePDF';
//COMPONENT IMPORT
import LoaderButton from '../../../common/loaders/LoaderButton'
import AuditReport from './components/AuditReport';
import PropTypes from 'prop-types';


/**
 * A React component that displays a detailed UX audit report based on the provided data?.
 * It includes client information, main entity notes, strong points, areas for improvement, 
 * brief recommendations, and competitor analysis. A PDF of the report can be downloaded by 
 * clicking a button, with a loading spinner shown during the PDF generation process.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.data? - The data? used to populate the report.
 * 
 * @returns {JSX.Element} The rendered component.
*/
const AuditUXFlashReport = ({ formData }) => {

    //HOOK
    const [loadingPDF, setLoadingPDF] = useState(false);

    /**
     * Initiates the download of a PDF report for the client.
     * Sets the loading state to true during the report generation process.
     * Uses the `generatedMultiplePagePDF_Portrait` helper function with the client's name.
     * Catches and logs any errors that occur during PDF generation.
     * Resets the loading state to false once the process is complete.
     * Only executes if `data?` is available.
    */
    const handleDownloadRapport = async () => {        
        if(formData) {
            try {
                setLoadingPDF(true);
                await generatedMultiplePagePDF_Portrait("Audit UX Flash", formData?.clientName, 3);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingPDF(false);
            }
        }
    }

    //DATA
    const dataTable= useMemo(() =>{
        const reportData = [];
        for (let i = 0; i < (formData?.data?.length-1); i += 2) {
            reportData.push(formData?.data?.slice(i, i + 2));
        }

        return reportData;
    },[formData]);

    const image = useMemo(() => {
        return formData?.data[formData?.data?.length-1]?.image;
    },[formData]);

    //RENDER
    return (
        <div className="pdf-container">
            {dataTable && dataTable.map((data, index) => (
                <AuditReport key={index} data={data} nbPage={index} clientName={formData?.clientName} image={image}/>
            ))}
            <LoaderButton className="btn-success my-5" loading={loadingPDF} name="Télècharger PDF" onClick={handleDownloadRapport} />
        </div>
    )
}

//PROPTYPES
AuditUXFlashReport.propTypes = {
    formData: PropTypes.object
};

//EXPORT
export default AuditUXFlashReport;