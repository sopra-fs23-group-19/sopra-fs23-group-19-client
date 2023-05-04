import React, { useState, useEffect } from "react";
import { api, handleNotLogInError } from "helpers/api";
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

const Friends = ({ friend }) => {
  const history = useHistory();
  const acceptFriend = async (id) => {
    const requestBody = JSON.stringify({
      sendId: id,
      receiveId: localStorage.getItem("id"),
      action: "accept"
    });
    try {
      //await api().put(`/notification/friends`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "accept friend", true);
    }
  };
  const rejectFriend = async (id) => {
    const requestBody = JSON.stringify({
      sendId: id,
      receiveId: localStorage.getItem("id"),
      action: "reject"
    });
    try {
      //await api().put(`/notification/friends`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "reject friend", true);
    }
  };
  return (
    <div className="notification notice-container">
      <div className="notification content-container">
        {friend.id}
      </div>
      <div className="notification content-container">{friend.username}</div>
      <div className="notification button-container">
        <Button onClick={() => acceptFriend(friend.id)}>Accept</Button>
      </div>
      <div className="notification button-container">
        <Button onClick={() => rejectFriend(friend.id)}>Reject</Button>
      </div>
    </div>
  );
};

Friends.propTypes = {
  friend: PropTypes.object,
};

const Rooms = ({ room }) => {
    const history = useHistory();
    const acceptRoom = async (sendId, roomId) => {
      const requestBody = JSON.stringify({
        sendId: sendId,
        receiveId: localStorage.getItem("id"),
        roomId: roomId,
        action: "accept"
      });
      try {
        //await api().put(`/notification/games`, requestBody);
      } catch (error) {
        handleNotLogInError(history, error, "accept game", true);
      }
    };
    const rejectRoom = async (roomId) => {
      const requestBody = JSON.stringify({
        sendId: roomId,
        receiveId: localStorage.getItem("id"),
        action: "reject"
      });
      try {
        //await api().put(`/notification/games`, requestBody);
      } catch (error) {
        handleNotLogInError(history, error, "reject game", true);
      }
    };
    return (
      <div className="notification notice-container">
        <div className="notification content-container">
          {room.roomName}
        </div>
        <div className="notification content-container">{room.numberOfPlayers + "/" + room.roomSeats}</div>
        <div className="notification button-container">
          <Button onClick={() => acceptRoom(room.id)}>Accept</Button>
        </div>
        <div className="notification button-container">
          <Button onClick={() => rejectRoom(room.id)}>Reject</Button>
        </div>
      </div>
    );
};

Rooms.propTypes = {
    room: PropTypes.object,
};

const Notification = () => {
  const history = useHistory();
  const [friendsNotice, setFriendsNotice] = useState(null);
  const [gamesNotice, setGamesNotice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true); //if continuing sending request to backend

  const fetchFriends = async () => {
    try {
      // const response = await api().get("/notification/friends");
      // setFriendsNotice(response.data);
      // console.log(friendsNotice);
    } catch (error) {
      handleNotLogInError(history, error, "getting friends notification");
      setIsUpdating(false);
      // history.push("/login");
    }
  };

  const fetchGames = async () => {
    try {
      // const response = await api().get("/notification/games");
      // setGamesNotice(response.data);
      // console.log(gamesNotice);
    } catch (error) {
      handleNotLogInError(history, error, "getting games notification");
      setIsUpdating(false);
      // history.push("/login");
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchGames();
  }, []);
  useInterval(
    async () => {
      fetchFriends();
      fetchGames();
    },
    isUpdating ? 3000 : null
  );

  let friendsContent = <Spinner />;
  if (friendsNotice) {
    friendsContent = (
      <div>
        <div className="notification container">
          <div className="notification notice-container">
            <div className="notification title-container">
              User Id
            </div>
            <div className="notification title-container">Username</div>
            <div className="notification button-container"></div>
          </div>
          <div className="notification line"></div>
          <ul className="notification friends-list">
            {friendsNotice.map((friend) => (
              <Friends friend={friend} key={friend.id} />
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
            <div className="notification title-container">
              User Id
            </div>
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
        <div className="notification container" style={{position: "absolute", left: "850px"}}>
          <div className="notification notice-container">
            <div className="notification title-container">
              Room Name
            </div>
            <div className="notification title-container">Players</div>
          </div>
          <div className="notification line"></div>
          <ul className="notification friends-list">
            {gamesNotice.map((room) => (
              <Rooms room={room} key={room.roomName} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    roomsContent = (
        <div>
        <div className="notification container" style={{position: "absolute", left: "850px"}}>
          <div className="notification notice-container">
            <div className="notification title-container">
              Room Name
            </div>
            <div className="notification title-container">Players</div>
          </div>
          <div className="notification line"></div>
        </div>
      </div>
    );
  }

  return (
    <BaseContainer>
      <Header />
      <div
        className="notification pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <h2 style={{"font-family": "Nunito", "font-size": "24px", color: "#000000",
        top: "150px", left: "180px", position:"absolute"}}>
        Friends invite
      </h2>
      {friendsContent}
      <h2 style={{"font-family": "Nunito", "font-size": "24px", color: "#000000",
        top: "150px", left: "880px", position:"absolute"}}>
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
