import * as faceapi from "face-api.js";
import React, { useContext, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import Model from "./Model";
import './View.scss'
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../utils/context";
import { Buffer } from "buffer";

function View() {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [isPresent, setIsPresent] = useState(false);
  const {popularProducts, addToCart, userId, cartItems, setShowCart} = useContext(Context);
  const [currProduct, setCurrProduct] = useState(null);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = `${process.env.PUBLIC_URL}/weights`;//../weights

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    const foundProduct = cartItems?.findIndex(item => item.productName === productName);

    if(foundProduct === -1){
      console.log('not')
      setIsPresent(false);
    }else{
      console.log('yes')
      setIsPresent(true)
    }
    const singleProduct = popularProducts?.find(
      (item) => {
        return item.productName === productName
      }
    );

    if(singleProduct){
      const { productDescription, category, price, image } = singleProduct;
      const imageBuffer = Buffer.from(image);
      setCurrProduct({productName: productName, productDescription: productDescription, category: category, price: price, img: imageBuffer})
    }

    loadModels();
  }, [productName, cartItems, isPresent, popularProducts]);

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

  const handleAddToCart = async (e) => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if(e.target.innerText === 'GO TO CART'){
      setShowCart(true);
      return;
    }
    try {
      addToCart(currProduct, 1);
      toast.success("Item added to Cart successfully");
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
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
            const goggles = document.querySelector("model-viewer");
            console.log(goggles)
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
          let size = (width + width + toCut);
          goggles.style.height = `${size}px`; 
          goggles.style.width = `${size}px`;//+150
          goggles.style.top = `${(y1) - half}px`; //y1-height
          goggles.style.left = `${x1 + videoLeft - (toCut + 15)}px`;
          // goggles.style.transform = `rotate(${y2-y1}px)`
        } else {
          goggles.style.top = '-360px'
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

  return (
    <div className="main-container">
      <ToastContainer/>
      {captureVideo && modelsLoaded && <Model category={currProduct.category} productName={productName}/>}
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
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
      <div style={{display: 'flex', gap:'15px', justifyContent: 'center', margin: '20px'}}>
        {captureVideo && modelsLoaded ? (
          <button
            onClick={closeWebcam}
            style={{
              cursor: "pointer",
              backgroundColor: "#8e2de2",
              color: "white",
              padding: "15px",
              fontSize: "20px",
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
              fontSize: "20px",
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
              gap:'5px',
              fontSize: "20px",
              border: "none",
            }}
            onClick={handleAddToCart}
          >
            <BsCartPlus size={20} />
            {isPresent ? "GO TO CART" : "ADD TO CART"}
          </button>
      </div>
    </div>
  );
}

export default View;
