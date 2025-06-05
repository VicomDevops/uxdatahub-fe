import React, { useState, useEffect, memo } from "react";
import PieChart from "./PieChart";
import VideoComponent from "../VideoComponent";
import { Col } from "reactstrap"
import ComponentResponseFooter from "../ComponentResponseFooter";

const PieComponent = memo(function PieComponent({ question, graphData, index, comments, names, totalResponse, answers }) {

  const [backgroundColor, setBackgroundColor] = useState(["#6c757d", "#00A359", "#c4c2c2", "#00FF00", "#606060"]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [videoStepAnswer, setVideoStepAnswer] = useState({});
  const somme = totalResponse;


  const handleUploadVideoByResponseAndTester = async (res) => {
    if (!isNaN(res.target.value)) {
      setVideoStepAnswer(res.target.value);
    }
  };


  useEffect(() => {
    if (answers.length > 0) {
      setVideoStepAnswer(answers[0]?.id)
    }
  }, [answers]);


  useEffect(() => {
    setLabels(Object.keys(graphData));
    setData(Object.values(graphData));

    const backgroundColor = ["#00A359", "#6c757d", "#808080", "#757575", "#606060", "#708090"];
    // si le premier label est "Oui" alors envoie backgroundColor
    if (Object.keys(graphData)[0].toLowerCase() === "oui") {
      setBackgroundColor(backgroundColor);
    }

  }, [graphData, totalResponse]);


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
                <span className="question-text" >{question}</span>
              </div>
            </div>
            <div>
              <div className="Q-R-container">
                <span className="question-container" style={{ marginLeft: 'auto', minWidth: '100px' }}>
                  Question fermée
                </span>
                <span className="question-container" style={{ minWidth: '100px' }} >
                  {somme} réponses
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
            <div className="pie-chart-container">
              <PieChart {...{ data, labels, somme, backgroundColor }} />
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
          etapeNumbre={index +1}
        />
      </Col>
    </div>
  );
});

export default PieComponent;
