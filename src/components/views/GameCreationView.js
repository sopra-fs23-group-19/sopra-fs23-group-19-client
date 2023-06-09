import React from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Header.scss";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { useState } from "react";
import cat_left from "styles/images/cat_left.png";
import cat_brown from "styles/images/cat_brown.png";
import "styles/views/GameCreationView.scss";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer";

const FormField = (props) => {
  return (
    <div className="GameCreationView field">
      <label className="GameCreationView label">{props.label}</label>
      <input
        className="GameCreationView input"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        maxLength="30"
      />
    </div>
  );
};
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const GameCreationView = () => {
  const history = useHistory();
  const backToLobby = () => {
    history.push(`/lobby`);
  };

  const [roomName, setRoomName] = useState("");
  const [mode, setMode] = useState(2);
  const [selected, setSelected] = useState(2);
  const currentId = localStorage.getItem("id");

  const changeColor = (btn) => {
    setSelected(btn);
    setMode(btn);
  };
  const notify = (message) => {
    toast.error(message);
  };
  //create game:
  //call API to create a room
  const proceedToWait = async () => {
    const requestBody = JSON.stringify({
      roomName: roomName,
      mode: mode,
      ownerId: currentId,
    });

    try {
      const response = await api().post(`/rooms`, requestBody);
      const roomId = response.data.id;
      history.push(`/waiting/${roomId}`);
    } catch (error) {
      const error_str = handleError(error);

      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      } else if (
        error_str["status"] == 401 &&
        error_str["message"].includes("log in with correct credentials")
      ) {
        notify(
          "Please register a new account or log in with correct credentials."
        );
        localStorage.removeItem("token");
      } else {
        notify(error_str["message"]);
      }
    }
  };

  const gameSettingForm = () => {
    const content = (
      <div className="GameCreationView container">
        <div className="wrapper">
          <img className="iconTop" src={cat_brown} />
        </div>
        <div className="GameCreationView form">
          <FormField
            label="Room Name"
            value={roomName}
            onChange={(un) => setRoomName(un)}
          />

          <label className="GameCreationView label">{"Mode"}</label>

          <div className="GameCreationView button-container">
            <Button
              onClick={() => changeColor(2)}
              className={selected === 2 ? "selected" : "notSelected"}
            >
              2 Players
            </Button>

            <Button
              onClick={() => changeColor(4)}
              className={selected === 4 ? "selected" : "notSelected"}
            >
              4 Players
            </Button>
          </div>
          <div className="GameCreationView button-container">
            <Button
              onClick={() => backToLobby()}
              className="GameCreationView button_style1"
            >
              Back
            </Button>
            <Button
              disabled={roomName.trim().length === 0}
              onClick={() => proceedToWait()}
              className="GameCreationView button_style1"
            >
              Create
            </Button>
          </div>
          <div className="wrapper">
            <img className="icon" src={cat_left} />
          </div>
        </div>
      </div>
    );

    return content;
  };

  return (
    <div>
      <Header />
      <BgmPlayer />
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <div className="GameCreationView content-container">
        <div className="GameCreationView pic">
          <img
            src={cats}
            alt="welcome background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        <div>{gameSettingForm()}</div>
      </div>
    </div>
  );
};
export default GameCreationView;
