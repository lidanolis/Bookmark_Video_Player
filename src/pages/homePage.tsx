import React from "react";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default HomePage;
