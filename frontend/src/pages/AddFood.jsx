import { useState } from "react";
import axios from "axios";

function AddFood() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "Vegetarian",
    quantity: "",
    unit: "plates",
    preparedAt: "",
    availableUntil: "",
    pickupLocation: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/food",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add food"
      );
    }
  };

  return (
    <div>
      <h1>Add Surplus Food</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
        />

        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
        >
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">
            Non-Vegetarian
          </option>
          <option value="Vegan">Vegan</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="plates">Plates</option>
          <option value="kg">Kg</option>
          <option value="packets">Packets</option>
          <option value="boxes">Boxes</option>
          <option value="servings">Servings</option>
        </select>

        <input
          type="datetime-local"
          name="preparedAt"
          value={formData.preparedAt}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="availableUntil"
          value={formData.availableUntil}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Post Food
        </button>

      </form>
    </div>
  );
}

export default AddFood;