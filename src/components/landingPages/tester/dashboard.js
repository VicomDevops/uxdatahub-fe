/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Table from "../../common/table/table";
import { connect } from "react-redux";
import userServices from "../../../services/userServices";
import { URL_API } from "../../../config.json";
import { Link } from "react-router-dom";
import { successOpenPopup, successOpenWindow } from "../../../actions/authActions";
import axios from "axios";
import Avatar from "react-avatar";
import ModalQuiz from "../clientTester/Modals/ModalQuiz";
import scenarioServices from "../../../services/scenarioServices";
import "video.js/dist/video-js.css";
import videojs from 'video.js'
import Record from 'videojs-record/dist/videojs.record.js';
import 'videojs-record/dist/css/videojs.record.css';
import 'webrtc-adapter';
import { toast } from "react-toastify";
import ModalEnd from "../clientTester/Modals/ModalEnd";
import RenderInUrlWindow from '../testScenario/RenderInUrlWindow';
import { useShepherdTour } from "react-shepherd";
import "shepherd.js/dist/css/shepherd.css";
import steps from "../../common/onBordingSteps/testerSteps";
import UserInfo from "../clientTester/Modals/modalInfo";
import ImageDecoder from "../../common/ImageDeoder";
import ModalCheckDevices from "../clientTester/Modals/ModalCheckDevices";
import url from '../../../utils/https';
import httpServices from "../../../services/httpServices";


httpServices.setToken();

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};


const DashboardPageTester = () => {

  const [visible, setVisible] = useState(false);
  const [dispoUrl, setDispoUrl] = useState([]);
  const [user, setUser] = useState({});
  const [scenarios, setScenarios] = useState([]);
  const [idTest, setIdTest] = useState();
  const [open, setOpen] = useState();
  const [id, setId] = useState();
  const [part1, setPart1] = useState(false);
  const [test, setTest] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [loading, setloading] = useState(false);
  const [player, setPlayer] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [modalCheckDevices, setModalCheckDevices] = useState(false);
  const [count, setCount] = useState({
    scenarioTermines: "",
    scenariosClosed: "",
    scenariosATester: "",
  });
  const [deviceError, setDeviceError] = useState({
    camera: false,
    micro: false,
    ecran: false,
  });
  
  const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 0,
    height: 0,
    fluid: false,
    plugins: {
      record: {
        audio: true,
        screen: true,
        maxLength: 80000,
        debug: true,
        videoMimeType : 'video/x-matroska'
      },
    },
  };
  const tour = useShepherdTour({ tourOptions, steps: steps }); 


  let idVideo = makeid(7);

  function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const getConnectedUser = useCallback(async () => {
    try {
      const response = await userServices.getCurrentUser();
      setUser(response);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);


  const scenarioEtatNumber = useCallback(async () => {
    try {
      const response = await scenarioServices.getCountTester();
      if(response){
        setCount(response);
      }else{
        toast.error("Une erreur est survenue")
      }
    } catch (error) {
      console.log("Error", error);
    }
  },[])

  const getInfoClienTesterStatus = useCallback(async () => {
    try {
      const response = await userServices.getInfoStatus();
      if(response){
        if (response === 0) {
          setModalInfo(true)
          setPart1(true)
        }
      }else{
        // this toast is always displayed
        // toast.error("Une erreur est survenue")
        console.log(response);
      }
    }catch (error) {
      console.log("Error", error);
    }
  },[])

  const getScenariosClientTester = useCallback(async () => {
    try {
      const response = await scenarioServices.getScenarioTestClientTester();
      if(response?.response){
        setPlayer(videojs(idVideo, videoJsOptions));
          
        let etatScenario = response.response.map((scenario) => {
          if (scenario?.test_status === 2) {
            return { ...scenario, etatSce: "Terminé" };
          } else {
            return { ...scenario, etatSce: "A tester" };
          }
        }); 
        // faire el tri par test_status
        let triScenarioByStep = etatScenario.sort((a, b) => {
          return a.test_status - b.test_status
        })
        setScenarios(triScenarioByStep); 
      }else{
        toast.error("Une erreur est survenue") 
      } 
    }catch (error) { 
      console.log("Error", error); 
    }  
  },[])

  /* EFFECTS */

  useEffect(() => {
    getConnectedUser();
  },[getConnectedUser])

  useEffect(() => {
    scenarioEtatNumber()
    getInfoClienTesterStatus()
  },[])
  
  useEffect(() => {  
    const fetchClientTesterScenariosData = async () => {
      setloading(true);
      await getScenariosClientTester();
      setloading(false);
    };
  
    fetchClientTesterScenariosData();
  },[getScenariosClientTester]);

  useEffect(() =>{
    if(isSubmitted){
      tour?.start()
    }
  },[isSubmitted])
    

  const getUrl = (url) => {
    let urlTable = []
    // if (!url) return null;
    if (url && url?.indexOf("http") !== -1) {
      urlTable.push(url)
      return urlTable;
    }
    urlTable.push("http://" + url)
    return urlTable;
  };

  /**
   * This function handles opening the test 
   */
  const handleOpenTest = () =>{
    player?.record().start();
    setOpen(true);
    setVisible(false);
  }

  /**
   * Close the modal and stop recording.
   */
  function handleClose() {
    setVisible(false);
    player?.record().stop();
    player?.record().stopDevice();
    window.location.reload();
  }


  /**
   * Toggle the device error modal.
   */
  const toggleDeviceErrorModal = ()  => {
    setModalCheckDevices(!modalCheckDevices);
    if (visible) {
      console.log("visible");
      player?.record().stop();
      player?.record().stopDevice();
      setVisible(false);
      window.location.reload();
    }
    if(modalCheckDevices){
      player?.record().stop();
      player?.record().stopDevice();
      window.location.reload();
    }
  }

  
  /**
   * Checks if the camera is accessible by requesting user media permission.
   */
  const checkCamera = async () => {
    await navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => {
      console.log('La caméra est activée.');
      setDeviceError((prex) => ({ ...prex, camera: false }));
    })
    .catch((error) => {
      toggleDeviceErrorModal();
      setDeviceError((prex) => ({ ...prex, camera: true }));
      console.error('La caméra n\'est pas activée. Permission denied',);
    });
  }

  /**
   * Checks if the microphone is accessible by requesting user media permission.
   */
  const checkMicrophone = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => {
      console.log('Le microphone est activé.');
      setDeviceError((prex) => ({ ...prex, micro: false }));
      // Mettez à jour l'état du microphone dans votre application ReactJS
    })
    .catch((error) => {
      toggleDeviceErrorModal();
      setDeviceError((prex) => ({ ...prex, micro: true }));
      console.log('deviceError', deviceError);
      console.error('Le microphone n\'est pas activé. Permission denied',);
      // Gérez l'erreur ou mettez à jour l'état du microphone dans votre application ReactJS
    });
  }  

  /**
   * Generates a function comment for the given function body.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const errorScreenShare = () => {
    player.on('deviceError', (err) => {
      toggleDeviceErrorModal();
      setDeviceError((prex) => ({ ...prex, ecran: true }));
      console.error("Le partage d'écran n'est pas activé. Permission denied");
    })
  }


  /**
   * Handle authorization function.
   *
   * @param {type} rowData - description of parameter
   */
  function handleAuthorization(rowData) {
    
    player.record().getDevice();
    
    checkCamera();
    checkMicrophone();
    errorScreenShare();

    player.on('deviceReady', () => {
      setVisible(!visible);
      setId(rowData.id)
      setIdTest(rowData.test_id)
      let urlTable = []
      let urlTableId = []
      getUrl(rowData.steps?.map(step => {
        urlTableId.push({number :step.number, url:step.url});
  
        urlTableId.sort((a, b) => {
          return a.number - b.number;
        })
        urlTable = urlTableId.map(item => item.url);
        return urlTable
      }));
      setDispoUrl(urlTable)
    })

    // Écouter l'événement de démarrage du partage d'écran
    player.on('startRecord', function() {
      console.log('Le partage d\'écran a démarré.');
      console.log("*******************************************",Record);
    });

  }


  /**
   * A description of the entire function.
   *
   * @return {JSX.Element} the ModalQuiz component
  */
  function renderQuizModal() {
    return (
      <ModalQuiz
        handleClose={handleClose}
        visible={visible}
        handleOpenTest={handleOpenTest}
      />
    );
  }



  /**
   * Renders a table with specified columns and actions.
   *
   * @return {JSX.Element} The table component.
  */
  const renderTable = () => {
    const columns = [
      { title: "Nom du scénario", field: "title" },
      {
        title: "Date de lancement",
        field: "createdAt",
        customSort: (a, b) => new Date(a.startedAt) - new Date(b.startedAt),
      },
      {
        title: "Typologie",
        field: "isUnique",
        render: (rowData) => (
          <span className={rowData.etat === 2 ? "bold" : ""}>
            {rowData.isUnique ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>Unique</div>
                <div>{rowData.isModerate ? "Modéré" : "Non Modéré"}</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>A/B Testing</div>
                <div>{rowData.isModerate ? "Modéré" : "Non Modéré"}</div>
              </div>
            )}
          </span>
        ),
      },
      { title: "Etat", field: "etatSce" },
    ];
    const actions = [
      (rowData) => ({
        icon: () =>
          !loading && rowData?.test_status !== 2 ?
            <button   className="btn btn-success"> Go </button>
          :
            <button  className="btn btn-secondary disabledBtn" disabled> Go </button>
        ,
        tooltip: "Commencer le test",
        onClick: (event, rowData) => {
          scenarios[rowData?.tableData?.id] !== 2 &&
            handleAuthorization(rowData);
          scenarios[rowData?.tableData?.id] !== 2
            ? scenarios[rowData?.tableData?.id] !== 1
            &&
            scenarioServices.goTest(rowData?.id).then(() =>
              console.log("test_id")
            )
            : toast.warn("Vous avez deja passé ce test");
        },
      }),
    ];

    return (
      <Table
        title="Liste des scénarios"
        columns={columns}
        data={scenarios}
        actions={actions}
      />
    );
  };

  const togglePopup = () => {
    setloading(true);
    axios.get(URL_API + "/api/scenario/client/tester/list", {
      headers: httpServices.getAuthorization(),
    })
      .then((response) => {
        setPlayer(videojs(idVideo, videoJsOptions));

        let etatScenario = response.data.response.map((scenario) => {
          if (scenario?.test_status === 2) {
            return { ...scenario, etatSce: "Terminé" };
          } else {
            return { ...scenario, etatSce: "A tester" };
          }
        });
        let triScenarioByStep = etatScenario.sort((a, b) => {
          return a.test_status - b.test_status;
        })
        setScenarios(triScenarioByStep);
        setloading(false);
      })
      .catch((error) => {
        console.log(error, "err");
      });
    setTest(false);
    //reload
    window.location.reload();
  };

  function renderModalEnd() {
    return <ModalEnd toggle={togglePopup} visible={test} />;
  }

  const sortScenario = () => {

    let sortedScenarios = scenarios.sort((a, b) => {
      return a.etatS - b.etatS;
    });
    setScenarios(sortedScenarios);
  };

  return (
    <>
      <div className="dash_client_tester">
        <div data-vjs-player>
          <video
            id={idVideo}
            style={{
              margin: "auto",
              position: "static",
              zIndex: "1000",
              width: "0",
            }}
            playsInline
            className="video-js vjs-default-skin"
          />
        </div>
        {renderQuizModal()}
        {renderModalEnd()}
        { modalInfo && <UserInfo userInfo={modalInfo} part1={part1} setPart1={setPart1} userId={user?.id} setIsSubmitted={setIsSubmitted} /> }
        { modalCheckDevices && <ModalCheckDevices visible={modalCheckDevices} toggle={toggleDeviceErrorModal} deviceError={deviceError} /> }
        <div className="d-flex flex-wrap" style={{ marginTop: "2em" }}>
          <span className="header-section">
            Bienvenue {user?.name} !
          </span>
        </div>
        <div
          style={{
            height: 200,
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 30,
          }}
        >
          <div
            style={{
              height: 160,
              width: 500,
              backgroundColor: "#F4F7F7",
              borderRadius: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                height: "100%",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <div className="header-container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "30%",
                  }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    className="dashboard-text-header"
                    onClick={sortScenario}
                  >
                    Scénario
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    className="dashboard-text-header"
                    onClick={sortScenario}
                  >
                    à tester
                  </span>
                </div>
                <span
                  style={{ cursor: "pointer" }}
                  className="dashboard-chiffreG-header"
                  onClick={sortScenario}
                >
                  {count?.scenariosATester}
                </span>
              </div>
            </div>
            <div className="header-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30%",
                }}
              >
                <span className="dashboard-text-header">Scénario</span>
                <span className="dashboard-text-header">réalisé</span>
              </div>
              <span className="dashboard-chiffre-header">
                {count?.scenarioTermines}
              </span>
            </div>
          </div>
          <div
            style={{
              height: 160,
              width: 200,
              backgroundColor: "#F4F7F7",
              borderRadius: 10,
              marginRight: 70,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30%",
                }}
              >
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: 18,
                    lineHeight: "18px",
                    marginBottom: 5,
                  }}
                >
                  Profil
                </span>
                {user?.profileImage ? (
                  <div className="profile_img">
                    <div style={{ width: 70, height: 70 }}>
                      <ImageDecoder base64Image={user?.profileImage} alt="profileImage" className="profileImage" />
                    </div>
                  </div>
                ) : (
                  <Avatar
                    size="70"
                    name={user?.name + " " + user?.lastname}
                    color="#00A359"
                    round={true}
                  />
                )}
              </div>
              <div
                style={{
                  paddingTop: 30,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "15px",
                    lineHeight: "18px",
                    marginTop: 5,
                  }}
                >
                  {user?.name} {user?.lastname?.charAt(0)}
                </span>

                <Link
                  to={`/tester/profile`}
                  className="modifierProfileBtn"
                >
                  {" "}
                  Modifier mon profil{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="render-Table-Tester">
          {
            !loading ? 
              renderTable() 
            : 
              null}
        </div>
        {open && (
          <RenderInUrlWindow
            url={`${url}/tester/questions/${id}`}
            uri={dispoUrl}
            idTest={idTest}
            player={player}
          />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  successOpenWindow,
  successOpenPopup,
})(DashboardPageTester);
