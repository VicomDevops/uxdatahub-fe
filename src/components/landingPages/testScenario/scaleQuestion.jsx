import React  from "react";
import { Input, Label, Col, Progress } from "reactstrap";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";
import NumericScale  from "./numericScale";


/**
 * Renders a scale question component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier of the question.
 * @param {string} props.question - The text of the question.
 * @param {number} props.number - The number of the question.
 * @param {number} props.maxRange - The maximum range value for the question.
 * @param {number} props.borneSup - The upper bound value for the question.
 * @param {number} props.borneInf - The lower bound value for the question.
 * @param {function} props.handleChange - The function to handle value changes.
 * @param {boolean} props.isDeveloped - Indicates whether the question is expanded or collapsed.
 * @param {number} props.step - The total number of steps.
 * @param {function} props.setIsDeveloped - The function to set the expansion state.
 * @param {function} props.setPicked - The function to set the picked value.
 * @param {string} props.instruction - The instruction for the question.
 * @param {string} props.picked - The picked value.
 * @return {JSX.Element} The rendered scale question component.
*/
const ScaleQuestion = ({
    id,
    question,
    number,
    maxRange,
    borneSup,
    borneInf,
    handleChange,
    isDeveloped,
    step,
    setIsDeveloped,
    setPicked,
    instruction,
    picked,
  }) => {
    return (
      <Col className="question-client-test" key={id}>
        <div className="progress_questions">
          <Progress className='progress_bar' color="success" value={100 * number / step.length}>{number + '/' + step.length}</Progress>
        </div>
        <div className="question-container">
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              paddingBottom: 5,
              paddingTop: 5,
              width: "100%",
            }}
          >
            <span className="question-typo-number"> Question numéro {number}</span>
            {instruction && <><br />
              <span className="question-typo"><span className="question-typo-number2">Instruction:</span> {instruction}</span></>}
            <br />
            <span className="question-typo"><span className="question-typo-number2">Question<span style={{ color: "#ff0000" }}>*</span>: </span>{question}</span>
          </div>
          <div className="arrowPosition" onClick={() => setIsDeveloped(!isDeveloped)}>
            <img className="QarrowImg" src={isDeveloped ? upArrow : downArrow} alt="2M-advisory" />
          </div>
        </div>
        {isDeveloped && (
          <div>
            <div className="column-left-comment-open ">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 10, fontWeight: "bold" }}>{borneInf}</span>
  
                <NumericScale
                  id={id}
                  setPicked={setPicked}
                  picked={picked}
                  maxRange={maxRange}
                  handleChange={handleChange}
                />
                <span style={{ fontSize: 10, fontWeight: "bold" }}>
                  {borneSup}
                </span>
              </div>
  
              <Label className="questions-typo ">Commentaire<span style={{ color: "#ff0000" }}>*</span></Label>
              <Input
                placeholder={"Commentaire"}
                name="comment"
                type='textarea'
                onChange={(e) =>
                  handleChange({ key: "comment", value: e?.target?.value })
                }
              />
            </div>
          </div>
        )}
      </Col>
    );
};

export default ScaleQuestion;