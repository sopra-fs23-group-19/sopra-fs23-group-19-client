import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { Button } from "components/ui/Button";
import cats from "styles/images/cats3.png";
import { api, handleError, handleNotLogInError } from "helpers/api";
import { useHistory } from "react-router-dom";

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
  const goToRules = async () => {
    try {
      history.push(`/rules`);
    } catch (error) {
      alert(
        `Something went wrong when going to rules page: \n${handleError(error)}`
      );
    }
  };
  const goToLobby = async () => {
    try {
      history.push(`/lobby`);
    } catch (error) {
      alert(
        `Something went wrong when going to lobby page: \n${handleError(error)}`
      );
    }
  };
  const goToFriend = async () => {
    try {
      history.push(`/friend`);
    } catch (error) {
      alert(
        `Something went wrong when going to friend page: \n${handleError(error)}`
      );
    }
  };
  // const goToProfile = async () => {
  //   try {
  //     const curUserId = localStorage.getItem("id");
  //     console.log("curUserId");
  //     console.log(curUserId);
  //     history.push(`/profile/${curUserId}`);
  //   } catch (error) {
  //     alert(
  //       `Something went wrong when going to profile page: \n${handleError(
  //         error
  //       )}`
  //     );
  //   }
  // };
  const goToProfile = () => {
    const curUserId = localStorage.getItem("id");
    // console.log("curUserId");
    // console.log(curUserId);
    history.push(`/profile/${curUserId}`);
  };
  const logout = async () => {
    var aValue = localStorage.getItem("id");
    try {
      await api().post(`/users/logout/${aValue}`);
    } catch (error) {
      //   alert(`Something went wrong while logout: \n${handleError(error)}`);
      // }

      // localStorage.removeItem("token");
      // localStorage.removeItem("id");
      // history.push("/login");
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

  return (
    <div className="header container">
      <div className="header instruction-container">
        <div className="header title">Drawing & Guessing</div>
        <div style={{ "margin-left": "1200px", "margin-top": "30px" }}>
          <img src={cats} alt="" style={{ width: 270, height: 35 }} />
        </div>
      </div>
      <div className="header instruction-container">
        <div
          className="header instruction"
          style={{
            "margin-left": "800px",
            color: "#E0B406",
            textDecorationLine: "underline",
          }}
          onClick={() => goToLobby()}
        >
          Lobby
        </div>
        <div
          className="header instruction"
          style={{
            "margin-left": "40px",
            color: "#C18A2D",
            textDecorationLine: "underline",
          }}
          onClick={() => goToProfile()}
        >
          Profile
        </div>
        <div
          className="header instruction"
          style={{ 
            "margin-left": "40px", 
            color: "#B59978" ,
            textDecorationLine: "underline",
          }}
          onClick={() => goToFriend()}
        >
          Friends
        </div>
        <div
          className="header instruction"
          style={{ "margin-left": "40px", color: "#83692C" }}
        >
          Notification
        </div>
        <div
          className="header instruction"
          style={{
            "margin-left": "40px",
            color: "#000000",
            textDecorationLine: "underline",
          }}
          onClick={() => goToRules()}
        >
          Rules
        </div>
        <Button
          style={{
            "margin-left": "40px",
            "background-color": "#FFFFFF",
            "margin-bottom": "5px",
            border: "2px solid #000000",
          }}
          onClick={() => logout()}
        >
          Log out
        </Button>
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
