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
import BgmPlayer from "components/ui/BgmPlayer";

const FormField = (props) => {
  return (
    <div className="friend field">
      <label className="friend label">{props.label}</label>
      <input
        className="friend input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        maxLength="30"
      />
    </div>
  );
};

const Friends = ({ friend }) => {
  const history = useHistory();
  return (
    <div className="friend friend-container">
      <div className="friend content" style={{ width: "50%" }}>
        {friend.id}
      </div>
      <div
        className="friend content"
        style={{ "text-decoration-line": "underline", width: "50%" }}
        onClick={() => {
          const requestUrl = "/profile/" + friend.id;
          history.push(requestUrl);
        }}
      >
        {friend.username}
      </div>
    </div>
  );
};
const notify = (message) => {
  toast.error(message);
};
const SearchFriend = ({ searchfriend }) => {
  const id = localStorage.getItem("id");
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const createFriendNotification = async (useridTo) => {
    const requestBody = JSON.stringify({
      useridFrom: id,
      useridTo: useridTo,
    });
    try {
      await api().post(`/notification/friend`, requestBody);
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
  const handleClick = (useridTo) => {
    createFriendNotification(useridTo);
    setIsDisabled(true);
  };

  return (
    <div className="friend friend-container" style={{ width: "100%" }}>
      <div className="friend content">{searchfriend.id}</div>
      <div className="friend content">{searchfriend.username}</div>
      <div className="friend content">
        <Button
          onClick={() => handleClick(searchfriend.id)}
          disabled={isDisabled || searchfriend.id == id}
        >
          ADD
        </Button>
      </div>
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

  const fetchFriends = async () => {
    try {
      const response = await api().get(`/users/returnFriends/${id}`);
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

  useEffect(() => {
    fetchFriends().then(() => {});
  }, []);
  useInterval(async () => {
    fetchFriends().then(() => {});
  }, 3000);

  const SearchByUsername = async () => {
    const requestBody = JSON.stringify({
      username: username,
    });
    try {
      const response = await api().post(`/users/searchFriends`, requestBody);
      setSearchedFriend(response.data);
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

  let searchContent = <Spinner />;
  if (searchedFriend) {
    searchContent = (
      <div>
        <div
          className="friend container"
          style={{
            left: "190px",
            top: "550px",
            width: "80%",
            background: "rgba(181, 153, 120, 0.5)",
          }}
        >
          <div className="friend friend-container" style={{ width: "100%" }}>
            <div className="friend title">Id</div>
            <div className="friend title">Name</div>
          </div>

          <div className="friend line" style={{ width: "100%" }}></div>
          <ul className="friend friend-list" style={{ width: "100%" }}>
            <SearchFriend
              searchfriend={searchedFriend}
              key={searchedFriend.id}
            />
          </ul>
        </div>
      </div>
    );
  } else {
    searchContent = (
      <></>
    );
  }

  let content = <Spinner />;
  if (friends) {
    content = (
      <div className="friend right-container">
        <div className="friend container" style={{width:"80%",flexDirection:"column","marginLeft":"0%"}}>
          <div className="friend friend-container" style={{width:"100%"}}>
            <div className="friend title" style={{ "width": "50%" }}>
              Friend Id
            </div>
            <div className="friend title" style={{ "width": "50%" }}>
              Friend Name
            </div>
          </div>

          <div className="friend line" style={{ width: "100%" }}></div>
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
      <div className="friend right-container">
        <div
          className="friend container"
          style={{
            width: "80%",
            left: "190px",
            top: "550px",
            height: "70%",
            marginLeft: "0%",
          }}
        >
          <div className="friend friend-container" style={{ width: "100%" }}>
            <div className="friend title" style={{ "margin-left": "15%" }}>
              Friend id
            </div>
            <div className="friend title" style={{ "margin-left": "10%" }}>
              Friend name
            </div>
          </div>
          <div className="friend line" style={{ width: "100%" }}></div>

          <div
            className="friend line"
            style={{ border: "2px solid #ad9a66" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    // <BaseContainer>
    <>
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
      <div className="profile content-container">
        <div className="profile pic">
          <img
            src={cats}
            alt="welcome background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>

        <div className="friend main-container">
          <div className="friend left-container">
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
          </div>
          <div className="friend right-container">{content}</div>
        </div>
      </div>
    </>
    // </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Friend;
