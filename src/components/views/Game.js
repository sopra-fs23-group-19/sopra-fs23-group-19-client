import React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { withRouter } from "react-router-dom";
import { api, handleError } from "../../helpers/api";
import DrawingStage from "components/views/DrawingStage";
import Ranking from "components/views/Ranking";
import GameLoading from "components/views/GameLoading";
import SelectWord from "components/views/SelectWord";
import GuessingStage from "components/views/GuessingStage";
import TurnRanking from "components/views/TurnRanking";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useInterval } from "helpers/hooks";
import { Link } from "react-router-dom";
import gameBackground from "styles/images/empty-room.jpg";
import { Bounce, ToastContainer, toast } from "react-toastify";
const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const location = useLocation();
  const { gameId } = useParams();
  console.log(typeof gameId);
  // const gameId = useParams().id;

  const InitialTurnId = location.state.turnId;
  const curUserId = localStorage.getItem("id");
  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  // const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  const [gameStatus, setGameStatus] = useState(true);
  const [turnId, setTurnId] = useState(InitialTurnId);
  const [turnStatus, setTurnStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true);
  const [isUpdatingPainting, setIsUpdatingPainting] = useState(true);
  // const [currentGameTurn, setCurrentGameTurn] = useState(null);

  // const leave = () => {
  //   history.push("/lobby");
  // };
  const notify = (message) => {
    toast.error(message);
  };

  const handleChooseWord = async (word) => {
    // console.log("handle choose Word");
    const requestBody = JSON.stringify({
      id: turnId,
      targetWord: word,
    });

    // console.log(requestBody);
    try {
      await api().put(`/gameRounds/words`, requestBody);
    } catch (error) {
      // handleNotLogInError(history, error, "handle choose words", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }

    // setTurnStatus("PAINTING");
  };

  const handleConfirmRanking = async () => {
    // console.log("handle confirm ranking");

    // console.log(requestBody);
    try {
      await api().get(`/gameRounds/rankConfirmation/${turnId}/${curUserId}`);
    } catch (error) {
      // handleNotLogInError(history, error, "confirm ranking", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }
  };

  const handleSubmitPainting = async (painting) => {
    console.log("handle submit painting");
    const requestBody = JSON.stringify({
      id: turnId,
      image: painting,
    });
    // console.log(requestBody);
    try {
      await api().post(`/gameRounds/finalDrawings`, requestBody);
    } catch (error) {
      // handleNotLogInError(history, error, "handle submitting Painting", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }
  };

  const handleSubmitAnswer = async (word) => {
    console.log("handle submit answer");
    const requestBody = JSON.stringify({
      id: Number(curUserId),
      guessingWord: word,
      currentGameId: Number(gameId),
    });
    // console.log(requestBody);
    try {
      await api().put(`/gameRounds/answers/${turnId}`, requestBody);
    } catch (error) {
      // handleNotLogInError(history, error, "handle submitting answer", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }
  };

  const handleUpdatePainting = async (painting) => {
    // console.log("handle update painting");
    if (isUpdatingPainting) {
      const requestBody = JSON.stringify({
        id: turnId,
        image: painting,
      });
      try {
        await api().put(`/gameRounds/drawings`, requestBody);
      } catch (error) {
        // handleNotLogInError(history, error, "handle updating Painting", true);
        const error_str = handleError(error);
        console.log(error_str);
        if (error_str["message"].match(/Network Error/)) {
          history.push(`/information`);
        } else {
          // setNotification(error_str["message"]);
          notify(error_str["message"]);
        }

        setIsUpdatingPainting(false);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response0 = await api().get(`/rooms/${gameId}`);
      // // delays continuous execution of an async operation for 1 second.

      // // Get the returned users and update the state.

      const response = response0.data;

      setGameStatus(response.status);
      // console.log("game status");
      // console.log(response.status);
      if (response.currentTurnId) {
        setTurnId(response.currentTurnId);
        localStorage.setItem("intialTurnId", response.currentTurnId);
      } else if (!response.currentTurnId) {
        setTurnId(response.currentTurnId);
        localStorage.removeItem("intialTurnId");
        localStorage.removeItem("gameId");
      }

      setTurnStatus(response.currentTurnStatus);
    } catch (error) {
      // handleNotLogInError(history, error, "get game");
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }

      setIsUpdating(false);
      // handleGameError();
      history.push("/lobby");
    }
  };

  const handleQuitGame = async () => {
    // console.log("handle quit game");

    try {
      await api().put(`/games/ending/${gameId}`);
    } catch (error) {
      // handleNotLogInError(history, error, "leaving game", true);
      const error_str = handleError(error);
      console.log(error_str);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
      } else {
        // setNotification(error_str["message"]);
        notify(error_str["message"]);
      }
    }
    localStorage.removeItem("gameId");
    localStorage.removeItem("intialTurnId");
    history.push("/lobby");
  };
  //force quit game
  const handleGameError = async () => {
    // console.log("handle game error");

    try {
      await api().put(`/games/ending/${gameId}`);
    } catch (error) {
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
      history.push("/lobby");
    }
    localStorage.removeItem("gameId");
    localStorage.removeItem("intialTurnId");
    history.push("/lobby");
  };

  useEffect(() => {
    fetchData();
  }, []);
  useInterval(
    async () => {
      fetchData();
    },
    isUpdating ? 1000 : null
  );

  const switchPages = () => {
    let content = <Spinner />;
    if (gameStatus == "PLAYING") {
      // console.log(gameStatus);
      // console.log(turnStatus);
      if (turnStatus === "CHOOSE_WORD") {
        // console.log(turnStatus);
        content = (
          <SelectWord
            gameId={gameId}
            turnId={turnId}
            handleChooseWord={handleChooseWord}
          />
        );
      }
      // else if (turnStatus === "PAINTING" && curUserId == drawingPlayerId)
      else if (turnStatus === "PAINTING") {
        // console.log(turnStatus);
        content = (
          <DrawingStage
            gameId={gameId}
            turnId={turnId}
            handleUpdatePainting={handleUpdatePainting}
            handleSubmitPainting={handleSubmitPainting}
          />
        );
      } else if (turnStatus === "GUESSING") {
        // console.log(turnStatus);
        content = (
          <GuessingStage
            gameId={gameId}
            turnId={turnId}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        );
      } else if (turnStatus === "RANKING") {
        // console.log(turnStatus);
        content = (
          <TurnRanking
            gameId={gameId}
            turnId={turnId}
            handleConfirmRanking={handleConfirmRanking}
          />
        );
      } else {
        content = <GameLoading />;
      }
    } else if (gameStatus == "END_GAME") {
      // console.log(gameId);
      // console.log(gameStatus);

      content = <Ranking gameId={gameId} handleQuitGame={handleQuitGame} />;
    }
    // else if (gameStatus == "END_GAME" && turnId == null) {

    //   content = (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         height: "20vh",
    //       }}
    //     >
    //       <Link to="/lobby">Game end! Back to the lobby...</Link>
    //     </div>
    //   );
    // }
    else if (gameStatus == "END") {
      content = (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
          }}
        >
          <Link to="/lobby">
            That page cannot be found! Back to the lobby...
          </Link>
        </div>
      );
    } else {
      content = <GameLoading />;
    }

    return content;
  };

  return (
    <BaseContainer className="game container">
      <div
        className="lobby pic"
        style={{ opacity: "60%", left: "0px", top: "85px" }}
      >
        <img src={gameBackground} alt="" />
      </div>
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      {switchPages()}
    </BaseContainer>
  );
  // return <BaseContainer className="game container">{content}</BaseContainer>;
};

export default Game;
