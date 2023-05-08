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
import { api, handleNotLogInError } from "../../helpers/api";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import HeaderInGame from "components/views/HeaderInGame";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";

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
      {/* <div className='guessing button-container'>
            <Button
                disabled={props.role=="drawingPlayer"}
                onClick={() => {
                    history.push('/ranking');
                }}
            >
                Submit
            </Button>
        </div> */}
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
      handleNotLogInError(
        history,
        error,
        "fetching game turn in guessing phase"
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnInfo();
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
    // <h3
    //   style={{
    //     left: "700px",
    //     top: "100px",
    //     position: "absolute",
    //     "font-family": "Nunito",
    //     "font-size": "30px",
    //     color: "black",
    //     width: "200px",
    //   }}
    // >
    //   Please wait a while!
    // </h3>
    <div
      style={{
        width: "32em",
        left: "900px",
        top: "500px",
        position: "absolute",
      }}
    >
      <div>
        <SpinnerBouncing />
      </div>
      <div
        style={{
          "font-family": "Nunito",
          "font-size": "20px",
          color: "black",
        }}
      >
        {"Please wait a while"}
      </div>
    </div>
  );

  return (
    <BaseContainer>
      <HeaderInGame />
      <div
        className="lobby pic"
        style={{ opacity: "40%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      {playerNum == 4 ? (
        <div>
          <div style={{ left: "40px", top: "170px", position: "absolute" }}>
            {player1}
          </div>
          <div style={{ left: "900px", top: "170px", position: "absolute" }}>
            {player2}
          </div>
          <div style={{ left: "1100px", top: "170px", position: "absolute" }}>
            {player3}
          </div>
          <div style={{ left: "1300px", top: "170px", position: "absolute" }}>
            {player4}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ left: "40px", top: "170px", position: "absolute" }}>
            {player1}
          </div>
          <div style={{ left: "900px", top: "170px", position: "absolute" }}>
            {player2}
          </div>
        </div>
      )}
      {startGuessing ? (
        <div
          style={{
            left: "350px",
            top: "100px",
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
      ) : (
        <></>
      )}
      {startGuessing && role === "guessingPlayer" ? (
        <div>
          {answerBox}
          <div
            className="guessing button-container"
            style={{ left: "1150px", top: "440px", position: "absolute" }}
          >
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
      ) : (
        <></>
      )}
      {isDisabled ? waitTnfo : <></>}
      <div style={{ left: "200px", top: "200px", position: "absolute" }}>
        <canvas
          id="showingBoard"
          width="500px"
          height="600px"
          style={{ border: "2px solid #000000", backgroundColor: "#FFFFFF" }}
        ></canvas>
      </div>
    </BaseContainer>
  );
};
export default GuessingStage;
