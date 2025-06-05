import React  from "react";
import { Input, Label, Col, Progress } from "reactstrap";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";

/**
 * Render an open question component.
 *
 * @param {object} props - The properties of the component.
 * @param {string} props.id - The unique identifier of the question.
 * @param {string} props.question - The text of the question.
 * @param {string} props.instruction - The instruction for answering the question.
 * @param {number} props.step - The current step of the question.
 * @param {function} props.handleChange - The function to handle changes in the question.
 * @param {boolean} props.isDeveloped - A flag indicating if the question is developed.
 * @param {function} props.setIsDeveloped - The function to set the development state of the question.
 * @param {object} props.currentResponse - The current response to the question.
 * @param {number} props.number - The number of the question.
 * @return {JSX.Element} The rendered open question component.
*/
const OpenQuestion = ({
    id,
    question,
    instruction,
    step,
    handleChange,
    isDeveloped,
    setIsDeveloped,
    currentResponse,
    number,
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
              paddingleft: 15,
              width: "100%",
            }}
          >
            <span className="question-typo-number"> Question numéro {number}</span>
            {instruction && <><br />
              <span className="question-typo"><span className="question-typo-number2">Instruction:</span> {instruction}</span></>}
            <br />
            <span className="question-typo"><span className="question-typo-number2">Question: </span>{question}</span>
          </div>
          <div className="arrowPosition" onClick={() => setIsDeveloped(!isDeveloped)}>
            <img className="QarrowImg" src={isDeveloped ? upArrow : downArrow} alt="2M-advisory" />
          </div>
        </div>
        {isDeveloped && (
          <div>
            <div className="column-left-comment-open ">
              <Label className="questions-typo">Réponse<span style={{ color: "#ff0000" }}>*</span></Label>
              <Input
                placeholder={"Réponse"}
                name="answer"
                type='textarea'
                value={currentResponse?.answer}
                onChange={(e) =>
                  handleChange({ key: "answer", value: e?.target?.value })
                }
              />
              <Label className="questions-typo ">Commentaire</Label>
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

export default OpenQuestion;