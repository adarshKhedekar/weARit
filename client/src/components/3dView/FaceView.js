import * as faceapi from "face-api.js";
import React from "react";
import { BsCartPlus } from "react-icons/bs"
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
        const mask = document.querySelector("img");
        console.log(mask);
        const video = document.querySelector("video");
        const header = document.querySelector('.main-header')
        const headerHeight = header.getBoundingClientRect().height;
        if (resizedDetections.length > 0) {
          const faceLandmarks = resizedDetections[0].landmarks;
          // console.log(goggles)

          let videoLeft, videoTop;
          if (video) {
            videoLeft = video.getBoundingClientRect().left;
            videoTop = video.getBoundingClientRect().top;
          }
          const jaw = faceLandmarks.getJawOutline();

          // Calculate the width, height, top, and left positions of the mask
          const jawLeftX = Math.min(...jaw.map((point) => point._x));
          const jawRightX = Math.max(...jaw.map((point) => point._x));
          const jawTopY = Math.min(...jaw.map((point) => point._y));
          const jawBottomY = Math.max(...jaw.map((point) => point._y));

          const maskWidth = jawRightX - jawLeftX;
          const maskHeight = jawBottomY - jawTopY;
          if(mask){
            mask.style.width = `${maskWidth}px`;
            mask.style.height = `${maskHeight}px`;
            mask.style.left = `${(jawLeftX + videoLeft)}px`;
            mask.style.top = `${(jawTopY + headerHeight + 25)}px`;
          }
        } else {
            if(mask){
                mask.style.top = "-360px";
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
        <div className="model-container-face">
            <img src={`data:image/png;base64,${currProduct?.img.toString("base64")}`} alt="" />
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
