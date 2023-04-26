import React, { useState, useEffect } from "react";
import { api, handleNotLogInError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Header.scss";
import "styles/views/Lobby.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Spinner } from "components/ui/Spinner";
import { useInterval } from "helpers/hooks";

const Rooms = ({ room }) => {
  const history = useHistory();
  const goToWaiting = async (id) => {
    const requestBody = JSON.stringify({
      roomId: id,
      userId: localStorage.getItem("id"),
    });
    try {
      await api().put(`/games/join`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "joining the room", true);
      // alert(
      //   `Something went wrong during joining waiting room: \n${handleError(
      //     error
      //   )}`
      // );
    }
    history.push(`/waiting/${id}`);
  };
  return (
    <div className="lobby room-container">
      <div className="lobby content" style={{ "margin-left": "80px" }}>
        {room.id}
      </div>
      <div className="lobby content">{room.roomName}</div>
      {/* <div className="lobby players">{room.players}</div> */}
      <div className="lobby content">
        {room.numberOfPlayers + "/" + room.roomSeats}
      </div>
      <Button onClick={() => goToWaiting(room.id)}>JOIN</Button>
    </div>
  );
};

Rooms.propTypes = {
  room: PropTypes.object,
};

const Lobby = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true); //if continuing sending request to backend
  const fetchRooms = async () => {
    try {
      const response = await api().get("/games");
      setRooms(response.data);
      // console.log(rooms);
    } catch (error) {
      // console.error(
      //   `Something went wrong while fetching the rooms: \n${handleError(error)}`
      // );
      // console.error("Details:", error);
      // alert(
      //   "Something went wrong while fetching the rooms! See the console for details."
      // );
      handleNotLogInError(history, error, "getting lobby");
      setIsUpdating(false);
      // history.push("/login");
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  useInterval(
    async () => {
      fetchRooms();
    },
    isUpdating ? 3000 : null
  );

  let content = <Spinner />;
  if (rooms) {
    content = (
      <div>
        <div className="lobby container">
          <div className="lobby room-container">
            <div className="lobby title" style={{ "margin-left": "80px" }}>
              Room Id
            </div>
            <div className="lobby title">Room Name</div>
            <div className="lobby title">Players</div>
          </div>

          <div className="lobby line"></div>
          <ul className="lobby room-list">
            {rooms.map((room) => (
              <Rooms room={room} key={room.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="lobby room-list">
          <div className="lobby room-container">
            <div className="lobby title" style={{ "margin-left": "80px" }}>
              id
            </div>
            <div className="lobby title">name</div>
            <div className="lobby title">players</div>
          </div>
          <div className="lobby line"></div>

          <div
            className="lobby line"
            style={{ border: "2px solid #ad9a66" }}
          ></div>

          {/* <div
            className="lobby line"
            style={{ border: "2px solid #ad9a66" }}
          ></div> */}
        </div>
      </div>
    );
  }
  const goTocreateGameView = () => {
    history.push("/gameCreation");
  };

  return (
    <BaseContainer>
      <Header />
      <div
        className="lobby pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <h2
        style={{
          left: "420px",
          top: "180px",
          color: "black",
          position: "absolute",
        }}
      >
        Want to create a new game? Click here:
      </h2>
      <Button
        style={{
          position: "absolute",
          left: "900px",
          top: "200px",
          "background-color": "#FFFFFF",
          border: "2px solid #000000",
        }}
        onClick={() => goTocreateGameView()}
      >
        Create a new room
      </Button>
      {content}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Lobby;
