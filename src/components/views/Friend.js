import React, { useState, useEffect } from "react";
import { api, handleNotLogInError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Header.scss";
import "styles/views/Friend.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Spinner } from "components/ui/Spinner";
import cat_left from "styles/images/cat_left.png";
import { useInterval } from "helpers/hooks";

const FormField = (props) => {
  return (
    <div className="friend field">
      <label className="friend label">{props.label}</label>
      <input
        className="friend input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

const Friends = ({ friend }) => {
  const history = useHistory();
  const getFriends = async (id) => {
    const requestBody = JSON.stringify({
      friendId: id,
      userId: localStorage.getItem("id"),
    });
    try {
      // await api().get(`/friends`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "catching friends' information", true);
    }
    history.push(`/waiting/${id}`);
  };
  return (
    <div className="friend friend-container">
      <div className="friend content" style={{ "margin-left": "80px" }}>
        {friend.id}
      </div>
      <div className="friend content" style={{ "margin-left": "80px" }}>
        {friend.friendName}</div>
      {/* <div className="lobby players">{room.players}</div> */}
      {/* <div className="friend content">
        {room.numberOfPlayers + "/" + room.roomSeats}
      </div> */}
      {/* <Button onClick={() => goToWaiting(friend.id)}>JOIN</Button> */}
    </div>
  );
};


const SearchFriend = ({ searchfriend }) => {
  const history = useHistory();
  const getsearchFriend = async (id) => {
    const requestBody = JSON.stringify({
      friendId: id,
      userId: localStorage.getItem("id"),
    });
    try {
      // await api().get(`/friends`, requestBody);
    } catch (error) {
      // handleNotLogInError(history, error, "search by username", true);
    }
    // history.push(`/waiting/${id}`);
  };
  const createFriendNotification = async() => {

  }
  return (
    <div className="friend friend-container">
      <div className="friend content" style={{ "margin-left": "80px" }}>
        {searchfriend.id}
      </div>
      <div className="friend content" style={{ "margin-left": "80px" }}>
        {searchfriend.friendName}</div>
      {/* <div className="lobby players">{room.players}</div> */}
      {/* <div className="friend content">
        {room.numberOfPlayers + "/" + room.roomSeats}
      </div> */}
      <Button onClick={() => createFriendNotification()}>ADD</Button>
    </div>
  );
};

Friends.propTypes = {
  friend: PropTypes.object,
};
SearchFriend.propTypes = {
  searchfriend: PropTypes.object,
};

const Friend = () => {
  const history = useHistory();
  const [friends, setFriends] = useState(null);
  const [searchedFriend, setSearchedFriend] = useState(null);
  const [username, setUsername] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true); //if continuing sending request to backend
  const fetchFriends = async () => {
    try {
      // const response = await api().get("/rooms");
      // setRooms(response.data);
      // console.log(rooms);
    } catch (error) {
      handleNotLogInError(history, error, "getting friends' information");
      // setIsUpdating(false);
      // history.push("/login");
    }
  };
  const fetchSearchUsername = async() => {
    try {
      // const response = await api().get("/rooms");
      // setRooms(response.data);
      // console.log(rooms);
    } catch (error) {
      handleNotLogInError(history, error, "getting user by username");
      // setIsUpdating(false);
      // history.push("/login");
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);
  useEffect(() => {
    fetchSearchUsername();
  }, []);

  useEffect(() => {
    
  })

  const SearchByUsername = async () => {
    try{

    }catch (error) {
      handleNotLogInError(history, error, "Search a user by username ");
    }
  }

  let searchContent = <Spinner />;
  if (searchedFriend) {
    searchContent = (
      <div>
        <div className="friend container" 
         style={{left:"140px", top:"550px"}}>
          <div className="friend friend-container">
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Id
            </div>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Name
            </div>
          </div>

          <div className="friend line"></div>
          <ul className="friend friend-list">
            {searchedFriend.map((searchfriend) => (
              <SearchFriend searchfriend={searchfriend} key={searchfriend.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    searchContent = (
      <div>
        <div className="friend container"
        style={{left:"140px", top:"550px"}}>
          <div className="friend friend-container">
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Id
            </div>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Name
            </div>
          </div>

          <div className="friend line"></div>
          <div
            className="friend line"
            style={{ border: "2px solid #ad9a66" }}
          ></div>
        </div>
      </div>
    );
  }


  let content = <Spinner />;
  if (friends) {
    content = (
      <div>
        <div className="friend container">
          <div className="friend friend-container">
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Friend Id
            </div>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Friend Name
            </div>
          </div>

          <div className="friend line"></div>
          <ul className="friend friend-list">
            {friends.map((friend) => (
              <Friend friend={friend} key={friend.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="friend container">
          <div className="friend friend-container">
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Friend id
            </div>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Friend name
            </div>
          </div>
          <div className="friend line"></div>

          <div
            className="friend line"
            style={{ border: "2px solid #ad9a66" }}
          ></div>
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
      <div className="friend form-container">
        <div className="friend form">
          <FormField
            label="Find a new friend by username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <div className="friend button-container">
            <img className="friend img_cat_left" src={cat_left} />

            <Button
              onClick={() => SearchByUsername()}
              className="friend button_style1"
            >
              search
            </Button>
            <img className="friend img_cat_right" src={cat_left} />
          </div>
        </div>
      </div>
      {searchContent}
      {content}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Friend;