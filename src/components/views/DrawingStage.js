import { useState, useRef, useEffect } from 'react';
import Timer from "components/views/Timer";
import cats from "styles/images/cats2.png";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";
import Header from "components/views/Header";
import BaseContainer from 'components/ui/BaseContainer';
import "styles/views/Guessing.scss";
import DrawingBoard from './DrawingBoard';
import {useHistory, useLocation} from 'react-router-dom';
import { Button } from "components/ui/Button";
import { Spinner } from 'components/ui/Spinner';
import Turn from 'models/Turn';

const DrawingStage = () => {
    const location = useLocation();
    const startDrawing = location.state.startDrawing;
    const word = location.state.word;
    const turn = location.state.turn;
    const gameId = location.state.gameId;
    const history = useHistory();
    const [drawingPlayerId, setDrawingPlayerId] = useState(null);
    const currentId = localStorage.getItem("id");
    const [currentRole, setCurrentRole] = useState(null);
    const [players, setPlayers] = useState(null);
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);
    const [p3, setP3] = useState(null);
    const [p4, setP4] = useState(null);
    const [numberOfPlayers, setNumberOfPlayers] = useState(null);
    //get the room and user information
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

    //display cat and username
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
                        {drawingPlayerUsername}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {otherUsernames[0]}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {otherUsernames[1]}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {otherUsernames[2]}
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
    window.addEventListener("popstate", () => {
        history.go(1);
    });

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
            {currentRole==="guessingPlayer" ? (
                <DrawingBoard start = {startDrawing} role = {currentRole} turn = {turn} word = {word} gameId = {gameId}/>
            ):(<></>)}
            {/* {(startDrawing)?(
                <div style={{left: "350px", top: "160px", position: "absolute", "font-family": "Nunito", "font-size": "30px", "color":"black"}}>
                    Drawing stage 
                    <Timer start = {startDrawing} stage="drawing"/>
                </div>
            ):(<></>)} */}
            <div style={{left: "350px", top: "160px", position: "absolute", "font-family": "Nunito", "font-size": "30px", "color":"black"}}>
                Drawing stage 
                <Timer start = {startDrawing} stage="drawing"/>
            </div>
            {(startDrawing && (currentRole==="drawingPlayer"))?(
                <div>
                    <div style={{left: "150px", top: "180px", position: "absolute",
                    "font-family": "Nunito", "font-size":"20px","color":"black",
                    border: "2px solid #000000","background-color": "rgba(181, 153, 120, 0.5)",}}>
                        chosen word: <br/>
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
                    <DrawingBoard start = {startDrawing} role = {currentRole} turn = {turn} word = {word} gameId = {gameId}/>
                </div>
            ):(<></>)}
        </BaseContainer>
    );
}
export default DrawingStage;