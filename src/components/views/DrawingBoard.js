import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "styles/views/DrawingBoard.scss";
import { useRef } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import Option from "components/ui/Option";

const DrawingBoard = ({ role, time, handleDoSubmit, handleUpdate }) => {
  const history = useHistory();
  const canvasRef = useRef(null);
  const [lineColor, setLineColor] = useState(null);
  const [lineWidth, setLineWidth] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (document.querySelector("#board") != null) {
        const canvas = document.querySelector("#board");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // lineColor='#000000';
        // lineWidth=5;
        setLineColor("#000000");
        setLineWidth(5);
        document.querySelector("#board").style.cursor = "pointer";
        document.querySelector("#black").style.transform = "translateY(-5px)";
        // setCursorStyle("url('https://icons.iconarchive.com/icons/iconsmind/outline/16/Pen-5-icon.png'),auto");
      }
    }
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    if (time > 0 && time % 2 == 0) {
      const canvas = document.getElementById("board");
      const url = canvas.toDataURL();
      handleUpdate(url);
    }
    if (time == 0) {
      const canvas = document.getElementById("board");
      const url = canvas.toDataURL();
      handleDoSubmit(url);
    }
  }, [time]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
      e.preventDefault();

      if(!isDrawing) return;

      let offsetX; 
      let offsetY;

      if(e.type === "touchmove"){
        const rect = canvas.getBoundingClientRect();
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
      } else{
        offsetX = e.offsetX;
        offsetY = e.offsetY;
      }

      context.strokeStyle = lineColor;
      context.lineWidth = lineWidth;
      context.lineCap = 'round';

      context.beginPath();
      context.moveTo(lastX,lastY);
      context.lineTo(offsetX, offsetY);
      context.stroke();

      if(lastX==offsetX && lastY==offsetY){
        context.fillStyle = lineColor;
        context.beginPath();
        context.arc(offsetX, offsetY, lineWidth / 2, 0, 2 * Math.PI);
        context.fill();
      }

      [lastX, lastY] =[offsetX, offsetY]

    }

    canvas.addEventListener('mousedown', (e) =>{
      isDrawing = true;
      [lastX, lastY] =[e.offsetX, e.offsetY]
    })

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', () =>isDrawing = false);

    canvas.addEventListener('mouseout', () =>isDrawing = false);
    
    //touchable
    canvas.addEventListener('touchstart', (e) =>{
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      [lastX, lastY] =[e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top]
    })

    // canvas.addEventListener('touchmove', (e) =>{
    //   if(!isDrawing) return;
    //   const touch = e.touches[0];
    //   const offsetX = touch.pageX - canvas.offsetLeft;
    //   const offsetY = touch.pageY - canvas.offsetTop;

    //   context.beginPath();
    //   context.moveTo(lastX, lastY);
    //   context.lineTo(offsetX, offsetY);
    //   context.stroke();

    //   [lastX, lastY] = [offsetX, offsetY];

    //   e.preventDefault();

    // });
    canvas.addEventListener('touchmove', draw);

    canvas.addEventListener('touchend', ()=> isDrawing = false);

    return () => {
      canvas.removeEventListener('mousedown', ()=>{});
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', ()=>{});
      canvas.removeEventListener('mouseout', ()=>{});
      canvas.removeEventListener('touchstart', ()=>{});
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', ()=>{});
    }
  },[lineColor, lineWidth]);

  // function onDraw(canvasObject, point, previousPoint) {
  //   drawLine(previousPoint, point, canvasObject, lineColor, lineWidth);
  //   // drawCircle(previousPoint, point, canvasObject, lineColor, lineWidth);
  // }

  // function drawLine(start, end, canvasObject, color, width) {
  //   start = start ?? end;
  //   canvasObject.beginPath();
  //   canvasObject.lineWidth = width;
  //   canvasObject.strokeStyle = color; // set the strokeStyle to the passed color
  //   canvasObject.moveTo(start.x, start.y);
  //   canvasObject.lineTo(end.x, end.y);
  //   canvasObject.stroke();
  // }



  function download(selector) {
    const canvas = document.querySelector(selector);
    const img = document.createElement("a");

    img.href = canvas.toDataURL();
    img.download = "your drawing";

    const event = new MouseEvent("click");
    img.dispatchEvent(event);
  }

  function resetColorButton() {
    document.querySelector("#red").style.transform = "translateY(0px)";
    document.querySelector("#orange").style.transform = "translateY(0px)";
    document.querySelector("#yellow").style.transform = "translateY(0px)";
    document.querySelector("#green").style.transform = "translateY(0px)";
    document.querySelector("#blue").style.transform = "translateY(0px)";
    document.querySelector("#purple").style.transform = "translateY(0px)";
    document.querySelector("#black").style.transform = "translateY(0px)";
  }

  function clear() {
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function redPen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FF0000");
    resetColorButton();
    document.querySelector("#red").style.transform = "translateY(-5px)";
  }

  function orangePen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FF7B00");
    resetColorButton();
    document.querySelector("#orange").style.transform = "translateY(-5px)";
  }

  function yellowPen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FFFF00");
    resetColorButton();
    document.querySelector("#yellow").style.transform = "translateY(-5px)";
  }

  function greenPen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#00FF00");
    resetColorButton();
    document.querySelector("#green").style.transform = "translateY(-5px)";
  }

  function bluePen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#0000FF");
    resetColorButton();
    document.querySelector("#blue").style.transform = "translateY(-5px)";
  }

  function purplePen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FF00FF");
    resetColorButton();
    document.querySelector("#purple").style.transform = "translateY(-5px)";
  }

  function blackPen() {
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#000000");
    resetColorButton();
    document.querySelector("#black").style.transform = "translateY(-5px)";
  }

  function eraser() {
    document.querySelector("#board").style.cursor = "crosshair";
    setLineColor("#FFFFFF");
    resetColorButton();
  }

  function handleFontSizeChange(size){
    setLineWidth(size);
  }


  return (
    <BaseContainer>
      <div className="drawingBoard board">
        {role === "drawingPlayer" ? (
          <canvas
            id="board"
            width="500px"
            height="600px"
            style={{
              border: "2px solid #000000",
              backgroundColor: "#FFFFFF",
              // cursor: "pointer"
            }}
            ref={canvasRef}
          ></canvas>
        ) : (
          <canvas
            id="showingBoard"
            width="500px"
            height="600px"
            style={{ border: "2px solid #000000", backgroundColor: "#FFFFFF", "left":"80px", top:"300px",position:"absolute"}}
            // ref={setConvasRef}
          ></canvas>
        )}
      </div>
      <div className="drawingBoard container">
        {role === "drawingPlayer" ? (
          <>
            <div
              className="drawingBoard circle"
              id="red"
              style={{ backgroundColor: "#FF0000" }}
              onClick={() => redPen()}
            ></div>
            <div
              className="drawingBoard circle"
              id="orange"
              style={{ backgroundColor: "#FF7B00" }}
              onClick={() => orangePen()}
            ></div>
            <div
              className="drawingBoard circle"
              id="yellow"
              style={{ backgroundColor: "#FFFF00" }}
              onClick={() => yellowPen()}
            ></div>
            <div
              className="drawingBoard circle"
              id="green"
              style={{ backgroundColor: "#00FF00" }}
              onClick={() => greenPen()}
            ></div>
            <div
              className="drawingBoard circle"
              id="blue"
              style={{ backgroundColor: "#0000FF" }}
              onClick={() => bluePen()}
            ></div>
            <div
              className="drawingBoard circle"
              id="purple"
              style={{ backgroundColor: "#FF00FF" }}
              onClick={() => purplePen()}
            ></div>
            <div
              className="drawingBoard circle"
              id="black"
              style={{ backgroundColor: "#000000" }}
              onClick={() => blackPen()}
            ></div>
            <div style={{"marginLeft":"1em"}}>
            <Option defaultLineSize="5" onLineSizeChange={handleFontSizeChange}></Option>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="drawingBoard container" style={{ "margin-top": "40px" }}>
        {role === "drawingPlayer" ? (
          <>
            <Button
              onClick={() => download("#board")}
              style={{ border: "2px solid #000000" }}
            >
              download
            </Button>
            <Button
              onClick={() => clear()}
              style={{ border: "2px solid #000000", "margin-left": "15px" }}
            >
              clear
            </Button>
            <Button
              onClick={() => eraser()}
              // onClick={() => lineColor="#FFFFFF" }
              style={{ border: "2px solid #000000", "margin-left": "15px" }}
            >
              eraser
            </Button>
            <Button
              onClick={() => {
                handleDoSubmit(document.getElementById("board").toDataURL());
              }}
              style={{ border: "2px solid #000000", "margin-left": "15px" }}
            >
              submit
            </Button>
            {/* <Button
              onClick={() => lineBold()}
              style={{
                border: "2px solid #000000",
                "margin-left": "15px",
                width: "40px",
              }}
            >
              +
            </Button>
            <Button
              onClick={() => lineThinner()}
              style={{
                border: "2px solid #000000",
                "margin-left": "15px",
                width: "40px",
              }}
            >
              -
            </Button> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </BaseContainer>
  );
};


DrawingBoard.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default DrawingBoard;
