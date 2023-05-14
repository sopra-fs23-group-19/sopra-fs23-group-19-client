import React, { useState } from "react";
import { api, handleError, handleNotLogInError } from "helpers/api";
// import User from "models/User";
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

const Login = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [notification, setNotification] = useState("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      // const response = await api.post('/users', requestBody);
      const response = await api().post("/users/login", requestBody);
      // Get the returned user and update a new object.
      // const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", response.data.token);
      // console.log(response.data.token);
      // console.log("response.data.token");
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);
      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/welcome`);
    } catch (error) {
      // alert(`Something went wrong during the login: \n${handleError(error)}`);
      // setNotification(handleError(error));
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        setNotification("You have entered wrong username or password.");
      }
    }
  };

  // useEffect(() => {
  //   getImage();
  // }, [notification]);

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

  // const doTest = async () => {
  //   history.push("/lobby");
  // };

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
              onClick={() => doLogin()}
            >
              Login
            </Button>
            {/* <Button onClick={() => doTest()}>Test</Button> */}
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
