import { useState, useRef, useEffect } from 'react';
import Timer from "components/views/Timer";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from 'components/ui/BaseContainer';
import "styles/views/Guessing.scss";
import DrawingBoard from './DrawingBoard';
import {useHistory, useLocation} from 'react-router-dom';
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import PropTypes from "prop-types";
import cat1 from "styles/images/player1.png";
import cat2 from "styles/images/player2.png";
import cat3 from "styles/images/player3.png";
import cat4 from "styles/images/player4.png";

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

const GuessingStage = () => {
    const [startGuessing, setStartGuessing]=useState(1); //to test the timer, set to 1
    const history = useHistory();
    const location = useLocation();
    const url = location.state.url;
    //get the room and user information
    const role = "guessingPlayer";
    const [answer, setAnswer]=useState(null); //the answer player guesses
    const [username1, setUsername1]=useState("user1");
    const [username2, setUsername2]=useState("user2");
    const [username3, setUsername3]=useState("user3");
    const [username4, setUsername4]=useState("user4");

    function getImage(){
        const myCanvas = document.getElementById('showingBoard'); 
        const myContext = myCanvas.getContext('2d');
        const img = new Image(); 
        img.src = url;
        img.onload = () => {myContext.drawImage(img, 0, 0);};
    }

    useEffect(() => {
        let ignore = false;
        if (!ignore) {getImage();}
        return () => { ignore = true; }
        },[]);

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

    return (
        <BaseContainer>
            <Header />
            <div
                className="lobby pic"
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
            {(startGuessing)?(
                <div style={{left: "350px", top: "160px", position: "absolute", "font-family": "Nunito", "font-size": "30px", "color":"black"}}>
                    Guessing stage 
                    <Timer start={startGuessing} stage="guessing"/>
                </div>
            ):(<></>)}
            {(startGuessing && (role==="guessingPlayer"))?(
                <div>
                    {answerBox}
                    <div className='guessing button-container' style={{left: "1150px", top: "440px", position: "absolute"}}>
                        <Button
                            disabled={role==="drawingPlayer"}
                            onClick={() => {
                            history.push('/ranking');
                        }}>
                            Submit
                        </Button>
                    </div>
                </div>
            ):(<></>)}
            {/* <DrawingBoard /> */}
            <canvas
                id="showingBoard"
                width="500px"
                height="600px"
                style={{ "border": "2px solid #000000", "backgroundColor": "#FFFFFF" }}
                // ref={setConvasRef}
            >
            </canvas>
        </BaseContainer>
    );
}
export default GuessingStage;