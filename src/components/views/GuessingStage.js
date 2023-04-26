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
// import { api, handleNotLogInError } from "../../helpers/api";

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

const GuessingStage = ({ gameInfo, turnId, painting, handleSubmitAnswer }) => {
  //const [startGuessing, setStartGuessing]=useState(1); //to test the timer, set to 1
  const history = useHistory();
  const curUserId = localStorage.getItem("id");

  const [isDisabled, setIsDisabled] = useState(false); //button disabled after one click

  const startGuessing = +new Date();

  const [answer, setAnswer] = useState(""); //the answer player guesses

  const [imageData, setImageData] = useState(painting);
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
  }, []);

  const handleClick = () => {
    handleSubmitAnswer(answer);
    setIsDisabled(true);
  };

  const answerBox = (
    <div>
      <div className="guessing container">
        <div className="guessing form">
          <FormField
            label="Answer"
            value={answer}
            role={gameInfo.role}
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
        {gameInfo.username1}
      </div>
    </div>
  );
  const player2 = (
    <div className="guessing info">
      <img src={cat2} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {gameInfo.username2}
      </div>
    </div>
  );
  const player3 = (
    <div className="guessing info">
      <img src={cat3} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {gameInfo.username3}
      </div>
    </div>
  );
  const player4 = (
    <div className="guessing info">
      <img src={cat4} alt="" />
      <div
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {gameInfo.username4}
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
      {gameInfo.playerNum == 4 ? (
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
          {/* <div>{rankingWhenFourPlayers}</div> */}
        </div>
      ) : (
        <div>
          <div style={{ left: "40px", top: "170px", position: "absolute" }}>
            {player1}
          </div>
          <div style={{ left: "900px", top: "170px", position: "absolute" }}>
            {player2}
          </div>
          {/* <div>{rankingWhenTwoPlayers}</div> */}
        </div>
      )}
      {startGuessing ? (
        <div
          style={{
            left: "350px",
            top: "160px",
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
      {startGuessing && gameInfo.role === "guessingPlayer" ? (
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
                // history.push("/ranking"); //
                // handleSubmitAnswer(answer);
                handleClick();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            left: "350px",
            top: "160px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
          }}
        >
          Guessing stage.
        </div>
      )}
      {isDisabled ? waitTnfo : <></>}
      <div style={{ left: "200px", top: "330px", position: "absolute" }}>
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
