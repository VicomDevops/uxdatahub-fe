//REACT IMPORT
import React, { useState } from "react";
//LIBRARY IMPORT
import { Label, Col, Row,} from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
//SERVICE IMPORT
import reportServices from "../../../services/reportServices";
//COMPONENT IMPORT
import PreauditUXFlash from "../admin/rapports/PreauditUXFlash";
import LoaderButton from "../../common/loaders/LoaderButton";
import SpinnerLoader from "../../common/loaders/SpinnerLoader";
import InputField from "../../common/Inputs/InputField";
import Header from "./rapports/Header";
import RightSideAdmin from "./RightSideAdmin";


//CONSTANT
const ButtonName ={
  GENERER: "Generer un rapport d'audit UX",
  REGENERER : "Regenerer un rapport d'audit UX"
}


/**
 * A React component that displays a form to generate a pre-audit UX flash report.
 * The form takes in the client's name, scenario name, URL, and the names and URLs of two competitors.
 * When the form is submitted, it calls the `generatePreAuditUXFlash` service to generate the report.
 * The component also displays a "Générer un rapport de pré-audit UX" button that is disabled while the report is being generated.
 * The component also displays a spinner while the report is being generated.
 * The component also displays the generated report after the report is generated.
 */
const PreAuditUXFlashForm = () => {
  //HOOK
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  /**
   * Handles the form submission event.
   * If the form is valid, it calls the `generatePreAuditUXFlash` service to generate the report.
   * If the report is successfully generated, it displays a success message and sets the `formData` state to the submitted form data
   * and sets the `response` state to the response from the service.
   * If there is an error, it displays an error message.
   * The component also displays a spinner while the report is being generated.
   * The component also displays the generated report after the report is generated.
  */
  const handleSubmitFrom = async (event, errors, values) => {
    event.preventDefault();
    
    let payload = {};
    if (errors.length === 0) {
      payload = {
        clientName: values?.clientName,
        scenarioName: values?.clientName,
        url: values?.url.trim(),
        workField: values?.workField,
        competingUrl1: values?.competingUrl1.trim(),
        competingName1: values?.competingName1,
        competingUrl2: values?.competingUrl2.trim(),
        competingName2: values?.competingName2,
      };
      
      setLoading(true);
      setFormData(null);
      try {        
        if(payload !== null && payload !== undefined){
          const response = await reportServices.generatePreAuditUXFlash(payload);
          if(response.data.header.code !== 200){
            toast.error(response?.data?.header?.message);
          }else{
            toast.success("Rapport généré avec succès !");
            setFormData(response?.data?.response)
          } 
        }
      } catch (error) {
        toast.error("Une erreur s'est produite lors de la génération du rapport.");
        console.error(error);
      }
      setLoading(false);
    }
  };


  //RENDER
  return (
    <>
      <div className="rapport_container">
        <div className="rapport_form">
          <Header title="Rapport pré-audit UX"/>
          <Row>
            <Col lg="12" md="12" className="mt-3">
              <AvForm onSubmit={handleSubmitFrom}>
                <Row lg="12" md="12" className="mt-3">
                  <Label className="form-label-title">Les informations du client</Label>
                </Row>
                <Row lg="12" md="12" className="form-section mt-3">
                  <InputField type="text" name="clientName" label="Nom du client" required/>
                  <InputField type="text" name="url" label="Url du client"  placeholder="https://example.com" required/>
                  <InputField type="text" name="workField" label="Nom du domaine" required/>
                </Row>
                <Row lg="12" md="12" className="mt-3">
                  <Label className="form-label-title">Les information des concurrents</Label>
                </Row>
                <Row className="form-section mt-3">
                  <InputField type="text" name="competingName1" label="Nom Concurrent 1" required/>
                  <InputField type="text" name="competingUrl1" label="Url Concurrent 1" placeholder="https://example.com" required/>
                </Row>
                <Row className="form-section mt-3">
                  <InputField type="text" name="competingName2" label="Nom Concurrent 2" required/>
                  <InputField type="text" name="competingUrl2" label="Url Concurrent 2" placeholder="https://example.com" required/>
                </Row>
                <Col md="12" lg="12" className="d-flex justify-content-center no-margin no-padding mt-5">
                  <LoaderButton className="btn-success mb-5" loading={loading} name={formData ? ButtonName.REGENERER : ButtonName.GENERER} />
                </Col>
              </AvForm>
            </Col>
          </Row>
          { loading && <SpinnerLoader />}
        </div>
        <RightSideAdmin />
      </div>
    { formData && <PreauditUXFlash data={formData} /> }
    </>
  );
};

//EXPORT
export default PreAuditUXFlashForm;
