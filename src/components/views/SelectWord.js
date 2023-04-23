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
import { api, handleError } from "../../helpers/api";

const SelectWord = ({ gameId, turnId, handleChooseWord }) => {
  //const [startDrawing, setStartDrawing]=useState(null); //to test the timer, click "apple" button
  //   let startDrawing;
  const history = useHistory();
  const curUserId = localStorage.getItem("id");
  //get the room and user information
  //   const [word, setWord] = useState(""); //the chosen word
  const [word0, setWord0] = useState(""); //
  const [word1, setWord1] = useState(""); //
  const [word2, setWord2] = useState(""); //
  const [playerNum, setPlayerNum] = useState(2);
  //   const [guessingPlayer, setGuessingPlayer] = useState([
  //     { id: null, username: "" },
  //   ]);
  //   const [username1, setUsername1] = useState("user1");
  //   const [username2, setUsername2] = useState("user2");
  //   const [username3, setUsername3] = useState("user3");
  //   const [username4, setUsername4] = useState("user4");
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");

  const fetchWord = async () => {
    try {
      const response0 = await api().get(`/gameRounds/words/${turnId}`);
      const response = response0.data;
      //   const response = {
      //     id: 1,
      //     drawingPlayerId: 1,
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
      //     gameId: 1,
      //     submittedAnswerIds: [],
      //     status: "CHOOSE_WORD",
      //   }; //word get api return
      //   response = response.data;
      console.log(response.wordsToBeChosen);
      //   const response1 = await api().get(`/gameRounds/information/${turnId}/${curUserId}`);
      if (response.wordsToBeChosen.length == 3) {
        //correct response
        setWord0(response.wordsToBeChosen[0]);
        setWord1(response.wordsToBeChosen[1]);
        setWord2(response.wordsToBeChosen[2]);
      }
      const response1 = {
        id: 1,
        drawingPlayerId: 1,
        drawingPlayerName: "test1",
        players: [
          {
            id: 1,
            username: "test1",
          },
          {
            id: 2,
            username: "test",
          },
        ],
        image: null,
        wordsToBeChosen: ["feet", "bench", "line"],
        gameId: 1,
        submittedAnswerIds: [],
        status: "CHOOSE_WORD",
      };
      //   const playerNum = response1.players.length;
      setPlayerNum(response1.players.length);
      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id !== response1.drawingPlayerId
      );
      console.log(updatedPlayer);
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
      // setPlayerCount(response.data.numberOfPlayers);
      // const response = {
      //   numOfPlayers: 2,
      //   roomName: "room1",
      //   listOfPlayerNames: [
      //     { id: 1, username: "Alabama" },
      //     { id: 2, username: "Georgia1" },
      //   ],
      //   // listOfPlayerIds: [1, 2],
      //   ownerId: 1,
      //   roomSeats: 2,
      //   status: "wait",
      // };
      // setPlayerCount(response.numOfPlayers);
      // setPlayerCount(playerCount + 1);
      // setRoomName(response.roomName);
      // const temp = response.listOfPlayerNames;
      // setPlayerNames(temp);
      //   setPlayerIds(response.listOfPlayerIds);
      // setOwnerId(response.ownerId);
      // setRoomSeats(response.roomSeats);
      // setStatus(response.status);
    } catch (error) {
      alert(
        `Something went wrong during get waiting room information: \n${handleError(
          error
        )}`
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const displayWords = (
    <div>
      <div>
        <Button
          // need to connect to backend later
          onClick={() => {
            // console.log(startDrawing);
            // setWord("apple"); //need to be modified
            // setWord(word0);
            handleChooseWord(word0);
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
          {word0}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            // setWord(word1);
            handleChooseWord(word1);
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
          {word1}
        </Button>
      </div>
      <div>
        <Button
          //onClick={() => goToDrawing()} need to connect to backend later
          onClick={() => {
            // setWord(word2);
            handleChooseWord(word2);
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
          {word2}
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
          <div className="guessing content">0</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username2}</div>
          <div className="guessing content">0</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username3}</div>
          <div className="guessing content">0</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username4}</div>
          <div className="guessing content">0</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
      </div>
    </div>
  );
  //ranking component
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
          <div className="guessing content">0</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username2}</div>
          <div className="guessing content">0</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid #ad9a66" }}
        ></div>
      </div>
    </div>
  );
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
          <div>{rankingWhenTwoPlayers}</div>
        </div>
      }

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
    </BaseContainer>
  );
};
export default SelectWord;
