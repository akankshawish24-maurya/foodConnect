import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VolunteerDashboard() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/pickups/available",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPickups(response.data);

    } catch (error) {
      console.error("Error fetching pickups:", error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch pickups"
      );
    }
  };


  const acceptPickup = async (pickupId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://127.0.0.1:5000/api/pickups/${pickupId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

      fetchPickups();

    } catch (error) {
      console.error("Accept pickup error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to accept pickup"
      );
    }
  };


  return (
    <div>

      <h1>Volunteer Dashboard</h1>

      <p>
        Available Pickup Requests
      </p>

      <Link to="/volunteer/pickups">
        <button>
          🚚 My Pickups
        </button>
      </Link>
      <br />
      <br />

      <Link to="/notifications">
        <button>
          🔔 Notifications
        </button>
      </Link>

      {pickups.length === 0 ? (
        <p>No pickup requests available.</p>
      ) : (

        pickups.map((pickup) => (

          <div
            key={pickup._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "10px"
            }}
          >

            <h2>
              {pickup.food?.foodName}
            </h2>

            <p>
              Quantity:{" "}
              {pickup.claim?.quantity}
            </p>

            <p>
              Pickup Location:{" "}
              {pickup.food?.pickupLocation}
            </p>

            <p>
              Receiver:{" "}
              {pickup.receiver?.name}
            </p>

            <p>
              Status: {pickup.status}
            </p>

            <button
              onClick={() =>
                acceptPickup(pickup._id)
              }
            >
              Accept Pickup
            </button>

          </div>

        ))
      )}

    </div>
  );
}

export default VolunteerDashboard;