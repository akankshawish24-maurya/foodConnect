
import { useNavigate } from "react-router-dom";

function ReceiverDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Receiver Dashboard</h1>

      <p>Welcome to FoodConnect!</p>

      <button
        onClick={() => navigate("/receiver/available-food")}
      >
        View Available Food
      </button>

      <br />
      <br />

      <button
        onClick={() => navigate("/receiver/smart-matches")}
      >
        Smart Food Matches
      </button>
      <br />
      <br />

      <button
        onClick={() => navigate("/notifications")}
      >
        🔔 Notifications
      </button>
    </div>
  );
}

export default ReceiverDashboard;