import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditFood() {

  const { id } = useParams();
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);


  // GET FOOD DETAILS
  useEffect(() => {
    fetchFood();
  }, [id]);


  const fetchFood = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/food/my-listings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const food = response.data.find(
        (item) => item._id === id
      );

      if (!food) {
        alert("Food listing not found");
        navigate("/donor/my-listings");
        return;
      }

      setFormData({
        foodName: food.foodName,
        foodType: food.foodType,
        quantity: food.quantity,
        unit: food.unit,
        preparedAt: food.preparedAt
          ? food.preparedAt.slice(0, 16)
          : "",
        availableUntil: food.availableUntil
          ? food.availableUntil.slice(0, 16)
          : "",
        pickupLocation: food.pickupLocation,
        description: food.description || ""
      });

      setLoading(false);

    } catch (error) {

      console.error("Get food error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load food"
      );
    }
  };


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // UPDATE FOOD
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/food/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

      navigate("/donor/my-listings");

    } catch (error) {

      console.error("Update food error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update food"
      );
    }
  };


  if (loading) {
    return <h2>Loading food details...</h2>;
  }


  return (
    <div>

      <h1>Edit Food Listing</h1>

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
          <option value="Vegetarian">
            Vegetarian
          </option>

          <option value="Non-Vegetarian">
            Non-Vegetarian
          </option>

          <option value="Vegan">
            Vegan
          </option>

          <option value="Other">
            Other
          </option>

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
          Update Food
        </button>

      </form>

    </div>
  );
}

export default EditFood;