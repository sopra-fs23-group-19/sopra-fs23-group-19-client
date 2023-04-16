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
const FormField = (props) => {
  return (
    <div className="GameCreationView field">
      <label className="GameCreationView label">{props.label}</label>
      <input
        className="GameCreationView input"
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
  //create game:
  //call API to create a room
  //
  const proceedToWait = async () => {
    const requestBody = JSON.stringify({
      owner: currentId,
      mode: mode,
      name: roomName,
    });

    console.log(requestBody);
    try {
      // console.log(visitId);
      const response = await api().post(`/games`, requestBody);
      const roomId = response.data.id;
      history.push(`/waiting/${roomId}`);
    } catch (error) {
      alert(
        `Something went wrong during creating Game: \n${handleError(error)}`
      );
    }
    // history.push(`/waiting/`);
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
              // className="GameCreationView button_style2"
              className={selected === 2 ? "selected" : "notSelected"}
            >
              2 Players
            </Button>

            {/* <OptionButton
              btnName1="2 Players"
              btnName2="4 Players"
              handleOption={handleOption}
            /> */}

            <Button
              // onClick={() => setMode(4)}
              onClick={() => changeColor(4)}
              // className="GameCreationView button_style2"
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
    <BaseContainer>
      <Header />
      <div
        className="GameCreationView pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <div>{gameSettingForm()}</div>
    </BaseContainer>
  );
};
export default GameCreationView;
