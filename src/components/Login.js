import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import { SERVER_URL } from "../config/config";
import Popup from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";
import "./popup.css";

async function loginUser(credentials) {
  // https://run.mocky.io/v3/702e0d64-e1eb-4c63-b071-e4ad3e15acfc
  return fetch(SERVER_URL + "/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
      Connection: "keep-alive",
    },
    body: new URLSearchParams(credentials),
  }).then((data) => data.json());
}

export default function Login({ sessionObject }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [pageMode, setPageMode] = useState("");
  const [popupError, setPopupError] = useState("");

  let refStoreObject = useRef({});

  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
  };

  console.log("SESSION", sessionObject);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == null || password == null) {
      return;
    }
    let resp = await loginUser({
      username,
      password: password.toLowerCase(),
    });

    // if ("detail" in resp && resp.detail == "Exeption in login api"){
    //   setPageMode("error");
    //   setPopupError("Invalid credentials");
    // }

    if (resp.status_code == 401) {
      setPageMode("error");
      setPopupError("Invalid credentials");
    } else if (resp.access_token) {
      localStorage.setItem("login",resp.access_token)
      navigate("/ewb-expiring-today");
    }

    // let response = await fetch("localhost:5000/user_validation");
    // let val_resp = await response.json();

    // Response manipulation
    resp.branch_id = null;
    resp.branch_name = null;

    console.log("responsecvbn", resp);

    // sessionObject.saveSessionVariableByObject(resp);
    // console.log("SESSION OBJ",sessionObject)
  };

  useEffect(
    // Effect for clearing out client side validation
    () => {
      refStoreObject.current["username"].focus();
    },
    []
  );

  return (
    <div className="login-wrapper">
      <Popup
        open={pageMode == "error"}
        modal
        contentStyle={contentStyle}
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className="pop-up-container">
            <div className="pop-up-header">
              {" "}
              {<div>Error Logging In</div>}
              <div>
                <a className="pop-up-close" onClick={close}>
                  &times;
                </a>
              </div>
            </div>
            {
              <div className="pop-up-content">
                <br />
                <div className="pop-up-fields">
                  <div className="pop-up-field">
                    <div className="pop-up-field-value">{popupError}</div>
                  </div>
                </div>
              </div>
            }
            <div className="pop-up-actions">
              <button
                className="pop-up-button"
                onClick={() => {
                  close();
                  setPageMode("");
                }}
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </Popup>
      <div>
        <div className="login-content">
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="sign-in-heading">Sign In.</h1>
            <p className="sign-in-info">
              Login with your data that you entered during your registration
            </p>

            <div className="label-input">
              <label className="form-label">Enter your username</label>
              <input
                className="form-input"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                ref={(a) => (refStoreObject.current.username = a)}
                onKeyPress={(a) => {
                  if (a.key == "Enter") {
                    a.preventDefault();
                    refStoreObject.current.password.focus();
                  }
                }}
                placeholder="username"
              />

              <label className="form-label">Enter your password</label>
              <input
                type="password"
                className="form-input"
                placeholder="atleast 8 characters"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                ref={(a) => (refStoreObject.current.password = a)}
                onKeyPress={(a) => {
                  if (a.key == "Enter") {
                    a.preventDefault();
                    refStoreObject.current.save_button.focus();
                  }
                }}
              />
            </div>

            <button
              className="form-btn"
              ref={(a) => (refStoreObject.current.save_button = a)}
            >
              Login
            </button>

            <div className="form-footer">
              <label className="form-checkbox">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/" className="form-link">
                Forgot password?
              </Link>
            </div>
          </form>

          {/* image */}
          <div className="image-box">
            <img
              className="login-image"
              src="assets/new.png"
              alt="image of a truck"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
/*
import React, {Component} from "react";
import Background from "./Background";
import "./Login.css";
import { json, Link, useNavigate } from 'react-router-dom';
import { token } from "../config/config";
class Temp extends Component {
  constructor() {
    super();
    this.state={
      username:null,
      password:null,
      login:false,
      store:null
    }
  }
  login() {
    fetch("/auth/login/", {
      method:"POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': '**',
        'Connection':'keep-alive'
      },
      body: new URLSearchParams(this.state)
    }).then((response)=>{
      response.json().then((result)=>{
        console.warn("result",result)
        localStorage.setItem('login',JSON.stringify({
          is_login:true,
          store:result.access_token
        }))
        const x=JSON.parse(localStorage.getItem('login'))
        if(!x.is_login) {
          this.setState({login:false})
          this.props.navigate("/")
        }
        else
          this.setState({login:true})
      })
    })
  }
  render() {

  return (
    <div className="login-page"> 
    { 
    !this.state.login ?
    <div>
      <div className="login-content">
        <div className="form">
          <h1 className="sign-in-heading">Sign In.</h1>
          <p className="sign-in-info">
            Login with your data that you entered during your registration
          </p>

          <div className="label-input">
            <label className="form-label">Enter your username</label>
            <input className="form-input" onChange={(e)=>{this.setState({username:e.target.value})}} placeholder="username" />

            <label className="form-label">Enter your password</label>
            <input
              type="password"
              className="form-input"
              placeholder="atleast 8 characters"
              onChange={(e)=>{this.setState({password:e.target.value})}}
            />
          </div>

          <button className="form-btn" onClick={()=>{this.login()}}>Login</button>

          <div className="form-footer">
            <label className="form-checkbox">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to = '/' className="form-link">
              Forgot password?
            </Link>
          </div>
        </div>

        {/* image }
        <div className="image-box">
          <img
            className="login-image"
            src="assets/new.png"
            alt="image of a truck"
          />
        </div>
      </div>
      <Background />
      </div>
      :
        this.props.navigate("/ewb-expiring-today")
      
    }
    </div>
  );
  }
};
function Login(props) {
  var navigate = useNavigate();
  return <Temp {...props} navigate={navigate} />
}
export default Login;*/