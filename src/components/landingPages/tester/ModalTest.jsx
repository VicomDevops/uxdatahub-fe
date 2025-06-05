import React, { useEffect, useState } from "react";
import { ReactMic } from "react-mic";
import headset from "../../../assets/headset.png";
import micro from "../../../assets/micro.png";
import Logo from "../../../assets/logo-vector.svg";
import cam from "../../../assets/cam.png";

import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

const useAudio = (url) => {
  const [audio] = useState(
    new Audio("https://www.kozco.com/tech/organfinale.wav")
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const ModalTest = ({ show, children, url }) => {
  const [visible, setVisible] = React.useState(true);
  const [record, setRecord] = React.useState(false);
  const [playingc, setPlayingc] = useState(false);
  const HEIGHT = 160;
  const WIDTH = 260;

  const [playing, toggle] = useAudio(
    "https://www.kozco.com/tech/organfinale.wav"
  );
  const startVideo = () => {
    setPlayingc(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };
  const stopVideo = () => {
    setPlayingc(false);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  function handleClose() {
    setVisible(!visible);
  }
  // function startRecording() {
  //   setRecord(true);
  // }

  // function stopRecording() {
  //   setRecord(false);
  // }
  function toggleRecord() {
    setRecord(!record);
  }
  function onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  function onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);
  }
  return (
    <Modal
      isOpen={visible}
      className="modal-xl center-modal"
      toggle={handleClose}
    >
      <Row className="padding-modal">
        <Col md="6" sm="6" lg="6" className="p-2 d-flex justify-content-start">
          <img style={{ maxWidth: "170px" }} src={Logo} alt="Logo" />
        </Col>
        <Col
          md="6"
          sm="6"
          lg="6"
          className="p-2 d-flex justify-content-end height-X"
        >
          <Button onClick={handleClose}>
            <span>X</span>
          </Button>
        </Col>
      </Row>

      <ModalBody>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column justify-content-space-around align-items-space-around"
        >
          <strong>
            Bienvenue au sein de la communauté de testeurs insightData.
          </strong>
          <span>Nous sommes trés heureux de t'accueillir parmis nous.</span>
          <span>
            Nous allons te proposer deux tests pour s'assurer que ton
            ordinateur/mobile sont bien paramétrés.
          </span>
          <div className="test-sound ">
            <img className="headset-image" src={headset} alt="" />
            <span className="font-weight-600 ">Tester le son.</span>
            <Button className="btn-success" onClick={toggle}>
              {playing ? "Arréter" : "Démarrer"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="test-mic ">
              <img className="headset-image" src={micro} alt="" />
              <span className="font-weight-600 ">Tester le micro.</span>
              <Button onClick={toggleRecord} className="btn-success">
                {record ? "Arréter" : "Démarrer"}
              </Button>
            </div>
            <div>
              <ReactMic
                record={record}
                className="sound-waves"
                onStop={onStop}
                onData={onData}
                strokeColor="green"
                backgroundColor="#F0F0F0"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="test-mic ">
              <img className="headset-image" src={cam} alt="" />
              <span className="font-weight-600 ">Tester la caméra.</span>
              {playingc ? (
                <Button onClick={stopVideo} className="btn-success">
                  Arréter
                </Button>
              ) : (
                <Button onClick={startVideo} className="btn-success">
                  Démarrer
                </Button>
              )}
            </div>
          </div>
          {playingc ? (
            <div className="cam-container">
              <video
                height={HEIGHT}
                width={WIDTH}
                muted
                autoPlay
                className="app__videoFeed"
              ></video>
            </div>
          ) : null}
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose} className="btn-success">
          {" "}
          Plus tard
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalTest;
