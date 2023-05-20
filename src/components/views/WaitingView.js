import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "helpers/api";
import "styles/views/WaitingView.scss";
import BaseContainer from "components/ui/BaseContainer";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import cats from "styles/images/cats2.png";
import waitingbackground from "styles/images/waitingRoom.jpg";
import PropTypes from "prop-types";
import { useInterval } from "helpers/hooks";
import WaitRoom from "models/WaitRoom";
import HeaderInGame from "components/views/HeaderInGame";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BgmPlayer from "components/ui/BgmPlayer";

const Player = ({ user }) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object,
};

const Friends = ({ userId, roomId, friend }) => {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);
  const [notification, setNotification] = useState("");

  // invite friend to game
  const inviteFriend = async () => {
    const requestBody = JSON.stringify({
      useridFrom: userId,
      useridTo: friend.id,
      roomId: roomId,
    });
    try {
      await api().post(`/notification/game`, requestBody);
      setIsDisabled(true);
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
        setNotification(error_str["message"]);
      }
    }
  };

  return (
    <div className="waitingArea notice-container">
      <div className="waitingArea text-container">{friend.id}</div>
      <div className="waitingArea text-container">{friend.username}</div>
      <div className="waitingArea text-container">{friend.status}</div>
      <div className="waitingArea button-container2">
        <Button
          onClick={() => inviteFriend()}
          style={{
            "background-color": "#FFFFFF",
            border: "2px solid #000000",
            "min-width": "100px",
            "font-family": "Josefin Sans",
          }}
          disabled={isDisabled}
        >
          Invite
        </Button>
        <label style={{ color: "red" }}>{notification}</label>
      </div>
    </div>
  );
};

const WaitingView = () => {
  const { roomId } = useParams();

  localStorage.setItem("gameId", roomId);
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
  const [friends, setFriends] = useState(null);

  const notify = (message) => {
    toast.error(message);
  };
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
      if (turnId0 != null) {
        setStartTurnId(turnId0);
      }

      if (status == "END") {
        localStorage.removeItem("gameId");
        notify("The room owner ended this game!");
        history.push("/lobby");
      }
      if (status == "END_GAME") {
        localStorage.removeItem("gameId");
        notify("The game is already ended!");
        history.push("/lobby");
      }
      if (status == "PLAYING") {
        if (StartTurnId != null) {
          localStorage.setItem("gameId", startGameId);
          localStorage.setItem("intialTurnId", StartTurnId);
          goToGame(startGameId, StartTurnId);
        }
      }
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
        notify(error_str["message"]);
      }
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchRoomInfo().catch((error)=>{
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
  }, []);

  useInterval(
    async () => {
      fetchRoomInfo().catch((error)=>{
        const error_str = handleError(error);
        if (error_str["message"].match(/Network Error/)) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("username");
          localStorage.removeItem("gameId");
          localStorage.removeItem("intialTurnId");
          history.push(`/information`);
        }
      });
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
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      history.push("/lobby");
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
        notify(error_str["message"]);
      }
    }
  };
  const startGame = async () => {
    playOn();
    try {
      await api().post(`/games/waitingArea/${roomId}`);
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
        notify(error_str["message"]);
      }
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await api().get(`/users/returnFriends/${curUserId}`);
      setFriends(response.data);
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
        notify(error_str["message"]);
      }
    }
  };
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    fetchFriends().catch((error)=>{
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
  }, []);

  // display friends information
  let friendsContent = <SpinnerBouncing />;
  if (friends) {
    friendsContent = (
      <div>
        <div
          className="waitingArea container2"
          style={{ position: "relative", left: "0px", top: "0px" }}
        >
          <div className="waitingArea notice-container">
            <div className="waitingArea title-container">Friend Id</div>
            <div className="waitingArea title-container">Username</div>
            <div className="waitingArea title-container">Status</div>
          </div>
          <div className="waitingArea line"></div>
          {friends.map((friend) => (
            <Friends
              userId={curUserId}
              roomId={roomId}
              friend={friend}
              key={friend.id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    friendsContent = (
      <div>
        <div
          className="waitingArea container2"
          style={{ position: "relative", left: "0px", top: "0px" }}
        >
          <div className="waitingArea notice-container">
            <div className="waitingArea title-container">Friend Id</div>
            <div className="waitingArea title-container">Username</div>
            <div className="waitingArea title-container">Status</div>
          </div>
          <div className="waitingArea line"></div>
        </div>
      </div>
    );
  }

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
  };

  let content = <SpinnerBouncing />;
  let userChoiceArea = <SpinnerBouncing />;
  if (roomName !== "") {
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
        <div>
          <div
            className="waitingArea button-container"
            style={{ width: "30em", marginLeft: "70px" }}
          >
            <Button
              width="100%"
              className="waitingArea button_style1"
              onClick={() => leaveRoom()}
            >
              Leave
            </Button>
          </div>
          <h2 style={{ color: "black", marginLeft: "100px" }}>
            Invite friends to join this game!
          </h2>
          {friendsContent}
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
    <div>
      <HeaderInGame />
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
      <div className="waitingArea content-container">
        <div className="waitingArea pic">
          <img
            src={cats}
            alt="waiting background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        {content}
      </div>
    </div>
  );
};

export default WaitingView;
