//REACT IMPORTS
import React , { forwardRef, useEffect, useState } from "react";
//LIBRARY IMPORTS
import { Row, Input } from "reactstrap";
import { toast } from 'react-toastify';
//SERVICE IMPORTS
import scenarioServices from '../../../../services/scenarioServices';
import statServices from "../../../../services/statServices";
//COMPONENTS IMPORTS
import AnalysesTestersStepTable from "./AnalysesTestersStepTable";
import AnalysesCommentModal from "./AnalysesCommentModal";
import ShowVideoModal from "../../../common/modals/ShowVideoModal";
import PropTypes from "prop-types";

const AnalyseDetailsSection = forwardRef(({ tabEtapes, duration, onChangeStep, questionStep, score, cliqueEtape, stepAnalyse }, ref ) => {

    // HOOKS
    const [show, setShow] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const [comment, setComment ] = useState('');
    const [analyseEtape, setAnalyseEtape] = useState(stepAnalyse);
    const [videoStepAnswer, setVideoStepAnswer] = useState({});

    useEffect(() => {
        setAnalyseEtape(stepAnalyse);
    },[stepAnalyse])
    
    
    //FUNCTIONS

    
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

    /**
     * Toggle the state of the showVideo modal.
     * When called, it will switch the state of showVideo to its opposite.
     * If showVideo is true, it will be set to false, and vice versa.
     */
    const toggleShowVideo = () => {
        setShowVideo((prevState) => !prevState);
    }

    /**
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
            toast.error('Une erreur est survenue');
            console.log(err);
            handleOpenModal();
        })
    }    


    //RENDER
    return (
        <div ref={ref} className='chart_container_analyse2'>
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
                    <div className="etape-header-duration">
                        <span className='duration'> Score moyenne: <span className='gras'>{parseFloat(score)}</span> </span>
                        <span className='duration'>Durée moyenne: 
                            <span className='gras'>
                                {` ${Math.floor(duration / 60) > 0 ? Math.floor(duration / 60) + 'min :' : ''} ${Math.floor(duration) % 60} sec`}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="etape-header-question">
                <span className='question-text-analyse'>
                    {questionStep}
                </span>
            </div>
            <Row className='table-section'>
                <AnalysesTestersStepTable   
                    stepAnalyse={analyseEtape}
                    handleOpenModal={handleOpenModal}
                    setComment={setComment}
                    setCommentId={setCommentId}
                    handleOpenVideoModal={handleOpenVideoModal}
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
                }
            </Row>
        </div>
    );
})

//PROPTYPES
AnalyseDetailsSection.propTypes = {
    tabEtapes: PropTypes.array,
    duration: PropTypes.number,
    onChangeStep: PropTypes.func,
    btn2: PropTypes.string,
    questionStep: PropTypes.string,
    score: PropTypes.number,
    ecartScore: PropTypes.number,
    cliqueEtape: PropTypes.number,
    stepAnalyse: PropTypes.array
};

//EXPORT
export default AnalyseDetailsSection;