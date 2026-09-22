
import { useEffect, useState } from "react";
import axios from "axios";

function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get all claims from backend
  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as admin.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/claims",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("CLAIMS FROM API:", response.data);

      setClaims(response.data);
    } catch (error) {
      console.error("Error fetching claims:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load claims"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch claims when page opens
  useEffect(() => {
    fetchClaims();
  }, []);

  // Loading message
  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading claims...</h2>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Error</h2>
        <p>{error}</p>

        <button onClick={fetchClaims}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <h1>All Claims</h1>

      <p>
        View all food claims made by receivers.
      </p>

      {/* No claims */}
      {claims.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#fff"
          }}
        >
          <h2>No claims found.</h2>

          <p>
            There are currently no food claims in the database.
          </p>
        </div>
      ) : (
        <div style={{ marginTop: "25px" }}>
          {claims.map((claim) => (
            <div
              key={claim._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                background: "#fff",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              <h2>
                {claim.food?.foodName ||
                  "Food information unavailable"}
              </h2>

              <p>
                <strong>Claim ID:</strong>{" "}
                {claim._id}
              </p>

              <p>
                <strong>Receiver:</strong>{" "}
                {claim.receiver?.name ||
                  "Unknown"}
              </p>

              <p>
                <strong>Receiver Email:</strong>{" "}
                {claim.receiver?.email ||
                  "Not available"}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {claim.quantity}{" "}
                {claim.food?.unit || ""}
              </p>

              <p>
                <strong>Food Type:</strong>{" "}
                {claim.food?.foodType ||
                  "Not available"}
              </p>

              <p>
                <strong>Pickup Location:</strong>{" "}
                {claim.food?.pickupLocation ||
                  "Not available"}
              </p>

              <p>
                <strong>Food Status:</strong>{" "}
                {claim.food?.status ||
                  "Not available"}
              </p>

              <p>
                <strong>Claim Status:</strong>{" "}
                {claim.status}
              </p>

              <p>
                <strong>Claimed On:</strong>{" "}
                {claim.createdAt
                  ? new Date(
                      claim.createdAt
                    ).toLocaleString()
                  : "Not available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminClaims;