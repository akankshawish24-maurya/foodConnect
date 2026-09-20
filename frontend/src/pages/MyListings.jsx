import { useEffect, useState } from "react";
import axios from "axios";

function MyListings() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/food/my-listings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFoods(response.data);

        } catch (error) {
            console.error(error);
        }
    };
    const deleteFood = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/food/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Food listing deleted successfully");

            fetchFoods();

        } catch (error) {
            console.error("Delete food error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete food"
            );
        }
    };

    return (
        <div>
            <h1>My Food Listings</h1>

            {foods.length === 0 ? (
                <p>No food listings found.</p>
            ) : (
                foods.map((food) => (
                    <div key={food._id}>
                        <h2>{food.foodName}</h2>

                        <p>
                            Quantity: {food.quantity} {food.unit}
                        </p>

                        <p>
                            Type: {food.foodType}
                        </p>

                        <p>
                            Location: {food.pickupLocation}
                        </p>

                        <p>
                            Status: {food.status}
                        </p>
                        <button onClick={() => deleteFood(food._id)}>
                            Delete
                        </button>
                        <button
                            onClick={() =>
                                window.location.href = `/donor/edit-food/${food._id}`
                            }
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure you want to delete this food listing?"
                                    )
                                ) {
                                    deleteFood(food._id);
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyListings;