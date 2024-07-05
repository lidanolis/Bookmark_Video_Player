import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ProgressBar: React.FC<{
  currentDuration: number;
  totalDuration: number;
  onProgressChange: (newPercentage: number) => void;
}> = ({ currentDuration, totalDuration, onProgressChange }) => {
  const progressInPercentage = Number(
    ((currentDuration / totalDuration) * 100).toFixed(2)
  );
  const pinLocationRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pinLocationRef.current) return;

    const rect = pinLocationRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = (clickX / rect.width) * 100;

    onProgressChange(newPercentage);
  };

  return (
    <>
      <div>{`${progressInPercentage}% progressBar`}</div>
      <PinLocation ref={pinLocationRef} onClick={handleClick}>
        <PinSpecificLocation percentage={progressInPercentage}>
          <Pin />
        </PinSpecificLocation>
        <VisualizedProgressBar>
          <CurrentProgressBar
            percentage={progressInPercentage}
          ></CurrentProgressBar>
        </VisualizedProgressBar>
      </PinLocation>
    </>
  );
};

export default ProgressBar;

const VisualizedProgressBar = styled.div`
  width: 100%;
  height: 15px;
  background: #e0e0de;
  border-radius: 16px;
`;

const CurrentProgressBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: lightblue;
  border-radius: inherit;
`;

const PinLocation = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const PinSpecificLocation = styled.div<{ percentage: number }>`
  position: absolute;
  width: ${({ percentage }) => `${percentage}%`};
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
`;

const Pin = styled.div`
  position: absolute;
  top: -35px;
  margin-right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 100% 100% 100% 0;
  background: #89849b;
  transform: rotate(-45deg);
  pointer-events: none;
  &:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    border-radius: 50%;
  }
`;
