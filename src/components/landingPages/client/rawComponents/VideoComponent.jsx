import React, { memo, useCallback, useEffect, useState } from "react";
import { Input, Button, } from "reactstrap"
import analyseServices from "../../../../services/analyzeServices";
import { toast } from "react-toastify";
import SpinnerLoader from "../../../common/loaders/SpinnerLoader";
import ReactPlayer from "react-player";

const VideoComponent = memo(({ onChange, step, testers, etapeNumbre }) => {

    /* HOOKS */
    const [videoStreamURL, setVideoStreamURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [streamError, setStreamError] = useState(false);
    const [isDonwload, setIsDonwload] = useState(false);

    /* FUNCTIONS */

    /**
     * download la video du testeur par etape
    */
    const handleDownload = async () => {
        if (step === null || step === undefined) {
            return;
        }
        try {
            setIsDonwload(true);
            if(!step) return
            // Fetch the video stream from the API
            const videoLink = await analyseServices.getStepAnalyseVideoDownload(step);
            // Check if the type of the response is JSON
            if (videoLink?.type === "application/json") {

                // If the type is JSON, read the content of the Blob as text
                const fileReader = new FileReader();

                /**
                 * Parses the JSON text into a JavaScript object and handles any errors.
                 *
                 * @param {type} paramName - description of parameter
                 * @return {type} description of return value
                */
                fileReader.onload = function () {
                    try {
                        // Parse the JSON text into a JavaScript object
                        const jsonData = JSON.parse(fileReader.result);

                        if (jsonData.header.code !== 200) {
                            toast.error(jsonData.header.message);
                        }
                    } catch (error) {
                        console.error('Erreur lors de la conversion JSON:', error);
                    }
                };
                fileReader.readAsText(videoLink);
            } else {

                // If it's not JSON, treat the Blob as a video
                const videoBlob = videoLink instanceof Blob ? videoLink : new Blob([videoLink], { type: 'video/webm' });

                // Create a URL from the Blob
                const videoBlobURL = URL.createObjectURL(videoBlob);

                // Create a link element
                const downloadLink = document.createElement('a');
                downloadLink.href = videoBlobURL;
                downloadLink.download = `${etapeNumbre}.mkv`
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                // Trigger the download
                downloadLink.click();

                // Clean up after the download
                document.body.removeChild(downloadLink);

            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsDonwload(false);
        }
    };


    /**
     * download la video du testeur par etape et enregistre le lien
     * @param {*} e
    */
    const handleStream = useCallback(async () => {
        setLoading(true);
        if (step === null || step === undefined) {
            return;
        }
        try {
            if(isNaN(step)) return
            // Fetch the video stream from the API
            const ResponseStream = await analyseServices.getStepAnalyseVideoStream(step);
            if(ResponseStream?.header){
                setStreamError(true);
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
    }, [step]);


    /* SIDE EFFECT */
    useEffect(() => {
        let isMounted = true;
        if(!step) setStreamError(true);
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
            setStreamError(false);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, handleStream]);

    return (
        <div className='first-resume-right'>
            <div className='etape-header-video-allData'>
                <Input type="select" name="select" className='btn_filter_select_scena' id="exampleSelect" onChange={onChange}>
                    {
                        testers?.map((tester, idx) => {
                            return <option key={idx} value={tester.id} >{tester.name}</option>
                        })
                    }
                </Input>
                <div className='download_AD'>
                    {
                        !streamError &&
                            <Button onClick={isDonwload ? null : handleDownload} className='downloadBtn'> 
                                {
                                    isDonwload ? 
                                        <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>
                                    :
                                        <i className="fa fa-download" aria-hidden="true"></i>
                                }
                            </Button>
                    }
                </div>
            </div>
            {
                loading ?
                    <SpinnerLoader />
                :
                    <div className='video_box mb-2'>
                        {
                            streamError ?  
                                <div className="section_vide">
                                    <span className="no_video"> La vidéo est actuellement indisponible. </span>
                                </div> 
                            :   
                                <div className='video_section_AD'>
                                    <ReactPlayer 
                                        url={videoStreamURL} 
                                        controls 
                                        playsinline
                                        height={350}
                                        width={600}
                                        progressInterval={1000}
                                    />
                                </div>
                        }
                    </div>
            }

        </div>)
})
export default VideoComponent;