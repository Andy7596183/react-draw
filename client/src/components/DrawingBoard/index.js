import React, { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";

const CanvasWrapper = styled.canvas`
  margin: 0;
`;

function DrawingBoard() {
  // canvas ref
  const canvasRef = useRef();
  let ctx = useRef();
  let isDown = useRef();
  let mousePosition = useRef();

  // set canvas context after ref is set
  useEffect(() => {
    ctx.current = canvasRef.current.getContext("2d");
  }, []);

  // mousedown
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", onMouseDown);
    return () => canvas.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown]);

  const onMouseDown = e => {
    isDown.current = true;
    mousePosition.current = [e.clientX, e.clientY];
  };

  // mousemove
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", onMouseMove);
    return () => canvas.removeEventListener("mousemove", onMouseMove);
  }, [drawLine]);

  const onMouseMove = e => {
    if (isDown.current) {
      drawLine(ctx.current, e);
      mousePosition.current = [e.clientX, e.clientY];
    }
  };

  const drawLine = (ctx, e) => {
    const prevCvPosition = getPosition(mousePosition.current);
    const currentCvPosition = getPosition([e.clientX, e.clientY]);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(...prevCvPosition);
    ctx.lineTo(...currentCvPosition);
    ctx.closePath();
    ctx.stroke();
  };

  const getPosition = position => [
    position[0] - canvasRef.current.getBoundingClientRect().left,
    position[1] - canvasRef.current.getBoundingClientRect().top
  ];

  // mouseup/mouseleave
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    return () => {
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
    };
  }, [onMouseUp]);

  const onMouseUp = e => {
    isDown.current = false;
  };

  const clearBoard = () => {
    ctx.current.setTransform(1, 0, 0, 1, 0, 0);
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  return (
    <>
      <h1>Drawing Board</h1>
      <CanvasWrapper
        width={window.innerWidth}
        height="500px"
        style={{ border: "black solid 1px" }}
        ref={canvasRef}
      />
      <button onClick={clearBoard}>清除</button>
    </>
  );
}

export default DrawingBoard;
