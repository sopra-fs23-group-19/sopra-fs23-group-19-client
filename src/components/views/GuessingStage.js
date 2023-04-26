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
      //     image:
      //       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAJYCAYAAACU4BSCAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3QeMXOW1B/CPjmgGRO9NQIwNhGZCD820BNORCUahBlGkgCEQRBclgEkkIKInQCA0gwnFoST0YkB0HAglNFMcC+FAgITip2/yjHZ2Zndndmdm5575Xcl6Urhz7z2/c57/nju3zDJjxowZyUKAAAECBAgUWmAWgV7o/jl4AgQIECBQEhDoBoEAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzRRCQQIECBAQKCbAQIECBAgEEBAoAdoohIIECBAgIBANwMECBAgQCCAgEAP0EQlECBAgAABgW4GCBAgQIBAAAGBHqCJSiBAgAABAgLdDBAgQIAAgQACAj1AE5VAgAABAgQEuhkgQIAAAQIBBAR6gCYqgQABAgQICHQzQIAAAQIEAggI9ABNVAIBAgQIEBDoZoAAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzRRCQQIECBAQKCbAQIECBAgEEBAoAdoohIIECBAgIBANwMECBAgQCCAgEAP0EQlECBAgAABgW4GCBAgQIBAAAGBHqCJSiBAgAABAgLdDBAgQIAAgQACAj1AE5VAgAABAgQEuhkgQIAAAQIBBAR6gCYqgQABAgQICHQzQIAAAQIEAggI9ABNVAIBAgQIEBDoZoAAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzRRCQQIECBAQKCbAQIECBAgEEBAoAdoohIIECBAgIBANwMECBAgQCCAgEAP0EQlECBAgAABgW4GCBAgQIBAAAGBHqCJSiBAgAABAgLdDBAgQIAAgQACAj1AE5VAgAABAgQEuhkgQIAAAQIBBAR6gCYqgQABAgQICHQzQIAAAQIEAggI9ABNVAIBAgQIEBDoZoAAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzRRCQQIECBAQKCbAQIECBAgEEBAoAdoohIIECBAgIBANwMECBAgQCCAgEAP0EQlECBAgAABgW4GCBAgQIBAAAGBHqCJSiBAgAABAgLdDBAgQIAAgQACAj1AE5VAgAABAgQEuhkgQIAAAQIBBAR6gCYqgQABAgQICHQzQIAAAQIEAggI9ABNVAIBAgQIEBDoZoAAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzRRCQQIECBAQKCbAQIECBAgEEBAoAdoohIIECBAgIBANwMECBAgQCCAgEAP0EQlECBAgAABgW4GCBAgQIBAAAGBHqCJSiBAgAABAgLdDBAgQIAAgQACAj1AE5VAgAABAgQEuhkgQIAAAQIBBAR6gCYqgQABAgQICHQzQIAAAQIEAggI9ABNVAIBAgQIEBDoZoAAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzRRCQQIECBAQKCbAQIECBAgEEBAoAdoohIIECBAgIBANwMECBAgQCCAgEAP0EQlECBAgAABgW4GCBAgQIBAAAGBHqCJSiBAgAABAgLdDBAgQIAAgQACAj1AE5VAgAABAgQEuhkgQIAAAQIBBAR6gCYqgQABAgQICHQzQIAAAQIEAggI9ABNVAIBAgQIEBDoZoAAAQIECAQQEOgBmqgEAgQIECAg0M0AAQIECBAIICDQAzSxCCU8+eST6bbbbksffvhhWnbZZUuH/O6775Ydevf/vb/rzfzczI3n/Wy++eZpxIgRabXVVisCl2MkQIBA3QICvW4yH6hFIAf4Qw899N2f6dOn1/Kxpq+TQ33UqFFpl112Ee5N17YDAgRaKSDQW6kdeF9vv/12Ovvss9OLL76YXnrppdQuAd4b+dChQ9Piiy9eOu4NNtggcHeURoBAJwgI9E7ochNrzKfRr7766nTLLbc0cS/N3/SQIUPSsGHD0vDhw9Nxxx2Xll9++ebv1B4IECDQQAGB3kDMTtrUQQcdlCZOnJimTJkSsuxdd901jRkzJu28884h61MUAQLxBAR6vJ42taJ8Udsee+yRHnnkkbr2M/Mb8H//+9+0ww47lD7bqovi7rzzzvT555+nyZMn13XMeeWll146bb/99un0009PSyyxRN2f9wECBAi0SkCgt0o6yH722WefdN111/VZTQ7wzTbb7Ls/7fAb9auvvppuvfXWNGHChDRp0qQ+a+i+wujRo9O4ceMEe91yPkCAQCsEBHorlIPs44EHHkg//OEPe6xmqaWWSqussko699xz2/4isxzuJ598cnrvvffquohvueWWS/kbf/693UKAAIF2EhDo7dSNNj6WfOX61ltvnT766KOKo8yn0A8++OBC/96cb7M75phj0uuvv57ef//9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",
      //     wordsToBeChosen: ["feet", "bench", "line"],
      //     targetWord: "line",
      //     gameId: 1,
      //     submittedAnswerIds: [],
      //     status: "PAINTING",
      //   };
      //   const playerNum = response1.players.length;
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
      //   alert(
      //     `Something went wrong during get game Turn information: \n${handleError(
      //       error
      //     )}`
      //   );
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
  }, []);

  //   useEffect(() => {
  //     let ignore = false;
  //     if (!ignore) {
  //       getImage();
  //     }
  //     return () => {
  //       ignore = true;
  //     };
  //   }, []);

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

  //   window.addEventListener("popstate", () => {
  //     history.go(1);
  //   });
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
