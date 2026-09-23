import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DonorDashboard() {
  const [foodListings, setFoodListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFoodListings();
  }, []);

  const fetchFoodListings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/food/my-listings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFoodListings(response.data || []);
    } catch (error) {
      console.error("Error fetching food listings:", error);
      setError("Failed to load food listings");
    } finally {
      setLoading(false);
    }
  };

  // Statistics
  const totalListings = foodListings.length;

  const availableFood = foodListings.filter(
    (food) => food.status === "AVAILABLE"
  ).length;

  const completedFood = foodListings.filter(
    (food) => food.status === "COMPLETED"
  ).length;

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">FOODCONNECT</p>

          <h1>Donor Dashboard</h1>

          <p>
            Manage your food donations, track pickups,
            and reduce food waste.
          </p>
        </div>

        <Link
          to="/donor/add-food"
          className="primary-button"
        >
          + Add Food
        </Link>
      </div>


      {/* ================= ERROR ================= */}
      {error && (
        <div className="empty-dashboard-card">
          <p>{error}</p>
        </div>
      )}


      {/* ================= STATISTICS ================= */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            🍱
          </div>

          <div>
            <p>Total Listings</p>
            <h2>{totalListings}</h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            🟢
          </div>

          <div>
            <p>Available Food</p>
            <h2>{availableFood}</h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            ✅
          </div>

          <div>
            <p>Completed</p>
            <h2>{completedFood}</h2>
          </div>
        </div>

      </div>


      {/* ================= QUICK ACTIONS ================= */}
      <div className="dashboard-section">

        <h2 className="section-heading">
          Quick Actions
        </h2>

        <div className="action-grid">

          {/* Add Food */}
          <Link
            to="/donor/add-food"
            className="action-card"
          >
            <div className="action-icon">
              🍱
            </div>

            <div>
              <h3>Add Food</h3>

              <p>
                Create a new food donation listing.
              </p>

            </div>
          </Link>
          <Link
            to="/donor/add-consumption"
            className="action-card"
          >
            <div className="action-icon">
              📈
            </div>

            <div>
              <h3>Add Consumption Data</h3>

              <p>
                Add previous food consumption records.
              </p>
            </div>
          </Link>


          {/* My Listings */}
          <Link
            to="/donor/my-listings"
            className="action-card"
          >
            <div className="action-icon">
              📋
            </div>

            <div>
              <h3>My Listings</h3>

              <p>
                View and manage your food listings.
              </p>
            </div>
          </Link>


          {/* Claims */}
          <Link
            to="/donor/claims"
            className="action-card"
          >
            <div className="action-icon">
              📦
            </div>

            <div>
              <h3>Claims</h3>

              <p>
                See receivers who claimed your food.
              </p>
            </div>
          </Link>


          {/* Pickups */}
          <Link
            to="/donor/pickups"
            className="action-card"
          >
            <div className="action-icon">
              🚚
            </div>

            <div>
              <h3>My Pickups</h3>

              <p>
                Track your food pickups.
              </p>
            </div>
          </Link>


          {/* ================= DEMAND PREDICTION ================= */}
          <Link
            to="/donor/demand-prediction"
            className="action-card"
          >
            <div className="action-icon">
              📊
            </div>

            <div>
              <h3>Demand Prediction</h3>

              <p>
                Predict future food demand using
                past consumption data.
              </p>
            </div>
          </Link>
          {/* ================= NOTIFICATIONS ================= */}
          <Link
            to="/notifications"
            className="action-card"
          >
            <div className="action-icon">
              🔔
            </div>

            <div>
              <h3>Notifications</h3>

              <p>
                View your food claim and pickup notifications.
              </p>
            </div>
          </Link>

        </div>

      </div>


      {/* ================= RECENT LISTINGS ================= */}
      <div className="dashboard-section">

        <div className="section-header">

          <h2 className="section-heading">
            Recent Listings
          </h2>

          <Link
            to="/donor/my-listings"
            className="section-link"
          >
            View All
          </Link>

        </div>


        {loading ? (

          <div className="empty-dashboard-card">
            <p>Loading listings...</p>
          </div>

        ) : foodListings.length === 0 ? (

          <div className="empty-dashboard-card">

            <div className="empty-icon">
              🍱
            </div>

            <h3>
              No food listings yet
            </h3>

            <p>
              Start by adding your first food donation.
            </p>

            <Link
              to="/donor/add-food"
              className="primary-button"
            >
              Add Food
            </Link>

          </div>

        ) : (

          <div className="my-listings-grid">

            {foodListings
              .slice(0, 5)
              .map((food) => (

                <div
                  className="listing-card"
                  key={food._id}
                >

                  <div className="listing-card-top">

                    <div className="listing-food-icon">
                      🍛
                    </div>

                    <div>
                      <h3>
                        {food.foodName}
                      </h3>

                      <p className="listing-type">
                        {food.foodType}
                      </p>
                    </div>

                  </div>


                  <div className="listing-details">

                    <p>
                      <strong>
                        Quantity:
                      </strong>{" "}
                      {food.quantity}{" "}
                      {food.unit}
                    </p>


                    <p>
                      <strong>
                        Location:
                      </strong>{" "}
                      {food.pickupLocation}
                    </p>


                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {food.status}
                    </p>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default DonorDashboard;