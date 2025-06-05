//REACT IMPORT
import React, { Fragment, useMemo, useState } from "react";
//HELPERS IMPORT
import { generateSinglePagePDF_Landscape } from "../../../../utils/generatePDF";
//STYLES IMPORT
import "./stylePreAuditFlash.css";
//LIBRARY IMPORT
import PropTypes from "prop-types";
//COMPONENT IMPORT
import LoaderButton from "../../../common/loaders/LoaderButton";
import ListPoints from "./components/ListPoints";
import ClientInfo from "./components/ClientInfo";
import RapportSection from "./components/RapportSection";
import ConcurrenceContainer from "./components/ConcurrenceContainer";
import ReportVerticalBar from "./components/ReportVerticalBar";
import ReportHeader from "./components/ReportHeader";
import ListRecommendations from "./components/ListRecommendations";
import ImageDecoder from "../../../common/ImageDeoder";
import { capitalizeFirstLetter } from "../../../../utils/helpers";
import { Watermark } from "antd";

/**
 * A React component that displays a pre-audit UX flash report.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.data? - The data? used to populate the report.
 * @param {boolean} props.loading - A flag indicating whether the report is loading.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * This component displays a detailed UX audit report based on the provided data?.
 * It includes client information, main entity notes, strong points, areas for improvement, 
 * brief recommendations, and competitor analysis. A PDF of the report can be downloaded by 
 * clicking a button, with a loading spinner shown during the PDF generation process.
 */
const PreauditUXFlash  = ({ data }) => {

  //HOOK
  const [loadingPDF, setLoadingPDF] = useState(false);  

  /**
   * Initiates the download of a PDF report for the client.
   * Sets the loading state to true during the report generation process.
   * Uses the `generatePDF` helper function with the client's name.
   * Catches and logs any errors that occur during PDF generation.
   * Resets the loading state to false once the process is complete.
   * Only executes if `data?` is available.
   */
  const handleDownloadRapport = async () => {
    if(data) {
      try {
        setLoadingPDF(true);
        await generateSinglePagePDF_Landscape("Pre Audit Flash",data?.clientName);
        setLoadingPDF(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const capitalName = useMemo(() => {
    if(data) {
      return capitalizeFirstLetter(data?.clientName);
    }
  }, [data]); 

  /* RENDER */
  return (
    <>
      {
        data && 
        <div className="pdf-container">
            <div id="pdf-content">
            <Watermark content={['Insight Data', 'Pre-Audit']}>
              <div className="preaudit-container">
                <div className="left-container">
                  <div className="content-container">
                    <ReportHeader title="Audit UX Flash" />
                    <div className="content-left-side">
                      <ReportVerticalBar data ="Audit Flash" className="preaudit-bar"/>
                      <div>
                        
                        <div className="client-info-container">
                          <div className="client-info">
                            <ClientInfo payload={capitalName}  title="Client"/>
                            <ClientInfo payload={`Audit_ux_${capitalName}`}  title="Scenario Test"/>
                            <ClientInfo payload={data?.url}  title="URL"/>
                          </div>
                          <div className="ux-score">
                            <div className="score-circle">
                              <span className="circle-text">Note UX :</span>
                              <span  className="circle-note"> {data?.main_entity_note} /10</span>
                            </div>
                          </div>
                        </div>

                        <div className="main-content">
                          <p className="description"> {data?.entity_description} </p>
                          <p className="description_avantages"> 
                            <span className="text-bold"> Ses avantages concurrentiels </span> 
                            {data?.entity_adventages}
                          </p>
                          <div className="main-points">
                            {/** Points forts **/}
                            <RapportSection title="Points forts :" className="strengths" etat="Positif">
                              <ListPoints  points={data?.entity_strong_points} />
                            </RapportSection>

                            {/** Points à améliorer **/}
                            <RapportSection title="Points à améliorer :" className="improvements" etat="Negatif">
                              <ListPoints points={data?.entity_weak_points} />
                            </RapportSection>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-container">
                  {/** Page de garde **/}
                  <div className="main-image">
                    <ImageDecoder base64Image={data?.entity_images} alt="Page de garde" />
                  </div>

                  <div className="right-content">

                    {/** Brief recommandations **/}
                    <RapportSection title="Recommandations succinctes (3)" className="recommendations" etat="Recommandations">
                      <ListRecommendations recommendations={data?.entity_brief_recommendations} />
                    </RapportSection>

                    {/** Zoom sur la concurrence **/}
                    <RapportSection title="Zoom sur la concurrence" className="competitor-analysis" etat="Concurrence">
                      <ConcurrenceContainer name={data?.competingName1} title={data?.zoom_on_the_competitors_title_1} note={data?.note_the_competitors_1} description={data?.zoom_on_the_competitors_1} />
                      <ConcurrenceContainer name={data?.competingName2} title={data?.zoom_on_the_competitors_title_2} note={data?.note_the_competitors_2} description={data?.zoom_on_the_competitors_2} />
                    </RapportSection>
                    
                  </div>
                </div>
              </div>
            </Watermark>
            </div>
            <LoaderButton className="btn-success my-5" loading={loadingPDF} name="Télècharger PDF" onClick={handleDownloadRapport} />
          </div>
      }
    </>
  );
}

//PROPTYPES
PreauditUXFlash.propTypes = {
  data: PropTypes.object
};

//EXPORT
export default PreauditUXFlash;