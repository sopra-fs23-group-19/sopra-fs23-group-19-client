import React, { useEffect , useState} from "react";
import PropTypes from "prop-types";
import "styles/views/DrawingBoard.scss";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import { useRef } from "react";
import {Button} from 'components/ui/Button';

const DrawingBoard = () => {

    const setConvasRef = useOnDraw(onDraw);
    let lineColor = "#A52A2A";
    let lineWidth = 5;

    function onDraw(canvasObject, point, previousPoint) {
        drawLine(previousPoint, point, canvasObject, lineColor, lineWidth)
    }

    function drawLine(start,end,canvasObject,color,width) {
        start = start ?? end;
        canvasObject.beginPath();
        canvasObject.lineWidth = width;
        canvasObject.strokeStyle = color;
        canvasObject.moveTo(start.x, start.y);
        canvasObject.lineTo(end.x, end.y);
        canvasObject.stroke();

        canvasObject.fillStyle = color;
        canvasObject.beginPath();
        canvasObject.arc(start.x, start.y, width*0.45, 0, width * Math.PI);
        canvasObject.fill();
    }

    function download(selector) {
        
        const canvas = document.querySelector(selector);
      
        const img = document.createElement('a');
        
        img.href = canvas.toDataURL();
        img.download = 'your drawing';
        
        const event = new MouseEvent('click');
        img.dispatchEvent(event);
      }
  
    const eraser  = async() => {
        lineColor = "#FFFFFF";
    }

    const blackPen  = async() => {
        lineColor = "#000000";
    }

    const lineBold = async() => {
        lineWidth = lineWidth + 1;
    }

    const lineThinner = async() => {
        if(lineWidth <= 1){
            lineWidth = lineWidth;
        }else{
            lineWidth = lineWidth - 1;
        }
    }

    return(
        <><div className="drawingBoard board">
            <canvas
                id="board"
                width="500"
                height="600"
                style={{ "border": "2px solid #000000", "background": "#FFFFFF" }}
                ref={setConvasRef}
            >
            </canvas>
        </div>
        <div className="drawingBoard container">
        <Button
              width="100%"
              onClick={() => eraser()}
            >
              Eraser
            </Button>
            <Button
              onClick={()=> blackPen()}
            >
              Black
            </Button>
            <Button
              onClick={()=> lineBold()}
            >
              line bold
            </Button>
            <Button
              onClick={()=> lineThinner()}
            >
              line thinner
            </Button>
            <Button
              onClick={()=> download('#board')}
            >
              download
            </Button>
        </div></>
        
     
      
    );
  };

  function useOnDraw(onDraw) {
    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseDownListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null); 

    const previousPointRef = useRef(null);

    useEffect(()=>{
        return () => {
            if(mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if(mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }
    }, []);

    function setConvasRef(ref) {
        if(!ref) return;
        if(mouseMoveListenerRef.current){
            canvasRef.current.removeEventListener("mousedown", mouseMoveListenerRef.current);
        }
        canvasRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener()
    }

    function initMouseMoveListener(){
        const mouseMoveListener = (e) =>{
            if(isDrawingRef.current) {
                console.log({x: e.clientX, y: e.clientY});
                const point = computePointInCanvas(e.clientX, e.clientY);
                console.log(point);//receive the point in the board
                const canvasObject = canvasRef.current.getContext('2d');
                if(onDraw){
                    onDraw(canvasObject, point, previousPointRef.current);
                }
                previousPointRef.current = point;
            }
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener("mousemove", mouseMoveListener);//relative to the top/left of the window
    }

    function initMouseDownListener() {
        if(!canvasRef.current) return;
        const mouseDownListener = () => {
            isDrawingRef.current = true;
        }
        mouseDownListenerRef.current = mouseDownListener;
        window.addEventListener("mousedown", mouseDownListener);
    }

    function initMouseUpListener() {
        const mouseUpListener = () => {
            isDrawingRef.current = false;
            previousPointRef.current = null;
        }
        mouseUpListenerRef.current = mouseUpListener;
        window.addEventListener("mouseup", mouseUpListener);
    }

    function computePointInCanvas(clientX, clientY){
        if(canvasRef.current){
            const boundingRect = canvasRef.current.getBoundingClientRect();
            return {
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top
            }
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
  