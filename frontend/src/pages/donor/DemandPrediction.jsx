import { useEffect, useState } from "react";
import axios from "axios";

function DemandPrediction() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/demand/prediction",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPredictions(response.data.predictions || []);

    } catch (error) {
      console.error("Prediction error:", error);

      setError("Failed to load demand prediction");

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <h2>Loading demand prediction...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            FOODCONNECT
          </p>

          <h1>Demand Prediction</h1>

          <p>
            Use previous consumption data to
            estimate future food demand.
          </p>
        </div>

      </div>


      {/* Error */}

      {error && (
        <div className="empty-dashboard-card">
          <p>{error}</p>
        </div>
      )}


      {/* No data */}

      {predictions.length === 0 && !error && (
        <div className="empty-dashboard-card">

          <div className="empty-icon">
            📊
          </div>

          <h3>No prediction data available</h3>

          <p>
            Add consumption data to generate
            demand predictions.
          </p>

        </div>
      )}


      {/* Prediction Cards */}

      {predictions.length > 0 && (
        <div className="dashboard-section">

          <h2 className="section-heading">
            Food Demand Predictions
          </h2>

          <div className="my-listings-grid">

            {predictions.map((item) => (

              <div
                className="listing-card"
                key={item.foodName}
              >

                <div className="listing-card-top">

                  <div className="listing-food-icon">
                    🍛
                  </div>

                  <div>
                    <h3>{item.foodName}</h3>

                    <p className="listing-type">
                      Based on {item.records} records
                    </p>
                  </div>

                </div>


                <div className="listing-details">

                  <p>
                    <strong>
                      Average Demand:
                    </strong>{" "}
                    {item.averageDemand}
                  </p>

                  <p>
                    <strong>
                      Suggested Preparation:
                    </strong>{" "}
                    {item.suggestedPreparation}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default DemandPrediction;