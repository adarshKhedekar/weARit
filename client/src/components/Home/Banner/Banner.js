import { useState } from "react";
import "./Banner.scss";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
//YOU CAN SEE THE LINK ON THE CHROME AND ALSO THINK THAT TRY APPYLING ONE OR TWO DOTS
function Banner() {
  const images = [
    `${process.env.PUBLIC_URL}/Slider/image1.jpg`,
    `${process.env.PUBLIC_URL}/Slider/image2.jpg`,
    `${process.env.PUBLIC_URL}/Slider/image3.jpg`,
    `${process.env.PUBLIC_URL}/Slider/image4.jpg`,
    `${process.env.PUBLIC_URL}/Slider/image5.jpg`
    // "./Slider/image2.jpg",
    // "./Slider/image3.jpg",
    // "./Slider/image4.jpg",
    // "./Slider/image5.jpg",
  ];
  const [imageNo, setImageNo] = useState(0);

  const handlePrev = () => {
    let prev = imageNo === 0 ? images.length - 1 : imageNo - 1;
    setImageNo(prev);
  };

  const handleNext = () => {
    let next = imageNo === images.length - 1 ? 0 : imageNo + 1;
    setImageNo(next);
  };

  function handleClick(e){
    let imgNo = parseInt(e.target.classList[1].split('-')[1]);
    setImageNo(imgNo)
  }

  return (
    <div className="hero-banner">
      <div className="content">
        {/* yaha pe thoda path alag lag rah hogo but hamara browser index.html se dhundega ki woh image kaha hai after all ye sab root div main hi jane wala hai :) */}
        <span className="left" onClick={handlePrev}>
          <BiLeftArrowAlt />
        </span>
        <span className="right" onClick={handleNext}>
          <BiRightArrowAlt />
        </span>
        <img className="content-image" src={images[imageNo]} alt=""></img>
        <div className="dots">
          {images.map((image, index) => {
            return <div key={index} className={`dot image-${index} ${imageNo === index ? 'active' : ''}`} onClick={handleClick}></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Banner;
