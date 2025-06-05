/**
 * React Imports
 */
import React, { useState, useEffect } from "react";

/**
 * Reactstrap Imports
 */
import {
    Label,
    Progress,
    Button,
    Input
} from "reactstrap";


/**
 * Assets Imports
 */
import Logo from "../../../assets/logo-vector.svg";
import RenderInQuestionWindow from "../../landingPages/testScenario/RenderInQuestionWindow";
import VideoPlaceHolder from '../../../assets/videoPlaceholder.png';
import SpinnerLoader from "../../common/loaders/SpinnerLoader";
import Radio from "@material-ui/core/Radio";
import url from '../../../utils/https';


/*---------------------------------------------------------------------------*/
/*                                NumericScale                               */
/*---------------------------------------------------------------------------*/
const NumericScale = ({ maxRange }) => {
    var values = [];
    let i = 1;
    if (maxRange > 10)
        maxRange = 10
    while (i <= maxRange) {
        values.push(i++);
    }

    return (
        <div className="step_scale">
            {
                values.map((v,index) => {
                    return  (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                margin: 5,
                                width: 25,
                                borderRadius: "50%",
                                backgroundColor: "green",
                                marginLeft: 3,
                                cursor: "pointer"
                                }}
                            >
                            <span key={index} style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
                                {v}
                            </span>
                        </div>
                )
                })
            }
        </div>
    )
}



/*---------------------------------------------------------------------------*/
/*                                StepPopup                                  */
/*---------------------------------------------------------------------------*/
const VisualisationSteps = () => {

    const [stepData, setStepData] = useState(0);
    const [data, setData] = useState([]);

    const handlStepData = (click) => {
        if(click === -1 && stepData === 0)
            setStepData(data.length-1)
        else if(click === +1 && stepData === data.length-1)
            setStepData(0)
        else
            setStepData(stepData + click)
    }

    useEffect(() => {
        let isMounted = true;
        const handleMessage = (event) => {
            if (event.origin !== url) {
                console.warn('Message origin mismatch:', event.origin);
                return;
            }
            if (event.data && event.data.isYourData) {
                if(isMounted && event.data.payload) {
                    setData(event.data.payload);
                }
            } 
        };

        window.addEventListener("message", handleMessage);

        return () => {
            isMounted = false;
            window.removeEventListener("message", handleMessage);
        };
    }, []);
    
    /*----------------------------- RENDER ---------------------------------*/
    return (
        <div className="step_popup">
            <RenderInQuestionWindow url={data[stepData]?.url} />
            <div className="step_popup_container">
                <div className="step_popup_right_content">
                    <div className="step_Logo">
                        <img src={Logo} alt="Insight_Data"/>
                    </div>
                    
                    {
                        data !== null && data !== undefined ?
                        (
                            <>
                                <Progress className='progress_bar mb-2' color="success" value={100 *  (stepData+1) / data.length}>{ (stepData+1) +'/' + data.length}</Progress>
                                <div className="step_question_section">
                                    <div className="top_step_right_side">
                                        <div className="step_etape">Question numéro {data[stepData]?.number}  </div>
                                    </div>
                                    <div className='row__visu_scenario'>
                                        <div className="step_sous_question">
                                            <Label className='step_question'>Question:</Label>
                                            <Label className='step_question_reponse'>{data[stepData]?.question}</Label>
                                        </div>
                                    </div>
                                </div>
                                {
                                    data[stepData]?.type === "open" && (
                                        <>
                                            <div className="open_step">
                                                <div className="step_repsonse mb-1">Réponse<span className="text-danger">*</span></div>
                                                <div className='row__visu_scenario_open'>
                                                    <Input
                                                        placeholder="Réponse"
                                                        name="answer"
                                                        disabled    
                                                        type='textarea'                                                    
                                                    />
                                                </div>
                                                <div className="step_repsonse mb-1">Commentaire</div>
                                                <div className='row__visu_scenario_open'>
                                                    <Input
                                                        placeholder="Commantaire"
                                                        name="answer"
                                                        type='textarea'
                                                        disabled                                                        
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    data[stepData]?.type === "close" ? (
                                        <div className="close_step"> 
                                            <span className="step_repsonse mb-1">Reponse<span className="text-danger">*</span></span>
                                            <div className='row__visu_scenario'>
                                                {
                                                    Object.values(data[stepData]?.questionChoices).map((choice, index) => {
                                                        if( choice?.toString().trim() !== "" && choice !== undefined && choice !== null && isNaN(choice) ){
                                                            return(
                                                                <div className="d-flex justify-content-start align-items-start" key={index}>
                                                                    <Radio
                                                                        style={{
                                                                            color: "green",
                                                                        }}
                                                                        name="radio-button-demo"
                                                                        inputProps={{ "aria-label": "A" }}
                                                                        className="radio__visu_scenario"
                                                                        checked={choice === data[stepData]?.answer}
                                                                    />
                                                                    <span className="ml-2">{choice}</span>
                                                                </div>
                                                            )
                                                        }else{
                                                            return null
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ):
                                        null
                                }
                                {
                                    data[stepData]?.type === "scale" ? (
                                        <>
                                            <span className="step_repsonse">Reponse<span className="text-danger">*</span></span>
                                            <div>
                                            {
                                                Object.values(data[stepData]).map((choice) => {
                                                    return(                                                
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                            }}
                                                            >
                                                            <span style={{ fontSize: 12, fontWeight: "bold" }}>{choice?.borneInf !== "" ? choice?.borneInf : ""} </span>
                                                            <div className="numeric_scale">
                                                                <NumericScale maxRange={choice?.maxScale} />
                                                            </div>
                                                            <span style={{ fontSize: 12, fontWeight: "bold" }}>
                                                                {choice?.borneSup !== ""  ? choice?.borneSup : ""} 
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </>
                                    ):
                                        null
                                }  
                                <div className="btn_step_container">
                                    <Button className="btn__quiz" onClick={() => handlStepData(-1)}>Précédent</Button>
                                    <Button className="btn__quiz" onClick={() => handlStepData(+1)}>Suivant</Button>
                                </div>

                                <div className="step_footer_section">
                                    <span className="step_footer">Vous êtes enregistré</span>
                                    <div className="step_footer_img">
                                        <img src={VideoPlaceHolder} alt="insightData" />
                                    </div>
                                </div>
                            </>
                        )
                    :
                        <SpinnerLoader />
                    }
                </div>
            </div> 
        </div>
    )};



export default VisualisationSteps;

