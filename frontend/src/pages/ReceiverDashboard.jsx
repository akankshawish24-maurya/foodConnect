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
    </div>
  );
}

export default ReceiverDashboard;