//REACT IMPORT
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
//LIBRARY IMPORT
import { Button, Col, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from 'moment';
import Webcam from "react-webcam";
//SERVICES IMPORT
import { successOpenWindow, successOpenPopup } from '../../../actions/authActions'
import scenarioServices from "../../../services/scenarioServices";
//STYLES IMPORT
import './modal.css'
//COMPONENT IMPORT
import ScaleQuestion from '../testScenario/scaleQuestion';
import RenderInQuestionWindow from '../testScenario/RenderInQuestionWindow';
import OpenQuestion from '../testScenario/openQuestion';
import QuestionItemSingleChoice from "../testScenario/questionItemSingleChoice";
import Modals from '../../common/modals/modal'
//ASSESTS IMPORT
import Logo from "../../../assets/logo-vector.svg";


//CONSTANTS
const idTest =window.my_childs_special_setting3
const player = window.my_childs_special_setting;

/**
 * React component for handling questions and responses.
 *
 * @param {object} match - The matched route parameters
 * @param {object} history - The history object for navigation
 * @param {...object} props - Additional props
 * @return {JSX.Element} The rendered React element
 */
const QuestionsClient = ({ match, history, ...props }) => {

  /* HOOKS */
  const [value, setValue] = useState(0);
  const [currentResponse, setCurrentResponse] = useState({
    answer: "",
    comment: "",
    endAt: "",
    startAt: moment().format('LTS')
  });
  const [dispoUrl, setDispoUrl] = useState(window.my_childs_special_setting2[0]);
  const [indice, setIndice] = useState(0);
  const [isDeveloped, setIsDeveloped] = useState(true);
  const [scenarios, setScenarios] = useState([]);
  const [_id, setId] = useState();
  const [picked, setPicked] = useState("");
  const [show, setShow] = useState(false);
  const [showWindow, setShowWindow] = useState(true);
  const [open, setOpen] = useState(true);
  const [buttonEtat, setButtonEtat] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showDone, setShowDone] = useState(false);
  const [stepVideos, setStepVideos] = useState(0);
  const [ readToast, setReadToast] = useState(true);
  const [requiredAnswer, setRequiredAnswer] = useState(false);
  const [requriedComment, setRequriedComment] = useState(false);
  /*const [imagesState, setImagesState] = useState([{
    id: 0,
    date: moment().format('LTS'),
    image: null
  }]);*/
  const webcamRef = useRef(null);

  const question = useMemo(() => scenarios[indice], [scenarios, indice]);
  const instruction = useMemo(() => scenarios[indice], [scenarios, indice]);
  const maxRange = useMemo(() => scenarios[indice]?.questionChoices?.maxScale, [scenarios, indice]);
  const borneInf = useMemo(() => scenarios[indice]?.questionChoices?.borneInf, [scenarios, indice]);
  const borneSup = useMemo(() => scenarios[indice]?.questionChoices?.borneSup, [scenarios, indice]);
  const scenariosSteps = useMemo(() => scenarios?.length, [scenarios]);
  const step_id = useMemo(() => scenarios[indice]?.id, [scenarios, indice]);

  /*useEffect(() => {

    const captureScreenshot = () => {
      const screenshot = webcamRef?.current?.getScreenshot();
      if (screenshot) {
        setImagesState((prevImages) => [...prevImages, { id: prevImages.length, image: screenshot, date: moment().format('LTS') }]);
      }
    };
  

    const intervalHandler = () => {
      captureScreenshot();
      setTimeout(intervalHandler, 5000);
    };  
    
    const timeoutId = setTimeout(intervalHandler, 5000);  
    return () => clearTimeout(timeoutId);
  }, [webcamRef]);
*/
  /*FUNCTIONS */

  /**
   * Fetches questions and answers from the server.
   * 
   * @async
   * @function getData
   * @param {string} match?.params?.id - The scenario id from the route parameters.
   * @param {string} idTest - The id of the test.
   * 
   * Sets the scenarios state with the response data and the id state with the scenario id.
   * Sets the indice state with the index answers from the response.
   * Logs any error from the request to the console.
  */
  useEffect(() => {
    const getData = async () => {
      await scenarioServices.getQuestions(match?.params?.id, idTest).then((response) => { 
        const scenarios = response?.response?.steps;
        const indice = response?.response?.index_answers;
        setScenarios(scenarios); 
        setId(match?.params?.id); 
        setIndice(indice); 
      })
        .catch((error) => {
          console.log(error, "err");
        });
    };
    getData();
  }, [match?.params?.id, setScenarios, setId, setIndice]);



  /**
   * Handles changes in the response form.
   * 
   * @param {object} data - The changed form data
   * @param {string} data.key - The key of the changed field
   * @param {string} data.value - The new value of the changed field
   * 
   * Updates the currentResponse state with the new value.
   * If the key is "answer", it updates requiredAnswer state.
   * If the key is "comment", it updates requiredComment state.
   * If the question type is "open", it always sets requiredComment to true.
  */
  function handleChangeResponse({ key, value }) {
    setCurrentResponse({
      ...currentResponse,
      [key]: value,
    });
    if(key === "answer"){
      if (value.trim() !== "") {
        setRequiredAnswer(true);
      }
      if (value.trim() === "") {
        setRequiredAnswer(false);
      }  
    }

    if(question?.type !== "open"){
      if(key === "comment") {
        if (value.trim() !== "") {
          setRequriedComment(true);
        }
        if (value.trim() === "") {
          setRequriedComment(false);
        }    
      }
    }else{
      setRequriedComment(true);
    }
    
  }


  useEffect(() => {
    
    if(requiredAnswer && requriedComment){
      setButtonEtat(true);
    }else{
      setButtonEtat(false);
    }
  }, [requiredAnswer, requriedComment]);

  const toggle = useCallback(() => {
    setShow(!show);
  }, [show]);

  const toggleDone = useCallback(() => {
    setShowDone(!showDone);
  }, [showDone]);


  /* EFFECTS */
  useEffect(() => {
    const handleVariableChange = () => { 
      const now = indice + 1; 
      if (scenarios?.length > 0) {  
        if (stepVideos  >= scenariosSteps) {  
          setIndice(now); 
          toggle();  
          toggleDone();
          setTimeout(() => {
            toggleDone();
          }, 3000);
          setTimeout(() => {
            setOpen(false);
            player.record().destroy();
            window.close();
          }, 4000);
        }
      };
    }

    handleVariableChange();

    const variableChangeListener = setInterval(() => {
      handleVariableChange();
    }, 10000);

    return () => clearInterval(variableChangeListener);
  }, [stepVideos, indice, scenarios?.length, scenariosSteps, toggle, toggleDone]);


/**
 * Function to handle the next question.
 * This function will first update the currentResponse state to record the start time of the question.
 * Then it will check if the currentResponse is valid and stop the recording.
 * If the currentResponse is valid, it will send the answer to the server and if the last question, it will send the video to the server.
 * If not the last question, it will start the recording again.
 * @function
 */
  const handleNextQuestion = async () => {
    setCurrentResponse({
      ...currentResponse,
      startAt: moment().format('LTS')
    })

    //Update Answer && Comment for next question
    setRequiredAnswer(false);
    setRequriedComment(false);

    if(currentResponse?.answer?.trim() === "" && currentResponse?.comment?.trim() === ""){
      return;
    }
        

    console.log('Stop recording...');
    player.record().stop();
    player.off('finishRecord');
    const now = indice + 1;
    setPicked("");

    const formData = new FormData();
    formData.append("idscenario", _id);
    formData.append("idtest", idTest);
    formData.append("step_id", step_id);
    //supprime le premier element du tableau
    /*imagesState.shift();
    imagesState.forEach((item, index) => {
      formData.append(`faceshots[${index}][image]`, item.image);
      formData.append(`faceshots[${index}][number]`, item.id.toString());
      formData.append(`faceshots[${index}][date]`, item.date.toString());
    });*/
    
    
    //FINAL STEP
    if (now >= scenarios?.length) {

      toggle();
      formData.append("answers", JSON.stringify({
        state: "finished",
        answers: { ...currentResponse, endAt: moment().format('LTS') },
        finishedAt: moment().format('LTS')
      }));

      formData.append("ended", 1);
      let videoData;

      player.on('finishRecord', function () {
        console.log('PREPARING VIDEO');
        const formDataVideo = new FormData();
        formDataVideo.append("file", player?.recordedData, player?.recordedData?.name);
        formDataVideo.append("duration", player.record().getDuration() ?? 0);
        videoData = formDataVideo;
      });

      setLoading(true);
      try {
        console.log("SEND ANSWERS");
        const res = await scenarioServices.sendAnswers(formData);
        if (res?.header?.code !== 200 && res?.header?.code !== 201) {
          toast.error(res?.header?.message);
          player.record().start();
        } else {
          videoData.append("test_id", res?.response?.test_id);
          videoData.append("answer_id", res?.response?.answer_id);
          toast.success(res?.header?.message);
          setCurrentResponse({
            answer: "",
            comment: ""
          });
        }
      } catch (err) {
        toast.error("Une erreur l'hors de l'envoie de la réponse, veuillez reessayer le test s'il vous plait.", {
          autoClose: false
        });
      }
      
      if (videoData) {
        const res = await scenarioServices.sendVideo(videoData);
        if (res?.status !== 200) {
          toast.error("Une erreur l'hors de l'envoie de la vidéo, veuillez reessayer le test s'il vous plait.");
        } else {
          setStepVideos(now);
        }
      } else {
        toast.error("Une erreur l'hors de l'envoie de la vidéo, veuillez reessayer le test s'il vous plait.", {
          autoClose: false
        })
        return
      }

      setLoading(false);

    // ANOTHER STEP  
    } else {
      formData.append("answers", JSON.stringify({
        state: "",
        answers: { ...currentResponse, endAt: moment().format('LTS') },
        finishedAt: moment().format('LTS')
      }));
      formData.append("ended", 0);

      let videoData;

      player.on('finishRecord', function () {
        console.log('PREPARING VIDEO');
        const formDataVideo = new FormData();
        formDataVideo.append("file", player?.recordedData, player?.recordedData?.name);
        formDataVideo.append("duration", player.record().getDuration() ?? 0);
        videoData = formDataVideo;
      });
      //videoJs intercepter
      setLoading(true);

      try {
        console.log("SENDING ANSWERS...");
        const res = await scenarioServices.sendAnswers(formData);
        if (res?.header?.code !== 200 && res?.header?.code !== 201) {
          toast.error(res?.header?.message);
        } else {
          setIndice(now);
          setButtonEtat(false);
          //setImagesState([]);
          console.log("ANSWER SEND");
          videoData.append("test_id", res?.response?.test_id);
          videoData.append("answer_id", res?.response?.answer_id);
          if (scenarios[now]?.url) {
            setDispoUrl(getUrl(scenarios[now]?.url));
          }
          setCurrentResponse({
            answer: "",
            comment: ""
          });
        }
      } catch (err) {
        toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.", {
          autoClose: false
        });
        console.log("Error =>", err);
      }
      console.log('Starting recording...');
      player.record().start();

      setLoading(false);

      if (videoData) {
        console.log("SENDING VIDEO...");
        const res = await scenarioServices.sendVideo(videoData);
        if (res.status !== 200) {
          toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.!!!");
        } else {
          setStepVideos(now);
          console.log("VIDEO SEND");
        }
      } else {
        // console.log("Error =>", err);
        toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.", {
          autoClose: false
        })
        return
      }
    }

    player.on('error', function (error) {
      console.log('Error:', error);
      toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.", {
        autoClose: false
      });
    });
  };



  function getButtonText() {
    return indice + 1 < scenarios?.length ? "Suivant" : "Terminer";
  }

  const getUrl = (url = null) => {
    if (!url) return null;
    if (url && url?.indexOf("http") !== -1) {
      return url;
    }
    return "http://" + url;
  };




  function toggleBegin() {
    setShowWindow(!showWindow)
    props.successOpenPopup()
  }
  function renderModalWait() {
    return (
      <Modals
        modalSize="modal-lg"
        show={show}
        toggleShow={toggle}
        header='Notification'
        backdrop="static"
      >

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="mb-4">
            Merci de ne pas fermer cet onglet, nous sommes en train de traiter vos réponses. Cette opération peut prendre du temps.
          </span>
          <div>
            <Spinner type="grow" color="success" className='' style={{ width: '1.5rem', height: '1.5rem' }} />
            <Spinner type="grow" color="success" className='' style={{ width: '1.5rem', height: '1.5rem' }} />
            <Spinner type="grow" color="success" className='' style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>

      </Modals>
    )
  }

  function renderModalDone() {
    return (
      <Modals
        modalSize="modal-lg"
        show={showDone}
        toggleShow={toggleDone}
        header='Notification'
        backdrop="static"
      >

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="mb-4">
            Nous vous remercions pour votre patience. Toutes vos réponses ont été envoyé.
          </span>
        </div>

      </Modals>
    )
  }

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      setReadToast(false)
    },5000)

    //clear
    return () => {
      clearTimeout(toastTimer)
    }
  },[])

  function renderModalBegin() {
    return (
      <Modals
        // modalSize="modal-lg"
        show={showWindow}
        header='Informations'
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ textAlign: 'center' }}>
          Veuillez vérifier que le scenario à tester est bien affiché sur l'écran que vous partagez
          </span>
          <span style={{ textAlign: 'center' }}>
            Bon test !
          </span>
          <Button className="btn__sign" onClick={() => toggleBegin()} disabled={readToast}>Commencer</Button>
        </div>
      </Modals>
    )
  }


  return (
    <>
      <div className="questionLogo">
        <img src={Logo} alt="labsoft" />
      </div>
      {renderModalBegin()}
      {!showWindow &&
        <div className="questions_container">
          {question && (
            <>
              <div className="quiz-tester" key={indice}>
                  <Col md="12" lg="12" className="questions">
                    <div style={{ width: '100%' }}>
                      {question?.type === "open" ? (
                        <OpenQuestion
                          {...question}
                          {...instruction}
                          handleChange={handleChangeResponse}
                          setIsDeveloped={setIsDeveloped}
                          isDeveloped={isDeveloped}
                          step={scenarios}
                          id={indice}
                        />
                      ) : question?.type === "close" ? (
                        <QuestionItemSingleChoice
                          {...question}
                          {...instruction}
                          handleChange={handleChangeResponse}
                          setIsDeveloped={setIsDeveloped}
                          isDeveloped={isDeveloped}
                          currentResponse={currentResponse}
                          step={scenarios}
                          id={indice}
                        />
                      ) : question?.type === "scale" ? (
                        <ScaleQuestion
                          {...question}
                          {...instruction}
                          value={value}
                          step={scenarios}
                          setValue={setValue}
                          handleChange={handleChangeResponse}
                          setIsDeveloped={setIsDeveloped}
                          setPicked={setPicked}
                          picked={picked}
                          maxRange={maxRange}
                          borneInf={borneInf}
                          borneSup={borneSup}
                          isDeveloped={isDeveloped}
                          currentResponse={currentResponse}
                          id={indice}
                        />
                      ) : null}
                    </div>
                    <div style={{ display: "flex", marginLeft: 'auto' }}>
                      <Col>
                        {
                          buttonEtat ?
                            loading ?
                                <Button className="btn__quiz__disabled" disabled>
                                  {loading && <i className="fa fa-refresh fa-spin mr-2" />}
                                  {getButtonText()}
                                </Button>
                              :
                                <Button className="btn__quiz" onClick={handleNextQuestion}>
                                  {loading && <i className="fa fa-refresh fa-spin mr-2" />}
                                  {getButtonText()}
                                </Button>
                            :
                              <Button className="btn__quiz__disabled" disabled>
                                {getButtonText()}
                              </Button>
                        }
                      </Col>
                    </div>
                    <div className="webcam">
                      <span className="question-typo">
                        Vous êtes enregistré
                      </span>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                      />
                    </div>
                  </Col>
              </div>
            </>
          )}
          {renderModalWait()}
          {renderModalDone()}
          <>
            {open === true && <RenderInQuestionWindow url={dispoUrl} />}
          </>
        </div>
      }
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { successOpenWindow, successOpenPopup })(QuestionsClient);
