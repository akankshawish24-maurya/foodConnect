import { useState } from "react";
import axios from "axios";

function AddConsumptionData() {
  const [formData, setFormData] = useState({
    foodName: "",
    dayOfWeek: "",
    preparedQuantity: "",
    consumedQuantity: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/demand/consumption",
        {
          foodName: formData.foodName,
          dayOfWeek: formData.dayOfWeek,
          preparedQuantity: Number(formData.preparedQuantity),
          consumedQuantity: Number(formData.consumedQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      setFormData({
        foodName: "",
        dayOfWeek: "",
        preparedQuantity: "",
        consumedQuantity: "",
      });
    } catch (error) {
      console.error("Consumption data error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add consumption data"
      );
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">
            FOODCONNECT
          </p>

          <h1>Add Consumption Data</h1>

          <p>
            Add previous food consumption data to
            improve demand prediction.
          </p>
        </div>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="dashboard-section">

        <div className="form-card">

          <form onSubmit={handleSubmit}>

            {/* Food Name */}
            <div className="form-group">
              <label>
                Food Name
              </label>

              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="Example: Rice"
                required
              />
            </div>


            {/* Day */}
            <div className="form-group">
              <label>
                Day of Week
              </label>

              <select
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Day
                </option>

                <option value="Monday">
                  Monday
                </option>

                <option value="Tuesday">
                  Tuesday
                </option>

                <option value="Wednesday">
                  Wednesday
                </option>

                <option value="Thursday">
                  Thursday
                </option>

                <option value="Friday">
                  Friday
                </option>

                <option value="Saturday">
                  Saturday
                </option>

                <option value="Sunday">
                  Sunday
                </option>
              </select>
            </div>


            {/* Prepared Quantity */}
            <div className="form-group">
              <label>
                Prepared Quantity
              </label>

              <input
                type="number"
                name="preparedQuantity"
                value={formData.preparedQuantity}
                onChange={handleChange}
                placeholder="Example: 100"
                min="0"
                required
              />
            </div>


            {/* Consumed Quantity */}
            <div className="form-group">
              <label>
                Consumed Quantity
              </label>

              <input
                type="number"
                name="consumedQuantity"
                value={formData.consumedQuantity}
                onChange={handleChange}
                placeholder="Example: 85"
                min="0"
                required
              />
            </div>


            <button
              type="submit"
              className="primary-button"
            >
              Add Consumption Data
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddConsumptionData;