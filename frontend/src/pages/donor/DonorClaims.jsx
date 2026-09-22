import { useEffect, useState } from "react";
import axios from "axios";

function DonorClaims() {

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClaims = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      /*
        We are using the claims endpoint.
        If your backend uses a different endpoint for
        donor claims, we will adjust it after testing.
      */

      const response = await axios.get(
        "http://127.0.0.1:5000/api/claims",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setClaims(response.data);

    } catch (error) {

      console.error("Fetch claims error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load claims"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);


  return (
    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <p className="dashboard-label">
            🍃 FoodConnect
          </p>

          <h1>Donor Claims</h1>

          <p>
            View receivers who have claimed your food donations.
          </p>

        </div>

      </div>


      {loading ? (

        <div className="empty-dashboard-card">
          <p>Loading claims...</p>
        </div>

      ) : claims.length === 0 ? (

        <div className="empty-dashboard-card">

          <div className="empty-icon">
            🤝
          </div>

          <h3>No claims yet</h3>

          <p>
            You don't have any food claims at the moment.
          </p>

        </div>

      ) : (

        <div className="claims-list">

          {claims.map((claim) => (

            <div
              className="claim-card"
              key={claim._id}
            >

              <div className="claim-header">

                <div className="claim-food-icon">
                  🍱
                </div>

                <span
                  className={`status-badge status-${claim.status.toLowerCase()}`}
                >
                  {claim.status}
                </span>

              </div>


              <h3>
                {claim.food?.foodName || "Food Donation"}
              </h3>


              <div className="claim-details">

                <div>
                  <strong>Quantity</strong>

                  <span>
                    {claim.quantity}
                  </span>
                </div>


                <div>
                  <strong>Receiver</strong>

                  <span>
                    {claim.receiver?.name ||
                      claim.receiver?.email ||
                      "Receiver"}
                  </span>
                </div>


                <div>
                  <strong>Claimed On</strong>

                  <span>
                    {new Date(
                      claim.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default DonorClaims;