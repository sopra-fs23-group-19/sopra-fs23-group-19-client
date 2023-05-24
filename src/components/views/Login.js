import React, { useState } from "react";
import { api, handleError, handleNotLogInError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats1.png";
import hidePwdIcon from "styles/images/svg/hide-password.svg";
import showPwdIcon from "styles/images/svg/show-password.svg";

const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        maxLength="25"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Login = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [notification, setNotification] = useState("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api().post("/users/login", requestBody);

      // Get the returned user and update a new object.
      // Store the token into the local storage.
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/welcome`);
    } catch (error) {
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      } else {
        setNotification("You have entered wrong username or password.");
      }
    }
  };


  const goToRegister = async () => {
    try {
      history.push(`/register`);
    } catch (error) {
      alert(
        `Something went wrong when going to register page: \n${handleError(
          error
        )}`
      );
    }
  };

  const ShowAndHidePassword = () => {
    return (
      <div className="password wrapper">
        <label className="profile label">{"Password"}</label>
        <input
          className="password input"
          type={isShowPwd ? "text" : "password"}
          value={password}
          maxLength="30"
          onChange={(e) => {
            setPassword(e.target.value);
            setNotification("");
          }}
        />
        <img
          className="password icon"
          alt=""
          src={isShowPwd ? showPwdIcon : hidePwdIcon}
          onClick={() => setIsShowPwd((prevState) => !prevState)}
        />
      </div>
    );
  };


  return (
    <div className="login main-container">
      <div className="login pic-container">
        <div className="login pic">
          <img src={cats} alt="" />
        </div>
        <div className="login title">
          <div class="login writing-letters">
            <span>D</span>
            <span>r</span>
            <span>a</span>
            <span>w</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>&</span>
            <span>G</span>
            <span>u</span>
            <span>e</span>
            <span>s</span>
            <span>s</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </div>
        </div>
      </div>

      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un) => {
              setUsername(un);
              setNotification("");
            }}
          />
          {ShowAndHidePassword()}
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
          <label style={{ color: "red" }}>{notification}</label>
          <div className="login button-container">
            <div style={{ "margin-right": "40px" }}>
              Do not have an account?
            </div>
            <div
              style={{ color: "#60669F", textDecorationLine: "underline" }}
              onClick={() => goToRegister()}
            >
              Register Now!!!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
