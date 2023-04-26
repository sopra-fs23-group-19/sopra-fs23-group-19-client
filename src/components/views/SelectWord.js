import { useState, useRef, useEffect } from "react";
import Timer from "components/views/Timer";
import cats from "styles/images/cats2.png";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";
import Header from "components/views/Header";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Guessing.scss";
import DrawingBoard from "./DrawingBoard";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { Spinner } from "components/ui/Spinner";
import { api, handleNotLogInError } from "../../helpers/api";

const SelectWord = ({ gameInfo,turnId, handleChooseWord }) => {
  //const [startDrawing, setStartDrawing]=useState(null); //to test the timer, click "apple" button
  //   let startDrawing;
  const history = useHistory();

  const displayWords = (
    <div>
      <div>
        <Button
          // need to connect to backend later
          onClick={() => {
            // console.log(startDrawing);
            // setWord("apple"); //need to be modified
            // setWord(word0);
            handleChooseWord(gameInfo.word0);
            // history.push({
            //   pathname: "/drawingStage",
            //   state: { startDrawing: startDrawing, word: word },
            // });
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
          {/* apple */}
          {gameInfo.word0}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            // setWord(word1);
            handleChooseWord(gameInfo.word1);
          }} //need to connect to backend later
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
          {/* banana */}
          {gameInfo.word1}
        </Button>
      </div>
      <div>
        <Button
          //onClick={() => goToDrawing()} need to connect to backend later
          onClick={() => {
            // setWord(word2);
            handleChooseWord(gameInfo.word2);
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
          {/* orange */}
          {gameInfo.word2}
        </Button>
      </div>
    </div>
  );

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

  // //ranking component
  // const rankingWhenFourPlayers = (
  //   <div>
  //     <div className="guessing score-list">
  //       <div className="guessing score-container">
  //         <div className="guessing rank-title" style={{}}>
  //           Username
  //         </div>
  //         <div className="guessing rank-title">Score</div>
  //       </div>
  //       <div className="guessing line"></div>
  //       <div className="guessing score-container">
  //         <div className="guessing content">{username1}</div>
  //         <div className="guessing content">{score1}</div>
  //       </div>
  //       <div
  //         className="guessing line"
  //         style={{ border: "2px solid #ad9a66" }}
  //       ></div>
  //       <div className="guessing score-container">
  //         <div className="guessing content">{username2}</div>
  //         <div className="guessing content">{score2}</div>
  //       </div>
  //       <div
  //         className="guessing line"
  //         style={{ border: "2px solid #ad9a66" }}
  //       ></div>
  //       <div className="guessing score-container">
  //         <div className="guessing content">{username3}</div>
  //         <div className="guessing content">{score3}</div>
  //       </div>
  //       <div
  //         className="guessing line"
  //         style={{ border: "2px solid #ad9a66" }}
  //       ></div>
  //       <div className="guessing score-container">
  //         <div className="guessing content">{username4}</div>
  //         <div className="guessing content">{score4}</div>
  //       </div>
  //       <div
  //         className="guessing line"
  //         style={{ border: "2px solid #ad9a66" }}
  //       ></div>
  //     </div>
  //   </div>
  // );
  // //ranking component
  // const rankingWhenTwoPlayers = (
  //   <div>
  //     <div className="guessing score-list">
  //       <div className="guessing score-container">
  //         <div className="guessing rank-title" style={{}}>
  //           Username
  //         </div>
  //         <div className="guessing rank-title">Score</div>
  //       </div>
  //       <div className="guessing line"></div>
  //       <div className="guessing score-container">
  //         <div className="guessing content">{username1}</div>
  //         <div className="guessing content">{score1}</div>
  //       </div>
  //       <div
  //         className="guessing line"
  //         style={{ border: "2px solid #ad9a66" }}
  //       ></div>
  //       <div className="guessing score-container">
  //         <div className="guessing content">{username2}</div>
  //         <div className="guessing content">{score2}</div>
  //       </div>
  //       <div
  //         className="guessing line"
  //         style={{ border: "2px solid #ad9a66" }}
  //       ></div>
  //     </div>
  //   </div>
  // );
  return (
    <BaseContainer>
      {/* <Header /> */}
      <div
        className="guessing pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      {/* <div style={{ left: "40px", top: "170px", position: "absolute" }}>
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
      <div>{ranking}</div> */}
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
        </div>
      ) : (
        <></>
      )}
      {
        <div>
          <div style={{ left: "40px", top: "170px", position: "absolute" }}>
            {player1}
          </div>
          <div style={{ left: "900px", top: "170px", position: "absolute" }}>
            {player2}
          </div>
        </div>
      }
      {gameInfo.role == "drawingPlayer" ? (
        <div>
          <h2
            style={{
              left: "250px",
              top: "180px",
              position: "absolute",
              "font-family": "Nunito",
              color: "black",
            }}
          >
            {" "}
            It's your turn to paint. Choose one word first!
          </h2>

          {displayWords}
        </div>
      ) : (
        <div>
          <h2
            style={{
              left: "250px",
              top: "180px",
              position: "absolute",
              "font-family": "Nunito",
              color: "black",
            }}
          >
            {" "}
            Drawing player is choosing a word!
          </h2>
        </div>
      )}
      {/* <div>
        <h2
          style={{
            left: "250px",
            top: "180px",
            position: "absolute",
            "font-family": "Nunito",
            color: "black",
          }}
        >
          {" "}
          It's your turn to paint. Choose one word first!
        </h2>
        
        {displayWords}
      </div> */}
    </BaseContainer>
  );
};
export default SelectWord;
