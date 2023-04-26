import { useState, useRef, useEffect } from "react";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Guessing.scss";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleNotLogInError } from "../../helpers/api";

const Ranking = ({ gameId }) => {
  const history = useHistory();
  console.log("gameId is");
  console.log(gameId);
  //get the username and score
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [score3, setScore3] = useState("");
  const [score4, setScore4] = useState("");

  const [playerNum, setPlayerNum] = useState(2);
  const fetchRankInfo = async () => {
    try {
      const response0 = await api().get(`/games/ranks/${gameId}`);
      const response1 = response0.data;
      //   const response1 = [
      //     {
      //       id: 2,
      //       username: "test1",
      //       token: "b04e95f7-4606-4a2e-9929-205ba685c2c3",
      //       status: "ISPLAYING",
      //       creationDate: "2023-04-23T19:39:52.928+00:00",
      //       bestScore: 0,
      //       totalScore: 0,
      //       currentScore: 0,
      //       guessingWord: null,
      //       currentGameScore: 0,
      //     },
      //     {
      //       id: 1,
      //       username: "test",
      //       token: "e53f43eb-ccb5-46f7-971b-44b470d2cd1b",
      //       status: "ISPLAYING",
      //       creationDate: "2023-04-23T19:39:47.433+00:00",
      //       bestScore: 0,
      //       totalScore: 0,
      //       currentScore: 0,
      //       guessingWord: "apple",
      //       currentGameScore: 0,
      //     },
      //   ];
      //   const playerNum = response1.players.length;
      setPlayerNum(response1.length);
      //   var allPlayers = response1;
      //   const updatedPlayer = allPlayers.filter(
      //     (item) => item.id !== response1.drawingPlayerId
      //   );

      if (playerNum == 4) {
        // setUsername1(response1.players[0].username);
        setUsername1(response1[0].username);

        setUsername2(response1[1].username);
        setUsername3(response1[2].username);
        setUsername4(response1[3].username);
        setScore1(response1[0].currentGameScore);
        setScore2(response1[1].currentGameScore);
        setScore3(response1[2].currentGameScore);
        setScore4(response1[3].currentGameScore);
      }

      if (playerNum == 2) {
        setUsername1(response1[0].username);

        setUsername2(response1[1].username);
        setScore1(response1[0].currentGameScore);
        setScore2(response1[1].currentGameScore);
      }
    } catch (error) {
      //   alert(
      //     `Something went wrong during get game Turn information: \n${handleError(
      //       error
      //     )}`
      //   );
      //   history.push("/lobby"); // redirect back to lobby
      handleNotLogInError(history, error, "fetching ranking information");
      history.push("/lobby"); // redirect back to lobby
    }
  };
  useEffect(() => {
    fetchRankInfo();
  }, []);
  //ranking component
  //need to sort the score later
  const rankingWhenFourPlayers = (
    <div>
      <div
        className="guessing score-list"
        style={{ left: "500px", top: "200px", position: "absolute" }}
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
      <div
        className="guessing score-list"
        style={{ left: "500px", top: "200px", position: "absolute" }}
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
      </div>
    </div>
  );
  return (
    <BaseContainer>
      <Header />
      <div
        className="guessing pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      {/* <div>{ranking}</div> */}
      {playerNum == 4 ? (
        <div>{rankingWhenFourPlayers}</div>
      ) : (
        <div>{rankingWhenTwoPlayers}</div>
      )}
      <div
        className="guessing button-container"
        style={{
          left: "500px",
          top: "580px",
          position: "absolute",
          width: "480px",
          height: "50px",
        }}
      >
        <Button
          onClick={() => {
            // handleQuitGame(true);
            history.push("/lobby");
          }}
          width="100%"
          style={{ "margin-top": "5px", border: "2px solid #000000" }}
        >
          QUIT GAME
        </Button>
      </div>
    </BaseContainer>
  );
};
export default Ranking;
