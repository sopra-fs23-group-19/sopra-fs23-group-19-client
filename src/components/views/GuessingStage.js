import { useState, useRef, useEffect } from "react";
import Timer from "components/views/Timer";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Guessing.scss";
import DrawingBoard from "./DrawingBoard";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import PropTypes from "prop-types";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";
import { api, handleError } from "../../helpers/api";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import HeaderInGame from "components/views/HeaderInGame";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer"

const FormField = (props) => {
  return (
    <div className="guessing field">
      <label className="guessing label">{props.label}</label>
      <input
        className="guessing input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const GuessingStage = ({ gameId, turnId, handleSubmitAnswer }) => {
  //const [startGuessing, setStartGuessing]=useState(1); //to test the timer, set to 1
  const history = useHistory();
  const curUserId = localStorage.getItem("id");
  const [currentUsername, setCurrentUsername] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); //button disabled after one click
  //   const location = useLocation();
  //   const url = location.state.url;
  //   const url = location.state.url; ///use base64 image here
  //   const startGuessing = location.state.startGuessing;
  const startGuessing = +new Date();
  //get the room and user information
  //   const role = "guessingPlayer";
  const [answer, setAnswer] = useState(""); //the answer player guesses
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  // const [score1, setScore1] = useState("");
  // const [score2, setScore2] = useState("");
  // const [score3, setScore3] = useState("");
  // const [score4, setScore4] = useState("");
  const [playerNum, setPlayerNum] = useState(2);
  const [imageData, setImageData] = useState("");
  const [role, setRole] = useState("");
  const [time, setTime] = useState(60);
  function getImage() {
    const myCanvas = document.getElementById("showingBoard");
    const myContext = myCanvas.getContext("2d");
    const img = new Image();
    // console.log("why");
    img.src = imageData;
    img.onload = () => {
      myContext.drawImage(img, 0, 0);
    };
  }
  const [playOn] = useSound(btClick);
  const sendTimeInfo = (timeValue) => {
    // the callback. Use a better name
    // console.log(timeValue);
    setTime(timeValue);
  };
  const notify = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    if (time == 0) {
      handleSubmitAnswer(answer);
    }
  }, [time]);

  useEffect(() => {
    getImage();
  }, [imageData]);

  const handleClick = () => {
    playOn();
    handleSubmitAnswer(answer);
    setIsDisabled(true);
  };

  useEffect(() => {
    let ignore = true;
    if(ignore){
      const downloadButton = document.querySelector("#download");
        if(role=="drawingPlayer"){
          downloadButton.disabled = false;
        }else{
          downloadButton.disabled = true;
        }
    }
  },[role])

  function download(selector) {
    const canvas = document.querySelector(selector);
    const img = document.createElement("a");

    img.href = canvas.toDataURL();
    img.download = "your drawing";

    const event = new MouseEvent("click");
    img.dispatchEvent(event);
  }

  const fetchTurnInfo = async () => {
    try {
      const response0 = await api().get(`/gameRounds/information/${turnId}`);
      const response1 = response0.data;

      setPlayerNum(response1.players.length);
      setImageData(response1.image);
      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id !== response1.drawingPlayerId
      );
      const thisPlayer = allPlayers.filter((item) => item.id == curUserId);
      setCurrentUsername(thisPlayer[0].username);

      if (playerNum == 4) {
        // setUsername1(response1.players[0].username);
        setUsername1(response1.drawingPlayerName);

        setUsername2(updatedPlayer[0].username);
        setUsername3(updatedPlayer[1].username);
        setUsername4(updatedPlayer[2].username);
      }

      if (playerNum == 2) {
        setUsername1(response1.drawingPlayerName);
        setUsername2(updatedPlayer[0].username);
      }

      if (parseInt(curUserId) == parseInt(response1.drawingPlayerId)) {
        setRole("drawingPlayer");
        setIsDisabled(true);
      } else if (parseInt(curUserId) != parseInt(response1.drawingPlayerId)) {
        setRole("guessingPlayer");
      }
    } catch (error) {
      // handleNotLogInError(
      //   history,
      //   error,
      //   "fetching game turn in guessing phase"
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
  }, [playerNum]);

  const answerBox = (
    <div>
      <div className="guessing container">
        <div className="guessing form">
          <FormField
            label="Answer"
            value={answer}
            role={role}
            onChange={(un) => setAnswer(un)}
          />
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    // if (props.start)
    if (time <= 0) {
      handleSubmitAnswer(answer);
    }
  }, [time]);

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

  const waitTnfo = (
    <div
      style={{
        width: "13em",
        left: "45%",
        top: "1em",
        position: "absolute",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          "font-family": "Nunito",
          "font-size": "20px",
          color: "black",
        }}
      >
        {"Please wait a while"}
      </div>
      <div>
        <SpinnerBouncing />
      </div>
    </div>
  );

  return (
    <div>
      <HeaderInGame />
      <BgmPlayer/>
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
        {playerNum == 4 ? (
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
        {(startGuessing && role === "guessingPlayer") ? (
          <div className="guessing box-container">
            {answerBox}
            <div className='guessing button-container' style={{right: "45%", top:"120px", position: "absolute"}}>
            <Button
              // disabled={role === "drawingPlayer"}
              disabled={isDisabled}
              onClick={() => {
                handleClick();
              }}
            >
              Submit
            </Button>
            </div>
          </div>
        ) : (<></>)}

        {startGuessing ? (
        <div
          style={{
            left: "15%",
            top: "20px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
          }}
        >
          Guessing stage
          <Timer
            start={startGuessing}
            stage="guessing"
            sendTimeInfo={sendTimeInfo}
          />
        </div>
        ) : (<></>)}
        <div style={{ left: "0px", top: "150px", position: "absolute" }}>
        <canvas
          id="showingBoard"
          width="500px"
          height="600px"
          style={{ border: "2px solid #000000", backgroundColor: "#FFFFFF"}}
        ></canvas>
          <Button
            onClick={() => download("#showingBoard")}
            style={{ border: "2px solid #000000" }}
            id="download"
          >
              download
            </Button>

        </div>
      </div>
      
      
      {isDisabled ? waitTnfo : <></>}
    </div>
  );
};
export default GuessingStage;
