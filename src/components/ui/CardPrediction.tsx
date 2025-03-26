import {  useNavigate } from "react-router-dom";

interface Prediction {
  Team1: string;
  Team2: string;
  Team1Score: number;
  Team2Score: number;
  Winner: string;
  Date: string;
}

const saveOnLocalStorage = (prediction: Prediction) => {
  window.localStorage.setItem("prediction", JSON.stringify(prediction));
};

const CardPrediction = ({ prediction }: { prediction: Prediction }) => {
  const navigate = useNavigate();

  const handleRepost = () => {
    saveOnLocalStorage(prediction);
    navigate('/feed');
  };

  return (
    <div className="card">
      <h3>{prediction.Team1} vs {prediction.Team2}</h3>
      <p>Score: {prediction.Team1Score} - {prediction.Team2Score}</p>
      <p>Winner: <strong>{prediction.Winner}</strong></p>
      <p>Date: {prediction.Date}</p>

      <button onClick={handleRepost} style={{ marginLeft: "1rem", color: "blue", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>
        Repost this prediction
      </button>
    </div>
  );
};

export default CardPrediction;
