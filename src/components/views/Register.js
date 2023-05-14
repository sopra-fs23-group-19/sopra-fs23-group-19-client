import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats1.png";
import hidePwdIcon from "styles/images/svg/hide-password.svg";
import showPwdIcon from "styles/images/svg/show-password.svg";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
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

const Register = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [notification, setNotification] = useState("");

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      await api().post("/users/register", requestBody);

      // Get the returned user and update a new object.
      // const user = new User(response.data);

      // Store the token into the local storage.
      await autoLoginAfterRegister(requestBody);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/welcome`);
    } catch (error) {
      // alert(
      //   `Something went wrong during the register: \n${handleError(error)}`
      // );
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else if (error_str["status"] == 409) {
        setNotification(
          "There exists a user with the username you have entered. Please enter another one."
        );
      } else {
        setNotification("You have entered wrong username or password.");
      }
    }
  };
  const autoLoginAfterRegister = async (credentials) => {
    try {
      // const requestBody = JSON.stringify({ username, password }); //edit by runze
      //login with username and password
      const response = await api().post("/users/login", credentials);
      // Get the returned user and update a new object.
      // const user = new User(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const goToLogin = async () => {
    try {
      history.push(`/login`);
    } catch (error) {
      alert(`Something went wrong when go to login: \n${handleError(error)}`);
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
          onChange={(e) => {
            setPassword(e.target.value);
            setNotification("");
          }}
          // onChange={(e) => setPwd(e.target.value)}
        />
        <img
          className="password icon"
          alt=""
          // title={isShowPwd ? "Hide password" : "Show password"}
          src={isShowPwd ? showPwdIcon : hidePwdIcon}
          onClick={() => setIsShowPwd((prevState) => !prevState)}
        />
      </div>
    );
  };

  return (
    <BaseContainer>
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
          {/* <FormField
            label="Password"
            value={password}
            onChange={(n) => setPassword(n)}
          /> */}
          {ShowAndHidePassword()}
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
          <label style={{ color: "red" }}>{notification}</label>
          <div className="login button-container">
            <div style={{ "margin-right": "40px" }}>
              Already have an account?
            </div>
            <div
              style={{ color: "#60669F", textDecorationLine: "underline" }}
              onClick={() => goToLogin()}
            >
              Back to the login page
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
