import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const InteractiveProgressBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) {
      return;
    }
    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      e.stopPropagation();
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
      e.stopPropagation();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isClicked.current) {
        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;

        box.style.left = `${nextX}px`;
        box.style.top = `${nextY}px`;
      }
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, []);

  return (
    <div>
      <Main>
        <Container ref={containerRef}>
          <Box ref={boxRef}></Box>
        </Container>
      </Main>
    </div>
  );
};

export default InteractiveProgressBar;

const Main = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  position: relative;
  border: 1px solid black;
  height: 800px;
  width: 800px;
  overflow: hidden;
`;

const Box = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: hotpink;
  height: 60px;
  width: 60px;
  cursor: pointer;
`;
