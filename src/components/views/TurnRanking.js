import { useState, useRef, useEffect } from "react";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Guessing.scss";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleNotLogInError } from "../../helpers/api";
import Emoji from "a11y-react-emoji";

const TurnRanking = ({ turnRankInfo, turnId, role, handleConfirmRanking }) => {
  const [isDisabled, setIsDisabled] = useState(false); //button disabled after one click
  //get the username and score

  const handleClick = () => {
    handleConfirmRanking();
    setIsDisabled(true);
  };

  const rankingWhenFourPlayers = (
    <div>
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
          <div className="guessing content">{turnRankInfo.username1}</div>
          <div className="guessing content">{turnRankInfo.score1}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{turnRankInfo.username2}</div>
          <div className="guessing content">{turnRankInfo.score2}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{turnRankInfo.username3}</div>
          <div className="guessing content">{turnRankInfo.score3}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{turnRankInfo.username4}</div>
          <div className="guessing content">{turnRankInfo.score4}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
      </div>
    </div>
  );

  const rankingWhenTwoPlayers = (
    <div>
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
          <div className="guessing content">{turnRankInfo.username1}</div>
          <div className="guessing content">{turnRankInfo.score1}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{turnRankInfo.username2}</div>
          <div className="guessing content">{turnRankInfo.score2}</div>
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
    parseInt(turnRankInfo.userScore) > 0 ? (
      <div>
        <h2
          style={{
            left: "700px",
            top: "80px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
          }}
        >
          You win!
        </h2>
        <Emoji symbol="👀" className="li" />
      </div>
    ) : (
      <div>
        <h2
          style={{
            left: "700px",
            top: "80px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
          }}
        >
          Answer not correct
        </h2>
        <Emoji symbol="👀" label="eyes" />
      </div>
    );
  const waitTnfo = (
    <h3
      style={{
        left: "700px",
        top: "150px",
        position: "absolute",
        "font-family": "Nunito",
        "font-size": "30px",
        color: "black",
      }}
    >
      Please wait a while, others are deciding to continue!
    </h3>
  );

  //the score need to change later
  const content = (
    <div>
      {role === "guessingPlayer" ? (
        <div
          style={{
            left: "650px",
            top: "170px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "20px",
            color: "black",
          }}
        >
          <div>{"Correct word: " + turnRankInfo.targetWord}</div>
          <div>{"Your score: " + turnRankInfo.userScore}</div>
        </div>
      ) : (
        <div
          style={{
            left: "650px",
            top: "170px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "20px",
            color: "black",
          }}
        >
          <div>{"Correct word: " + turnRankInfo.targetWord}</div>
        </div>
      )}
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
      {role === "guessingPlayer" ? title : <></>}
      {isDisabled ? waitTnfo : <></>}
      {content}
      {turnRankInfo.playerNum == 4 ? (
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
