import * as faceapi from "face-api.js";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import "./View.scss";
import PropTypes from "prop-types";

function FaceView({ handleAddToCart, currProduct, isPresent }) {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  console.log("inside faces");

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = `${process.env.PUBLIC_URL}/weights`; //../weights

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };

    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        if (videoRef.current.readyState >= 3) {
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        }
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        // const goggles = document.querySelector("model-viewer");
        const goggles = document.querySelector('img')
        console.log(goggles);
        const video = document.querySelector("video");
        if (resizedDetections.length > 0) {
          const faceLandmarks = resizedDetections[0].landmarks;
          // goggles.style.zIndex = 1;
          // console.log(goggles)

          // Get the points around the eyes
          const leftEye = faceLandmarks.getLeftEye();
          const rightEye = faceLandmarks.getRightEye();

          // Log the positions of the eye landmarks
          let videoLeft, videoTop
          if(video){
            videoLeft = video.getBoundingClientRect().left;
            videoTop = video.getBoundingClientRect().top;
          }
          const header = document.querySelector('.main-header')
        const headerHeight = header.getBoundingClientRect().height;
          console.log("Left eye landmarks:", leftEye);
          console.log("Right eye landmarks:", rightEye);
          const x1 = leftEye[0]._x; // Starting x-coordinate of left eye
          const x2 = rightEye[rightEye.length - 1]._x; // Ending x-coordinate of right eye
          // const y2 = rightEye[0]._y;
          const y1 = Math.min(leftEye[0]._y, rightEye[0]._y); // Top-most y-coordinate of eyes

          const width = x2 - x1; // Calculate the width of the goggles overlay
          // console.log('height:', height)
          // console.log('x1:', x1)
          // console.log('x2:', x2)
          console.log("y1:", y1);
          // console.log('vt:', videoTop)
          // console.log('vl:', videoLeft)
          console.log(width);
          let toCut = width / 3;
          let oneFourth = width / 4;
          let half = width/2;
          console.log(oneFourth)
          let size = (width + width);
          if(goggles){
            goggles.style.height = `${(size/4)}px`; 
          goggles.style.width = `${size}px`;//+150
          goggles.style.top = `${(y1) + headerHeight - (oneFourth - 15)}px`; //y1-height
          goggles.style.left = `${x1 + videoLeft - (toCut + 5)}px`;
          }
          // goggles.style.transform = `rotate(${y2-y1}px)`
        } else {
          if(goggles){
          goggles.style.top = '-360px'
          }
        }
        // canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        // canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        // canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 16);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const handleVideoLoadedMetadata = () => {
    handleVideoOnPlay();
  };

  return (
    <div className="main-container" >
      {captureVideo && modelsLoaded &&
        <div className="model-container-eye">
          <img  src={`data:image/png;base64,${currProduct?.img.toString("base64")}`} alt="" />
        </div>
      }
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                // onPlay={handleVideoOnPlay}
                onLoadedMetadata={handleVideoLoadedMetadata}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute"}} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        {captureVideo && modelsLoaded ? (
          <button
            onClick={closeWebcam}
            style={{
              cursor: "pointer",
              backgroundColor: "#8e2de2",
              color: "white",
              padding: "15px",
              fontSize: "17px",
              border: "none",
            }}
          >
            CLOSE WEBCAM
          </button>
        ) : (
          <button
            onClick={startVideo}
            style={{
              cursor: "pointer",
              backgroundColor: "#8e2de2",
              color: "white",
              padding: "15px",
              fontSize: "17px",
              border: "none",
            }}
          >
            OPEN WEBCAM
          </button>
        )}
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "#8e2de2",
            color: "white",
            padding: "15px",
            gap: "5px",
            fontSize: "17px",
            border: "none",
          }}
          onClick={(e) => handleAddToCart(e)}
        >
          <BsCartPlus size={17} />
          {isPresent ? "GO TO CART" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

FaceView.prototype = {
  handleAddToCart: PropTypes.func.isRequired,
  currProduct: PropTypes.object.isRequired,
  isPresent: PropTypes.bool.isRequired,
};

export default FaceView;
