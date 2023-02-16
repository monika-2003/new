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
    resp.username = username;

    sessionObject.saveSessionVariableByObject(resp);
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
            <div className="form-footer"><label className="form-label" style={{fontSize:15,display:"flex",flexDirection:"row",margin:0,alignItems:"flex-start"}}>New User?</label><Link to="/signup"
              className="form-link" style={{fontSize:15,display:"flex"}}
            >
              Register Now
            </Link></div>
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