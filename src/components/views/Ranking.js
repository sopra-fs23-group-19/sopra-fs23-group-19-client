import { useState, useEffect } from "react";
import cats from "styles/images/cats2.png";
import "styles/views/Guessing.scss";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "../../helpers/api";
import HeaderInGame from "components/views/HeaderInGame";
import Emoji from "components/ui/Emoji";
import cat_bye from "styles/images/gif/cat.gif";
import "styles/views/Rank.scss";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer";

const Ranking = ({ gameId, handleQuitGame }) => {
  const history = useHistory();
  
  //get the username and score
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [score3, setScore3] = useState("");
  const [score4, setScore4] = useState("");
  const { width, height } = useWindowSize();
  const notify = (message) => {
    toast.error(message);
  };

  function handleQuit() {
    playOn();
    handleQuitGame();
  }
  const [playOn] = useSound(btClick);

  const [playerNum, setPlayerNum] = useState(2);
  const fetchRankInfo = async () => {
    try {
      const response0 = await api().get(`/games/ranks/${gameId}`);
      const response1 = response0.data;
      setPlayerNum(response1.length);

      if (playerNum == 4 && response1[0].username != null) {
        setUsername1(response1[0].username);

        setUsername2(response1[1].username);
        setUsername3(response1[2].username);
        setUsername4(response1[3].username);
        setScore1(response1[0].currentGameScore);
        setScore2(response1[1].currentGameScore);
        setScore3(response1[2].currentGameScore);
        setScore4(response1[3].currentGameScore);
      }

      if (playerNum == 2 && response1[0].username != null) {
        setUsername1(response1[0].username);

        setUsername2(response1[1].username);
        setScore1(response1[0].currentGameScore);
        setScore2(response1[1].currentGameScore);
      }
    } catch (error) {
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      } else {
        notify(error_str["message"]);
      }
      history.push("/lobby"); // redirect back to lobby
    }
  };
  useEffect(() => {
    fetchRankInfo().catch((error)=>{
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
  }, [playerNum]);

  //ranking component
  //need to sort the score later
  const rankingWhenFourPlayers = (
    <div>
      <div className="guessing rank-list">
        <div className="guessing score-container">
          <div className="guessing rank-title" style={{}}>
            Username
          </div>
          <div className="guessing rank-title">Score</div>
        </div>
        <div className="guessing line" style={{border: "3px solid rgba(25,25,112,0.4)"}}></div>
        <div className="guessing score-container">
          <div className="guessing content">{username1}</div>
          <div className="guessing content">{score1}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid rgba(25,25,112,0.4)" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username2}</div>
          <div className="guessing content">{score2}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid rgba(25,25,112,0.4)" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username3}</div>
          <div className="guessing content">{score3}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid rgba(25,25,112,0.4)" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username4}</div>
          <div className="guessing content">{score4}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid rgba(25,25,112,0.4)" }}
        ></div>
      </div>
    </div>
  );

  const rankingWhenTwoPlayers = (
    <div>
      <div className="guessing rank-list">
        <div className="guessing score-container">
          <div className="guessing rank-title" style={{}}>
            Username
          </div>
          <div className="guessing rank-title">Score</div>
        </div>
        <div className="guessing line" style={{border: "3px solid rgba(25,25,112,0.4)"}}></div>
        <div className="guessing score-container">
          <div className="guessing content">{username1}</div>
          <div className="guessing content">{score1}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid rgba(25,25,112,0.4)" }}
        ></div>
        <div className="guessing score-container">
          <div className="guessing content">{username2}</div>
          <div className="guessing content">{score2}</div>
        </div>
        <div
          className="guessing line"
          style={{ border: "2px solid rgba(25,25,112,0.4)" }}
        ></div>
      </div>
    </div>
  );
  const title = (
    <div className="guessing title1">
      <Emoji symbol="🥳" className="guessing li" />
      Game end!
      <img className="rank gif1" src={cat_bye} />
    </div>
  );
  return (
    <div className="guessing body">
      <HeaderInGame />
      <BgmPlayer />
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <Confetti numberOfPieces={150} width={width} height={height} />
      <div className="guessing content-container">
        <div className="guessing pic">
          <img
            src={cats}
            alt="game background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        {title}
        {playerNum == 4 ? (
          <div>{rankingWhenFourPlayers}</div>
        ) : (
          <div>{rankingWhenTwoPlayers}</div>
        )}
        <div
          className="guessing button-container"
          style={{
            top: "60px",
            left: "45%",
            position: "absolute",
            height: "50px",
          }}
        >
          <Button
            onClick={() => {
              handleQuit();
            }}
            width="100%"
            style={{ "margin-top": "5px", border: "2px solid #000000", backgroundColor:"rgba(193, 210, 240, 0.6)"}}
          >
            QUIT GAME
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
