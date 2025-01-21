import { useEffect, useState } from "react";
import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";
import CardPrediction from "../components/ui-components/CardPrediction";
import "../css/pages_css/Predictions.css"
import { Prediction } from "../types/Prediction";
import axiosInstance from "../Services/axiosConfig";

const Predictions = () => {

  
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const predictionsData = await axiosInstance.get("/prediction");
      setPredictions(predictionsData.data);
    };
    fetchPredictions();
  }, []);

  return (
    <>
      <LoggedInNavBar />
      <div className="predictions-container">
        <h1>Football Predictions</h1>
        <div className="predictions-grid">
        {predictions.map((prediction, index) => (
            <CardPrediction key={index} prediction={prediction} />
        ))}
          </div>
      </div>
    </>
  );
};

export default Predictions;
