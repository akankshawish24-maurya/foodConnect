
import { useEffect, useState } from "react";
import axios from "axios";

function AvailableFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available food
  useEffect(() => {
    fetchAvailableFood();
  }, []);

  const fetchAvailableFood = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/food/available",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching food:", error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch available food"
      );
    } finally {
      setLoading(false);
    }
  };

  // Claim food
  const handleClaim = async (foodId, maxQuantity) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      // Ask receiver for quantity
      const quantity = prompt(
        `Enter quantity you want to claim (Maximum: ${maxQuantity}):`
      );

      // User pressed Cancel
      if (quantity === null) {
        return;
      }

      // Convert to number
      const requestedQuantity = Number(quantity);

      // Validate quantity
      if (!requestedQuantity || requestedQuantity <= 0) {
        alert("Please enter a valid quantity");
        return;
      }

      if (requestedQuantity > maxQuantity) {
        alert(`You can claim maximum ${maxQuantity} ${foods.find(f => f._id === foodId)?.unit || "units"}`);
        return;
      }

      // Send claim request
      const response = await axios.post(
        "http://127.0.0.1:5000/api/claims",
        {
          foodId: foodId,
          quantity: requestedQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Show success message
      alert(response.data.message);

      // Refresh available food
      fetchAvailableFood();

    } catch (error) {
      console.error("Claim error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to claim food"
      );
    }
  };

  // Loading state
  if (loading) {
    return <h2>Loading available food...</h2>;
  }

  return (
    <div>
      <h1>Available Food</h1>

      {foods.length === 0 ? (
        <p>No food available right now.</p>
      ) : (
        foods.map((food) => (
          <div
            key={food._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "10px"
            }}
          >
            <h2>{food.foodName}</h2>

            <p>
              <strong>Food Type:</strong>{" "}
              {food.foodType}
            </p>

            <p>
              <strong>Quantity:</strong>{" "}
              {food.quantity} {food.unit}
            </p>

            <p>
              <strong>Pickup Location:</strong>{" "}
              {food.pickupLocation}
            </p>

            <p>
              <strong>Available Until:</strong>{" "}
              {new Date(food.availableUntil).toLocaleString()}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {food.description || "No description"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {food.status}
            </p>
            <p>
              <strong>Urgency:</strong>{" "}
              {food.urgencyLabel}
            </p>

            <p>
              <strong>Time Remaining:</strong>{" "}
              {food.minutesRemaining} minutes
            </p>

            <button
              onClick={() =>
                handleClaim(food._id, food.quantity)
              }
            >
              Claim Food
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AvailableFood;