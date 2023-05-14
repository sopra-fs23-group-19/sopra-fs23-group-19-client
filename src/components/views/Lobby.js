import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Header.scss";
import "styles/views/Lobby.scss";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Spinner } from "components/ui/Spinner";
import { useInterval } from "helpers/hooks";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
// define the format of rooms in the table
const Rooms = ({ room }) => {
  const history = useHistory();
  const notify = (message) => {
    toast.error(message);
  };
  // function to get to the waiting page
  const goToWaiting = async (id) => {
    const requestBody = JSON.stringify({
      roomId: id,
      userId: Number(localStorage.getItem("id")),
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
    history.push(`/waiting/${id}`);
  };

  // return the list of room id, name and number of players
  return (
    <div className="lobby room-container">
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <div className="lobby content">{room.id}</div>
      <div className="lobby content">{room.roomName}</div>
      <div className="lobby content">
        {room.numberOfPlayers + "/" + room.roomSeats}
      </div>
      <div className="lobby content">
        <Button
          onClick={() => {
            goToWaiting(room.id).then(() => {});
          }}
          style={{
            "background-color": "#FFFFFF",
            border: "2px solid #000000",
            "font-family": "Josefin Sans",
          }}
        >
          JOIN
        </Button>
      </div>
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
  const notify = (message) => {
    toast.error(message);
  };
  // fetch the rooms info from back end
  const fetchRooms = async () => {
    try {
      const response = await api().get("/rooms");
      setRooms(response.data);
    } catch (error) {
      // handleNotLogInError(history, error, "getting lobby");
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchRooms().then(() => {});
  }, []);

  // fetch rooms every 3 seconds
  useInterval(
    async () => {
      fetchRooms().then(() => {});
    },
    isUpdating ? 3000 : null
  );

  // define the format of the table
  let content = <Spinner />;
  if (rooms) {
    content = (
      <div>
        <div className="lobby container">
          <div className="lobby room-container">
            <div className="lobby title">Room Id</div>
            <div className="lobby title">Room Name</div>
            <div className="lobby title">Players</div>
          </div>
          <div className="lobby line"></div>
          {rooms.map((room) => (
            <Rooms room={room} key={room.id} />
          ))}
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="lobby container">
          <div className="lobby room-container">
            <div className="lobby title">Room Id</div>
            <div className="lobby title">Room Name</div>
            <div className="lobby title">Players</div>
          </div>
          <div className="lobby line"></div>
        </div>
      </div>
    );
  }

  // function to get to game creation page
  const goTocreateGameView = () => {
    playOn();
    history.push("/gameCreation");
  };
  const [playOn] = useSound(btClick);

  // function to return to a game
  const goToGame = () => {
    playOn();
    const currentGameId = localStorage.getItem("gameId");
    const currentTurnId = localStorage.getItem("intialTurnId");
    history.push({
      pathname: `/game/${currentGameId}`,
      state: { turnId: currentTurnId },
    });
  };

  return (
    <div>
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
      <div className="lobby content-container">
        <div className="lobby pic">
          <img
            src={cats}
            alt="lobby background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        <div className="lobby text-and-button">
          <div className="lobby text" style={{ left: "20%" }}>
            Want to create a new game? Click here:
          </div>
          <div className="lobby text">
            <Button
              style={{
                "background-color": "#FFFFFF",
                border: "2px solid #000000",
              }}
              onClick={() => goTocreateGameView()}
            >
              Create a new room
            </Button>
          </div>
        </div>
        {localStorage.getItem("gameId") != null ? (
          <div
            className="lobby text"
            style={{ left: "510px", position: "relative" }}
          >
            <Button
              style={{
                "background-color": "#FFFFFF",
                border: "2px solid #000000",
              }}
              onClick={() => goToGame()}
            >
              Go back to your game
            </Button>
          </div>
        ) : (
          <></>
        )}
        {content}
      </div>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Lobby;
