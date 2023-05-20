import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Header.scss";
import "styles/views/Notification.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Spinner } from "components/ui/Spinner";
import { useInterval } from "helpers/hooks";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer";

const Friends = ({ message }) => {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);
  const notify = (message) => {
    toast.error(message);
  };
  // accept add friend
  const acceptFriend = async (messageId) => {
    const requestBody = JSON.stringify({
      action: "AGREE",
    });
    try {
      await api().post(`/friends/${messageId}`, requestBody);
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
        notify(error_str["message"]);
      }
    }
  };

  // reject add friend
  const rejectFriend = async (messageId) => {
    const requestBody = JSON.stringify({
      action: "REJECT",
    });
    try {
      await api().post(`/friends/${messageId}`, requestBody);
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
        notify(error_str["message"]);
      }
    }
  };

  return (
    <div className="notification notice-container">
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <div className="notification content-container">{message.useridFrom}</div>
      <div className="notification content-container">
        {message.usernameFrom}
      </div>
      <div className="notification button-container">
        <Button onClick={() => acceptFriend(message.messageId)}
          disabled={isDisabled}
          style={{ "wordWrap": "break-word" }}
        >Accept</Button>
      </div>
      <div className="notification button-container">
        <Button onClick={() => rejectFriend(message.messageId)}
          disabled={isDisabled}
          style={{ "wordWrap": "break-word" }}
        >Reject</Button>
      </div>
    </div>
  );
};

const Rooms = ({ message }) => {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);
  const userId = localStorage.getItem("id");
  const notify = (message) => {
    toast.error(message);
  };
  // if accept invite to a game, go to the waiting page
  const goToWaiting = async (roomId) => {
    const requestBody = JSON.stringify({
      roomId: roomId,
      userId: userId,
    });
    try {
      await api().put(`/rooms/join`, requestBody);
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
    history.push(`/waiting/${roomId}`);
  };

  // accept game invite
  const acceptRoom = async (messageId) => {
    const requestBody = JSON.stringify({
      action: "AGREE",
    });
    try {
      const response = await api().post(
        `/notification/game/${messageId}`,
        requestBody
      );
      setIsDisabled(true);
      goToWaiting(response.data.roomId).then(() => { });
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

  // reject game invite
  const rejectRoom = async (messageId) => {
    const requestBody = JSON.stringify({
      action: "REJECT",
    });
    try {
      await api().post(`/notification/game/${messageId}`, requestBody);
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
        notify(error_str["message"]);
      }
    }
  };

  return (
    <div className="notification notice-container">
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <div className="notification content-container">{message.roomId}</div>
      <div className="notification content-container">{message.roomName}</div>
      <div className="notification button-container">
        <Button
          onClick={() => acceptRoom(message.messageId)}
          disabled={isDisabled}
          style={{ "wordWrap": "break-word" }}
        >Accept</Button>
      </div>
      <div className="notification button-container">
        <Button onClick={() => rejectRoom(message.messageId)}
          disabled={isDisabled}
          style={{ "wordWrap": "break-word" }}
        >Reject</Button>
      </div>
    </div>
  );
};

const Notification = () => {
  const history = useHistory();
  const userId = localStorage.getItem("id");
  const [allFriendsNotice, setAllFriendsNotice] = useState(null);
  let pendingFriendNotice = [];
  const [gamesNotice, setGamesNotice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true); //if continuing sending request to backend
  const [isUpdatingFriend, setIsUpdatingFriend] = useState(true);

  const notify = (message) => {
    toast.error(message);
  };
  
  //get all pending friend notifications
  const fetchFriends = async () => {
    try {
      const response = await api().get(
        `/notification/friend/pending/${userId}`
      );
      setAllFriendsNotice(response.data);
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
      setIsUpdatingFriend(false);
    }
  };

  useEffect(() => {
    fetchFriends().then(() => { });
  }, []);

  useInterval(
    async () => {
      fetchFriends().then(() => { });
    },
    isUpdatingFriend ? 3000 : null
  );

  // get all game invites notifications
  const fetchGames = async () => {
    try {
      const response = await api().get(`/notification/game/pending/${userId}`);
      setGamesNotice(response.data);
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
    fetchGames().then(() => { });
  }, []);

  useInterval(
    async () => {
      fetchGames().then(() => { });
    },
    isUpdating ? 3000 : null
  );

  let friendsContent = <Spinner />;
  if (allFriendsNotice) {
    friendsContent = (
      <div className="notification left-container">
        <h2
          style={{
            "font-family": "Nunito",
            "font-size": "24px",
            color: "#000000",
            width: "10em",
            position: "relative",
            textAlign: "center",
          }}
        >
          Friends invite
        </h2>
        <div className="notification container">
          <div className="notification notice-container">
            <div className="notification title-container">User Id</div>
            <div className="notification title-container">Username</div>
            <div className="notification button-container"></div>
          </div>
          <div className="notification line"></div>
          <div className="notification friends-list">
            {allFriendsNotice.map((friend) => (
              <Friends message={friend} key={friend.messageId} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    friendsContent = (
      <div className="notification left-container">
        <h2
          style={{
            "font-family": "Nunito",
            "font-size": "24px",
            color: "#000000",
            width: "10em",
            position: "relative",
            textAlign: "center",
          }}
        >
          Friends invite
        </h2>
        <div className="notification container">
          <div className="notification notice-container">
            <div className="notification title-container">User Id</div>
            <div className="notification title-container">Username</div>
          </div>
          <div className="notification line"></div>
        </div>
      </div>
    );
  }

  let roomsContent = <Spinner />;
  if (gamesNotice) {
    roomsContent = (
      <div className="notification right-container">
        <h2
          style={{
            "font-family": "Nunito",
            "font-size": "24px",
            color: "#000000",
            width: "10em",
            position: "relative",
            textAlign: "center",
          }}
        >
          Games invite
        </h2>
        <div className="notification container">
          <div className="notification notice-container">
            <div className="notification title-container">Room Id</div>
            <div className="notification title-container">RoomName</div>
          </div>
          <div className="notification line"></div>
          <div className="notification friends-list">
            {gamesNotice.map((room) => (
              <Rooms message={room} key={room.messageId} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    roomsContent = (
      <div className="notification right-container">
        <h2
          style={{
            "font-family": "Nunito",
            "font-size": "24px",
            color: "#000000",
            width: "10em",
            position: "relative",
            textAlign: "center",
          }}
        >
          Games invite
        </h2>
        <div className="notification container">
          <div className="notification notice-container">
            <div className="notification title-container">Room Id</div>
            <div className="notification title-container">Room Name</div>
          </div>
          <div className="notification line"></div>
        </div>
      </div>
    );
  }

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
      <div className="notification c-container">
        <div className="notification pic">
          <img
            src={cats}
            alt="notification background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        {friendsContent}
        {roomsContent}
      </div>
    </div>
  );
};

export default Notification;
