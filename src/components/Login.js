import React from "react";
import Background from "./Background";
import "./Login.css";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const Login = () => {

  const history = useHistory();

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="form">
          <h1 className="sign-in-heading">Sign In.</h1>
          <p className="sign-in-info">
            Login with your data that you entered during your registration
          </p>

          <div className="label-input">
            <label className="form-label">Enter your username</label>
            <input className="form-input" placeholder="username" />

            <label className="form-label">Enter your password</label>
            <input
              type="password"
              className="form-input"
              placeholder="atleast 8 characters"
            />
          </div>

          <button onClick={()=> {
            history.push("/ewb-expiring-today")
          }} className="form-btn">Login</button>

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

        {/* image */}
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
  );
};

export default Login;
