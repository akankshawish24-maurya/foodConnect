import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyListings() {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/food/my-listings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFoods(response.data);

    } catch (error) {

      console.error("Fetch listings error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load listings"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchListings();
  }, []);


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food listing?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:5000/api/food/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Food listing deleted successfully");

      fetchListings();

    } catch (error) {

      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete listing"
      );
    }
  };


  return (

    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            🍃 FoodConnect
          </p>

          <h1>My Food Listings</h1>

          <p>
            Manage the food donations you have posted.
          </p>
        </div>


        <Link to="/donor/add-food">

          <button className="dashboard-primary-button">
            + Add Food
          </button>

        </Link>

      </div>


      {loading ? (

        <div className="empty-dashboard-card">
          <p>Loading your listings...</p>
        </div>

      ) : foods.length === 0 ? (

        <div className="empty-dashboard-card">

          <div className="empty-icon">
            🍽️
          </div>

          <h3>No food listings yet</h3>

          <p>
            You haven't added any food donations.
          </p>

          <Link to="/donor/add-food">

            <button className="dashboard-primary-button">
              + Add Your First Food
            </button>

          </Link>

        </div>

      ) : (

        <div className="my-listings-grid">

          {foods.map((food) => (

            <div
              className="listing-card"
              key={food._id}
            >

              <div className="listing-card-top">

                <div className="listing-food-icon">
                  🍱
                </div>

                <span
                  className={`status-badge status-${food.status.toLowerCase()}`}
                >
                  {food.status}
                </span>

              </div>


              <h3>{food.foodName}</h3>

              <p className="listing-type">
                {food.foodType}
              </p>


              <div className="listing-details">

                <div>
                  <strong>Quantity</strong>
                  <span>
                    {food.quantity} {food.unit}
                  </span>
                </div>

                <div>
                  <strong>Pickup</strong>
                  <span>
                    {food.pickupLocation}
                  </span>
                </div>

              </div>


              <div className="listing-actions">

                <button
                  className="delete-button"
                  onClick={() => handleDelete(food._id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyListings;