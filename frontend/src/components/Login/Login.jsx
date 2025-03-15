import React from "react";
import { useState } from "react";
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, signup } from "../../service/Api";

const Login = () => {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [savedCredentials, setSavedCredentials] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async () => {
      try {
        await signup({ username, email, password })
          .then((response) =>{
            console.log("Signup successful:", response.data);
            alert("Sign-up successful! Please log in.");

            setSavedCredentials({ username, password });
            setAction("Login");
          })
          .catch((error) => {
            console.error("Username exists:", error);
            alert("Username exists");
          })
      } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed!");
      }
    }

    const handleLogin = async () => {
       try {
            const data = await login({username, password});
            if (data) {
                localStorage.setItem("jwtToken", data);
                console.log("User is logged in successfully");
                navigate("/dashboard");
            } else {
                alert("Authentication failed!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed!");
        }
    }

    const toggleAction = () => {
      if (action === "Sign Up") {
          setAction("Login");
          if (savedCredentials) {
              setUsername(savedCredentials.username);
              setPassword(savedCredentials.password);
          }
      } else {
          setAction("Sign Up");
          setUsername("");
          setEmail("");
          setPassword("");
          setSavedCredentials(null);
      }
  };

    return (
      <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline">
        </div>
        <div className="inputs">
          <div className="input">
            <FaUser />
            <input 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
          </div>
          {action==="Login"?<div></div> :
            <div className="input">
            <FaEnvelope />
            <input 
              type="email" 
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>}
          <div className="input">
            <FaKey />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
      </div>
      {action==="Login" ? <div className="forgot-password">Forgot Password? <span>Click here</span></div>: <div></div>}
      <div className="submit-container">
                {action === "Sign Up" ? (
                    <div className="submit" onClick={handleSignup}>Sign Up</div>
                ) : (
                    <div className="submit" onClick={handleLogin}>Login</div>
                )}
                <div className="submit gray" onClick={toggleAction}>
                    {action === "Sign Up" ? "Login" : "Sign Up"}
                </div>
            </div>
    </div>
    )
  };

export default Login;
