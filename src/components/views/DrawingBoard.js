import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "styles/views/DrawingBoard.scss";
import { useRef } from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";

const DrawingBoard = ({ role, time, handleDoSubmit, handleUpdate }) => {
  const history = useHistory();
  const setConvasRef = useOnDraw(onDraw);
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
        document.querySelector("#black").style.transform= "translateY(-5px)";
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

  function onDraw(canvasObject, point, previousPoint) {
    drawLine(previousPoint, point, canvasObject, lineColor, lineWidth);
  }

  function drawLine(start, end, canvasObject, color, width) {
    start = start ?? end;
    canvasObject.beginPath();
    canvasObject.lineWidth = width;
    canvasObject.strokeStyle = color;
    canvasObject.fillStyle = color;
    canvasObject.moveTo(start.x, start.y);
    canvasObject.lineTo(end.x, end.y);
    canvasObject.stroke();
  }

  function download(selector) {
    const canvas = document.querySelector(selector);
    const img = document.createElement("a");

    img.href = canvas.toDataURL();
    img.download = "your drawing";

    const event = new MouseEvent("click");
    img.dispatchEvent(event);
  }

  function resetColorButton(){
    document.querySelector("#red").style.transform= "translateY(0px)";
    document.querySelector("#orange").style.transform= "translateY(0px)";
    document.querySelector("#yellow").style.transform= "translateY(0px)";
    document.querySelector("#green").style.transform= "translateY(0px)";
    document.querySelector("#blue").style.transform= "translateY(0px)";
    document.querySelector("#purple").style.transform= "translateY(0px)";
    document.querySelector("#black").style.transform= "translateY(0px)";
  }
  
  function clear() {
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function redPen() {
    // lineColor = "#FF0000";
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FF0000");
    resetColorButton();
    document.querySelector("#red").style.transform= "translateY(-5px)";
    // setCursorStyle("url('https://icons.iconarchive.com/icons/iconsmind/outline/16/Pen-5-icon.png'),auto");
  }

  function orangePen() {
    // lineColor = "#FF7B00";
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FF7B00");
    resetColorButton();
    document.querySelector("#orange").style.transform= "translateY(-5px)";
    // setCursorStyle("url('https://icons.iconarchive.com/icons/iconsmind/outline/16/Pen-5-icon.png'),auto");
  }

  function yellowPen() {
    // lineColor = "#FFFF00";
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FFFF00");
    resetColorButton();
    document.querySelector("#yellow").style.transform= "translateY(-5px)";
    // setCursorStyle("url('https://icons.iconarchive.com/icons/iconsmind/outline/16/Pen-5-icon.png'),auto")
  }

  function greenPen() {
    // lineColor = "#00FF00";
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#00FF00");
    resetColorButton();
    document.querySelector("#green").style.transform= "translateY(-5px)";
    // setCursorStyle("url('https://icons.iconarchive.com/icons/iconsmind/outline/16/Pen-5-icon.png'),auto")
  }

  function bluePen() {
    // lineColor = "#0000FF";
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#0000FF");
    resetColorButton();
    document.querySelector("#blue").style.transform= "translateY(-5px)";
    // setCursorStyle("url('https://icons.iconarchive.com/icons/iconsmind/outline/16/Pen-5-icon.png'),auto")
  }

  function purplePen() {
    // lineColor = "#FF00FF";
    document.querySelector("#board").style.cursor = "pointer";
    setLineColor("#FF00FF");    
    resetColorButton();
    document.querySelector("#purple").style.transform= "translateY(-5px)";
  }

  function blackPen() {
    // lineColor = "#000000";
    document.querySelector("#board").style.cursor = "pointer";
    console.log(lineColor);
    setLineColor("#000000");
    resetColorButton();
    document.querySelector("#black").style.transform= "translateY(-5px)";
  }

  function eraser() {
    // lineColor = "#FFFFFF";
    document.querySelector("#board").style.cursor = "crosshair";
    console.log(lineColor);
    setLineColor("#FFFFFF");
    resetColorButton();
    // setCursorStyle("url('https://icons.iconarchive.com/icons/bootstrap/bootstrap/16/Bootstrap-eraser-fill-icon.png'),auto")
  }

  function lineBold() {
    // lineWidth = lineWidth + 1;
    setLineWidth(lineWidth + 1);
  }

  function lineThinner() {
    if (lineWidth <= 1) {
      // lineWidth = lineWidth;
      setLineWidth(lineWidth);
    } else {
      // lineWidth = lineWidth - 1;
      setLineWidth(lineWidth - 1);
    }
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
            ref={setConvasRef}
          ></canvas>
        ) : (
          <canvas
            id="showingBoard"
            width="500px"
            height="600px"
            style={{ border: "2px solid #000000", backgroundColor: "#FFFFFF" }}
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
              style={{ backgroundColor: "#FF0000"}}
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
            <Button
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
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </BaseContainer>
  );
};

function useOnDraw(onDraw) {
  const canvasRef = useRef(null);

  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef(null);
  const mouseDownListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);

  const previousPointRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    };
  }, []);

  function setConvasRef(ref) {
    if (!ref) return;
    if (mouseMoveListenerRef.current) {
      canvasRef.current.removeEventListener(
        "mousedown",
        mouseMoveListenerRef.current
      );
    }
    canvasRef.current = ref;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (e) => {
      if (isDrawingRef.current) {
        // console.log({ x: e.clientX, y: e.clientY });
        const point = computePointInCanvas(e.clientX, e.clientY);
        // console.log(point); //receive the point in the board
        const canvasObject = canvasRef.current.getContext("2d");
        if (onDraw) {
          onDraw(canvasObject, point, previousPointRef.current);
        }
        previousPointRef.current = point;
      }
    };
    mouseMoveListenerRef.current = mouseMoveListener;
    window.addEventListener("mousemove", mouseMoveListener); //relative to the top/left of the window
  }

  function initMouseDownListener() {
    if (!canvasRef.current) return;
    const mouseDownListener = () => {
      isDrawingRef.current = true;
    };
    mouseDownListenerRef.current = mouseDownListener;
    window.addEventListener("mousedown", mouseDownListener);
  }

  function initMouseUpListener() {
    const mouseUpListener = () => {
      isDrawingRef.current = false;
      previousPointRef.current = null;
    };
    mouseUpListenerRef.current = mouseUpListener;
    window.addEventListener("mouseup", mouseUpListener);
  }

  function computePointInCanvas(clientX, clientY) {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    }
  }
  return setConvasRef;
}

DrawingBoard.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default DrawingBoard;
