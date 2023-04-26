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
  // const fetchTurnScore = async () => {
  //   try {
  //     const response0 = await api().get(`/gameRounds/ranks/${turnId}`);
  //     const response = response0.data;
  //     //response=
  //     //   [
  //     //     {
  //     //         "id": 2,
  //     //         "username": "test",
  //     //         "token": "30e578e3-4329-41aa-8a16-d51f5d5294c2",
  //     //         "status": "ISPLAYING",
  //     //         "creationDate": "2023-04-24T07:51:30.741+00:00",
  //     //         "bestScore": 0,
  //     //         "totalScore": 0,
  //     //         "currentScore": 0,
  //     //         "guessingWord": null,
  //     //         "currentGameScore": 0
  //     //     },
  //     //     {
  //     //         "id": 1,
  //     //         "username": "test1",
  //     //         "token": "815bbb7e-eec9-466f-9132-a7c933f201d3",
  //     //         "status": "ISPLAYING",
  //     //         "creationDate": "2023-04-24T07:51:24.545+00:00",
  //     //         "bestScore": 0,
  //     //         "totalScore": 0,
  //     //         "currentScore": 0,
  //     //         "guessingWord": null,
  //     //         "currentGameScore": 0
  //     //     }
  //     // ]

  //     if (playerNum == 4) {
  //       setScore1(response[0].currentScore);
  //       setScore2(response[1].currentScore);
  //       setScore3(response[2].currentScore);
  //       setScore4(response[3].currentScore);
  //     }

  //     if (playerNum == 2) {
  //       setScore1(response[0].currentScore);
  //       setScore2(response[1].currentScore);
  //     }
  //   } catch (error) {
  //     //   alert(
  //     //     `Something went wrong during getting turn ranking information: \n${handleError(
  //     //       error
  //     //     )}`
  //     //   );
  //     handleNotLogInError(
  //       history,
  //       error,
  //       "fetching game turn scores in guessing phase"
  //     );
  //     history.push("/lobby"); // redirect back to lobby
  //   }
  // };
  // useEffect(() => {
  //   fetchTurnScore();
  // }, [score1]);

  const handleClick = () => {
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

  //display cat and username
  const player1 = (
    <div className="guessing info">
      <img src={cat1} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {username1}
      </div>
    </div>
  );
  const player2 = (
    <div className="guessing info">
      <img src={cat2} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {username2}
      </div>
    </div>
  );
  const player3 = (
    <div className="guessing info">
      <img src={cat3} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {username3}
      </div>
    </div>
  );
  const player4 = (
    <div className="guessing info">
      <img src={cat4} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {username4}
      </div>
    </div>
  );

  const waitTnfo = (
    <h3
      style={{
        left: "700px",
        top: "100px",
        position: "absolute",
        "font-family": "Nunito",
        "font-size": "30px",
        color: "black",
        width:"200px"
      }}
    >
      Please wait a while, others are answering!
    </h3>
  );
  return (
    <BaseContainer>
      {/* <Header /> */}
      <div
        className="lobby pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
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
            top: "40px",
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
      {/* {isDisabled ? waitTnfo : <></>} */}
      <div style={{ left: "200px", top: "150px", position: "absolute" }}>
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
