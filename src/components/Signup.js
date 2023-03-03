import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
//import "./Signup.css";
import PropTypes from "prop-types";
import { SERVER_URL } from "../config/config";
import Popup from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";
import "./popup.css";

async function signupUser(credentials) {
  return fetch(SERVER_URL + "/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Accept": "*/*",
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}

export default function Signup() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [mobileno, setMobileNo] = useState();
  //const [company, setCompany] = useState();
  const [pageMode, setPageMode] = useState("");
  const [popupError, setPopupError] = useState("");

  let refStoreObject = useRef({});

  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
  };

  const navigate = useNavigate();
  let user={
    "username":username,
    "password":password,
    "is_admin": 0,
    "company_id": 1,
    "mobile_no":mobileno,
    "mail_id":email
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password!==confirmpassword) {
      setPageMode("error");
      setPopupError("Passwords must match!");
    }
    let resp=fetch(SERVER_URL + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "*/*",
      },
      body: JSON.stringify({
        username:username,
        password:password,
        is_admin: 0,
        company_id: 1,
        mobile_no:mobileno,
        mail_id:email
      })
    }).then((data) => data.json());
    // if ("detail" in resp && resp.detail == "Exeption in signup api"){
    //   setPageMode("error");
    //   setPopupError("Invalid credentials");
    // }

    if (resp.status_code == 401) {
      setPageMode("error");
      setPopupError("Already Exists!");
    } else if (resp) {
      console.log(resp);
      navigate("/");
    }
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
            <h1 className="sign-in-heading">Sign Up.</h1>
            <p className="sign-in-info">
              Register with your data
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
                    refStoreObject.current.email.focus();
                  }
                }}
                placeholder="username"
              />

              <label className="form-label">Enter your email</label>
              <input
                className="form-input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                ref={(a) => (refStoreObject.current.email = a)}
                onKeyPress={(a) => {
                  if (a.key == "Enter") {
                    a.preventDefault();
                    refStoreObject.current.mobileno.focus();
                  }
                }}
                placeholder="email"
              />
             <label className="form-label">Enter your mobile number</label>
              <input
                className="form-input"
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
                ref={(a) => (refStoreObject.current.mobileno = a)}
                onKeyPress={(a) => {
                  if (a.key == "Enter") {
                    a.preventDefault();
                    refStoreObject.current.password.focus();
                  }
                }}
                placeholder="mobile number"
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
                    refStoreObject.current.confirmpassword.focus();
                  }
                }}
              />
              <label className="form-label">Confirm your password</label>
              <input
                type="password"
                className="form-input"
                placeholder="atleast 8 characters"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                ref={(a) => (refStoreObject.current.confirmpassword = a)}
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
              Signup
            </button>
            <div className="form-footer"><label className="form-label" style={{fontSize:15,display:"flex",flexDirection:"row",margin:0,alignItems:"flex-start"}}>Already User?</label><Link to="/"
              className="form-link" style={{fontSize:15,display:"flex"}}
            >
              Login Now
            </Link></div>
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

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};