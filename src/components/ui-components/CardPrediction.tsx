import { Link } from "react-router-dom";
import { FEED_PAGE_PATH } from "../../constants/routePaths";


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
}

const CardPrediction = ({ prediction }: { prediction: Prediction }) => {

    return (
      <div className="card">
        <h3>
          {prediction.Team1} vs {prediction.Team2}
        </h3>
        <p>Score: {prediction.Team1Score} - {prediction.Team2Score}</p>
        <p>Winner: <strong>{prediction.Winner}</strong></p>
        <p>Date: {prediction.Date}</p>
        <Link to={`/predictions/${prediction.Team1}-${prediction.Team2}`}>
          View Details
        </Link>
        <Link to={FEED_PAGE_PATH} onClick={() => saveOnLocalStorage(prediction)}>Repost this prediction</Link>
      </div>
    );
  };

export default CardPrediction;
