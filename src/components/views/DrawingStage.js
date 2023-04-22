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

const DrawingStage = (props) => {
    const location = useLocation();
    const startDrawing = location.state.startDrawing;
    const word = location.state.word;
    const history = useHistory();
    //get the room and user information
    const role = "drawingPlayer";
    //const [word, setWord]=useState('apple'); //the chosen word
    const [username1, setUsername1]=useState("user1");
    const [username2, setUsername2]=useState("user2");
    const [username3, setUsername3]=useState("user3");
    const [username4, setUsername4]=useState("user4");

    //display cat and username
    const player1 = (
        <div className="guessing info">
            <img src={cat1} alt=""/>
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {username1}
            </div>
        </div>
    );
    const player2 = (
        <div className="guessing info">
            <img src={cat2} alt="" />
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {username2}
            </div>
        </div>
    );
    const player3 = (
        <div className="guessing info">
            <img src={cat3} alt="" />
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {username3}
            </div>
        </div>
    );
    const player4 = (
        <div className="guessing info">
            <img src={cat4} alt="" />
            <div style={{"font-family": "Nunito", "font-size": "20px","color":"black"}}>
                {username4}
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
                        {username1}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {username2}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {username3}
                    </div>
                    <div className="guessing content">0</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {username4}
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
            {role==="guessingPlayer" ? (
                <DrawingBoard start = {startDrawing} role = {"guessingPlayer"}/>
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
            {(startDrawing && (role==="drawingPlayer"))?(
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
                    <DrawingBoard start = {startDrawing} role = {"drawingPlayer"}/>
                </div>
            ):(<></>)}
        </BaseContainer>
    );
}
export default DrawingStage;