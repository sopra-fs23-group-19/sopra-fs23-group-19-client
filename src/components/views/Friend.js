import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useHistory, useParams } from "react-router-dom";
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
import { Bounce, ToastContainer, toast } from "react-toastify";

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
  return (
    <div className="friend friend-container">
      <div className="friend content">{friend.id}</div>
      <div className="friend content">{friend.username}</div>
    </div>
  );
};
const notify = (message) => {
  toast.error(message);
};
const SearchFriend = ({ searchfriend }) => {
  const id = localStorage.getItem("id");
  let disable = false;
  const history = useHistory();
  const createFriendNotification = async (useridTo) => {
    const requestBody = JSON.stringify({
      useridFrom: id,
      useridTo: useridTo,
    });
    try {
      if (id == useridTo) {
        disable = true;
      } else {
        const response = await api().post(`/notification/friend`, requestBody);
        if (response.data.messageId) {
          disable = true;
        }
      }
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
  return (
    <div className="friend friend-container" style={{ width: "35em" }}>
      <div className="friend content" style={{ "margin-left": "80px" }}>
        {searchfriend.id}
      </div>
      <div className="friend content" style={{ "margin-left": "80px" }}>
        {searchfriend.username}
      </div>
      {/* <div className="lobby players">{room.players}</div> */}
      {/* <div className="friend content">
        {room.numberOfPlayers + "/" + room.roomSeats}
      </div> */}
      <Button
        onClick={() => createFriendNotification(searchfriend.id)}
        disabled={disable}
      >
        ADD
      </Button>
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

  const id = localStorage.getItem("id");
  // const [isUpdating, setIsUpdating] = useState(true); //if continuing sending request to backend
  const fetchFriends = async () => {
    try {
      const response = await api().get(`/users/returnFriends/${id}`);
      setFriends(response.data);
      console.log(friends);
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
  // const fetchSearchUsername = async() => {
  //   try {
  //     // const response = await api().get("/rooms");
  //     // setRooms(response.data);
  //     // console.log(rooms);
  //   } catch (error) {
  //     handleNotLogInError(history, error, "getting user by username");
  //     // setIsUpdating(false);
  //     // history.push("/login");
  //   }
  // }

  useEffect(() => {
    fetchFriends();
  }, []);
  useInterval(async () => {
    fetchFriends();
  }, 3000);
  // useEffect(() => {
  //   fetchSearchUsername();
  // }, []);

  // useEffect(() => {});

  const SearchByUsername = async () => {
    const requestBody = JSON.stringify({
      username: username,
    });
    try {
      console.log(username);
      const response = await api().post(`/users/searchFriends`, requestBody);
      setSearchedFriend(response.data);
    } catch (error) {
      // handleNotLogInError(history, error, "Search a user by username ");
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

  let searchContent = <Spinner />;
  if (searchedFriend) {
    searchContent = (
      <div>
        <div
          className="friend container"
          style={{ left: "190px", top: "550px", width: "35em" }}
        >
          <div className="friend friend-container" style={{ width: "35em" }}>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Id
            </div>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Name
            </div>
          </div>

          <div className="friend line" style={{ width: "35em" }}></div>
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
        <div
          className="friend container"
          style={{ left: "190px", top: "550px", width: "35em" }}
        >
          <div className="friend friend-container" style={{ width: "35em" }}>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Id
            </div>
            <div className="friend title" style={{ "margin-left": "80px" }}>
              Name
            </div>
          </div>

          <div className="friend line" style={{ width: "35em" }}></div>
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
              <Friends friend={friend} key={friend.id} />
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
