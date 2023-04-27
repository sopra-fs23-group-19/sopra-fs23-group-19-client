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
import HeaderInGame from "components/views/HeaderInGame";
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
  //   const [playerNum, setPlayerNum] = useState(2);
  const [playernum, setPlayernum] = useState(null);

  const [role, setRole] = useState("");

  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  //   const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  // console.log(turnId);
  const fetchWord = async () => {
    try {
      const response0 = await api().get(`/gameRounds/words/${turnId}`);
      const response = response0.data;
      // const response = ["apple", "bike", "pencil"];
      // console.log(response);
      if (response.length == 3) {
        //correct response
        setWord0(response[0]);
        setWord1(response[1]);
        setWord2(response[2]);
      }
    } catch (error) {
      //   alert(`Something went wrong during get words: \n${handleError(error)}`);
      //   history.push("/lobby"); // redirect back to lobby
      handleNotLogInError(history, error, "fetching words for drawing Player");
      history.push("/lobby"); // redirect back to lobby
    }
  };
  const fetchTurnInfo = async () => {
    try {
      const response0 = await api().get(`/gameRounds/information/${turnId}`);

      const response1 = response0.data;
      // console.log(response1.players);
      // console.log(typeof response1.players);
      // console.log(response1.players.length);
      var temp = response1.players.length;
      //   console.log(temp);
      setPlayernum(temp);
      var allPlayers = response1.players;
      const updatedPlayer = allPlayers.filter(
        (item) => item.id !== response1.drawingPlayerId
      );
      //   console.log(updatedPlayer);
      // console.log("player usernames in select word");
      //   setPlayerNum(updatedPlayer.length + 1);
      //   console.log(playerNum);
      //   console.log(typeof playerNum);
      if (playernum == 4) {
        // setUsername1(response1.players[0].username);
        setUsername1(response1.drawingPlayerName);

        setUsername2(updatedPlayer[0].username);
        setUsername3(updatedPlayer[1].username);
        setUsername4(updatedPlayer[2].username);
        // console.log(username2);
        // console.log(username3);
        // console.log(username4);
      }

      if (playernum == 2) {
        setUsername1(response1.drawingPlayerName);
        setUsername2(updatedPlayer[0].username);
      }

      if (curUserId == response1.drawingPlayerId) {
        setRole("drawingPlayer");
      } else if (curUserId != response1.drawingPlayerId) {
        setRole("guessingPlayer");
      }
    } catch (error) {
      //   alert(
      //     `Something went wrong during get game Turn information: \n${handleError(
      //       error
      //     )}`
      //   );
      //   history.push("/lobby"); // redirect back to lobby
      handleNotLogInError(
        history,
        error,
        "fetching Turn info in word selecting phase"
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(() => {
    fetchTurnInfo();
  }, [playernum]);

  useEffect(() => {
    fetchWord();
  }, []);

  // useEffect(() => {
  //   fetchTurnScore();
  // }, [score1]);

  const displayWords = (
    <div>
      <div>
        <Button
          // need to connect to backend later
          onClick={() => {
            handleChooseWord(word0);
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

  return (
    <BaseContainer>
      <HeaderInGame />
      {/* <Header /> */}
      <div
        className="guessing pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>

      {playernum == 4 ? (
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
      {role == "drawingPlayer" ? (
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
            {/* {" "} */}
            {username1} is choosing a word!
          </h2>
        </div>
      )}
    </BaseContainer>
  );
};
export default SelectWord;
