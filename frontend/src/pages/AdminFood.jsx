import { useEffect, useState } from "react";
import axios from "axios";

function AdminFood() {

  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/food",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFoods(response.data);

    } catch (error) {

      console.error("Food error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load food listings"
      );
    }
  };


  useEffect(() => {
    fetchFoods();
  }, []);


  return (
    <div>

      <h1>Food Listings</h1>

      {foods.length === 0 ? (

        <p>No food listings found.</p>

      ) : (

        foods.map((food) => (

          <div
            key={food._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >

            <h2>{food.foodName}</h2>

            <p>
              Quantity: {food.quantity} {food.unit}
            </p>

            <p>
              Food Type: {food.foodType}
            </p>

            <p>
              Pickup Location: {food.pickupLocation}
            </p>

            <p>
              Status: {food.status}
            </p>

            <p>
              Donor: {food.donor?.name}
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default AdminFood;