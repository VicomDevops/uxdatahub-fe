import React, { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import { saveVideo } from "../../services/scenarioServices"
/**
 * Checks whether the argument is an object
 * @param {any} o
 */
function isObject(o) {
  return o && !Array.isArray(o) && Object(o) === o;
}

/**
 * Checks whether constraints are valid
 * @param {MediaStreamConstraints} mediaType
 */
function validateMediaTrackConstraints(mediaType) {
  let supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
  let unSupportedMediaConstraints = Object.keys(mediaType).filter(
    (constraint) => !supportedMediaConstraints[constraint]
  );

  if (unSupportedMediaConstraints.length !== 0) {
    let toText = unSupportedMediaConstraints.join(',');
    console.error(
      `The following constraints ${toText} are not supported on this browser.`
    );
  }
}

const noop = () => { };

/**
 *
 * @callback Callback
 * @param {Blob} blob
 *
 * @callback ErrorCallback
 * @param {Error} error
 *
 * @typedef MediaRecorderProps
 * @type {object}
 * @property {BlobPropertyBag} blobOptions
 * @property {boolean} recordScreen
 * @property {function} onStart
 * @property {Callback} onStop
 * @property {Callback} onDataAvailable
 * @property {ErrorCallback} onError
 * @property {object} mediaRecorderOptions
 * @property {MediaStreamConstraints} mediaStreamConstraints
 *
 * @typedef MediaRecorderHookOptions
 * @type {object}
 * @property {Error} error
 * @property {string} status
 * @property {Blob} mediaBlob
 * @property {boolean} isAudioMuted
 * @property {function} stopRecording,
 * @property {function} getMediaStream,
 * @property {function} clearMediaStream,
 * @property {function} startRecording,
 * @property {function} pauseRecording,
 * @property {function} resumeRecording,
 * @property {function} muteAudio
 * @property {function} unMuteAudio
 * @property {MediaStream} liveStream
 *
 * @param {MediaRecorderProps}
 * @returns {MediaRecorderHookOptions}
 */
function useMediaRecorder({
  blobOptions,
  recordScreen,
  onStop = noop,
  onStart = noop,
  onError = noop,
  onDataAvailable = noop,
  mediaRecorderOptions,
  mediaStreamConstraints = {}
}) {
  let mediaChunks = React.useRef([]);
  let mediaStream = React.useRef(null);
  let mediaRecorder = React.useRef(null);
  let [error, setError] = React.useState(null);
  let [status, setStatus] = React.useState('idle');
  let [mediaBlob, setMediaBlob] = React.useState(null);
  let [isAudioMuted, setIsAudioMuted] = React.useState(false);

  async function getMediaStream() {
    if (error) {
      setError(null);
    }

    setStatus('acquiring_media');

    try {
      let stream;
      //let stream1;
      // if (recordScreen) {
      // stream1 = await window.navigator.mediaDevices.getUserMedia(
      //   mediaStreamConstraints,

      // );
      stream = await window.navigator.mediaDevices.getDisplayMedia(
        mediaStreamConstraints,

      );
      // } else {
      //  stream = await window.navigator.mediaDevices.getUserMedia(
      //    mediaStreamConstraints,

      //  );
      // }

      if (recordScreen && mediaStreamConstraints.audio) {
        let audioStream = await window.navigator.mediaDevices.getUserMedia({
          audio: mediaStreamConstraints.audio
        });

        audioStream
          .getAudioTracks()
          .forEach((audioTrack) => stream.addTrack(audioTrack));
      }

      mediaStream.current = stream;
      // mediaChunks.current = audioStream;
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('failed');
    }
  }

  function clearMediaStream() {
    if (mediaRecorder.current) {
      mediaRecorder.current.removeEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorder.current.removeEventListener('stop', handleStop);
      mediaRecorder.current.removeEventListener('error', handleError);
      mediaRecorder.current = null;
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
      mediaChunks.current = [];
    }
  }

  async function startRecording() {
    if (error) {
      setError(null);
    }

    if (!mediaStream.current) {
      await getMediaStream();
    }
    // let stream = await window.navigator.mediaDevices.getDisplayMedia(
    //   mediaStreamConstraints
    // );

    mediaChunks.current = [];

    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(
        mediaStream.current,
        mediaRecorderOptions
      );
      mediaRecorder.current.addEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorder.current.addEventListener('stop', handleStop);
      mediaRecorder.current.addEventListener('error', handleError);
      mediaRecorder.current.start();
      setStatus('recording');
      onStart();
    }
  }

  function handleDataAvailable(e) {
    if (e.data.size) {
      mediaChunks.current.push(e.data);
    }
    onDataAvailable(e.data);
  }

  function handleStop() {
    let [sampleChunk] = mediaChunks.current;
    let blobPropertyBag = Object.assign(
      { type: sampleChunk.type },
      blobOptions
    );
    let blob = new Blob(mediaChunks.current, blobPropertyBag);

    setStatus('stopped');
    setMediaBlob(blob);
    onStop(blob);
  }

  function handleError(e) {
    setError(e.error);
    setStatus('idle');
    onError(e.error);
  }

  function muteAudio(mute) {
    setIsAudioMuted(mute);

    if (mediaStream.current) {
      mediaStream.current.getAudioTracks().forEach((audioTrack) => {
        audioTrack.enabled = !mute;
      });
    }
  }

  function pauseRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.pause();
    }
  }

  function resumeRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
      mediaRecorder.current.resume();
    }
  }

  function stopRecording() {
    if (mediaRecorder.current) {
      setStatus('stopping');
      mediaRecorder.current.stop();
      // not sure whether to place clean up in useEffect?
      // If placed in useEffect the handler functions become dependencies of useEffect
      mediaRecorder.current.removeEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorder.current.removeEventListener('stop', handleStop);
      mediaRecorder.current.removeEventListener('error', handleError);
      mediaRecorder.current = null;
      clearMediaStream();
    }
  }

  React.useEffect(() => {
    if (!window.MediaRecorder) {
      throw new ReferenceError(
        'MediaRecorder is not supported in this browser. Please ensure that you are running the latest version of chrome/firefox/edge.'
      );
    }

    if (recordScreen && !window.navigator.mediaDevices.getDisplayMedia) {
      throw new ReferenceError(
        'This browser does not support screen capturing'
      );
    }

    if (isObject(mediaStreamConstraints.video)) {
      validateMediaTrackConstraints(mediaStreamConstraints.video);
    }

    if (isObject(mediaStreamConstraints.audio)) {
      validateMediaTrackConstraints(mediaStreamConstraints.audio);
    }

    if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
      if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
        console.error(
          `The specified MIME type supplied to MediaRecorder is not supported by this browser.`
        );
      }
    }
  }, [mediaStreamConstraints, mediaRecorderOptions, recordScreen]);

  return {
    error,
    status,
    mediaBlob,
    isAudioMuted,
    stopRecording,
    getMediaStream,
    startRecording,
    pauseRecording,
    resumeRecording,
    clearMediaStream,
    muteAudio: () => muteAudio(true),
    unMuteAudio: () => muteAudio(false),
    get liveStream() {
      if (mediaStream.current) {
        return new MediaStream(mediaStream.current.getVideoTracks());
      }
      return null;
    }
  };
}

/**
 * @typedef LiveStreamPreviewProps
 * @type {object}
 * @property {MediaStream} stream
 *
 * @param {LiveStreamPreviewProps}
 */
function LiveStreamPreview({ stream }) {
  let videoPreviewRef = React.useRef();
  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoPreviewRef} className="cam_style" autoPlay />;
}

/**
 * @typedef PlayerProps
 * @type {object}
 * @property {Blob} srcBlob
 *
 * @param {PlayerProps}
 */
function Player({ srcBlob, display }) {
  if (!srcBlob) {
    return null;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={display}
      height={display}
      autoPlay
      controls
      muted
      //onDuration={setDuration}
      //style={{display:{display}}}
    />
  );
}


export default function Recorder(props) {
  const { stop, id , display} = props
  let [recordScreen, setRecordScreen] = React.useState(true);
  let [isStopped, setIsStopped] = React.useState(false);
  let [audio, setAudio] = React.useState(true);
  let [duration, setDuration] = React.useState();
  const [selectedFile, setSelectedFile] = useState(null);
 
  let {
    status,
    liveStream,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaStream
  } = useMediaRecorder({
    recordScreen,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio, video: true }
  });

  //eslint-disable-next-line

  React.useEffect(() => {
    //clearMediaStream
    //await getMediaStream();
    selectedFile && submitForm()
    if (isStopped) {
      stopRecording();
      // console.log('testId',useMediaRecorder);
      // console.log('mediaBlob',URL.createObjectURL(mediaBlob));
    }
    else {
      startRecording();
      setIsStopped(!isStopped)
    }
  }, [stop, selectedFile]);
  const ref = createRef(null)
  //let video = URL.createObjectURL(mediaBlob)
  //console.log(video);
  const submitForm = () => {
    const formData = new FormData();
    formData.append("video", selectedFile);
    saveVideo(id, formData).then(res => this.props.history.push(`/tester/dashboard`))
    // .catch((err) => alert("File Upload Error"));
  };
  return (
    <div ref={ref}>
      {/* <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={getImage}>
          Take screenshot
        </button>
      </div>
      <img width='200px' src={image} alt={'Screenshot'} />
        <h1>use-react-screenshot</h1>
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p>
    </div> */}
      {/* <LiveStreamPreview stream={liveStream} /> */}
      {/* <div>
        <h1>Video recorder</h1>
        <dialog open={status === 'acquiring_media'}>
          Waiting for permissions
        </dialog>
        {status !== 'recording' && <p>
          Select video source
          {<label>
            <input
              type="radio"
              checked={recordScreen}
              onChange={() => setRecordScreen((prevState) => !prevState)}
            />{' '}
            Screen
          </label>}
          <label>
            <input
              type="radio"
              checked={recordScreen}
              onChange={() => setRecordScreen((prevState) => !prevState)}
            />{' '}
            Camera
          </label>
        </p>}
        {status !== 'recording' && <p>
          <label>
            Enable microphone
            <input
              type="checkbox"
              checked={audio}
              onChange={() => setAudio((prevState) => !prevState)}
            />
          </label>
        </p>}
        <section>
        {status !== 'recording' && (
          <button
            type="button"
            onClick={async () => {
              await getMediaStream();
              startRecording();
            }}
          >
            Start recording
          </button>
        )}
        {status === 'recording' && (
          <button type="button" onClick={stopRecording}>
            Stop recording
          </button>
        )}
      </section>

    </div> */}
      <Player srcBlob={mediaBlob}  
     // display={display} 
      />
      {mediaBlob && <>
        <label for="formFileSm" className="btn__1">Upload your video</label>
        <input className="form-control form-control-sm" id="formFileSm" type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0])
            
            // alert("test")
          }} /></>}
      {/* <button onClick={submitForm}>Submit</button> */}
    </div>

  );
}