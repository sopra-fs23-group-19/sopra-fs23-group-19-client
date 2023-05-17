import { useState, useRef, useEffect } from "react";
import cats from "styles/images/cats2.png";
import "styles/views/Guessing.scss";
import Timer from "components/views/Timer";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "../../helpers/api";
// import Emoji from "a11y-react-emoji";
import Emoji from "components/ui/Emoji";
import HeaderInGame from "components/views/HeaderInGame";
import "styles/views/Rank.scss";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import wingame from "styles/images/gif/cat_happy.gif";
import losegame from "styles/images/gif/cat_unhappy.gif";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer"

const TurnRanking = ({ gameId, turnId, handleConfirmRanking }) => {
  const [isDisabled, setIsDisabled] = useState(false); //button disabled after one click
  const history = useHistory();
  const startGuessing = +new Date();
  //get the username and score
  const curUserId = localStorage.getItem("id");
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");

  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [score3, setScore3] = useState("");

  const [targetWord, setTargetWord] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  const [drawingPlayerName, setDrawingPlayerName] = useState("");
  const [drawingPlayerScore, setDrawingPlayerScore] = useState(0);
  const [role, setRole] = useState("drawingPlayer");
  const [playerNum, setPlayerNum] = useState(2);
  const [imageData, setImageData] = useState("");
  const [time, setTime] = useState(10);
  const [correctAnswer, setCorrectAnswer] = useState(10);

  const fetchTurnScore = async () => {
    try {
      const response0 = await api().get(`/gameRounds/ranks/${turnId}`);
      const response = response0.data;
      console.log(response);
      const guessingPlayers = response.rankedList;
      setDrawingPlayerId(response.drawingPlayerId.toString());
      setDrawingPlayerName(response.drawingPlayerName);
      setDrawingPlayerScore(response.drawingPlayerScore);
      setPlayerNum(guessingPlayers.length +1);
      setImageData(response.image);
      setTargetWord(response.targetWord);
      if (parseInt(curUserId) == parseInt(response.drawingPlayerId)) {
        setRole("drawingPlayer");
      } else{
        setRole("guessingPlayer");
        const curUser = guessingPlayers.filter((item) => item.id == curUserId);
        setUserScore(curUser[0].currentScore);
      }

      setCorrectAnswer(response.correctAnswers);
      if (playerNum == 4) {
        setUsername1(guessingPlayers[0].username);
        setUsername2(guessingPlayers[1].username);
        setUsername3(guessingPlayers[2].username);
        setScore1(guessingPlayers[0].currentScore);
        setScore2(guessingPlayers[1].currentScore);
        setScore3(guessingPlayers[2].currentScore);
      }
      if (playerNum == 2) {
        setUsername1(guessingPlayers[0].username);
        setScore1(guessingPlayers[0].currentScore);
      }
    } catch (error) {
      // handleNotLogInError(history, error, "fetching turn ranking information");
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
  const notify = (message) => {
    toast.error(message);
  };

  function getImage() {
    const myCanvas = document.getElementById("showingBoard");
    const myContext = myCanvas.getContext("2d");
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      myContext.drawImage(img, 0, 0, 200, 240);
    };
  }
  useEffect(() => {
    getImage();
  }, [imageData]);

  const sendTimeInfo = (timeValue) => {
    // the callback. Use a better name
    // console.log(timeValue);
    setTime(timeValue);
  };

  useEffect(() => {
    if (time == 0) {
      handleConfirmRanking();
      setIsDisabled(true);
    }
  }, [time]);

  // const fetchTurnInfo = async () => {
  //   try {
  //     const response0 = await api().get(`/gameRounds/information/${turnId}`);
  //     const response1 = response0.data;
  //     if (parseInt(curUserId) == parseInt(response1.drawingPlayerId)) {
  //       setRole("drawingPlayer");
  //     } else if (parseInt(curUserId) != parseInt(response1.drawingPlayerId)) {
  //       setRole("guessingPlayer");
  //     }
  //     setTargetWord(response1.targetWord);
  //   } catch (error) {
  //     handleNotLogInError(
  //       history,
  //       error,
  //       "fetching turn information in drawing phase"
  //     );
  //     history.push("/lobby"); // redirect back to lobby
  //   }
  // };

  useEffect(() => {
    fetchTurnScore();
  }, [playerNum, turnId, rankingWhenFourPlayers, rankingWhenTwoPlayers]);

  const handleClick = () => {
    playOn();
    handleConfirmRanking();
    setIsDisabled(true);
  };

  const [playOn] = useSound(btClick);
  // const [playWin] = useSound(winSound);
  // const [playLose] = useSound(loseSound);
  let rankingWhenFourPlayers = (
    <div id="rankFour">
      <div className="guessing score-list">
        <div className="guessing score-container">
          <div className="guessing rank-title" style={{}}>
            Username
          </div>
          <div className="guessing rank-title">Score</div>
        </div>
        <div className="guessing line"></div>
        <div className="guessing score-container">
          <div className="guessing content">{username1}</div>
          <div className="guessing content">{score1}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username2}</div>
          <div className="guessing content">{score2}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username3}</div>
          <div className="guessing content">{score3}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
      </div>
    </div>
  );

  let rankingWhenTwoPlayers = (
    <div id="rankTwo">
      <div className="guessing score-list">
        <div className="guessing score-container">
          <div className="guessing rank-title" style={{}}>
            Username
          </div>
          <div className="guessing rank-title">Score</div>
        </div>
        <div className="guessing line"></div>
        <div className="guessing score-container">
          <div className="guessing content">{username1}</div>
          <div className="guessing content">{score1}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
      </div>
    </div>
  );

  const title =
    role == "guessingPlayer" ? (
    (parseInt(userScore) > 0) ? (
      <div>
        <div className="guessing title1">
          <Emoji symbol="🥳" className="guessing li"/>
          You win!
          <img className="rank gif" src={wingame} />
        </div>
      </div>
    ) : (
      <div>
        <div className="guessing title1">
          <Emoji symbol="🙁" className="guessing li"/>
          Wrong answer
          <img className="rank gif" src={losegame}/>
        </div>
      </div>
    )):(
      <div>
        <div className="guessing title1">
          <Emoji symbol="📢" className="guessing li"/>
          Turn End!
        </div>
      </div>
    );

  const before_rank = (
      (role=="guessingPlayer")?(
        <div
          style={{
              "textAlign":"center", left: "10%", top: "0px", position: "relative",
              "font-family": "Nunito", "font-size": "20px", color: "black", width: "80%"}}
          >
            Drawing player {drawingPlayerName} got {drawingPlayerScore} points.
            <br></br>
            {(playerNum==2)?("Score obtained by the guessing player in this turn:"
            ):("Scores obtained by guessing players in this turn:")}
        </div>
      ):(
        <div
            style={{
              "textAlign":"center", left: "10%", top: "0px", position: "relative",
              "font-family": "Nunito", "font-size": "20px", color: "black", width: "80%"}}
          >
            You got {drawingPlayerScore} points in this turn
            <br></br>
            {(playerNum==2)?("Score obtained by the guessing player in this turn:"
            ):("Scores obtained by guessing players in this turn:")}
        </div>
      )
  );
  
  const waitTnfo = (
    <div
      style={{
        width: "60%",
        "minWidth":"30em",
        "textAlign":"center",
        left: "20%",
        top: "70px",
        position: "relative",
      }}
    >
      <div className="rank spinner">
        <SpinnerBouncing />
      </div>
      {/* <Timer
          start={startGuessing}
          stage="turn_ranking"
          sendTimeInfo={sendTimeInfo}
      /> */}
      <div
        style={{
          "font-family": "Nunito",
          "font-size": "20px",
          color: "black",
        }}
      >
        {"Please wait a while, others are deciding to continue!"}
      </div>
    </div>
  );

  //the score need to change later
  const content = (
    <div
      style={{
        left: "20%",
        textAlign:"center",
        top: "0px",
        position: "absolute",
        "font-family": "Nunito",
        "font-size": "20px",
        color: "black",
        width: "60%",
        "minWidth":"10em"
      }}
    >
      <div>{"Correct word: " + targetWord}</div>
      <div>{"Your score: + " + userScore}</div>
    </div>
  );
  const content_drawing = (
    <div
      style={{
        left: "20%",
        textAlign:"center",
        top: "0px",
        position: "absolute",
        "font-family": "Nunito",
        "font-size": "20px",
        color: "black",
        width: "60%",
        "minWidth":"10em"
      }}
    >
      <div>{"Correct word: " + targetWord}</div>
      {(correctAnswer==1 || correctAnswer==0)?(
        <div>{correctAnswer + " player correctly answered!"}</div>
      ):(<div>{correctAnswer + " players correctly answered!"}</div>)}
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
        {title}
        <div className="rank image-table-container">
          <div className="rank left-container">
          {role == "guessingPlayer" ? content : content_drawing}
          <div className="rank image-container">
            <canvas id="showingBoard" width="200px" height="240px"
            style={{ border: "2px solid #000000", backgroundColor: "#FFFFFF"}}
            ></canvas>
          </div>
          </div>
          <div className="rank right-container">
            {before_rank}
            {playerNum == 4 ? (
              <div>{rankingWhenFourPlayers}</div>
            ) : (
              <div>{rankingWhenTwoPlayers}</div>
            )}
          </div>
        </div>
        <div className="guessing button-container"
        style={{
          left: "40%", top: "80px", position: "relative",
          width: "20%", "minWidth":"15em", height: "50px"}}
        >
        <Button
          disabled={isDisabled}
          onClick={() => {
            handleClick();
          }}
          width="100%"
          style={{ "margin-top": "5px", border: "2px solid #000000" }}
        >
          Continue
        </Button>
        </div>
        <div className="rank timer-container">
        <Timer
          start={startGuessing}
          stage="turn_ranking"
          sendTimeInfo={sendTimeInfo}
        />
        </div>
        {isDisabled ? waitTnfo : <></>}
      </div>
      
    </div>
  );
};
export default TurnRanking;
