import { useState, useRef, useEffect } from 'react';
import cats from "styles/images/cats2.png";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";
import BaseContainer from 'components/ui/BaseContainer';
import "styles/views/Guessing.scss";
import {useHistory, useLocation} from 'react-router-dom';
import { Button } from "components/ui/Button";
import { Spinner } from 'components/ui/Spinner';
import Turn from 'models/Turn';

const SelectWord = () => {
    //const [startDrawing, setStartDrawing]=useState(null); //to test the timer, click "apple" button
    let startDrawing;
    const history = useHistory();
    const location = useLocation();
    //get the room and user information
    const turn = location.state.turn;
    const gameId = location.state.gameId;
    const [drawingPlayerId, setDrawingPlayerId] = useState(null);
    const currentId = localStorage.getItem("id");
    const [currentRole, setCurrentRole] = useState(null);
    const [players, setPlayers] = useState(null);
    const [wordsToBeChosen, setWordsToBeChosen] = useState(null);
    const [chosenWord, setChosenWord] = useState(null);
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);
    const [p3, setP3] = useState(null);
    const [p4, setP4] = useState(null);
    const [numberOfPlayers, setNumberOfPlayers] = useState(null);

    const fetchTurn = async () => {
        try {
          const response = await api().get(`/gameRounds/information/${turn}`);
          console.log(response);
          const turnInfo = new Turn(response.data);
          console.log(turnInfo);
          setPlayers(turnInfo.players);
          setNumberOfPlayers(players.length);
          setDrawingPlayerId(turnInfo.drawingPlayerId);

          setP1(players[0]);
          setP2(players[1]);
          setP3(players[2]);
          setP4(players[3]);

          if(drawingPlayerId==currentId){
                setCurrentRole("drawingPlayer");
                const response2 = await api().get(`/games/words/${turn}`);
                setWordsToBeChosen(response2.wordsToBeChosen)
          }else{
                setCurrentRole("guessingPlayer");
          }
        } catch (error) {
          alert(
            `Something went wrong during get game information: \n${handleError(
              error
            )}`
          );
        }
    };
    fetchTurn();

    async function fetchData(){
        try{
            const response = await api().get(`/gameRounds/information/${turn}`);
            if(response.data.drawingPhase){
                const word = response.data.targetWord;
                startDrawing = +new Date();
                history.push({pathname:'/drawingStage', state:{gameId:gameId,startDrawing:startDrawing, word:targetWord, turn:turn}})
            }
        }catch (error) {
            alert(
                `Something went wrong during get game information: \n${handleError(
                  error
                )}`
            );
        }
    }

    if(currentId!=drawingPlayerId){
        useInterval(async () => {
            fetchData();
        }, 1000);
    }

    const displayWords = (
        <div>
            <div>
                <Button
                    // need to connect to backend later
                    onClick={() => {
                        startDrawing = +new Date();
                        // console.log(startDrawing);
                        setChosenWord(wordsToBeChosen[0]); //need to be modified
                        const requestBody = JSON.stringify({"id":turn,"targetWord":wordsToBeChosen[0]});
                        const response = api().post(`/gameRounds/words`,requestBody);
                        history.push({pathname:'/drawingStage', state:{gameId:gameId,startDrawing:startDrawing, word:chosenWord, turn:turn}});
                    }}
                    style={{left: "50px", top: "320px", position: "absolute", 
                    "font-family": "Nunito", "font-size":"20px", "color":"black", 
                    "margin-bottom": "5px",border: "2px solid #000000","background-color": "rgba(181, 153, 120, 0.5)",}}
                >
                {wordsToBeChosen[0]}
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => {
                        startDrawing = +new Date();
                        // console.log(startDrawing);
                        setChosenWord(wordsToBeChosen[1]);
                        const requestBody = JSON.stringify({"id":turn,"targetWord":wordsToBeChosen[1]});
                        const response = api().post(`/gameRounds/words`,requestBody);
                        history.push({pathname:'/drawingStage', state:{gameId:gameId,startDrawing:startDrawing, word:chosenWord, turn:turn}});
                    }}
                    style={{left: "50px", top: "370px", position: "absolute", 
                    "font-family": "Nunito", "font-size":"20px", "color":"black", 
                    "margin-bottom": "5px",border: "2px solid #000000","background-color": "rgba(181, 153, 120, 0.5)",}}
                >
                {wordsToBeChosen[1]}
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => {
                        startDrawing = +new Date();
                        // console.log(startDrawing);
                        setChosenWord(wordsToBeChosen[2]);
                        const requestBody = JSON.stringify({"id":turn,"targetWord":wordsToBeChosen[2]});
                        const response = api().post(`/gameRounds/words`,requestBody);
                        history.push({pathname:'/drawingStage', state:{gameId:gameId,startDrawing:startDrawing, word:chosenWord, turn:turn}});
                    }}
                    style={{left: "50px", top: "420px", position: "absolute", 
                    "font-family": "Nunito", "font-size":"20px", "color":"black", 
                    "margin-bottom": "5px",border: "2px solid #000000","background-color": "rgba(181, 153, 120, 0.5)",}}
                >
                {wordsToBeChosen[2]}
                </Button>
            </div>
        </div>
    );

    let drawingPlayerUsername;
    var otherUsernames = new Array();
    let i;
    for(i=0;i<numberOfPlayers;i++){
        if (players[i].id === drawingPlayerId){
            drawingPlayerUsername=players[i].username;
        }else{
            otherUsernames.push(players[i].username);
        }
    }

    const player1 = (
        <div className="guessing info">
            <img src={cat1} alt=""/>
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {drawingPlayerUsername}
            </div>
        </div>
    );
    const player2 = (
        <div className="guessing info">
            <img src={cat2} alt="" />
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {otherUsernames[0]}
            </div>
        </div>
    );
    const player3 = (
        <div className="guessing info">
            <img src={cat3} alt="" />
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {otherUsernames[1]}
            </div>
        </div>
    );
    const player4 = (
        <div className="guessing info">
            <img src={cat4} alt="" />
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {otherUsernames[2]}
            </div>
        </div>
    );

    //ranking component
    const ranking = (
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
                    <div className="guessing content" >
                        {p1.username}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {p2.username}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {p3.username}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {p4.username}
                    </div>
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
            <div style={{left: "40px", top: "170px", position: "absolute"}}>
                {player1}
            </div>
            <div style={{left: "900px", top: "170px", position: "absolute"}}>
                {player2}
            </div>
            <div style={{left: "1100px", top: "170px", position: "absolute"}}>
                {player3}
            </div>
            <div style={{left: "1300px", top: "170px", position: "absolute"}}>
                {player4}
            </div>
            <div>
                {ranking}
            </div>
            {(!startDrawing && (currentRole==="drawingPlayer"))? (
                <div>
                    <h2 style={{left: "250px", top: "180px", position: "absolute", "font-family": "Nunito", "color":"black"}}>Choose one word first!</h2>
                    {displayWords}
                </div>
            ):(
                <div>
                    <h2 style={{left: "250px", top: "180px", position: "absolute", "font-family": "Nunito", "color":"black"}}>Wait for the drawing player...</h2>
                </div>
            )}
        </BaseContainer>
    );
}
export default SelectWord;