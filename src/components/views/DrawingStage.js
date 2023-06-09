import { useState, useRef, useEffect } from "react";
import Timer from "components/views/Timer";
import cats from "styles/images/cats2.png";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";
import "styles/views/Guessing.scss";
import DrawingBoard from "./DrawingBoard";
import { useHistory } from "react-router-dom";
import { api, handleError } from "../../helpers/api";
import { useInterval } from "helpers/hooks";
import HeaderInGame from "components/views/HeaderInGame";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer";

const DrawingStage = ({
  gameId,
  turnId,
  handleUpdatePainting,
  handleSubmitPainting,
}) => {
  const curUserId = localStorage.getItem("id");
  const startDrawing = +new Date();

  const history = useHistory();

  //get the room and user information

  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [isUpdating, setIsUpdating] = useState(true);
  const [currentUsername, setCurrentUsername] = useState("");

  const [word, setWord] = useState("");
  const [role, setRole] = useState("");
  const [time, setTime] = useState(120);

  const [playerNum, setPlayerNum] = useState(2);

  const [imageData, setImageData] = useState("");
  const sendTimeInfo = (timeValue) => {
    // the callback. Use a better name
    setTime(timeValue);
  };
  function handleUpdate(painting) {
    handleUpdatePainting(painting);
  }
  const [playOn] = useSound(btClick);
  function getImage() {
    const myCanvas = document.getElementById("showingBoard");
    const myContext = myCanvas.getContext("2d");
    const img = new Image();
    if (imageData) {
      img.src = imageData;

      img.onload = () => {
        myContext.drawImage(img, 0, 0);
      };
    }
  }
  useEffect(() => {
    if (role == "guessingPlayer") {
      getImage();
    }
  }, [imageData]);
  function handleDoSubmit(painting) {
    playOn();
    handleSubmitPainting(painting);
  }
  const notify = (message) => {
    toast.error(message);
  };

  //fetch game Turn information
  const fetchTurnInfo = async () => {
    try {
      const response0 = await api().get(`/gameRounds/information/${turnId}`);
      const response1 = response0.data;

      if (parseInt(curUserId) == parseInt(response1.drawingPlayerId)) {
        setRole("drawingPlayer");
      } else if (parseInt(curUserId) != parseInt(response1.drawingPlayerId)) {
        setRole("guessingPlayer");
      }
      setPlayerNum(response1.players.length);
      setWord(response1.targetWord);
      setImageData(response1.image);

      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id != response1.drawingPlayerId
      );
      const thisPlayer = allPlayers.filter((item) => item.id == curUserId);
      setCurrentUsername(thisPlayer[0].username);

      if (playerNum == 4) {
        setUsername1(response1.drawingPlayerName);

        setUsername2(updatedPlayer[0].username);
        setUsername3(updatedPlayer[1].username);
        setUsername4(updatedPlayer[2].username);
      }

      if (playerNum == 2) {
        setUsername1(response1.drawingPlayerName);
        setUsername2(updatedPlayer[0].username);
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
        setIsUpdating(false);
      }
      history.push("/lobby");
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
  }, [playerNum]);

  useInterval(
    async () => {
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
    },
    isUpdating && role == "guessingPlayer" ? 1000 : null
  );

  const style1 = {
    "font-family": "Josefin Sans",
    "font-size": "20px",
    color: "black",
    border: "2px solid #000000",
    wordWrap: "break-word",
  };
  const style2 = {
    "font-family": "Josefin Sans",
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

  const drawingPlayerContent = () => {
    const content = (
      <div
        style={{
          left: "350px",
          top: "120px",
          width: "400px",
          position: "absolute",
          "fontFamily": "Josefin Sans, sans-serif",
          "font-size": "30px",
          color: "black",
        }}
      >
        Drawing stage
        <Timer
          start={startDrawing}
          stage="drawing"
          sendTimeInfo={sendTimeInfo}
        />
      </div>
    );
    return content;
  };
  const guessingPlayerContent = () => {
    const content = (
      <div>
        <div
          style={{
            left: "200px",
            top: "180px",
            position: "absolute",
            "fontFamily": "Josefin Sans, sans-serif",
            "font-size": "30px",
            color: "black",
            width: "400px",
            wordWrap: "break-word",
          }}
        >
          Drawing stage.
          <br></br>
          {username1} is painting!
        </div>
        <div style={{ left: "80px", top: "300px", position: "absolute" }}>
          <canvas
            id="showingBoard"
            width="500px"
            height="600px"
            style={{ border: "2px solid #000000", backgroundColor: "#FFFFFF" }}
          ></canvas>
        </div>
      </div>
    );
    return content;
  };

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
        {playerNum == 4 ? (
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
      </div>
      {role === "drawingPlayer"
        ? drawingPlayerContent()
        : guessingPlayerContent()}
      {startDrawing && role === "drawingPlayer" ? (
        <div>
          <div
            style={{
              left: "200px",
              top: "120px",
              position: "absolute",
              "fontFamily": "Josefin Sans, sans-serif",
              "font-size": "20px",
              color: "black",
              border: "2px solid #000000",
              padding:"10px",
              "borderRadius": "0.75em",
              "background-color": "rgba(193, 210, 240, 0.6)",
            }}
          >
            chosen word: <br />
            {word}
          </div>

          <DrawingBoard
            role={"drawingPlayer"}
            time={time}
            handleDoSubmit={handleDoSubmit}
            handleUpdate={handleUpdate}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default DrawingStage;
