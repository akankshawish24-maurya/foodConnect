import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DonorDashboard() {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoodListings = async () => {

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

      console.error(
        "Error fetching donor food:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load food listings"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchFoodListings();

  }, []);


  // Statistics

  const totalListings = foods.length;

  const availableFood = foods.filter(
    (food) => food.status === "AVAILABLE"
  ).length;

  const completedFood = foods.filter(
    (food) => food.status === "COMPLETED"
  ).length;


  return (

    <div className="dashboard-page">

      {/* Dashboard Header */}

      <div className="dashboard-header">

        <div>

          <p className="dashboard-label">
            🍃 FoodConnect
          </p>

          <h1>
            Donor Dashboard
          </h1>

          <p>
            Manage your surplus food and help reduce
            food waste.
          </p>

        </div>

        <Link to="/donor/add-food">

          <button className="dashboard-primary-button">
            + Add Food
          </button>

        </Link>

      </div>


      {/* Statistics */}

      <div className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            🍱
          </div>

          <div>

            <h2>
              {totalListings}
            </h2>

            <p>
              Total Listings
            </p>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🟢
          </div>

          <div>

            <h2>
              {availableFood}
            </h2>

            <p>
              Available
            </p>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <h2>
              {completedFood}
            </h2>

            <p>
              Completed
            </p>

          </div>

        </div>

      </div>


      {/* Quick Actions */}

      <section className="dashboard-section">

        <div className="section-heading">

          <h2>
            Quick Actions
          </h2>

          <p>
            Manage your food donations.
          </p>

        </div>


        <div className="action-grid">

          <Link
            to="/donor/add-food"
            className="action-card"
          >

            <div className="action-icon">
              ➕
            </div>

            <h3>
              Add Food
            </h3>

            <p>
              Post new surplus food.
            </p>

          </Link>


          <Link
            to="/donor/my-listings"
            className="action-card"
          >

            <div className="action-icon">
              📋
            </div>

            <h3>
              My Listings
            </h3>

            <p>
              View and manage your listings.
            </p>

          </Link>


          <Link
            to="/donor/claims"
            className="action-card"
          >

            <div className="action-icon">
              🤝
            </div>

            <h3>
              Claims
            </h3>

            <p>
              View receiver claims.
            </p>

          </Link>

        </div>

      </section>


      {/* Recent Listings */}

      <section className="dashboard-section">

        <div className="section-heading">

          <h2>
            Recent Food Listings
          </h2>

          <Link to="/donor/my-listings">
            View All
          </Link>

        </div>


        {loading ? (

          <div className="empty-dashboard-card">

            <p>
              Loading your food listings...
            </p>

          </div>

        ) : foods.length === 0 ? (

          <div className="empty-dashboard-card">

            <div className="empty-icon">
              🍽️
            </div>

            <h3>
              No food listings yet
            </h3>

            <p>
              Start by adding your first surplus food listing.
            </p>

            <Link to="/donor/add-food">

              <button className="dashboard-primary-button">
                + Add Food
              </button>

            </Link>

          </div>

        ) : (

          <div className="food-list">

            {foods.slice(0, 5).map((food) => (

              <div
                className="food-list-item"
                key={food._id}
              >

                <div className="food-info">

                  <div className="food-list-icon">
                    🍱
                  </div>

                  <div>

                    <h3>
                      {food.foodName}
                    </h3>

                    <p>
                      {food.quantity} {food.unit}
                    </p>

                  </div>

                </div>


                <div>

                  <span
                    className={`status-badge status-${food.status.toLowerCase()}`}
                  >
                    {food.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}
        <Link to="/donor/pickups" className="action-card">
          <div className="action-icon">🚚</div>

          <div>
            <h3>My Pickups</h3>
            <p>Track your food pickups</p>
          </div>
        </Link>

      </section>

    </div>
  );
}

export default DonorDashboard;