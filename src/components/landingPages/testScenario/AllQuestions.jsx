import React  from "react";
import { Input, Label, Col, Progress } from "reactstrap";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";

import Radio from "@material-ui/core/Radio";
import NumericScale  from "./numericScale";

const Question = ({
    question,
    instruction,
    id,
    isChecked,
    questionChoices,
    currentResponse,
    step,
    handleChange,
    isDeveloped,
    setIsDeveloped,
    number,
    maxRange,
    borneSup,
    borneInf,
    picked,
    setPicked,
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

            <div className="progress_questions">
                <Progress className='progress_bar' color="success" value={100 * number / step.length}> {number + '/' + step.length} </Progress>
            </div>

            <div className="question-container">
                <div style={{
                        flexDirection: "column", display: "flex",
                        paddingBottom: 5, paddingTop: 5, paddingleft: 15,
                        width: "100%",
                    }}
                >
                    <span className="question-typo-number"> Question numéro {number} </span>
                    {
                        instruction && 
                        <>
                            <br />
                            <span className="question-typo"><span className="question-typo-number2">Instruction:</span> {instruction}</span>
                        </>
                    }
                    <br />
                    <span className="question-typo"><span className="question-typo-number2">Question: </span>{question}</span>
                </div>

                <div className="arrowPosition" onClick={() => setIsDeveloped(!isDeveloped)}>
                    <img className="QarrowImg" src={isDeveloped ? upArrow : downArrow} alt="2M-advisory" />
                </div>
            </div>

            {isDeveloped && (
                <div>
                    { question?.type === "open" ? (

                        <div className="column-left-comment-open ">
                            <Label className="questions-typo">
                                Réponse <span style={{ color: "#ff0000" }}> * </span>
                            </Label>
                            <Input
                                placeholder={"Réponse"}
                                name="answer"
                                type='textarea'
                                value={currentResponse?.answer}
                                onChange={(e) =>
                                handleChange({ key: "answer", value: e?.target?.value })
                                }
                            />
                            <Label className="questions-typo "> Commentaire </Label>
                            <Input
                                placeholder={"Commentaire"}
                                name="comment"
                                type='textarea'
                                onChange={(e) =>
                                handleChange({ key: "comment", value: e?.target?.value })
                                }
                            />
                        </div>

                    ) : question?.type === "close" ? (

                        <>
                            { values?.map((response) => { 
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
                        </>

                    ) : question?.type === "scale" ? (
                        <div className="column-left-comment-open ">
                            <div
                                style={{
                                    display: "flex", flexDirection: "row", flexWrap: "wrap",
                                    marginBottom: 20,
                                    alignItems: "center", justifyContent: "center",
                                    width: "100%", height: "100%",
                                }}
                            >
                                <span style={{ fontSize: 10, fontWeight: "bold" }}> { borneInf } </span>
  
                                <NumericScale
                                    id={id}
                                    setPicked={setPicked}
                                    picked={picked}
                                    maxRange={maxRange}
                                    handleChange={handleChange}
                                />
                                <span style={{ fontSize: 10, fontWeight: "bold" }}> { borneSup } </span>
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
                    ) : null }
                </div>
            )}

        </Col>
    );
};

export default Question;