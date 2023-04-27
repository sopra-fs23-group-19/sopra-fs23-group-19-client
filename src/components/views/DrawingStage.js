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
import { useInterval } from "helpers/hooks";

const DrawingStage = ({
  gameId,
  turnId,
  handleUpdatePainting,
  handleSubmitPainting,
}) => {
  const curUserId = localStorage.getItem("id");
  const startDrawing = +new Date();
  //   const location = useLocation();
  // const startDrawing = location.state.startDrawing;
  //   const word = location.state.word;
  const history = useHistory();

  //get the room and user information

  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [isUpdating, setIsUpdating] = useState(true);

  const [word, setWord] = useState("");
  const [role, setRole] = useState("");
  const [time, setTime] = useState(120);

  const [playerNum, setPlayerNum] = useState(2);

  const [imageData, setImageData] = useState("");
  const sendTimeInfo = (timeValue) => {
    // the callback. Use a better name
    // console.log(timeValue);
    setTime(timeValue);
  };
  function handleUpdate(painting) {
    // console.log(painting);
    handleUpdatePainting(painting);
  }
  function getImage() {
    const myCanvas = document.getElementById("showingBoard");
    const myContext = myCanvas.getContext("2d");
    const img = new Image();
    // console.log("why");
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
    handleSubmitPainting(painting);
  }

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
      //   console.log(word);
      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id != response1.drawingPlayerId
      );
      // const thisPlayer = allPlayers.filter(
      //   (item) => item.id == curUserId
      // )
      // const currentUsername = thisPlayer.username;
      // console.log(currentUsername);

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

      // if(currentUsername==username1){
      //   document.querySelector("#player1").style.border = "2px solid #000000";
      // }
      // if(currentUsername==username2){
      //   document.querySelector("#player2").style.border = "2px solid #000000";
      // }
      // if(currentUsername==username3){
      //   document.querySelector("#player3").style.border = "2px solid #000000";
      // }
      // if(currentUsername==username4){
      //   document.querySelector("#player4").style.border = "2px solid #000000";
      // }

      // console.log(imageData);
      console.log("fetch turn info");
      //   setRole("drawingPlayer");
    } catch (error) {
      //   alert(
      //     `Something went wrong during get game Turn information: \n${handleError(
      //       error
      //     )}`
      //   );
      handleNotLogInError(
        history,
        error,
        "fetching turn information in drawing phase"
      );
      setIsUpdating(false);
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnInfo();
  }, [playerNum]);

  useInterval(
    async () => {
      fetchTurnInfo();
    },
    isUpdating && role == "guessingPlayer" ? 1000 : null
    // status == "PLAYING" ? null : 1000
  );

  //display cat and username
  const player1 = (
    <div className="guessing info">
      <img src={cat1} alt="" />
      <div
        id="player1"
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
        id="player2"
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
        id="player3"
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
        id="player4"
        style={{ "font-family": "Nunito", "font-size": "20px", color: "black" }}
      >
        {username4}
      </div>
    </div>
  );

  const drawingPlayerContent = () => {
    // console.log("drawing player content");
    const content = (
      <div
        style={{
          left: "350px",
          top: "30px",
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
      <div>
        <div
          style={{
            left: "200px",
            top: "80px",
            position: "absolute",
            "font-family": "Nunito",
            "font-size": "30px",
            color: "black",
            width: "700px",
          }}
        >
          Drawing stage. {username1} is painting!
        </div>
        <div style={{ left: "200px", top: "200px", position: "absolute" }}>
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
    <BaseContainer>
      {/* <Header /> */}
      <div
        className="guessing pic"
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

      {role === "drawingPlayer"
        ? drawingPlayerContent()
        : guessingPlayerContent()}
      {startDrawing && role === "drawingPlayer" ? (
        <div>
          <div
            style={{
              left: "50px",
              top: "30px",
              position: "absolute",
              "font-family": "Nunito",
              "font-size": "20px",
              color: "black",
              border: "2px solid #000000",
              "background-color": "rgba(181, 153, 120, 0.5)",
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
    </BaseContainer>
  );
};
export default DrawingStage;
