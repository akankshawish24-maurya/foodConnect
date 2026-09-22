import { useEffect, useState } from "react";
import axios from "axios";

function AdminPickups() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/pickups",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPickups(response.data);

    } catch (error) {
      console.error("Pickups error:", error);

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

  if (loading) {
    return <h2>Loading pickups...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1>All Pickups</h1>

      <p>
        View all food pickup and delivery activities.
      </p>

      {pickups.length === 0 ? (
        <p>No pickups found.</p>
      ) : (
        pickups.map((pickup) => (
          <div
            key={pickup._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "10px",
              background: "#fff"
            }}
          >
            <h2>
              {pickup.food?.foodName ||
                "Food information unavailable"}
            </h2>

            <p>
              <strong>Pickup ID:</strong>{" "}
              {pickup._id}
            </p>

            <p>
              <strong>Quantity:</strong>{" "}
              {pickup.claim?.quantity || 0}{" "}
              {pickup.food?.unit || ""}
            </p>

            <p>
              <strong>Pickup Location:</strong>{" "}
              {pickup.food?.pickupLocation ||
                "Not available"}
            </p>

            <p>
              <strong>Receiver:</strong>{" "}
              {pickup.receiver?.name || "Unknown"}
            </p>

            <p>
              <strong>Receiver Email:</strong>{" "}
              {pickup.receiver?.email ||
                "Not available"}
            </p>

            <p>
              <strong>Volunteer:</strong>{" "}
              {pickup.volunteer?.name ||
                "Not assigned"}
            </p>

            <p>
              <strong>Volunteer Email:</strong>{" "}
              {pickup.volunteer?.email ||
                "Not available"}
            </p>

            <p>
              <strong>Pickup Status:</strong>{" "}
              {pickup.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(pickup.createdAt).toLocaleString()}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default AdminPickups;