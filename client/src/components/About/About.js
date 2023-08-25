import React from "react";
import "./About.scss";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();
  const handleGitHub = () => {
    const link = "https://github.com/adarshKhedekar";
    window.location.href = link;
  };
  const handleLinkedIn = () => {
    const link = "https://www.linkedin.com/in/adarsh-khedekar-771b01216/";
    window.location.href = link;
  };
  return (
    <div className="about-container">
      <div className="img-container">
        <img src={`${process.env.PUBLIC_URL}/about/bg.jpg`} alt="" />
      </div>
      <div className="text-container">
        <span>
          Experience style and safety with WeARit! We invite you to try on our
          trendy collection of glasses and face masks virtually, allowing you to
          find the perfect fit for your unique look from the comfort of your
          home. Our virtual try-on feature empowers you to embrace both
          effortlessly.
        </span>
        <div className="profiles">
          <AiFillGithub size={40} onClick={handleGitHub} />
          <AiFillLinkedin size={40} onClick={handleLinkedIn} />
        </div>
        <button onClick={() => navigate('/')}> Shop Now</button>
      </div>
    </div>
  );
}

export default About;
