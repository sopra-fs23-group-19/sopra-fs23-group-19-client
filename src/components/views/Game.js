import React from "react";
import { useEffect, useState } from "react";
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
import "styles/views/Lobby.scss";
import "styles/index.scss";
const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const { gameId } = useParams();
  // const gameId = useParams().id;
  // const InitialTurnId =
  //   location.state.turnId || localStorage.getItem("intialTurnId");
  const InitialTurnId = localStorage.getItem("intialTurnId");

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
  const notify = (message) => {
    toast.error(message);
  };

  const handleChooseWord = async (word) => {
    const requestBody = JSON.stringify({
      id: turnId,
      targetWord: word,
    });
    try {
      await api().put(`/gameRounds/words`, requestBody);
    } catch (error) {
      handleGameError(error);
    }
  };

  const handleConfirmRanking = async () => {
    try {
      await api().get(`/gameRounds/rankConfirmation/${turnId}/${curUserId}`);
    } catch (error) {
      handleGameError(error);
    }
  };

  const handleSubmitPainting = async (painting) => {
    console.log("handle submit painting");
    const requestBody = JSON.stringify({
      id: turnId,
      image: painting,
    });
    try {
      await api().post(`/gameRounds/finalDrawings`, requestBody);
    } catch (error) {
      handleGameError(error);
    }
  };

  const handleSubmitAnswer = async (word) => {
    console.log("handle submit answer");
    const requestBody = JSON.stringify({
      id: Number(curUserId),
      guessingWord: word,
      currentGameId: Number(gameId),
    });
    try {
      await api().put(`/gameRounds/answers/${turnId}`, requestBody);
    } catch (error) {
      handleGameError(error);
    }
  };

  const handleUpdatePainting = async (painting) => {
    if (isUpdatingPainting) {
      const requestBody = JSON.stringify({
        id: turnId,
        image: painting,
      });
      try {
        await api().put(`/gameRounds/drawings`, requestBody);
      } catch (error) {
        handleGameError(error);

        setIsUpdatingPainting(false);
      }
    }
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const fetchData = async () => {
    try {
      const response0 = await api().get(`/rooms/${gameId}`);
      // delays continuous execution of an async operation for 1 second.
      // Get the returned users and update the state.
      localStorage.setItem("gameId", gameId);
      const response = response0.data;
      setGameStatus(response.status);
      console.log(response);
      if (response.currentTurnId) {
        setTurnId(response.currentTurnId);
        localStorage.setItem("intialTurnId", response.currentTurnId);
      } else if (!response.currentTurnId) {
        setTurnId(response.currentTurnId);
      }

      setTurnStatus(response.currentTurnStatus);
    } catch (error) {
      handleGameError(error);

      setIsUpdating(false);
      history.push("/lobby");
    }
  };

  const handleQuitGame = async () => {
    try {
      await api().put(`/games/ending/${gameId}`);
    } catch (error) {
      handleGameError(error);
    }
    localStorage.removeItem("gameId");
    localStorage.removeItem("intialTurnId");
    history.push("/lobby");
  };
  const handleGameError = (error) => {
    const error_str = handleError(error);
    console.log(error_str);
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
  };

  useEffect(() => {
    fetchData().then(() => {});
  }, []);
  useInterval(
    async () => {
      fetchData().then(() => {});
    },
    isUpdating ? 1000 : null
  );

  const switchPages = () => {
    let content = <Spinner />;
    if (gameStatus == "PLAYING") {
      if (turnStatus === "CHOOSE_WORD") {
        content = (
          <SelectWord
            gameId={gameId}
            turnId={turnId}
            handleChooseWord={handleChooseWord}
          />
        );
      }
      else if (turnStatus === "PAINTING") {
        content = (
          <DrawingStage
            gameId={gameId}
            turnId={turnId}
            handleUpdatePainting={handleUpdatePainting}
            handleSubmitPainting={handleSubmitPainting}
          />
        );
      } else if (turnStatus === "GUESSING") {
        content = (
          <GuessingStage
            gameId={gameId}
            turnId={turnId}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        );
      } else if (turnStatus === "RANKING") {
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
      content = <Ranking gameId={gameId} handleQuitGame={handleQuitGame} />;
    } else {
      localStorage.removeItem("gameId");
      localStorage.removeItem("intialTurnId");
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
    }

    return content;
  };

  return (
    <div className="game body">
    <div className="game container">
      {/* <div
        className="lobby pic"
        style={{ opacity: "60%", left: "0px", top: "85px" }}
      >
        <img src={gameBackground} alt="" />
      </div> */}
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
    </div>
    </div>
  );
};

export default Game;
