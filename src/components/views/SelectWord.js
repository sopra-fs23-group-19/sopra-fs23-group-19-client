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
import { Spinner } from "components/ui/Spinner";
import { api, handleError } from "../../helpers/api";
import HeaderInGame from "components/views/HeaderInGame";
import { Bounce, ToastContainer, toast } from "react-toastify";
import gameBackground from "styles/images/empty-room.jpg";

const SelectWord = ({ gameId, turnId, handleChooseWord }) => {
  //const [startDrawing, setStartDrawing]=useState(null); //to test the timer, click "apple" button
  //   let startDrawing;
  const history = useHistory();
  const startGuessing = +new Date();
  const curUserId = localStorage.getItem("id");
  const [currentUsername, setCurrentUsername] = useState("");
  //get the room and user information
  //   const [word, setWord] = useState(""); //the chosen word
  const [word0, setWord0] = useState(""); //
  const [word1, setWord1] = useState(""); //
  const [word2, setWord2] = useState(""); //
  //   const [playerNum, setPlayerNum] = useState(2);
  const [playernum, setPlayernum] = useState(null);
  const [role, setRole] = useState("");
  const [time, setTime] = useState(20);
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  //   const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  // console.log(turnId);
  const notify = (message) => {
    toast.error(message);
  };
  const fetchWord = async () => {
    try {
      const response0 = await api().get(`/gameRounds/words/${turnId}`);
      const response = response0.data;
      // const response = ["apple", "bike", "pencil"];
      // console.log(response);
      if (response.length == 3) {
        //correct response
        setWord0(response[0]);
        setWord1(response[1]);
        setWord2(response[2]);
      }
    } catch (error) {
      //   alert(`Something went wrong during get words: \n${handleError(error)}`);
      //   history.push("/lobby"); // redirect back to lobby
      // handleNotLogInError(history, error, "fetching words for drawing Player");
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
      history.push("/lobby"); // redirect back to lobby
    }
  };

  const sendTimeInfo = (timeValue) => {
    // the callback. Use a better name
    // console.log(timeValue);
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
      // console.log(response1.players);
      // console.log(typeof response1.players);
      // console.log(response1.players.length);
      var temp = response1.players.length;
      //   console.log(temp);
      setPlayernum(temp);
      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id !== response1.drawingPlayerId
      );
      const thisPlayer = allPlayers.filter((item) => item.id == curUserId);
      setCurrentUsername(thisPlayer[0].username);

      if (playernum == 4) {
        // setUsername1(response1.players[0].username);
        setUsername1(response1.drawingPlayerName);

        setUsername2(updatedPlayer[0].username);
        setUsername3(updatedPlayer[1].username);
        setUsername4(updatedPlayer[2].username);
        // console.log(username2);
        // console.log(username3);
        // console.log(username4);
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
      // handleNotLogInError(
      //   history,
      //   error,
      //   "fetching Turn info in word selecting phase"
      // );
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnInfo().then(() => {});
  }, [playernum]);

  useEffect(() => {
    fetchWord().then(() => {});
  }, []);

  const displayWords = (
    <div>
      <div>
        <Button
          onClick={() => {
            handleChooseWord(word0);
          }}
          style={{
            left: "50px",
            top: "320px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "20px",
            color: "black",
            "margin-bottom": "5px",
            border: "2px solid #000000",
            "background-color": "rgba(181, 153, 120, 0.5)",
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
          style={{
            left: "50px",
            top: "370px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "20px",
            color: "black",
            "margin-bottom": "5px",
            border: "2px solid #000000",
            "background-color": "rgba(181, 153, 120, 0.5)",
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
          style={{
            left: "50px",
            top: "420px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "20px",
            color: "black",
            "margin-bottom": "5px",
            border: "2px solid #000000",
            "background-color": "rgba(181, 153, 120, 0.5)",
          }}
        >
          {word2}
        </Button>
      </div>
    </div>
  );

  const style1 = {
    "font-family": "Nunito",
    "font-size": "20px",
    color: "black",
    border: "2px solid #000000",
  };
  const style2 = {
    "font-family": "Nunito",
    "font-size": "20px",
    color: "black",
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
    <div>
      <HeaderInGame />
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
          <img src={cats} alt="game background cats" style={{width: "447px", height: "559px", opacity: "20%"}}/>
        </div>
        {playernum == 4 ? (
        <div>
          <div className="guessing players-container">
            {player1}
            <div className="guessing guessing-container">{player2}{player3}{player4}</div>
          </div>
        </div>
        ) : (<></>
        )}
        {
        <div>
          <div className="guessing players-container">
            {player1}
            <div className="guessing guessing-container">{player2}</div>
          </div>
        </div>
        }
      </div>

      
      {role == "drawingPlayer" ? (
        <div>
          <h2
            style={{
              left: "30%",
              top: "180px",
              position: "absolute",
              "font-family": "Nunito",
              color: "black",
            }}
          >
            It's your turn to paint. 
            <br></br>
            Choose one word first!
          </h2>
          <Timer
            start={startGuessing}
            stage="select_word"
            sendTimeInfo={sendTimeInfo}
          />
          {displayWords}
        </div>
      ) : (
        <div>
          <h2
            style={{
              left: "30%",
              top: "180px",
              position: "absolute",
              "font-family": "Nunito",
              color: "black",
            }}
          >
            {username1} is choosing a word!
          </h2>
        </div>
      )}
    </div>
  );
};
export default SelectWord;
