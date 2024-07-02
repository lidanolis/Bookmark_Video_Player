import React from "react";
import styled from "styled-components";

const ProgressBar: React.FC<{
  currentDuration: number;
  totalDuration: number;
}> = ({ currentDuration, totalDuration }) => {
  const progressInPercentage = Number(
    ((currentDuration / totalDuration) * 100).toFixed(2)
  );
  return (
    <>
      <div>{`${progressInPercentage}% progressBar`}</div>
      <PinLocation>
        <PinSpecificLocation percentage={progressInPercentage}>
          <Pin />
        </PinSpecificLocation>
      </PinLocation>
      <VisualizedProgressBar>
        <CurrentProgressBar
          percentage={progressInPercentage}
        ></CurrentProgressBar>
      </VisualizedProgressBar>
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
  width: 100%;
`;

const PinSpecificLocation = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => `${percentage}%`};
  display: flex;
  justify-content: flex-end;
`;

const Pin = styled.div`
  margin-right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 100% 100% 100% 0;
  background: #89849b;
  transform: rotate(-45deg);
  &:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    border-radius: 50%;
  }
  &:hover {
    transform: scale(1.5) rotate(-45deg);
    margin-bottom: 10px;
  }
`;
