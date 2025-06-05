/* eslint-disable react-hooks/exhaustive-deps */
//REACT IMPORT
import React, { useCallback, useEffect, useMemo, useState } from "react";
//LIBRARY IMPORT
import { Col, Row, Label, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactPlayer from 'react-player/lazy'
import PropTypes from "prop-types";
//SERVICE IMPORT
import analyseServices from '../../../services/analyzeServices';
//COMPONENT IMPORT
import Answers from "../../analyzes/byStep/answers";
import { toast } from "react-toastify";
import SpinnerLoader from "../loaders/SpinnerLoader";

/**
 * A function to handle downloading and playing the tester's video per step.
 * 
 * @return {void} 
*/
const ShowVideoModal = ({ showVideo, toggleShowVideo, videoStepAnswer }) => {

    //HOOKS
    const [videoStreamURL, setVideoStreamURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDonwload, setIsDonwload] = useState(false);

    const questionStep = useMemo(() => videoStepAnswer?.step?.question, [videoStepAnswer]);
    const selectedStep = useMemo(() => videoStepAnswer?.step?.number, [videoStepAnswer]);
    const testerName = useMemo(() => {
        const name = videoStepAnswer?.clientTester?.name;
        const lastname = videoStepAnswer?.clientTester?.lastname;
        return name && lastname && `${name.charAt(0).toUpperCase() + name.slice(1)} ${lastname.charAt(0).toUpperCase()}`
    }, [videoStepAnswer]);
    const isVideo = useMemo(() => videoStepAnswer?.video, [videoStepAnswer]);


    //FUNCTION

    /**
     * download la video du testeur par etape
    */
    const handleDownload = async () => {
        if(videoStepAnswer === null || videoStepAnswer === undefined){
            return;
        }
        try{
            setIsDonwload(true);
            // Fetch the video stream from the API
            const videoLink = await analyseServices.getStepAnalyseVideoDownload(videoStepAnswer.id);
            // Check if the type of the response is JSON
            if(videoLink?.type === "application/json"){

                // If the type is JSON, read the content of the Blob as text
                const fileReader = new FileReader();

                /**
                 * Parses the JSON text into a JavaScript object and handles any errors.
                */
                fileReader.onload = function () {
                    try {
                        // Parse the JSON text into a JavaScript object
                        const jsonData = JSON.parse(fileReader.result);

                        if(jsonData.header.code !== 200){
                            toast.error(jsonData.header.message);
                        }
                    } catch (error) {
                        console.error('Erreur lors de la conversion JSON:', error);
                    }
                };
                fileReader.readAsText(videoLink);
            }else{

                // If it's not JSON, treat the Blob as a video
                const videoBlob = videoLink instanceof Blob ? videoLink : new Blob([videoLink], { type: 'video/webm' });

                // Create a URL from the Blob
                const videoBlobURL = URL.createObjectURL(videoBlob);

                // Create a link element
                const downloadLink = document.createElement('a');
                downloadLink.href = videoBlobURL;
                downloadLink.download =  `${selectedStep}.mkv` 
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                // Trigger the download
                downloadLink.click();

                // Clean up after the download
                document.body.removeChild(downloadLink);

            }
        }catch(err){
            console.log(err);
            toast.error("Une erreur s'est produite!");
        } finally{
            setIsDonwload(false);
        }
    };


    /**
     * download la video du testeur par etape et enregistre le lien
     * @param {*} e
    */
    const handleStream = useCallback(async () => {
        setLoading(true);
        if(videoStepAnswer === null || videoStepAnswer === undefined){
            return;
        }
        try {
            // Fetch the video stream from the API
            const ResponseStream = await analyseServices.getStepAnalyseVideoStream(videoStepAnswer.id);
            
            if(ResponseStream?.header){
                toast.error(ResponseStream?.header?.message);
            }else {
                if(ResponseStream){
                    // create a arraybuffer from the blob
                    const videoData = new Blob([ResponseStream], { type: 'video/webm' });
                    const videoStreamURL = URL.createObjectURL(videoData);
                    setVideoStreamURL(videoStreamURL);
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [videoStepAnswer]);


    
    useEffect(() => {
        let isMounted = true;

        /**
         * This function fetches data.
         * @return {Promise<void>} 
        */
        const fetchData = async () => {
            try {
                if (isMounted) {
                    await handleStream();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            URL.revokeObjectURL(videoStreamURL);
            setVideoStreamURL(null);
            setLoading(false);
            setVideoStreamURL(null);
        };
    }, [handleStream, videoStepAnswer]);


    //RENDER
    return (
        <Modal
            isOpen={showVideo}
            centered
            style={{minWidth: '60%'}}
        >            
            <ModalHeader  toggle={toggleShowVideo}> Vidéo du testeur </ModalHeader>
            <ModalBody className="modal-video">
                {
                    videoStepAnswer ?
                        <div className='chat_style-footer'>
                            <Col className='step__question'>
                                {
                                    testerName &&
                                    <Label className="tester-video-name">{testerName} | </Label>
                                }
                                <Label className="question-etape-video-number" > Etape {selectedStep} : </Label>
                                <Label className="question-text-video">{questionStep}</Label>
                            </Col>
                            <Row className='analyseSementiqueTesterVideo'>
                                <Col md='12' >
                                    {
                                        loading ?
                                            <SpinnerLoader />
                                        :
                                            <div className='video_box'>
                                                {
                                                    isVideo && videoStreamURL  ?
                                                        <div className='download'>
                                                            <Button onClick={handleDownload} className='downloadBtn'> 
                                                                {
                                                                    isDonwload ? 
                                                                        <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>
                                                                    :
                                                                        <i className="fa fa-download" aria-hidden="true"></i>
                                                                }
                                                        </Button>
                                                        </div>
                                                    :
                                                        <span className="no_video"> La vidéo est actuellement indisponible. </span>
                                                }
                                                <div className='video_section'>
                                                    {
                                                        videoStreamURL ?
                                                            <ReactPlayer 
                                                                url={videoStreamURL} 
                                                                controls 
                                                                playing
                                                                playsinline
                                                                height={600}
                                                                width={1050}
                                                                progressInterval={1000}
                                                            />
                                                        :
                                                            <span className="no_video"> La videostream est actuellement indisponible. </span>
                                                    }
                                                </div>
                                            </div>
                                    }
                                </Col>
                            </Row>
                            <div className="videoResponseText">
                                <Answers data={videoStepAnswer} />
                            </div>
                        </div>
                    :
                        <span className="error_etape">
                            Veuillez sélectionner une étape
                        </span>
                }
            </ModalBody>
        </Modal>
    )
}

//PROPTYPES
ShowVideoModal.propTypes = {
    showVideo: PropTypes.bool,
    toggleShowVideo: PropTypes.func,
    videoStepAnswer: PropTypes.object,
    selectedStep: PropTypes.number,
    questionStep: PropTypes.string,
    testerName: PropTypes.string
};

//EXPORT
export default ShowVideoModal;