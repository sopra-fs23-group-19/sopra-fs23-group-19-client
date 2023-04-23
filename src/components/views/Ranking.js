import { useState, useRef, useEffect } from 'react';
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from 'components/ui/BaseContainer';
import "styles/views/Guessing.scss";
import {useHistory, useLocation} from 'react-router-dom';
import { Button } from "components/ui/Button";

const Ranking = () => {
    const history = useHistory();
    const location = useLocation();
    const data = location.state.data;
    console.log(data);
    //get the username and score
    const user1 = data[1];
    const user2 = data[2];
    const user3 = data[3];
    const user4 = data[4];
    // const [username1, setUsername1]=useState("user1");
    // const [username2, setUsername2]=useState("user2");
    // const [username3, setUsername3]=useState("user3");
    // const [username4, setUsername4]=useState("user4");

    //ranking component
    //need to sort the score later
    const ranking = (
        <div>
            <div className="guessing score-list" style={{left:"500px",top:"200px",position:"absolute"}}>
                <div className="guessing score-container">
                    <div className="guessing rank-title" style={{}}>
                        Username
                    </div>
                    <div className="guessing rank-title">Score</div>
                </div>
                <div className="guessing line"></div>
                <div className="guessing score-container">
                    <div className="guessing content" >
                        {user1.username}
                    </div>
                    <div className="guessing content">{user1.currentGameScore}</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {user2.username}
                    </div>
                    <div className="guessing content">{user2.currentGameScore}</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {user3}
                    </div>
                    <div className="guessing content">{user3.currentGameScore}</div>
                </div>
                <div
                    className="guessing line"
                    style={{ border: "2px solid #ad9a66" }}
                ></div>
                <div className="guessing score-container">
                    <div className="guessing content">
                        {user4}
                    </div>
                    <div className="guessing content">{user4.currentGameScore}</div>
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
            <div>
                {ranking}
            </div>
            <div className='guessing button-container'
            style={{left: "500px", top: "580px", position: "absolute", width:"480px",height:"50px"}}>
                <Button
                    onClick={() => {
                    history.push('/lobby');
                    }}
                    width="100%"
                    style={{"margin-top": "5px",border: "2px solid #000000"}}
                >
                    Back
                </Button>
            </div>
        </BaseContainer>
    );
}
export default Ranking;