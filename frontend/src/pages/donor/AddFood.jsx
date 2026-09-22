// import { useState } from "react";
// import axios from "axios";
// //import ".index.css";

// function AddFood() {
//   const [formData, setFormData] = useState({
//     foodName: "",
//     foodType: "Vegetarian",
//     quantity: "",
//     unit: "plates",
//     preparedAt: "",
//     availableUntil: "",
//     pickupLocation: "",
//     description: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         "http://localhost:5000/api/food",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert(response.data.message);

//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//         "Failed to add food"
//       );
//     }
//   };

//   return (
//     <div>
//       <h1>Add Surplus Food</h1>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           name="foodName"
//           placeholder="Food Name"
//           value={formData.foodName}
//           onChange={handleChange}
//         />

//         <select
//           name="foodType"
//           value={formData.foodType}
//           onChange={handleChange}
//         >
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Non-Vegetarian">
//             Non-Vegetarian
//           </option>
//           <option value="Vegan">Vegan</option>
//           <option value="Other">Other</option>
//         </select>

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//         />

//         <select
//           name="unit"
//           value={formData.unit}
//           onChange={handleChange}
//         >
//           <option value="plates">Plates</option>
//           <option value="kg">Kg</option>
//           <option value="packets">Packets</option>
//           <option value="boxes">Boxes</option>
//           <option value="servings">Servings</option>
//         </select>

//         <input
//           type="datetime-local"
//           name="preparedAt"
//           value={formData.preparedAt}
//           onChange={handleChange}
//         />

//         <input
//           type="datetime-local"
//           name="availableUntil"
//           value={formData.availableUntil}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="pickupLocation"
//           placeholder="Pickup Location"
//           value={formData.pickupLocation}
//           onChange={handleChange}
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <button type="submit">
//           Post Food
//         </button>

//       </form>
//     </div>
//   );
// }

// export default AddFood;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "",
    quantity: "",
    unit: "plates",
    preparedAt: "",
    availableUntil: "",
    pickupLocation: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://127.0.0.1:5000/api/food",
        {
          ...formData,
          quantity: Number(formData.quantity)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Food listing added successfully! 🎉");

      navigate("/donor/dashboard");

    } catch (error) {
      console.error("Add food error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add food listing"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">

        <div className="form-header">
          <p className="dashboard-label">🍃 FoodConnect</p>

          <h1>Add Food Donation</h1>

          <p>
            Share your surplus food with people who need it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="food-form">

          <div className="form-group">
            <label>Food Name</label>

            <input
              type="text"
              name="foodName"
              placeholder="Example: Vegetable Biryani"
              value={formData.foodName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Food Type</label>

            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              required
            >
              <option value="">Select food type</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">
                Non-Vegetarian
              </option>
              <option value="Vegan">Vegan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                min="1"
                placeholder="Example: 50"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Unit</label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="plates">Plates</option>
                <option value="kg">Kg</option>
                <option value="litres">Litres</option>
                <option value="packets">Packets</option>
                <option value="pieces">Pieces</option>
              </select>
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Prepared At</label>

              <input
                type="datetime-local"
                name="preparedAt"
                value={formData.preparedAt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Available Until</label>

              <input
                type="datetime-local"
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Pickup Location</label>

            <input
              type="text"
              name="pickupLocation"
              placeholder="Example: College Hostel, Block A"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="4"
              placeholder="Add any additional information about the food..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="dashboard-primary-button form-submit"
            disabled={loading}
          >
            {loading ? "Adding Food..." : "🍱 Add Food Donation"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddFood;