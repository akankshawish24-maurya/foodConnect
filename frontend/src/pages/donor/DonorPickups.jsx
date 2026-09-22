import { useEffect, useState } from "react";
import axios from "axios";

function DonorPickups() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/pickups/donor",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPickups(response.data);

    } catch (error) {
      console.error("Fetch donor pickups error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load pickups"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">
            🚚 FoodConnect
          </p>

          <h1>My Pickups</h1>

          <p>
            Track pickups related to your food donations.
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="empty-dashboard-card">
          <p>Loading pickups...</p>
        </div>
      )}

      {/* No Pickups */}
      {!loading && pickups.length === 0 && (
        <div className="empty-dashboard-card">

          <div className="empty-icon">
            🚚
          </div>

          <h3>No pickups yet</h3>

          <p>
            Pickups will appear here when someone claims
            your food donation.
          </p>

        </div>
      )}

      {/* Pickup List */}
      {!loading && pickups.length > 0 && (
        <div className="claims-list">

          {pickups.map((pickup) => (
            <div
              className="claim-card"
              key={pickup._id}
            >

              {/* Card Header */}
              <div className="claim-header">

                <div className="claim-food-icon">
                  🚚
                </div>

                <span
                  className={`status-badge status-${pickup.status.toLowerCase()}`}
                >
                  {pickup.status}
                </span>

              </div>

              {/* Food */}
              <h3>
                {pickup.food?.foodName || "Food"}
              </h3>

              <p className="listing-type">
                {pickup.food?.foodType || "Food donation"}
              </p>

              {/* Details */}
              <div className="claim-details">

                <div>
                  <strong>Quantity</strong>

                  <span>
                    {pickup.claim?.quantity ||
                      pickup.food?.quantity ||
                      0}{" "}
                    {pickup.food?.unit || ""}
                  </span>
                </div>

                <div>
                  <strong>Pickup Location</strong>

                  <span>
                    {pickup.food?.pickupLocation ||
                      "Not available"}
                  </span>
                </div>

                <div>
                  <strong>Receiver</strong>

                  <span>
                    {pickup.receiver?.name ||
                      "Not assigned"}
                  </span>
                </div>

                <div>
                  <strong>Volunteer</strong>

                  <span>
                    {pickup.volunteer?.name ||
                      "Not assigned"}
                  </span>
                </div>

              </div>

              {/* Date */}
              <div className="pickup-date">

                <strong>Created:</strong>{" "}

                {pickup.createdAt
                  ? new Date(
                      pickup.createdAt
                    ).toLocaleString()
                  : "N/A"}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DonorPickups;