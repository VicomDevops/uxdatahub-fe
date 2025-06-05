/**
 * React import 
 */
import React, { useState, useEffect, useCallback, memo } from "react";

/**
 * Component import
 */
import { Col } from "reactstrap"
import VideoComponent from "../VideoComponent";
import ComponentResponseFooter from "../ComponentResponseFooter";

const OpenComponent = memo(function OpenComponent({ question, answers, etapeNumbre }) {

  //HOOKS 
  const [videoStepAnswer, setVideoStepAnswer] = useState({});

  
  useEffect(() => {
    if (answers.length > 0) {
      setVideoStepAnswer(answers[0]?.id)
    }
  }, [answers]);
  

  //FUNCTION
  const handleUploadVideoByResponseAndTester = useCallback(async (res) => {
      if (!isNaN(res.target.value)) {
        setVideoStepAnswer(res.target.value);
      }
  }, []);


  //RENDER
  return (
    <div className="alldata__container">
      <Col md="7" className="rightBorder">
        <div className="first-resume">
          <div className="first-resume-contianer">
            <div className="first-resume-top">
              <div className="question-resume-container">
                <div className="etape-question-container">
                  <div style={{ flexDirection: "column", display: 'flex' }}>
                    <strong style={{ minWidth: '80px', textAlign: 'start' }}>Etape {etapeNumbre}</strong>
                  </div>
                  <div style={{ paddingLeft: 20, textAlign: 'start', marginBottom: 20 }}>
                    <span className="question-text">{question}</span>
                  </div>
                </div>
              </div>
              <div className="Q-R-container" >
                <span className="question-container" style={{  minWidth: '150px' }}>
                  Question ouverte
                </span>
                <span className="question-container" style={{ minWidth: '100px' }} >
                  {answers && answers.length} réponses
                </span>
              </div>
            </div>
            <div className="reponses-section" key={etapeNumbre}>
              <div className="reponses-container">
                <ComponentResponseFooter type="Open" answers={answers} />
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col md="5">
        <VideoComponent
          step={videoStepAnswer}
          onChange={(e) => handleUploadVideoByResponseAndTester(e)}
          testers={answers}
          etapeNumbre={etapeNumbre}
        />
      </Col>
    </div>
  );
});

export default OpenComponent;
