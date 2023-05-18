import React, { useState, useEffect } from "react";
import { useInterval } from "helpers/hooks";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { Button } from "components/ui/Button";
import cats from "styles/images/cats3.png";
import { api, handleError, handleNotLogInError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
// import useSound from "use-sound";
// import btClick from "styles/sounds/click_button.mp3";
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Header = (props) => {
  const history = useHistory();
  const [newMessage, setNewMessage] = useState(false);
  const [newFriend, setNewFriend] = useState(null);
  const [newGame, setNewGame] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true);
  const notify = (message) => {
    toast.error(message);
  };
  // on click rules button, redirect to the rules page
  const goToRules = async () => {
    try {
      history.push(`/rules`);
    } catch (error) {
      alert(
        `Something went wrong when going to rules page: \n${handleError(error)}`
      );
    }
  };

  // on click the lobby button, redirect to the lobby page
  const goToLobby = async () => {
    try {
      history.push(`/lobby`);
    } catch (error) {
      alert(
        `Something went wrong when going to lobby page: \n${handleError(error)}`
      );
    }
  };

  // on click the friend button, redirect to the friend page
  const goToFriend = async () => {
    try {
      history.push(`/friend`);
    } catch (error) {
      alert(
        `Something went wrong when going to friend page: \n${handleError(
          error
        )}`
      );
    }
  };

  // on click the profile button, redirect to the profile page
  const goToProfile = () => {
    const curUserId = localStorage.getItem("id");
    history.push(`/profile/${curUserId}`);
  };

  // on click the notification button, redirect to the notification page
  const goToNotification = () => {
    history.push(`/notification`);
  };

  const goToLeaderboard = () => {
    history.push(`/leaderboard`);
  };

  const new_notice = async () => {
    var aValue = localStorage.getItem("id");
    try {
      const responseFriend = await api().get(
        `/notification/friend/pending/${aValue}`
      );
      const responseGame = await api().get(
        `/notification/game/pending/${aValue}`
      );
      setNewFriend(responseFriend.data);
      setNewGame(responseGame.data);
      if (responseFriend.data.length != 0 || responseGame.data.length != 0) {
        setNewMessage(true);
      } else {
        setNewMessage(false);
      }
    } catch (error) {
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      } else {
        // notify(error_str["message"]);
        setIsUpdating(false);
      }
    }
  };

  useEffect(() => {
    new_notice().then(() => {});
  }, []);

  useInterval(
    async () => {
      new_notice().then(() => {});
    },
    isUpdating ? 3000 : null
  );
  // 3000);

  // on click the logout button, logout and clear local storage
  const logout = async () => {
    var aValue = localStorage.getItem("id");
    try {
      await api().post(`/users/logout/${aValue}`);
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      history.push("/login");
    } catch (error) {
      const error_str = handleError(error);
      console.log(error_str);
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        notify(error_str["message"]);
        history.push("/login");
      }
    }
  };

  // display the header
  return (
    <div className="header container">
      <div className="header title-container">
        <div className="header title-content">Drawing & Guessing</div>
        <div className="header title-content" style={{ textAlign: "right" }}>
          <img src={cats} alt="" style={{ width: "270px", height: "35px" }} />
        </div>
      </div>
      <div className="header instruction-container">
        <div className="header instrunction">
          <Button
            style={{
              "background-color": "#FFFFFF",
              border: "2px solid #000000",
              "min-width": "100px",
              "font-family": "Josefin Sans",
            }}
            onClick={() => logout()}
          >
            Log out
          </Button>
        </div>
        <div
          className="header instruction"
          style={{ color: "#000000" }}
          onClick={() => goToRules()}
        >
          Rules
        </div>
        {newMessage ? <div className="header circle"></div> : <></>}
        <div
          className="header instruction"
          style={{ color: "#83692C" }}
          onClick={() => goToNotification()}
        >
          Notification
        </div>
        {/* <div
          className="header instruction"
          style={{ color: "#83692C" }}
          onClick={() => goToNotification()}
        >
          Notification
        </div> */}
        <div
          className="header instruction"
          style={{ color: "#BE7D2D" }}
          onClick={() => goToFriend()}
        >
          Friends
        </div>
        <div
          className="header instruction"
          style={{ color: "#C18A2D" }}
          onClick={() => goToProfile()}
        >
          Profile
        </div>
        <div
          className="header instruction"
          style={{ color: "#dac107" }}
          onClick={() => goToLeaderboard()}
        >
          Leaderboard
        </div>
        <div
          className="header instruction"
          style={{ color: "#E0B406" }}
          onClick={() => goToLobby()}
        >
          Lobby
        </div>
        <h3>{newMessage}</h3>
      </div>

      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default Header;
