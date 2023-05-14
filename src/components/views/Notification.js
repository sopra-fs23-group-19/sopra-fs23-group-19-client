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

const Friends = ({ message }) => {
  const history = useHistory();

  // accept add friend
  const acceptFriend = async (messageId) => {
    const requestBody = JSON.stringify({
      action: "AGREE"
    });
    try {
      await api().post(`/friends/${messageId}`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "accept friend", true);
    }
  };

  // reject add friend
  const rejectFriend = async (messageId) => {
    const requestBody = JSON.stringify({
      action: "REJECT"
    });
    try {
      await api().post(`/friends/${messageId}`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "reject friend", true);
    }
  };

  return (
    <div className="notification notice-container" >
      <div className="notification content-container">
        {message.useridFrom}
      </div>
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

    // if accept invite to a game, go to the waiting page
    const goToWaiting = async (roomId) => {
      const requestBody = JSON.stringify({
        roomId: roomId,
        userId: userId,
      });
      try {
        await api().put(`/rooms/join`, requestBody);
      } catch (error) {
        handleNotLogInError(history, error, "joining the room", true);
      }
      history.push(`/waiting/${roomId}`);
    };

    // accept game invite
    const acceptRoom = async (messageId) => {
      const requestBody = JSON.stringify({
        action: "AGREE"
      });
      try {
        const response = await api().post(`/notification/game/${messageId}`, requestBody);
        goToWaiting(response.data.roomId);
      } catch (error) {
        handleNotLogInError(history, error, "accepting game invite", true);
      }
    };

    // reject game invite
    const rejectRoom = async (messageId) => {
      const requestBody = JSON.stringify({
        action: "REJECT"
      });
      try {
        await api().post(`/notification/game/${messageId}`, requestBody);
      } catch (error) {
        handleNotLogInError(history, error, "rejecting game invite", true);
      }
    };

    return (
      <div className="notification notice-container">
        <div className="notification content-container">
          {message.roomId}
        </div>
        <div className="notification content-container">
          {message.roomName}
        </div>
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

  //get all pending friend notifications
  const fetchFriends = async()=>{
    const response = await api().get(`/notification/friend/pending/${userId}`);
    setAllFriendsNotice(response.data);
    // console.log(response.data)
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  useInterval(
    async () => {
      fetchFriends();
    },3000
  );

  // get all game invites notifications
  const fetchGames = async()=>{
    const response = await api().get(`/notification/game/pending/${userId}`);
    setGamesNotice(response.data);
  }

  useEffect(() => {
    fetchGames();
  }, []);

  useInterval(
    async () => {
      fetchGames();
    },3000
  );

  let friendsContent = <Spinner />;
  if (allFriendsNotice) {
    friendsContent = (
      <div className="notification left-container">
        <h2 style={{"font-family": "Nunito", "font-size": "24px", color: "#000000",
        width:"10em", position: "relative",textAlign:"center"}}>
          Friends invite
        </h2>
        <div className="notification container" >
          <div className="notification notice-container">
            <div className="notification title-container">
              User Id
            </div>
            <div className="notification title-container">
              Username
            </div>
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
        <h2 style={{"font-family": "Nunito", "font-size": "24px", color: "#000000",
        width:"10em", position: "relative",textAlign:"center"}}>
        Friends invite
      </h2>
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
      <div className="notification right-container">
        <h2 style={{"font-family": "Nunito", "font-size": "24px", color: "#000000",
        width:"10em", position: "relative",textAlign:"center"}}>
        Games invite
      </h2>
        <div className="notification container" >
          <div className="notification notice-container">
            <div className="notification title-container">
              Room Id
            </div>
            <div className="notification title-container">
              RoomName
            </div>
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
        <h2 style={{"font-family": "Nunito", "font-size": "24px", color: "#000000",
         width:"10em", position: "relative",textAlign:"center"}}>
          Games invite
        </h2>
        <div className="notification container" >
          <div className="notification notice-container">
            <div className="notification title-container">
              Room Id
            </div>
            <div className="notification title-container">
              Room Name
            </div>
          </div>
          <div className="notification line"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="notification c-container">
        <div className="notification pic">
          <img src={cats} alt="notification background cats" style={{width: "447px", height: "559px", opacity: "20%"}}/>
        </div>
        {friendsContent}
        {roomsContent}
      </div>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Notification;
