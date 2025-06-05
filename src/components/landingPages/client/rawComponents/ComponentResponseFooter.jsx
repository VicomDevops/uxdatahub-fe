import React from 'react'


/**
 * A component that renders a response footer based on the provided type and data.
 *
 * @param {string} type - The type of response, either "Open" or "Other".
 * @param {array} answers - An array of answer objects, used when type is "Open".
 * @param {array} comments - An array of comment objects, used when type is "Other".
 * @param {array} names - An array of names, used when type is "Other".
 * @return {JSX.Element} The rendered response footer component.
 */
const ComponentResponseFooter = ({type, answers, comments, names}) => {
    return (
        <>
            {
                type === "Open" ? answers && answers.map((response) => {
                    return (
                        <div key={response?.id} className="testeur-response-open" >
                            <span className="tester_1">
                                {response?.name}
                            </span>
                            
                            <div className="testeur-response-container-open">
                            <div className="testeur-response-answer">
                                <div className="answerAndComment-step-section">
                                    Réponses 
                                </div>
                                <div className="testeur-response-answer-testerRep">
                                    {response?.answer}
                                </div>
                            </div>
                            {
                                response?.comment && 
                                <div className="testeur-response-answer">
                                    <div className="answerAndComment-step-section">
                                        Commentaire 
                                    </div>
                                    <div className="testeur-response-answer-testerComm">
                                        {response?.comment}
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                    )
                })
                :
                type === "Other" && comments && comments.map((comment, index) => {
                    return (
                        comment &&
                            <div key={index} className="testeur-response-open" >
                                <span className="tester_1">
                                    {names[index]}
                                </span>
                                <div className="testeur-response-container-open">
                                    <div className="testeur-response-answer">
                                        <div className="answerAndComment-step-section">
                                            Commentaire 
                                        </div>
                                        <div className="testeur-response-answer-testerComm">
                                            {comment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                })
            }
        </>
    )
}

export default ComponentResponseFooter