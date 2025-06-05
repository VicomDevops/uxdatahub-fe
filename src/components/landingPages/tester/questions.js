/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
//REACT IMPORT
import React, { useState, useEffect } from "react";
//LIBRARY IMPORT
import { Button, Col, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from 'moment';
import Webcam from "react-webcam";
//SERVICES IMPORT
import { successOpenWindow, successOpenPopup } from '../../../actions/authActions'
import scenarioServices from "../../../services/scenarioServices";
//COMPONENT IMPORT
import RenderInQuestionWindow from '../testScenario/RenderInQuestionWindow';
//import ModalQuiz from "../clientTester/Modals/ModalQuiz";
import Modals from '../../common/modals/modal';
import Logo from "../../../assets/logo-vector.svg";
import AllQuestions from "../testScenario/AllQuestions"
//STYLES IMPORT
import '../clientTester/modal.css'


//CONSTANTS
const idTest = window.my_childs_special_setting3;


/**
 * React component for handling =questions and responses.
 *
 * @param {object} match - The matched route parameters
 * @param {object} history - The history object for navigation
 * @param {...object} props - Additional props
 * @return {JSX.Element} The rendered React element
 */
const Questions = ({ match, history, ...props }) => {

  /* HOOKS */
  const [responses, setResponses] = useState([]);
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
  //const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);
  //const [visible, setVisible] = useState(true);
  const [buttonEtat, setButtonEtat] = useState(false);
  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 0
  };
  const [loading, setLoading] = useState(false)
  const [showDone, setShowDone] = useState(false);
  const [stepVideos, setStepVideos] = useState(0);
  const [ readToast, setReadToast] = useState(true);
  /* VARIABLES */
  const question = scenarios[indice];
  const instruction = scenarios[indice];
  const maxRange = scenarios[indice]?.questionChoices?.maxScale;
  const borneInf = scenarios[indice]?.questionChoices?.borneInf;
  const borneSup = scenarios[indice]?.questionChoices?.borneSup;
  const player = window.my_childs_special_setting;
  const scenariosSteps = scenarios?.length;
  const step_id = scenarios[indice]?.id;

  /*FUNCTIONS */
  /*function handleClose() {
    setVisible(!visible)
  }*/

    
  useEffect(() => {
    async function getData() {
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
    }
    getData();
  }, [match?.params?.id]);



  function handleChangeResponse({ key, value }) {
    setCurrentResponse({
      ...currentResponse,
      [key]: value,
    });
    if (key === "answer" && value.trim() !== "") {
      setButtonEtat(true);
    }
    if (key === "answer" && value.trim() === "") {
      setButtonEtat(false);
    }
  }

  function isChecked({ questionNum, isMultipleResponse, response }) {
    const exist = responses?.find((res) => res?.questionNum === questionNum);
    if (!exist) return false;
    if (!isMultipleResponse) {
      return exist?.response === response;
    }
    return exist?.response?.some((r) => r === response);
  }

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
  }, [stepVideos]);


  const handleNextQuestion = async () => {
    setCurrentResponse({
      ...currentResponse,
      startAt: moment().format('LTS')
    })

    console.log('Stop recording...');
    player.record().stop();
    player.off('finishRecord');
    const now = indice + 1;
    setPicked("");

    const formData = new FormData();
    formData.append("idscenario", _id);
    formData.append("idtest", idTest);
    formData.append("step_id", step_id);

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
          setCurrentResponse({});
        }
      } catch (err) {
        toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.", {
          autoClose: false
        });
      }

      //log form data
      // for(let pair of formData.entries()){
      //   console.log(pair[0]+ ', '+ pair[1]);
      // }
      if (videoData) {
        const res = await scenarioServices.sendVideo(videoData);
        if (res?.status !== 200) {
          toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.");
        } else {
          setStepVideos(now);
        }
      } else {
        toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.", {
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
        console.log("SEND ANSWERS");
        const res = await scenarioServices.sendAnswers(formData);
        if (res?.header?.code !== 200 && res?.header?.code !== 201) {
          toast.error(res?.header?.message);
        } else {
          setIndice(now);
          setButtonEtat(false);
          console.log("SEND ANSWER");
          videoData.append("test_id", res?.response?.test_id);
          videoData.append("answer_id", res?.response?.answer_id);
          if (scenarios[now]?.url) {
            setDispoUrl(getUrl(scenarios[now]?.url));
          }
          setCurrentResponse({});
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
        console.log("SEND VIDEO");
        const res = await scenarioServices.sendVideo(videoData);
        if (res.status !== 200) {
          toast.error("Une erreur est survenue, veuillez reessayer le test s'il vous plait.!!!");
        } else {
          setStepVideos(now);
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

  function toggle() {
    setShow(!show)
  }

  function toggleDone() {
    setShowDone(!showDone)
  }

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

  function renderQuizModal() {
    /*if (showModal)
      return <ModalQuiz handleClose={handleClose} visible={visible} //player={player} 
      />*/
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
                      <AllQuestions
                        {...question}
                        {...instruction}
                        id = {indice}
                        isChecked = {isChecked}
                        value = {value}
                        setValue = {setValue}
                        currentResponse = {currentResponse}
                        step = {scenarios}
                        handleChange = {handleChangeResponse}
                        isDeveloped = {isDeveloped}
                        setIsDeveloped = {setIsDeveloped}
                        maxRange = {maxRange}
                        borneSup = {borneSup}
                        borneInf = {borneInf}
                        picked = {picked}
                        setPicked = {setPicked}
                      />
                      {/* {question?.type === "open" ? (
                        <OpenQuestion
                          {...question}
                          {...instruction}
                          isChecked={isChecked}
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
                          isChecked={isChecked}
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
                          isChecked={isChecked}
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
                      ) : null} */}
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
                        videoConstraints={videoConstraints}
                        width={420}
                        height={250}
                      />
                    </div>
                  </Col>
              </div>
            </>
          )}
          {renderQuizModal()}
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

export default connect(mapStateToProps, { successOpenWindow, successOpenPopup })(Questions);
