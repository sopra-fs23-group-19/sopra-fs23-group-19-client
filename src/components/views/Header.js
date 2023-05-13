import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { Button } from "components/ui/Button";
import cats from "styles/images/cats3.png";
import { api, handleError, handleNotLogInError } from "helpers/api";
import { useHistory } from "react-router-dom";
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

  // on click the logout button, logout and clear local storage
  const logout = async () => {
    var aValue = localStorage.getItem("id");
    try {
      await api().post(`/users/logout/${aValue}`);
    } catch (error) {
      handleNotLogInError(history, error, "logout");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      history.push("/login");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("gameId");
    localStorage.removeItem("intialTurnId");
    history.push("/login");
  };

  // display the header
  return (
    <div className="header container">
      <div className="header title-container">
        <div className="header title-content">Drawing & Guessing</div>
        <div className="header title-content" style={{textAlign:"right"}}>
          <img src={cats} alt="" style={{width:"270px",height:"35px"}}/>
        </div>
      </div>
      <div className="header instruction-container">
        <div className="header instrunction">
          <Button
            style={{"background-color": "#FFFFFF", border: "2px solid #000000", "min-width":"100px"}}
            onClick={() => logout()}
          >
            Log out
          </Button>
        </div>
        <div
          className="header instruction"
          style={{color: "#000000"}}
          onClick={() => goToRules()}
        >
          Rules
        </div>
        <div
          className="header instruction"
          style={{color: "#83692C"}}
          onClick={() => goToNotification()}
        >
          Notification
        </div>
        <div
          className="header instruction"
          style={{color: "#B59978"}}
          onClick={() => goToFriend()}
        >
          Friends
        </div>
        <div
          className="header instruction"
          style={{color: "#C18A2D"}}
          onClick={() => goToProfile()}
        >
          Profile
        </div>
        <div
          className="header instruction"
          style={{color: "#E0B406"}}
          onClick={() => goToLobby()}
        >
          Lobby
        </div>
      </div>
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
