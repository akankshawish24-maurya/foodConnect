import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoodListings: 0,
    totalClaims: 0,
    totalPickups: 0,
    completedPickups: 0,
    completedFood: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data);

    } catch (error) {
      console.error("Admin stats error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Header */}
      <div>
        <h1 className="section-title">
          FoodConnect Admin Dashboard
        </h1>

        <p className="section-subtitle">
          Monitor and manage the FoodConnect platform.
        </p>
      </div>


      {/* Statistics */}
      <h2>Platform Overview</h2>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-number">
            {stats.totalUsers}
          </div>

          <div className="stat-label">
            Total Users
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.totalFoodListings}
          </div>

          <div className="stat-label">
            Food Listings
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.totalClaims}
          </div>

          <div className="stat-label">
            Total Claims
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.totalPickups}
          </div>

          <div className="stat-label">
            Total Pickups
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.completedPickups}
          </div>

          <div className="stat-label">
            Completed Pickups
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.completedFood}
          </div>

          <div className="stat-label">
            Completed Food
          </div>
        </div>

      </div>


      {/* Admin Management */}
      <div className="management-section">

        <h2>Admin Management</h2>

        <p className="section-subtitle">
          Manage users, food listings, claims and pickups.
        </p>


        <div className="management-grid">

          <Link to="/admin/users">
            <div className="management-card">
              <div className="management-icon">
                👥
              </div>

              <h3>Manage Users</h3>

              <p>
                View all registered users
              </p>
            </div>
          </Link>


          <Link to="/admin/food">
            <div className="management-card">
              <div className="management-icon">
                🍱
              </div>

              <h3>Manage Food</h3>

              <p>
                View all food listings
              </p>
            </div>
          </Link>


          <Link to="/admin/claims">
            <div className="management-card">
              <div className="management-icon">
                📋
              </div>

              <h3>View Claims</h3>

              <p>
                Monitor food claims
              </p>
            </div>
          </Link>


          <Link to="/admin/pickups">
            <div className="management-card">
              <div className="management-icon">
                🚚
              </div>

              <h3>View Pickups</h3>

              <p>
                Track food deliveries
              </p>
            </div>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;