import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "helpers/api";
import "styles/views/WaitingView.scss";
import BaseContainer from "components/ui/BaseContainer";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import PropTypes from "prop-types";
import { useInterval } from "helpers/hooks";
import WaitRoom from "models/WaitRoom";

const Player = ({ user }) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
    {/* <div className="player name">{user.name}</div> */}
    {/* <div className="player id">id: {user.id}</div> */}
  </div>
);

Player.propTypes = {
  user: PropTypes.object,
};
const WaitingView = () => {
  const { roomId } = useParams();
  // console.log("wait");
  //   const [playerIds, setPlayerIds] = useState([]); //player id and player username needed
  //   const [playerNames, setPlayerNames] = useState(null); //player id and player username needed
  const [playerCount, setPlayerCount] = useState(1); //current number of players
  const [roomSeats, setRoomSeats] = useState(2); //default 2 persons?
  const [ownerId, setOwnerId] = useState(null);
  const [status, setStatus] = useState("");
  const history = useHistory();
  const curUserId = localStorage.getItem("id");
  // const curUserId = "1";
  const [players, setPlayers] = useState([{ id: "", username: "" }]);
  const [roomName, setRoomName] = useState("");
  const [startGameId, setStartGameId] = useState(null);
  const [StartTurnId, setStartTurnId] = useState(null);
  //   const [isPolling, setIsPolling] = useState(true); //NOTE - for pausing the polling

  const fetchRoomInfo = async () => {
    try {
      const response = await api().get(`/games/waitingArea/${roomId}`);
      console.log(response);
      const waitingRoom = new WaitRoom(response.data);
      console.log(waitingRoom);
      setPlayerCount(waitingRoom.numberOfPlayers);
      setStatus(waitingRoom.status);
      setRoomName(waitingRoom.roomName);
      setRoomSeats(waitingRoom.roomSeats);
      setPlayers(waitingRoom.players);
      setOwnerId(waitingRoom.ownerId);

      const gameId0 = response.data.gameId;
      const turnId0 = response.data.gameTurnId;
      console.log(gameId0);
      if (gameId0 != null) {
        setStartGameId(gameId0);
        setStartTurnId(turnId0);
      }
      // setPlayerCount(response.data.numberOfPlayers);
      // const response = {
      //   numOfPlayers: 2,
      //   roomName: "room1",
      //   listOfPlayerNames: [
      //     { id: 1, username: "Alabama" },
      //     { id: 2, username: "Georgia1" },
      //   ],
      //   // listOfPlayerIds: [1, 2],
      //   ownerId: 1,
      //   roomSeats: 2,
      //   status: "wait",
      // };
      // setPlayerCount(response.numOfPlayers);
      // setPlayerCount(playerCount + 1);
      // setRoomName(response.roomName);
      // const temp = response.listOfPlayerNames;
      // setPlayerNames(temp);
      //   setPlayerIds(response.listOfPlayerIds);
      // setOwnerId(response.ownerId);
      // setRoomSeats(response.roomSeats);
      // setStatus(response.status);

      if (status == "END") {
        history.push("/lobby");
      }
      if (status == "PLAYING") {
        if (startGameId != null) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          goToGame(startGameId, StartTurnId);
        }
      }
    } catch (error) {
      alert(
        `Something went wrong during get waiting room information: \n${handleError(
          error
        )}`
      );
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
    1000
    // status == "PLAYING" ? null : 1000
  );

  const leaveRoom = async () => {
    try {
      const requestBody = JSON.stringify({
        roomId: roomId,
        userId: curUserId,
      });
      await api().put("/games/leave", requestBody); //leave waiting area
      history.push("/lobby");
    } catch (error) {
      alert(
        `Something went wrong during leave waiting room: \n${handleError(
          error
        )}`
      );
      // history.push("/lobby"); // redirect back to lobby
    }
  };
  const startGame = async () => {
    try {
      await api().post(`/games/waitingArea/${roomId}`);
      // history.push(`/game/${roomId}`); // should be changed later
    } catch (error) {
      alert(
        `Something went wrong during starting game: \n${handleError(error)}`
      );
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
    // var names = ["Michael", "Brian", "John"];
    // playerInfoBoard = names.map((name) => <Player name={name} />);
    // playerInfoBoard = names.map(function (name) {
    //   return <Avatar {...stringAvatar(name)} />;
    // });
    // console.log(playerNames[1]);
    // var i;
    // for (i = 0; i < playerNames.length; i++) {
    //   playerInfoBoard.push(<Avatar {...stringAvatar(playerNames[i])} />);
    // }
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
        {/* <div>{playerInfoBoard}</div> */}
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
      {/* <Header /> */}
      <div
        className="lobby pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      {content}
    </BaseContainer>
  );
};

export default WaitingView;
