/**
 * React imports
*/
import React , { forwardRef, useEffect, useState } from "react";

/**
 * reactstrap imports
*/
import { Row, Input } from "reactstrap";

/**
 * Components imports
*/
import AnalyzeEmotionsTestersStepTables from "./AnalyzeEmotionsTestersStepTables";
import AnalysesCommentModal from "../byStep/analyseBody/AnalysesCommentModal";
import ShowVideoModal from "../../common/modals/ShowVideoModal";
import ShowEmotionsFaceshotModal from "../../common/modals/ShowEmotionsFaceshotModal";
/**
 * others imports
 */
import { toast } from 'react-toastify';


import scenarioServices from '../../../services/scenarioServices';
import statServices from "../../../services/statServices";




const AnalyzeEmotionsSection = forwardRef(({ tabEtapes, duration, onChangeStep, btn2, questionStep, score, ecartScore, cliqueEtape, stepAnalyse }, ref ) => {

    /* HOOKS */
    const [show, setShow] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showFaceshots, setshowFaceshots] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const [comment, setComment ] = useState('');
    const [analyseEtape, setAnalyseEtape] = useState(stepAnalyse);
    const [videoStepAnswer, setVideoStepAnswer] = useState({});
    const [emotionsStepAnswer, setEmotionsStepAnswer] = useState({});

    useEffect(() => {
        setAnalyseEtape(stepAnalyse);
    },[stepAnalyse])
    
    
    
    /**
     * Handles the opening of the modal.
    */
    const handleOpenModal = () => {
        setShow((prevState) => !prevState);
    }

    /**
     * Handles the opening of the video modal.
    */
    const handleOpenVideoModal = async (rowData) => {
        const {id,  tester_id} = rowData;
        if(!isNaN(id)){
            try{
                const response = await statServices.getStepResponseDetails(tester_id, id);
                if(response.header.code !== 200){
                toast.error(response.header.message)
                }else{
                setVideoStepAnswer(response.response);
                }
            }catch(error){
                console.log(error)
            }
        }
        toggleShowVideo();
    }

    const toggleShowVideo = () => {
        setShowVideo((prevState) => !prevState);
    }

    const handleOpenSlideFaceshotsModal = async (rowData) => {
        if (!showFaceshots) {
                try{
                    const response = await statServices.getStepFaceshotsDetails(rowData.tester_id,rowData.id);
                    if(response.header.code !== 200){
                    toast.error(response.header.message)
                    }else{
                    setEmotionsStepAnswer(response.response);
                    }
                }catch(error){
                    console.log(error)
                }
        }
        toggleSlideFaceshots();
    }

    const toggleSlideFaceshots = () => {
        setshowFaceshots((prevState) => !prevState);
    }

    /**
     * @param {*} e
     * recupere le commentaire
    */
    const onChangeComment = (e) => {
        setComment(e.target.value);
    }

    /**
     * envoyer le commentaire du client
    */
    const onSubmit = async () => {
        await scenarioServices.addComment(commentId, { comment: comment }).then(async res => {
            const updatedStepAnalyse = stepAnalyse.map(item => {
                if (item.id === commentId) {

                    return { ...item, clientComment: comment };
                }
                return item;
            });
            setComment('');
            setAnalyseEtape(updatedStepAnalyse);
            toast.success(res.message);
            handleOpenModal();
        }).catch(err => {
            toast.error('Erreur lors de l\'ajout du commentaire');
            console.log(err);
            handleOpenModal();
        })
    }


    /* RENDER */
    return (
        <div ref={ref} className='chart_container_analyser2'>
            <div className='etape-header'>
                <div className="etape-header-left">
                    <span className="sub-header-title">  
                        Sélectionner une etape:
                    </span>
                    <Input type="select" name="select" className='btn_filter_select_scena' id="exampleSelect" onChange={onChangeStep}>
                        {
                            tabEtapes.map((etape, idx) => {
                                if (idx + 1 === cliqueEtape) {
                                    return <option key={idx} value={etape.stepId} selected>{etape.labels.replace('E', 'Etape ')}</option>
                                } else {
                                    return <option key={idx} value={etape.stepId}>{etape.labels.replace('E', 'Etape ')}</option>
                                }
                            })
                        }
                    </Input>
                </div>
                <div className="etape-header-right">
                    <div className="etape-header-question">
                        <span className='question-text-analyse'>
                            {questionStep}
                        </span>
                    </div>
                    <div className="etape-header-duration">
                        <span className='duration'>{btn2 === "moyenne" ? "Score moyenne: " : "Score de l'écart-type: "} <span className='gras'>{btn2 === "moyenne" ? parseFloat(score) : parseFloat(ecartScore) }</span> </span>
                        <span className='duration '>Durée moyenne : 
                            <span className='gras'>
                                {`${Math.floor(duration / 60) > 0 ? Math.floor(duration / 60) + 'min :' : ''} ${Math.floor(duration) % 60} sec`}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <Row className='table-section'>
                <AnalyzeEmotionsTestersStepTables   
                    stepAnalyse={analyseEtape}
                    handleOpenModal={handleOpenModal}
                    handleOpenVideoModal={handleOpenVideoModal}
                    handleOpenSlideFaceshotsModal={handleOpenSlideFaceshotsModal}
                    setCommentId={setCommentId}
                    setComment={setComment}
                />
                {
                    show &&
                        <AnalysesCommentModal 
                            answerId={commentId}
                            show={show}
                            toggleShow={handleOpenModal}
                            showVideo={showVideo}
                            comment={comment}
                            onSubmit={onSubmit}
                            onChangeComment={onChangeComment}
                        />
                }
                {
                    showVideo &&
                        <ShowVideoModal 
                            showVideo={showVideo}
                            toggleShowVideo={handleOpenVideoModal}
                            videoStepAnswer={videoStepAnswer} 
                        />
                },
                {
                    showFaceshots &&
                        <ShowEmotionsFaceshotModal 
                            showFaceshots={showFaceshots}
                            toggleSlideFaceshots={handleOpenSlideFaceshotsModal}
                            emotionsStepAnswer={emotionsStepAnswer}
                        />
                }
            </Row>
        </div>
    );
})


export default AnalyzeEmotionsSection;