//REACT IMPORT
import React, { useState } from 'react';
//LIBRARY IMPORT
import { toast } from 'react-toastify';
//SERVICE IMPORT
import reportServices from '../../../../services/reportServices';
//COMPONENT IMPORT
import DashboardHeader from '../../../common/header/DashboardHeader';
import UploadFile from '../../../common/Buttons/UploadFile';
import LoaderButton from '../../../common/loaders/LoaderButton';
import ConcretReportData from './components/ConcretReportData';

//CONSTANT
const ButtonName ={
    GENERER: "Generer un rapport de recommendation concret",
    REGENERER : "Regenerer un rapport de recommendation concret"
}

/**
 * A React component that renders a report of concrete recommendations based on a given file input
 * 
 * The component renders a file input and a button to generate the report. When the button is clicked,
 * the file is uploaded to the server and processed. The report is then displayed in a table with the
 * following columns: recommendation, description and score. The recommendation is a link that opens
 * a new tab with the recommendation. The description is a text that describes the recommendation.
 * The score is a number that represents the score of the recommendation.
 * 
 * The component also renders a loader while the report is being generated.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const ConcretReport = () => {

    //HOOKS
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);

    /**
     * Handles the form submission event for generating concrete recommendations.
     * 
     * The function validates the form, uploads the selected file, and requests
     * concrete recommendations from the server. If the report is successfully
     * generated, it updates the form data with the response. Displays error
     * messages if the file input is invalid or if the server returns an error.
     * Shows a loading spinner while the request is in progress.
     * 
     * @param {Event} event - The form submission event.
     * @param {Array} errors - An array of validation errors.
     * @param {Object} values - The form input values.
    */
    const handleSubmitFrom = async (e) => {
        e.preventDefault();            
        setFormData(null);
        try {
            setLoading(true);   
            if (!selectedFile || !(selectedFile instanceof File || selectedFile instanceof Blob)) {
                throw new Error("Invalid file input");
            }
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await reportServices.getRecommendationConcrete(formData);
            console.log(response);
            
            if(response?.header?.code !== 200){
                toast.error(response?.header?.message);
            }else{
                setFormData(response?.response);
            }

        } catch (err) {
            console.log(err);
        } 
        setLoading(false);
    }


    //RENDER
    return (
        <div>
            <DashboardHeader>
                <div className='analyse-title-section'>
                    <span className="analyse-title">Recommendation concret</span>
                </div>
            </DashboardHeader>
            <div className='concret-container'>
                <UploadFile 
                    setSelectedFile={setSelectedFile}
                    setIsFileUploaded= {setIsFileUploaded}
                    isFileUploaded={isFileUploaded}
                />
                <LoaderButton 
                    className="btn-success my-4" 
                    loading={loading} 
                    name={formData ? ButtonName.REGENERER : ButtonName.GENERER}
                    onClick={handleSubmitFrom}
                />
            </div>
            <>
                {
                    formData && 
                    formData.map((item, index) => {
                        return <ConcretReportData key={index} data={item} />;
                    })
                }
            </>
        </div>
    )
}


//EXPORT
export default ConcretReport;
