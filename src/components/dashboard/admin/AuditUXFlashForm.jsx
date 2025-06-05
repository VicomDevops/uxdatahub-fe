//REACT IMPORT
import React, { useState } from "react";
//LIBRARY IMPORT
import { AvForm } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
//SERVICE IMPORT
import reportServices from "../../../services/reportServices";
//COMPONENT IMPORT
import InputField from "../../common/Inputs/InputField";
import UploadFile from "../../common/Buttons/UploadFile";
import AuditUXFlashReport from "./rapports/AuditUXFlashReport";
import SpinnerLoader from "../../common/loaders/SpinnerLoader";
import LoaderButton from "../../common/loaders/LoaderButton";
import { Col, Label, Row } from "reactstrap";
import Header from "./rapports/Header";
import RightSideAdmin from "./RightSideAdmin";



//CONSTANT
const ButtonName ={
    GENERER: "Generer un rapport d'audit UX",
    REGENERER : "Regenerer un rapport d'audit UX"
}

/**
 * A React component that displays a form for generating an audit UX report.
 * It includes input fields for client name and file upload functionality.
 * Displays a loading spinner while the report is being generated.
 * Shows the generated audit UX report once the form data is available.
 * 
 * @returns {JSX.Element} The rendered component.
*/
const AuditUXFlashForm = () => {
    //HOOK
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    

    /**
     * Handles the form submission event.
     * If the form is valid, it calls the `generateAuditUXFlash` service to generate the report.
     * If the report is successfully generated, it displays a success message and sets the `formData` state to the submitted form data
     * and sets the `response` state to the response from the service.
     * If there is an error, it displays an error message.
     * The component also displays a spinner while the report is being generated.
    */
    const handleSubmitFrom = async (event, errors, values) => {

        event.preventDefault();            
        setFormData(null);
        if (errors?.length === 0) {
            try {
                setLoading(true);   
                if (!selectedFile || !(selectedFile instanceof File || selectedFile instanceof Blob)) {
                    toast.error("Veuillez choisir un fichier");
                    throw new Error("Invalid file input");
                }
                const formData = new FormData();
                formData.append("clientName", values?.clientName);
                formData.append("url", values?.url);
                formData.append("workField", values?.workField);
                formData.append("file", selectedFile);
                const response = await reportServices.generateAuditUXFlash(formData);
                if(response?.data?.header?.code !== 200){
                    toast.error(response?.data?.header?.message);
                }else{
                    setFormData({
                        clientName:values?.clientName,
                        data:response?.data?.response
                    });
                }
            } catch (err) {
                console.log(err);
            } 

            setLoading(false);
        }else{
            toast.error("Veuillez remplir tous les champs");
        }
    }
    

    //RENDER
    return (
        <>
            <div className="rapport_container">
                <div className="rapport_form">
                    <Header title="Rapport audit UX"/>
                    <Row>
                        <Col lg="12" md="12" className="mt-3">
                            <AvForm onSubmit={handleSubmitFrom}>
                                <Row lg="12" md="12" className="mt-3">
                                    <Label className="form-label-title">Les informations du client</Label>
                                </Row>
                                <Row lg="12" md="12" className="form-section mt-3">
                                    <InputField type="text" label="Nom du client"  name="clientName" required />
                                    <InputField type="text" label="Url du client"  name="url" placeholder="https://example.com" required/>
                                    <InputField type="text" label="Nom du domaine" name="workField"  required />
                                </Row>
                                <Row lg="12" md="12" className="mt-3">
                                    <Label className="form-label-title">Ficher des données</Label>
                                </Row>
                                <Row className="form-section">
                                    <UploadFile 
                                        setSelectedFile={setSelectedFile}
                                        setIsFileUploaded= {setIsFileUploaded}
                                        isFileUploaded={isFileUploaded}
                                    />
                                </Row>
                                <LoaderButton className="btn-success my-4" loading={loading} name={formData ? ButtonName.REGENERER : ButtonName.GENERER}/>
                            </AvForm>
                        </Col>
                    </Row>
                    { loading &&  <SpinnerLoader/> }
                </div>
                <RightSideAdmin/>
            </div>
            { formData && <AuditUXFlashReport formData={formData}/> }
        </>
    );
};

//EXPORT
export default AuditUXFlashForm;
