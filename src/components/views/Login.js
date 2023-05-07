import React, { useState } from "react";
import { api, handleError } from "helpers/api";
// import User from "models/User";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats1.png";

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
      alert(`Something went wrong during the login: \n${handleError(error)}`);
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

  // const doTest = async () => {
  //   history.push("/lobby");
  // };

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
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={(n) => setPassword(n)}
          />
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
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
