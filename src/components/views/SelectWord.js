import { useState, useRef, useEffect } from "react";
import Timer from "components/views/Timer";
import cats from "styles/images/cats2.png";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";
import "styles/views/Guessing.scss";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "../../helpers/api";
import HeaderInGame from "components/views/HeaderInGame";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer";

const SelectWord = ({ gameId, turnId, handleChooseWord }) => {
  const history = useHistory();
  const startGuessing = +new Date();
  const curUserId = localStorage.getItem("id");
  const [currentUsername, setCurrentUsername] = useState("");

  //get the room and user information
  const [word0, setWord0] = useState(""); //
  const [word1, setWord1] = useState(""); //
  const [word2, setWord2] = useState(""); //

  const [playernum, setPlayernum] = useState(null);
  const [role, setRole] = useState("");
  const [time, setTime] = useState(20);
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");

  const notify = (message) => {
    toast.error(message);
  };
  const fetchWord = async () => {
    try {
      const response0 = await api().get(`/gameRounds/words/${turnId}`);
      const response = response0.data;
      if (response.length == 3) {
        //correct response
        setWord0(response[0]);
        setWord1(response[1]);
        setWord2(response[2]);
      }
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
      history.push("/lobby"); // redirect back to lobby
    }
  };

  const sendTimeInfo = (timeValue) => {
    setTime(timeValue);
  };
  useEffect(() => {
    if (time == 0) {
      handleChooseWord(word0);
    }
  }, [time]);

  const fetchTurnInfo = async () => {
    try {
      const response0 = await api().get(`/gameRounds/information/${turnId}`);

      const response1 = response0.data;

      var temp = response1.players.length;
      setPlayernum(temp);
      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id !== response1.drawingPlayerId
      );
      const thisPlayer = allPlayers.filter((item) => item.id == curUserId);
      setCurrentUsername(thisPlayer[0].username);

      if (playernum == 4) {
        setUsername1(response1.drawingPlayerName);

        setUsername2(updatedPlayer[0].username);
        setUsername3(updatedPlayer[1].username);
        setUsername4(updatedPlayer[2].username);
      }

      if (playernum == 2) {
        setUsername1(response1.drawingPlayerName);
        setUsername2(updatedPlayer[0].username);
      }

      if (curUserId == response1.drawingPlayerId) {
        setRole("drawingPlayer");
      } else if (curUserId != response1.drawingPlayerId) {
        setRole("guessingPlayer");
      }
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
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnInfo().catch((error) => {
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
  }, [playernum]);

  useEffect(() => {
    fetchWord().catch((error) => {
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
  }, []);

  const displayWords = (
    <div>
      <div>
        <Button
          disabled={word0=="" ? true:false}
          onClick={() => {
            handleChooseWord(word0);
          }}
          style={{
            left: "30px",
            top: "200px",
            position: "absolute",
            fontFamily: "Josefin Sans, sans-serif",
            "font-size": "20px",
            color: "black",
            "margin-bottom": "5px",
            border: "2px solid #000000",
            "background-color": "rgba(193, 210, 240, 0.6)",
          }}
        >
          {word0}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            handleChooseWord(word1);
          }}
          disabled={word1=="" ? true:false}
          style={{
            left: "30px",
            top: "250px",
            position: "absolute",
            fontFamily: "Josefin Sans, sans-serif",
            "font-size": "20px",
            color: "black",
            "margin-bottom": "5px",
            border: "2px solid #000000",
            "background-color": "rgba(193, 210, 240, 0.6)",
          }}
        >
          {word1}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            handleChooseWord(word2);
          }}
          disabled={word2=="" ? true:false}
          style={{
            left: "30px",
            top: "300px",
            position: "absolute",
            fontFamily: "Josefin Sans, sans-serif",
            "font-size": "20px",
            color: "black",
            "margin-bottom": "5px",
            border: "2px solid #000000",
            "background-color": "rgba(193, 210, 240, 0.6)",
          }}
        >
          {word2}
        </Button>
      </div>
    </div>
  );

  const style1 = {
    fontFamily: "Josefin Sans, sans-serif",
    "font-size": "20px",
    color: "black",
    border: "2px solid #000000",
    wordWrap: "break-word",
  };
  const style2 = {
    fontFamily: "Josefin Sans, sans-serif",
    "font-size": "20px",
    color: "black",
    wordWrap: "break-word",
  };

  //display cat and username
  const player1 =
    currentUsername == username1 ? (
      <div className="guessing info">
        <img src={cat1} alt="" />
        <div id="player1" style={style1}>
          {username1}
        </div>
      </div>
    ) : (
      <div className="guessing info">
        <img src={cat1} alt="" />
        <div id="player1" style={style2}>
          {username1}
        </div>
      </div>
    );
  const player2 =
    currentUsername == username2 ? (
      <div className="guessing info">
        <img src={cat2} alt="" />
        <div id="player2" style={style1}>
          {username2}
        </div>
      </div>
    ) : (
      <div className="guessing info">
        <img src={cat2} alt="" />
        <div id="player2" style={style2}>
          {username2}
        </div>
      </div>
    );
  const player3 =
    currentUsername == username3 ? (
      <div className="guessing info">
        <img src={cat3} alt="" />
        <div id="player3" style={style1}>
          {username3}
        </div>
      </div>
    ) : (
      <div className="guessing info">
        <img src={cat3} alt="" />
        <div id="player3" style={style2}>
          {username3}
        </div>
      </div>
    );
  const player4 =
    currentUsername == username4 ? (
      <div className="guessing info">
        <img src={cat4} alt="" />
        <div id="player4" style={style1}>
          {username4}
        </div>
      </div>
    ) : (
      <div className="guessing info">
        <img src={cat4} alt="" />
        <div id="player4" style={style2}>
          {username4}
        </div>
      </div>
    );

  return (
    <div className="guessing body">
      <HeaderInGame />
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
      <div className="guessing content-container">
        <div className="guessing pic">
          <img
            src={cats}
            alt="game background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        {playernum == 4 ? (
          <div>
            <div className="guessing players-container">
              {player1}
              <div className="guessing guessing-container">
                {player2}
                {player3}
                {player4}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="guessing players-container">
              {player1}
              <div className="guessing guessing-container">{player2}</div>
            </div>
          </div>
        )}
        {role == "drawingPlayer" ? (
          <div>
            <h2
              style={{
                left: "30%",
                top: "10px",
                position: "absolute",
                fontFamily: "Josefin Sans, sans-serif",
                color: "black",
              }}
            >
              It's your turn to paint.
              <br></br>
              Choose one word first!
            </h2>
            <div
              style={{
                left: "30%",
                top: "100px",
                position: "absolute",
                fontFamily: "Josefin Sans, sans-serif",
                fontSize: "20px",
              }}
            >
              <Timer
                start={startGuessing}
                stage="select_word"
                sendTimeInfo={sendTimeInfo}
              />
            </div>
            {displayWords}
          </div>
        ) : (
          <div>
            <h2
              style={{
                left: "30%",
                top: "10px",
                width: "400px",
                position: "absolute",
                fontFamily: "Josefin Sans, sans-serif",
                color: "black",
                wordWrap: "break-word",
              }}
            >
              {username1} is choosing a word!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectWord;
