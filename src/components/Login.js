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
        'Accept': '*/*',
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
export default Login;