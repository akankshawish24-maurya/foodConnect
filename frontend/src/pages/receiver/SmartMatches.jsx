import { useState } from "react";
import axios from "axios";

function SmartMatches() {
    const [foodType, setFoodType] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState("");
    const [distanceKm, setDistanceKm] = useState("5");

    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [searched, setSearched] = useState(false);


    // ==========================================
    // FIND SMART MATCHES
    // ==========================================

    const findMatches = async (e) => {
        e.preventDefault();

        setError("");
        setMatches([]);
        setSearched(false);

        if (!requiredQuantity) {
            setError("Please enter required quantity.");
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const params = new URLSearchParams();

            if (foodType) {
                params.append("foodType", foodType);
            }

            params.append(
                "requiredQuantity",
                requiredQuantity
            );

            params.append(
                "distanceKm",
                distanceKm
            );


            const response = await axios.get(
                `http://127.0.0.1:5000/api/matching?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setMatches(
                response.data.matches || []
            );

            setSearched(true);

        } catch (error) {
            console.error(
                "Smart matching error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to find smart matches."
            );

        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // GET SCORE CLASS
    // ==========================================

    const getScoreClass = (score) => {
        if (score >= 80) {
            return "high-match";
        }

        if (score >= 50) {
            return "medium-match";
        }

        return "low-match";
    };
    const getUrgencyClass = (level) => {
        switch (level) {
            case "NORMAL":
                return "urgency-normal";

            case "SOON":
                return "urgency-soon";

            case "URGENT":
                return "urgency-urgent";

            case "CRITICAL":
                return "urgency-critical";

            case "EXPIRED":
                return "urgency-expired";

            default:
                return "";
        }
    };


    return (
        <div className="dashboard-page">

            {/* ======================================
          HEADER
      ====================================== */}

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-label">
                        FOODCONNECT
                    </p>

                    <h1>
                        Smart Food Matches
                    </h1>

                    <p>
                        Find available food that matches
                        your requirements.
                    </p>

                </div>

            </div>


            {/* ======================================
          SEARCH FORM
      ====================================== */}

            <div className="dashboard-section">

                <h2 className="section-heading">
                    Find Matching Food
                </h2>


                <div className="form-card">

                    <form onSubmit={findMatches}>

                        {/* Food Type */}

                        <div className="form-group">

                            <label>
                                Food Type
                            </label>

                            <input
                                type="text"
                                value={foodType}
                                onChange={(e) =>
                                    setFoodType(e.target.value)
                                }
                                placeholder="Example: Rice"
                            />

                        </div>


                        {/* Required Quantity */}

                        <div className="form-group">

                            <label>
                                Required Quantity
                            </label>

                            <input
                                type="number"
                                value={requiredQuantity}
                                onChange={(e) =>
                                    setRequiredQuantity(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: 80"
                                min="1"
                                required
                            />

                        </div>


                        {/* Distance */}

                        <div className="form-group">

                            <label>
                                Maximum Distance (km)
                            </label>

                            <input
                                type="number"
                                value={distanceKm}
                                onChange={(e) =>
                                    setDistanceKm(
                                        e.target.value
                                    )
                                }
                                min="1"
                                max="100"
                            />

                        </div>


                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Finding Matches..."
                                : "Find Matches"}

                        </button>

                    </form>

                </div>

            </div>


            {/* ======================================
          ERROR
      ====================================== */}

            {error && (

                <div className="empty-dashboard-card">

                    <p>
                        {error}
                    </p>

                </div>

            )}


            {/* ======================================
          RESULTS
      ====================================== */}

            {searched &&
                !loading &&
                !error && (

                    <div className="dashboard-section">

                        <h2 className="section-heading">
                            Smart Matches
                        </h2>


                        {matches.length === 0 ? (

                            <div className="empty-dashboard-card">

                                <div className="empty-icon">
                                    🔍
                                </div>

                                <h3>
                                    No matching food found
                                </h3>

                                <p>
                                    Try changing your food type,
                                    quantity, or distance.
                                </p>

                            </div>

                        ) : (

                            <div className="my-listings-grid">

                                {matches.map((food) => (

                                    <div
                                        className="listing-card"
                                        key={food.foodId}
                                    >

                                        {/* Food Header */}

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


                                        {/* Food Details */}

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
                                            <p>
                                                <strong>
                                                    Urgency:
                                                </strong>{" "}
                                                <span
                                                    className={getUrgencyClass(
                                                        food.urgencyLevel
                                                    )}
                                                >
                                                    {food.urgencyLabel}
                                                </span>
                                            </p>

                                            <p>
                                                <strong>
                                                    Time Remaining:
                                                </strong>{" "}
                                                {food.minutesRemaining} minutes
                                            </p>

                                        </div>


                                        {/* Match Score */}

                                        <div className="match-score-section">

                                            <p>
                                                <strong>
                                                    Match Score
                                                </strong>
                                            </p>


                                            <div
                                                className={`match-score ${getScoreClass(
                                                    food.matchScore
                                                )}`}
                                            >

                                                {food.matchScore}%

                                            </div>

                                        </div>


                                        {/* Claim Button */}

                                        <button
                                            className="primary-button"
                                            onClick={async () => {
                                                const quantity = prompt(
                                                    `Enter quantity to claim for ${food.foodName}:`
                                                );

                                                if (!quantity) {
                                                    return;
                                                }

                                                try {
                                                    const token = localStorage.getItem("token");

                                                    const response = await axios.post(
                                                        "http://127.0.0.1:5000/api/claims",
                                                        {
                                                            foodId: food.foodId,
                                                            quantity: Number(quantity),
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    alert(response.data.message);

                                                } catch (error) {
                                                    console.error("Claim error:", error);

                                                    alert(
                                                        error.response?.data?.message ||
                                                        "Failed to claim food"
                                                    );
                                                }
                                            }}
                                        >
                                            Claim Food
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                )}

        </div>
    );
}

export default SmartMatches;