import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleNotLogInError } from "helpers/api";
import "styles/views/WaitingView.scss";
import BaseContainer from "components/ui/BaseContainer";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import cats from "styles/images/cats2.png";
import waitingbackground from "styles/images/waitingRoom.jpg";
// import Header from "components/views/Header";
import PropTypes from "prop-types";
import { useInterval } from "helpers/hooks";
import WaitRoom from "models/WaitRoom";
import HeaderInGame from "components/views/HeaderInGame";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";

const Player = ({ user }) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object,
};
const WaitingView = () => {
  const { roomId } = useParams();

  const [playerCount, setPlayerCount] = useState(1); //current number of players
  const [roomSeats, setRoomSeats] = useState(2); //default 2 persons?
  const [ownerId, setOwnerId] = useState(null);
  const [status, setStatus] = useState("");
  const history = useHistory();
  const curUserId = localStorage.getItem("id");

  const [players, setPlayers] = useState([{ id: "", username: "" }]);
  const [roomName, setRoomName] = useState("");
  const [startGameId, setStartGameId] = useState(roomId);
  const [StartTurnId, setStartTurnId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true);
  const [playOn] = useSound(btClick);
  const fetchRoomInfo = async () => {
    try {
      const response = await api().get(`/rooms/${roomId}`);

      const waitingRoom = new WaitRoom(response.data);

      setPlayerCount(waitingRoom.numberOfPlayers);
      setStatus(waitingRoom.status);
      setRoomName(waitingRoom.roomName);
      setRoomSeats(waitingRoom.roomSeats);
      setPlayers(waitingRoom.players);
      setOwnerId(waitingRoom.ownerId);

      const turnId0 = response.data.currentTurnId;
      setStartGameId(roomId);
      // console.log(gameId0);
      if (turnId0 != null) {
        setStartTurnId(turnId0);
      }

      if (status == "END") {
        history.push("/lobby");
      }
      if (status == "END_GAME") {
        history.push("/lobby");
      }
      if (status == "PLAYING") {
        if (StartTurnId != null) {
          // await new Promise((resolve) => setTimeout(resolve, 1000));
          localStorage.setItem("gameId", startGameId);
          localStorage.setItem("intialTurnId", StartTurnId);
          goToGame(startGameId, StartTurnId);
        }
      }
    } catch (error) {
      handleNotLogInError(history, error, "fetching waiting Area");
      setIsUpdating(false);
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchRoomInfo();
  }, []);

  useInterval(
    async () => {
      fetchRoomInfo();
    },
    isUpdating ? 1000 : null
  );

  const leaveRoom = async () => {
    playOn();
    try {
      const requestBody = JSON.stringify({
        roomId: roomId,
        userId: curUserId,
      });
      await api().put("/rooms/leave", requestBody); //leave waiting area
      history.push("/lobby");
    } catch (error) {
      handleNotLogInError(history, error, "leave waiting area");
    }
  };
  const startGame = async () => {
    playOn();
    try {
      await api().post(`/games/waitingArea/${roomId}`);
    } catch (error) {
      handleNotLogInError(history, error, "start game");
      // history.push("/lobby"); // redirect back to lobby
    }
  };

  const barStyles = {
    "1/4": 1,
    "2/4": 2,
    "3/4": 3,
    "4/4": 4,
    "1/2": 2,
    "2/2": 4,
  };
  const str_percent = playerCount.toString() + "/" + roomSeats.toString();
  const bar_id = barStyles[str_percent];
  const barStyle = "waitingArea bar b" + bar_id;

  const goToGame = (id, turnId0) => {
    history.push({
      pathname: `/game/${id}`,
      state: { turnId: turnId0 },
    });
    // history.push(`/game/${id}`);
  };

  let content = <SpinnerBouncing />;
  let userChoiceArea = <SpinnerBouncing />;
  //   const playerInfoBoard = <SpinnerBouncing />;
  if (roomName !== "") {
    userChoiceArea =
      playerCount === roomSeats ? (
        parseInt(localStorage.getItem("id")) === parseInt(ownerId) ? (
          // parseInt(curUserId) === parseInt(ownerId) ? (
          <div className="waitingArea button-container">
            <Button
              width="100%"
              className="waitingArea button_style1"
              onClick={() => startGame()}
            >
              Start Game!
            </Button>
          </div>
        ) : (
          <div className="waitingArea button-container">
            <label className="waitingArea label">Ready!</label>
          </div>
        )
      ) : (
        <div className="waitingArea button-container">
          <Button
            width="100%"
            className="waitingArea button_style1"
            onClick={() => leaveRoom()}
          >
            Leave
          </Button>
        </div>
      );
    content = (
      <div className="waitingArea container">
        <label className="waitingArea label">{roomName}</label>
        <div>
          {players.map((user) => (
            <Player user={user} key={user.id} />
          ))}
        </div>

        <SpinnerBouncing />

        <h2 className="waitingArea playerCountinfo">
          {playerCount}/{roomSeats}
        </h2>
        <div className="waitingArea progress">
          <div className={barStyle} />
        </div>

        <div>{userChoiceArea}</div>
      </div>
    );
  }
  //game page: user cannot leave game/log out, unless explicitly click a leave game button.
  return (
    <BaseContainer>
      <HeaderInGame />
      <div
        className="lobby pic"
        style={{ opacity: "50%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <div
        className="lobby pic"
        style={{
          opacity: "50%",
          left: "100px",
          top: "90px",
        }}
      >
        <img src={waitingbackground} alt="" />
      </div>
      {content}
    </BaseContainer>
  );
};

export default WaitingView;
