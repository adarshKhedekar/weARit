import { useState, useRef, useContext } from "react";
import "./Login.css";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showValidation, setShowValidation] = useState(false);
  const { setUserId, setUser } = useContext(Context);
  const navigate = useNavigate();

  const usernamePattern = /^[a-zA-Z0-9_]{6,10}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [isLogin, setIsLogin] = useState(true);
  const [passVisible, setIsVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      let email = e.target[0].value;
      let password = e.target[1].value;
      if (emailPattern.test(email) && passwordPattern.test(password)) {
          const userData = {email,password};
        try{
              const response = await fetch('http://localhost:5000/login',{
                  method: 'POST',
                  headers:{
                      "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
                
                const data = await response.json();
                console.log(data)
                if(data.userId){
                    const {userId, username} = data;
                    setUserId(userId);
                    setUser(username);
                    localStorage.setItem('user', JSON.stringify({username: username, id: userId}));
                    navigate(-1);
                }else{
                    toast.error(data.message)
                }
        }catch(err){
            console.error('Error:', err);
        }
      } else {
        toast.error("Wrong Credentials");
      }
    } else {
      let username = e.target[0].value;
      let email = e.target[1].value;
      let password = e.target[2].value;
      if (emailPattern.test(email) && passwordPattern.test(password) && usernamePattern.test(username)) {
          const userData = { username, email, password };
          
        try {
            const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            });
            
            const data = await response.json();
            console.log(data); // Response from the server
            if(data.newUserid){
                const {newUserid, newUsername} = data;
                setUserId(newUserid)
                setUser(newUsername);
                localStorage.setItem('user', JSON.stringify({username: newUsername, id: newUserid}));
                navigate(-1);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        toast.error('please check the validations')
        setShowValidation(true);
      }
    }

  };

  const handleNameChange = () => {
    let username = usernameRef.current.value;
    let div = document.querySelector(".user");

    if (!isLogin) {
      if (username.length === 0) {
        div.style.borderBottom = "3px solid grey";
      } else if (usernamePattern.test(username)) {
        div.style.borderBottom = "3px solid green";
      } else {
        div.style.borderBottom = "3px solid red";
      }
    }
  };

  const handleEmailChange = () => {
    let email = emailRef.current.value;
    let div = document.querySelector(".email");
    if (!isLogin) {
      if (email.length === 0) {
        div.style.borderBottom = "3px solid grey";
      } else if (emailPattern.test(email)) {
        div.style.borderBottom = "3px solid green";
      } else {
        div.style.borderBottom = "3px solid red";
      }
    }
  };

  const handlePasswordChange = () => {
    let password = passwordRef.current.value;
    let div = document.querySelector(".password");

    if (!isLogin) {
      if (password.length === 0) {
        div.style.borderBottom = "3px solid grey";
      } else if (passwordPattern.test(password)) {
        div.style.borderBottom = "3px solid green";
      } else {
        div.style.borderBottom = "3px solid red";
      }
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="authForm">
          <h1>{isLogin ? "Login" : "SignUp"}</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="mainForm">
              {!isLogin && (
                <div className="comp">
                  <label htmlFor="username">Username</label>
                  <div className="inputs user">
                    <AiOutlineUser className="logo" />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleNameChange}
                      ref={usernameRef}
                      placeholder="Type your name"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="comp">
                <label htmlFor="username">Email</label>
                <div className="inputs email">
                  <AiOutlineMail className="logo" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleEmailChange}
                    ref={emailRef}
                    placeholder="Type your email"
                    required
                  />
                </div>
              </div>
              <div className="comp">
                <label htmlFor="username">Password</label>
                <div className="inputs password">
                  <AiOutlineLock className="logo" />
                  <input
                    type={passVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    ref={passwordRef}
                    placeholder="Type your password"
                    required
                  />
                  {!passVisible && (
                    <AiOutlineEyeInvisible
                      className="logo"
                      onClick={handleVisibility}
                    />
                  )}
                  {passVisible && (
                    <AiOutlineEye className="logo" onClick={handleVisibility} />
                  )}
                </div>
              </div>
              {/* <span className="forgetp">Forgot Password?</span> */}
              <button type="submit" className="btn">
                {isLogin ? "Login" : "SignUp"}
              </button>
            </div>
          </form>
          {isLogin && (
            <p className="footer">
              Don&#39;t have an account?{" "}
              <span onClick={handleLoginClick}>SignUp</span>
            </p>
          )}
          {showValidation && <div className="validation">
            <ul>
                <li>Username must be alphanumeric. Characters[6-10]</li>
                <li>Password must contain atleast one uppercase letter, one lowercase letter, one special letter, one digit. Characters[8 or more]</li>
            </ul>
                </div>}
        </div>
      </div>
    </>
  );
}

export default Login;
