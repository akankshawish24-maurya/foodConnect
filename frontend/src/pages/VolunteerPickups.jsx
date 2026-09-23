import { useEffect, useState } from "react";
import axios from "axios";

function VolunteerPickups() {
  const [pickups, setPickups] = useState([]);

  const token = localStorage.getItem("token");

  const fetchPickups = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/pickups/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPickups(response.data);

    } catch (error) {
      console.error("Failed to fetch pickups:", error);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/pickups/${id}/status`,
        {
          status: status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(`Pickup status updated to ${status}`);

      fetchPickups();

    } catch (error) {
      console.error("Update pickup error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update pickup"
      );
    }
  };

  return (
    <div className="dashboard-page">

      <h1>My Pickups</h1>

      {pickups.length === 0 ? (
        <p>No pickups assigned to you.</p>
      ) : (
        pickups.map((pickup) => (
          <div
            className="listing-card"
            key={pickup._id}
          >

            <h2>
              {pickup.food?.foodName}
            </h2>

            <div className="listing-details">

              <p>
                <strong>Quantity:</strong>{" "}
                {pickup.food?.quantity}{" "}
                {pickup.food?.unit}
              </p>

              <p>
                <strong>Pickup Location:</strong>{" "}
                {pickup.food?.pickupLocation}
              </p>

              <p>
                <strong>Receiver:</strong>{" "}
                {pickup.receiver?.name}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {pickup.status}
              </p>

            </div>

            <div>

              {pickup.status === "ASSIGNED" && (
                <button
                  onClick={() =>
                    updateStatus(
                      pickup._id,
                      "PICKED_UP"
                    )
                  }
                >
                  📦 Mark Picked Up
                </button>
              )}

              {pickup.status === "PICKED_UP" && (
                <button
                  onClick={() =>
                    updateStatus(
                      pickup._id,
                      "DELIVERED"
                    )
                  }
                >
                  🚚 Mark Delivered
                </button>
              )}

              {pickup.status === "DELIVERED" && (
                <button
                  onClick={() =>
                    updateStatus(
                      pickup._id,
                      "COMPLETED"
                    )
                  }
                >
                  ✅ Mark Completed
                </button>
              )}

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default VolunteerPickups;