import { useNavigate } from "react-router-dom";

function DonorDashboard() {

  const navigate = useNavigate();

  return (
    <div>

      <h1>Donor Dashboard</h1>

      <p>
        Welcome to FoodConnect!
      </p>

      <p>
        Manage your surplus food and help reduce food waste.
      </p>


      <div>

        <button
          onClick={() =>
            navigate("/donor/add-food")
          }
        >
          Add Surplus Food
        </button>


        <button
          onClick={() =>
            navigate("/donor/my-listings")
          }
        >
          My Food Listings
        </button>

      </div>

    </div>
  );
}

export default DonorDashboard;