import React  from "react";
import { Input, Label, Col, Progress } from "reactstrap";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";
import Radio from "@material-ui/core/Radio";


/**
 * Renders a single choice question item.
 *
 * @param {Object} props - An object containing the following properties:
 *   - id: The ID of the question item.
 *   - question: The question text.
 *   - currentResponse: The current response for the question.
 *   - instruction: The instruction text.
 *   - handleChange: A function to handle changes in the response.
 *   - questionChoices: An object containing the question choices.
 *   - setIsDeveloped: A function to set the development state.
 *   - isDeveloped: A boolean indicating if the question is developed.
 *   - step: An array of steps.
 *   - number: The number of the question.
 * @return {JSX.Element} The rendered question item.
*/
const QuestionItemSingleChoice = ({
    id,
    question,
    currentResponse,
    instruction,
    handleChange,
    questionChoices,
    setIsDeveloped,
    isDeveloped,
    step,
    number,
  }) => {
    const values = Object.values(
      Object.keys(questionChoices)
        ?.filter((key) => key.startsWith("choice"))
        .reduce((acc, key) => {
          return {
            ...acc,
            [key]: questionChoices[key],
          };
        }, {})
    ).filter(Boolean);
    return (
      <Col className="question-client-test" key={id}>
        <div>
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
            <span className="question-typo"><span className="question-typo-number2">Question<span style={{ color: "#ff0000" }}>*</span>: </span>{question}</span>
          </div>
          <div className="arrowPosition" onClick={() => setIsDeveloped(!isDeveloped)}>
            <img className="QarrowImg" src={isDeveloped ? upArrow : downArrow} alt="2M-advisory" />
          </div>
        </div>
        {isDeveloped && (
          <div>
            {values?.map((response) => {
              return (
                <div className="d-flex align-items-center mt-1">
                  <div style={{ display: "flex", width: 390 }}>
                    <Radio
                      checked={currentResponse?.answer === response}
                      onChange={() =>
                        handleChange({
                          key: "answer",
                          value: response,
                        })
                      }
                      style={{
                        color: "green",
                      }}
                      value="a"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <span className="ml-2">{response}</span>
                  </div>
                </div>
              );
            })}
            <div className="column-left-comment-open ">
              <Label className="questions-typo ">Commentaire<span style={{ color: "#ff0000" }}>*</span></Label>
              <Input
                placeholder={"Commentaire"}
                type='textarea'
                value={currentResponse?.comment}
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

export default QuestionItemSingleChoice;