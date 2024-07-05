import React from "react";
import { useNavigate } from "react-router-dom";
import InteractiveProgressBar from "../components/interactiveProgressBar";

const HomePage: React.FC = () => {
  const Navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          Navigate("/video");
        }}
      >
        Go To Video Page
      </button>
      <div style={{ width: "100%", height: "100%" }}>
        <InteractiveProgressBar />
      </div>
    </div>
  );
};

export default HomePage;
