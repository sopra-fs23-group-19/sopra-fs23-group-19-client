import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "helpers/api";
import "styles/views/WaitingArea.scss";
import Socket from "socket/socket";
import BaseContainer from "components/ui/BaseContainer";
// import { io } from "socket.io-client";

import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import PropTypes from "prop-types";

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
const WaitingArea = () => {
  // console.log("useparams");
  // console.log(useParams().gameId);
  const roomId = useParams().gameId;
  //   const [playerIds, setPlayerIds] = useState([]); //player id and player username needed
  //   const [playerNames, setPlayerNames] = useState(null); //player id and player username needed
  const [playerCount, setPlayerCount] = useState(1); //current number of players
  const [roomSeats, setRoomSeats] = useState(2); //default 2 persons?
  const [ownerId, setOwnerId] = useState(null);
  const history = useHistory();
  const [playerNames, setPlayerNames] = useState([{ id: "", username: "" }]);
  const [roomName, setRoomName] = useState("");

  //   const [isPolling, setIsPolling] = useState(true); //NOTE - for pausing the polling
  // const curSocket = socket();
  // const URL = getDomain();
  // const str_URL = URL + "/waitingArea";
  // const waitSocket = io(str_URL, {
  //   transports: ["websocket", "polling"], // use WebSocket first, if available
  //   extraHeaders: {
  //     authToken: localStorage.getItem("token"),
  //   },
  // });
  const fetchRoomInfo = async () => {
    try {
      // const response = await api().get("/games/waitingArea/" + roomId);

      // waitSocket.emit("getWaitingInfo", roomId);
      // waitSocket.on("getWaitingInfo", (arg) => {
      //   console.log(arg); // world
      // });

      const response = {
        numOfPlayers: 2,
        roomName: "room1",
        listOfPlayerNames: [
          { id: 1, username: "Alabama" },
          { id: 2, username: "Georgia1" },
        ],
        ownerId: 1,
        roomSeats: 4,
      };
      setPlayerCount(response.numOfPlayers);
      setRoomName(response.roomName);
      const temp = response.listOfPlayerNames;
      console.log(temp);
      setPlayerNames(temp);
      //   setPlayerIds(response.listOfPlayerIds);
      setOwnerId(response.ownerId);
      setRoomSeats(response.roomSeats);
    } catch (error) {
      alert(
        `Something went wrong during get user profile: \n${handleError(error)}`
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await api().get("/games/waitingArea/" + roomId);

        // waitSocket.emit("getWaitingInfo", roomId);
        // waitSocket.on("getWaitingInfo", (arg) => {
        //   console.log(arg); // world
        // });

        const response = {
          numOfPlayers: 2,
          roomName: "room1",
          listOfPlayerNames: [
            { id: 1, username: "Alabama" },
            { id: 2, username: "Georgia1" },
          ],
          ownerId: 1,
          roomSeats: 4,
        };
        setPlayerCount(response.numOfPlayers);
        setRoomName(response.roomName);
        const temp = response.listOfPlayerNames;
        console.log(temp);
        setPlayerNames(temp);
        //   setPlayerIds(response.listOfPlayerIds);
        setOwnerId(response.ownerId);
        setRoomSeats(response.roomSeats);
        // console.log(playerNames[0]);
        //   if (playerCount === 4) {
        //     // await new Promise((resolve) => setTimeout(resolve, 3000));
        //     history.push(`/game/${gameId}`);
        //   }
      } catch (error) {
        alert(
          `Something went wrong during get user profile: \n${handleError(
            error
          )}`
        );
      }
    }
    fetchData();
  }, []);

  //   useInterval(
  //     async () => {
  //       getPlayerCount();
  //     },
  //     isPolling ? 1000 : null
  //   ); //NOTE - for pausing the polling

  const onMessage = (msg) => {
    console.log(msg);
    console.log("receive message");
    fetchRoomInfo();
  };

  const leaveRoom = async () => {
    try {
      const requestBody = JSON.stringify({
        id: roomId,
      });
      await api().put("/games/waitingArea", requestBody); //leave waiting area
      history.push("/lobby");
    } catch (error) {
      alert(
        `Something went wrong during get user profile: \n${handleError(error)}`
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };

  const joinRoom = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: localStorage.getItem("id"),
        roomId: roomId,
      });
      console.log(requestBody);
      await api().put("/games/join", requestBody); //leave waiting area
    } catch (error) {
      alert(`Something went wrong during join room: \n${handleError(error)}`);
      // history.push("/lobby"); // redirect back to lobby
    }
  };
  const startGame = async () => {
    try {
      await api().post(`/gameRounds/${roomId}`);
      history.push("/lobby"); // should be changed later
    } catch (error) {
      alert(`Something went wrong during start game: \n${handleError(error)}`);
      history.push("/lobby"); // redirect back to lobby
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
  // const barStyle = "waitingArea bar b" + playerCount;

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
    console.log(roomId);
    console.log("rommId");
    userChoiceArea =
      playerCount === roomSeats ? (
        parseInt(localStorage.getItem("id")) === parseInt(ownerId) ? (
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
          {playerNames.map((user) => (
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
        <div>
          {/* <Button
            width="100%"
            className="waitingArea button_style1"
            onClick={() => createGame()}
          >
            create
          </Button> */}
          <Button
            width="100%"
            className="waitingArea button_style1"
            onClick={() => joinRoom()}
          >
            Join
          </Button>
        </div>
      </div>
    );
  }

  return (
    <BaseContainer>
      <Header />
      <div
        className="lobby pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <div>
        <Socket
          topics={`/waiting/${localStorage.getItem("id")}`}
          onMessage={onMessage}
        />
      </div>
      {content}
    </BaseContainer>
  );
};

export default WaitingArea;
