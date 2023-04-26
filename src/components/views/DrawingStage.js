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
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "components/ui/Button";
import { Spinner } from "components/ui/Spinner";
import { api, handleNotLogInError } from "../../helpers/api";

const DrawingStage = ({
  gameInfo,
  turnId,
  painting,
  handleUpdatePainting,
  handleSubmitPainting,
}) => {
  const curUserId = localStorage.getItem("id");
  const startDrawing = +new Date();
  //   const location = useLocation();
  // const startDrawing = location.state.startDrawing;
  //   const word = location.state.word;
  const history = useHistory();
  const [time, setTime] = useState(60);

  const sendTimeInfo = (timeValue) => {
    setTime(timeValue);
  };

  function hanleDoSubmit(painting) {
    // setPainting(painting);
    handleSubmitPainting(painting);
    // const startGuessing = +new Date();
    // history.push({pathname:'/guessingStage',state:{url:url, startGuessing:startGuessing}});
  }

  function handleUpdate(painting) {
    handleUpdatePainting(painting);
  }

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

  const drawingPlayerContent = () => {
    // console.log("drawing player content");
    const content = (
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
    // console.log("guessing player content");
    const content = (
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
        Drawing stage. The player is painting!
      </div>
    );
    return content;
  };

  return (
    <BaseContainer>
      {/* <Header /> */}
      <div
        className="guessing pic"
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

      {gameInfo.role === "drawingPlayer"
        ? drawingPlayerContent()
        : guessingPlayerContent()}
      {startDrawing && gameInfo.role === "drawingPlayer" ? (
        <div>
          <div
            style={{
              left: "150px",
              top: "180px",
              position: "absolute",
              "font-family": "Nunito",
              "font-size": "20px",
              color: "black",
              border: "2px solid #000000",
              "background-color": "rgba(181, 153, 120, 0.5)",
            }}
          >
            chosen word: <br />
            {gameInfo.targetWord}
          </div>

          <DrawingBoard
            role={"drawingPlayer"}
            time={time}
            hanleDoSubmit={hanleDoSubmit}
            handleUpdate={handleUpdate}
          />
        </div>
      ) : (
        <></>
      )}
    </BaseContainer>
  );
};
export default DrawingStage;
