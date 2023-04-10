import { useState, useRef, useEffect } from 'react';
import Timer from 'components/views/Timer.tsx';
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import BaseContainer from 'components/ui/BaseContainer';
import "styles/views/Game.scss";

const GamePage = () => {
    return (
        <BaseContainer>
            <Header />
            <div
                className="lobby pic"
                style={{ opacity: "20%", left: "1000px", top: "280px" }}
            >
                <img src={cats} alt="" />
            </div>
            <div style = {{left: "300px", top: "180px", position: "absolute", "font-family": "Nunito", "font-size": "55px", "color":"black"}}>
                <Timer mss={60}/>s
            </div>
        </BaseContainer>
    );
}
export default GamePage;