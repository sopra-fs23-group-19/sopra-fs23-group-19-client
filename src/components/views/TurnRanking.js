import { useState, useRef, useEffect } from "react";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Guessing.scss";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleNotLogInError } from "../../helpers/api";
import Emoji from "a11y-react-emoji";
import "styles/views/Rank.scss";
import { SpinnerBouncing } from "components/ui/SpinnerBouncing";
import wingame from "styles/images/gif/cat_happy.gif";
import losegame from "styles/images/gif/cat_unhappy.gif";
const TurnRanking = ({ gameId, turnId, handleConfirmRanking }) => {
  const [isDisabled, setIsDisabled] = useState(false); //button disabled after one click
  const history = useHistory();
  //get the username and score
  const curUserId = localStorage.getItem("id");
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [score3, setScore3] = useState("");
  const [score4, setScore4] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  const [role, setRole] = useState("");
  const [playerNum, setPlayerNum] = useState(2);
  const fetchTurnScore = async () => {
    try {
      const response0 = await api().get(`/gameRounds/ranks/${turnId}`);
      const response = response0.data;
      const updatedPlayer = response.filter((item) => item.id == curUserId);
      setUserScore(parseInt(updatedPlayer[0].currentScore));
      const updatedPlayer1 = response.filter(
        (item) => item.id != drawingPlayerId
      );
      setPlayerNum(response.length);
      if (playerNum == 4) {
        setUsername1(updatedPlayer1[0].username);
        setUsername2(updatedPlayer1[1].username);
        setUsername3(updatedPlayer1[2].username);
        // setUsername4(response[3].username);
        setScore1(updatedPlayer1[0].currentScore);
        setScore2(updatedPlayer1[1].currentScore);
        setScore3(updatedPlayer1[2].currentScore);
        // setScore4(response[3].currentScore);
      }

      if (playerNum == 2) {
        setUsername1(updatedPlayer1[0].username);
        // setUsername2(response[1].username);
        setScore1(updatedPlayer1[0].currentScore);
        // setScore2(response[1].currentScore);
      }
    } catch (error) {
      //   alert(
      //     `Something went wrong during getting turn ranking information: \n${handleError(
      //       error
      //     )}`
      //   );
      handleNotLogInError(history, error, "fetching turn ranking information");
      history.push("/lobby"); // redirect back to lobby
    }
  };
  // useEffect(() => {
  //   //let ignore = true;
  //   if(username1=="" || username2==""){
  //     fetchTurnScore();
  //   }
  //   // return() => {
  //   //   ignore = false;
  //   // }
  // }, [playerNum]);
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
      setDrawingPlayerId(response1.drawingPlayerId);
      setTargetWord(response1.targetWord);
    } catch (error) {
      handleNotLogInError(
        history,
        error,
        "fetching turn information in drawing phase"
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnScore();
    fetchTurnInfo();
  }, [playerNum, turnId]);

  const handleClick = () => {
    handleConfirmRanking();
    setIsDisabled(true);
  };

  const rankingWhenFourPlayers = (
    <div id = "rankFour">
      <div
        className="guessing score-list"
        style={{ left: "550px", top: "250px", position: "absolute" }}
      >
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

  const rankingWhenTwoPlayers = (
    <div id="rankTwo">
      <div
        className="guessing score-list"
        style={{ left: "550px", top: "250px", position: "absolute" }}
      >
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
    // targetWord === userAnswer ? (
    parseInt(userScore) > 0 ? (
      <div>
        <Emoji symbol="🥳" className="rank li" />
        <h2
          style={{
            left: "640px",top: "80px",position: "absolute",width:"700px",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
            width:"300px"
          }}
        >
          You win!
        </h2>
        <img className="rank gif" src={wingame} />
      </div>
    ) : (
      <div>
        <Emoji symbol="🙁" className="rank li"/>
        <h2
          style={{
            left: "640px",top: "80px",position: "absolute",width:"700px",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
            width:"300px"
          }}
        >
          Wrong answer
        </h2>
        <img className="rank gif" src={losegame} />
      </div>
    );
  const waitTnfo = (
    <div
    style={{width: "32em", left:"540px",top:"500px",position:"absolute"}}>
      <div className="rank spinner">
        <SpinnerBouncing />
      </div>
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
        left: "650px",
        top: "170px",
        position: "absolute",
        "font-family": "Nunito",
        "font-size": "20px",
        color: "black",
        width:"200px"
      }}
    >
      <div>{"Correct word: " + targetWord}</div>
      <div>{"Your score: + " + userScore}</div>
    </div>
  );
  return (
    <BaseContainer>
      <div
        className="guessing pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      {role == "guessingPlayer" ? (
        title
      ) : (
        <div>
          <h2
            style={{
              left: "680px",top: "80px",position: "absolute",width:"700px",
              "font-family": "Nunito",
              "font-size": "30px",
              color: "black",
              width:"300px"
            }}
          >
            Turn End!
          </h2>
          <div
            style={{
              left: "560px",
              top: "150px",
              position: "absolute",
              "font-family": "Nunito",
              "font-size": "20px",
              color: "black",
              width:"500px"
            }}
          >
            Scores obtained by guessing players in this turn:
          </div>
          <Emoji symbol="📢" className="rank li" />
        </div>
      )}
      {isDisabled ? waitTnfo : <></>}
      {role == "guessingPlayer" ? content : <></>}
      {playerNum == 4 ? (
        <div>{rankingWhenFourPlayers}</div>
      ) : (
        <div>{rankingWhenTwoPlayers}</div>
      )}
      <div
        className="guessing button-container"
        style={{
          left: "550px",
          top: "580px",
          position: "absolute",
          width: "480px",
          height: "50px",
        }}
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
    </BaseContainer>
  );
};
export default TurnRanking;
