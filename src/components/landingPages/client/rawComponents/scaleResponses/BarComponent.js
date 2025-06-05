import React, { useEffect, useState, memo } from "react";
import BarChart from "./BarCharts";
import { Col } from "reactstrap"
import VideoComponent from "../VideoComponent";
import ComponentResponseFooter from "../ComponentResponseFooter";


const  BarComponent = memo(function BarComponent ({ question, data, index, comments, names, infBorne, supBorne, totalResponse , answers}) {

  const [tabL, setTabL] = useState([]);
  const [tabD, setTabD] = useState([]);
  const [videoStepAnswer, setVideoStepAnswer] = useState({});


  const handleUploadVideoByResponseAndTester = async (res) => {
    if (!isNaN(res.target.value)) {
      setVideoStepAnswer(res.target.value);
    }
  };


  useEffect(() => {
    setTabL(Object.keys(data));
    setTabD(Object.values(data));
    if (answers.length > 0) {
      setVideoStepAnswer(answers[0]?.id)
    }
  }, [answers, data]);

  return (
    <div className="alldata__container">
      <Col md="7" className="rightBorder">
        <div className="first-resume">
          <div className="question-resume-container">
            <div className="etape-question-container">
              <div style={{ flexDirection: "column", display: 'flex' }}>
                <strong style={{ minWidth: '80px', textAlign: 'start' }}>Etape {index + 1}  </strong>
              </div>
              <div style={{ paddingLeft: 20, textAlign: 'start' }}>
                <span className="question-text">{question}</span>
              </div>
            </div>
            <div>
              <div className="Q-R-container">
                <span className="question-container" style={{ minWidth: '100px' }}>
                  Echelle de notation
                </span>
                <span className="question-container" style={{  minWidth: '100px' }} >
                  {totalResponse} réponses
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="chart-container-bar">
              <div className="chart-container-width">
                <div className="text-chart-container">
                  <div style={{maxWidth:"60px"}}>{infBorne ? infBorne : 'Pas bien'}</div>
                </div>
                <BarChart labels={tabL} data={tabD} somme={totalResponse} />
                <div className="text-chart-container">
                  <div style={{maxWidth:"60px"}}>{supBorne ? supBorne : 'Trés bien'}</div>
                </div>
              </div>
            </div>
          </div>
          <ComponentResponseFooter type="Other" comments={comments} names={names} />
        </div>
      </Col>
      <Col md="5">
        <VideoComponent
          step={videoStepAnswer ?? videoStepAnswer}
          onChange={(e) => handleUploadVideoByResponseAndTester(e)}
          testers={answers}
          etapeNumbre={index + 1}
        />
      </Col>
    </div>
  );
});

export default BarComponent;
