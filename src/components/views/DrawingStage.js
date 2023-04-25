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

const DrawingStage = ({ gameId, turnId, handleSubmitPainting }) => {
  const curUserId = localStorage.getItem("id");
  const startDrawing = +new Date();
  //   const location = useLocation();
  // const startDrawing = location.state.startDrawing;
  //   const word = location.state.word;
  const history = useHistory();

  //get the room and user information
  //   const role = "drawingPlayer";
  //const [word, setWord]=useState('apple'); //the chosen word
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [score3, setScore3] = useState("");
  const [score4, setScore4] = useState("");
  const [word, setWord] = useState("");
  const [role, setRole] = useState("");
  const [time, setTime] = useState(120);
  //   const [painting, setPainting] = useState("");
  const [playerNum, setPlayerNum] = useState(2);
  //   const word = "apple";

  const sendTimeInfo = (timeValue) => {
    // the callback. Use a better name
    // console.log(timeValue);
    setTime(timeValue);
  };
  function hanleDoSubmit(painting) {
    // setPainting(painting);
    handleSubmitPainting(painting);
    // const startGuessing = +new Date();
    // history.push({pathname:'/guessingStage',state:{url:url, startGuessing:startGuessing}});
  }
  //fetch game Turn information
  const fetchTurnInfo = async () => {
    try {
      const response0 = await api().get(
        `/gameRounds/information/${turnId}/${curUserId}`
      );
      const response1 = response0.data;
      //   const response1 = {
      //     id: 1,
      //     drawingPlayerId: 1,
      //     drawingPlayerName: "test1",
      //     players: [
      //       {
      //         id: 1,
      //         username: "test1",
      //       },
      //       {
      //         id: 2,
      //         username: "test",
      //       },
      //     ],
      //     image: null,
      //     wordsToBeChosen: ["feet", "bench", "line"],
      //     targetWord: "line",
      //     gameId: 1,
      //     submittedAnswerIds: [],
      //     status: "PAINTING",
      //   };
      //   const playerNum = response1.players.length;
      setPlayerNum(response1.players.length);
      setWord(response1.targetWord);
      //   console.log(word);
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
      } else if (parseInt(curUserId) != parseInt(response1.drawingPlayerId)) {
        setRole("guessingPlayer");
      }
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
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnInfo();
  }, []);

  const fetchTurnScore = async () => {
    try {
      const response0 = await api().get(`/gameRounds/ranks/${turnId}`);
      const response = response0.data;
      //response=
      //   [
      //     {
      //         "id": 2,
      //         "username": "test",
      //         "token": "30e578e3-4329-41aa-8a16-d51f5d5294c2",
      //         "status": "ISPLAYING",
      //         "creationDate": "2023-04-24T07:51:30.741+00:00",
      //         "bestScore": 0,
      //         "totalScore": 0,
      //         "currentScore": 0,
      //         "guessingWord": null,
      //         "currentGameScore": 0
      //     },
      //     {
      //         "id": 1,
      //         "username": "test1",
      //         "token": "815bbb7e-eec9-466f-9132-a7c933f201d3",
      //         "status": "ISPLAYING",
      //         "creationDate": "2023-04-24T07:51:24.545+00:00",
      //         "bestScore": 0,
      //         "totalScore": 0,
      //         "currentScore": 0,
      //         "guessingWord": null,
      //         "currentGameScore": 0
      //     }
      // ]

      if (playerNum == 4) {
        setScore1(response[0].currentScore);
        setScore2(response[1].currentScore);
        setScore3(response[2].currentScore);
        setScore4(response[3].currentScore);
      }

      if (playerNum == 2) {
        setScore1(response[0].currentScore);
        setScore2(response[1].currentScore);
      }
    } catch (error) {
      //   alert(
      //     `Something went wrong during getting turn ranking information: \n${handleError(
      //       error
      //     )}`
      //   );
      handleNotLogInError(
        history,
        error,
        "fetching turn ranking information in drawing phase"
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };
  useEffect(() => {
    fetchTurnScore();
  }, []);

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

  //ranking component
  const rankingWhenFourPlayers = (
    <div>
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
        <div className="guessing score-container">
          <div className="guessing content">{username4}</div>
          <div className="guessing content">{score4}</div>
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
          <div>{rankingWhenFourPlayers}</div>
        </div>
      ) : (
        <div>
          <div style={{ left: "40px", top: "170px", position: "absolute" }}>
            {player1}
          </div>
          <div style={{ left: "900px", top: "170px", position: "absolute" }}>
            {player2}
          </div>
          <div>{rankingWhenTwoPlayers}</div>
        </div>
      )}
      {/* {role === "guessingPlayer" ? (
        <DrawingBoard start={startDrawing} role={"guessingPlayer"} />
      ) : (
        <></>
      )} */}

      {/* <div
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
      </div> */}
      {role === "drawingPlayer"
        ? drawingPlayerContent()
        : guessingPlayerContent()}
      {startDrawing && role === "drawingPlayer" ? (
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
            {word}
          </div>
          {/* <Button
                        onClick={() => {
                            const startGuessing = +new Date();
                            history.push({pathname:'/guessingStage', state:{startGuessing:startGuessing}});
                        }}
                        style={{left: "600px", top: "290px", position: "absolute", 
                        "font-family": "Nunito", "font-size":"20px", "color":"black", 
                        "margin-bottom": "5px",border: "2px solid #000000","background-color": "rgba(181, 153, 120, 0.5)",}}
                    >
                        Submit
                    </Button> */}
          <DrawingBoard
            role={"drawingPlayer"}
            time={time}
            hanleDoSubmit={hanleDoSubmit}
          />
        </div>
      ) : (
        <></>
      )}
    </BaseContainer>
  );
};
export default DrawingStage;
