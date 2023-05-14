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
const Friends = ({ message }) => {
  const history = useHistory();
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
    } catch (error) {
      // handleNotLogInError(history, error, "accept friend", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
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
    } catch (error) {
      // handleNotLogInError(history, error, "reject friend", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
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
        <Button onClick={() => acceptFriend(message.messageId)}>Accept</Button>
      </div>
      <div className="notification button-container">
        <Button onClick={() => rejectFriend(message.messageId)}>Reject</Button>
      </div>
    </div>
  );
};

const Rooms = ({ message }) => {
  const history = useHistory();
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
      // handleNotLogInError(history, error, "joining the room", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
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
      goToWaiting(response.data.roomId);
    } catch (error) {
      // handleNotLogInError(history, error, "accepting game invite", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
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
    } catch (error) {
      // handleNotLogInError(history, error, "rejecting game invite", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
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
        <Button onClick={() => acceptRoom(message.messageId)}>Accept</Button>
      </div>
      <div className="notification button-container">
        <Button onClick={() => rejectRoom(message.messageId)}>Reject</Button>
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
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  useInterval(async () => {
    fetchFriends();
  }, 3000);

  // get all game invites notifications
  const fetchGames = async () => {
    try {
      const response = await api().get(`/notification/game/pending/${userId}`);
      setGamesNotice(response.data);
    } catch (error) {
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useInterval(async () => {
    fetchGames();
  }, 3000);

  let friendsContent = <Spinner />;
  if (allFriendsNotice) {
    friendsContent = (
      <div>
        <div className="notification container">
          <div className="notification notice-container">
            <div className="notification title-container">User Id</div>
            <div className="notification title-container">Username</div>
            <div className="notification button-container"></div>
          </div>
          <div className="notification line"></div>
          <ul className="notification friends-list">
            {allFriendsNotice.map((friend) => (
              <Friends message={friend} key={friend.messageId} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    friendsContent = (
      <div>
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
      <div>
        <div
          className="notification container"
          style={{ position: "absolute", left: "850px" }}
        >
          <div className="notification notice-container">
            <div className="notification title-container">Room Id</div>
            <div className="notification title-container">Room Name</div>
          </div>
          <div className="notification line"></div>
          <ul className="notification friends-list">
            {gamesNotice.map((room) => (
              <Rooms message={room} key={room.messageId} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    roomsContent = (
      <div>
        <div
          className="notification container"
          style={{ position: "absolute", left: "850px" }}
        >
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
    <BaseContainer>
      <Header />
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <div
        className="notification pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <h2
        style={{
          "font-family": "Nunito",
          "font-size": "24px",
          color: "#000000",
          top: "150px",
          left: "180px",
          position: "absolute",
          width: "20em",
        }}
      >
        Friends invite
      </h2>
      {friendsContent}
      <h2
        style={{
          "font-family": "Nunito",
          "font-size": "24px",
          color: "#000000",
          top: "150px",
          left: "880px",
          position: "absolute",
          width: "20em",
        }}
      >
        Games invite
      </h2>
      {roomsContent}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Notification;
