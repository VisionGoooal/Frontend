import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import CardPrediction from "../components/ui/CardPrediction";
import "../css/pages_css/Predictions.css"
import { Prediction } from "../types/Prediction";
import axiosInstance from "../Services/axiosConfig";

const Predictions = () => {

  
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const predictionsData = await axiosInstance.get("api/prediction");
      setPredictions(predictionsData.data);
    };
    fetchPredictions();
  }, []);

  return (
    <>
      <Navbar />
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
