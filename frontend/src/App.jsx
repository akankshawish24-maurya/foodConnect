import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AddFood from "./pages/donor/AddFood";
import MyListings from "./pages/donor/MyListings";
import DonorClaims from "./pages/donor/DonorClaims";
import DonorPickups from "./pages/donor/DonorPickups";
import DemandPrediction from "./pages/donor/DemandPrediction";
import AddConsumptionData from "./pages/donor/AddConsumptionData";
import SmartMatches from "./pages/receiver/SmartMatches";
import Notifications from "./pages/Notifications";
import VolunteerPickups from "./pages/VolunteerPickups";

import DonorDashboard from "./pages/donor/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
// import AddFood from "./pages/AddFood";
//import MyListings from "./pages/MyListings";
import EditFood from "./pages/EditFood";
import AvailableFood from "./pages/AvailableFood";
import AdminUsers from "./pages/AdminUsers";
import AdminFood from "./pages/AdminFood";
import AdminClaims from "./pages/AdminClaims";
import AdminPickups from "./pages/AdminPickups";
function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route
          path="/donor/dashboard"
          element={<DonorDashboard />}
        />

        <Route
          path="/receiver/dashboard"
          element={<ReceiverDashboard />}
        />

        <Route
          path="/volunteer/dashboard"
          element={<VolunteerDashboard />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/donor/add-food"
          element={<AddFood />}
        />
        <Route
          path="/donor/my-listings"
          element={<MyListings />}
        />
        <Route
          path="/donor/edit-food/:id"
          element={<EditFood />}
        />
        <Route
          path="/receiver/available-food"
          element={<AvailableFood />}
        />
        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />
        <Route
          path="/admin/food"
          element={<AdminFood />}
        />
        <Route
          path="/admin/claims"
          element={<AdminClaims />}
        />
        <Route
          path="/admin/pickups"
          element={<AdminPickups />}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/donor/add-food"
          element={<AddFood />}
        />
        <Route
          path="/donor/claims"
          element={<DonorClaims />}
        />
        <Route
          path="/donor/pickups"
          element={<DonorPickups />}
        />
        <Route
          path="/donor/demand-prediction"
          element={<DemandPrediction />}
        />
        <Route
          path="/donor/add-consumption"
          element={<AddConsumptionData />}
        />
        <Route
          path="/receiver/smart-matches"
          element={<SmartMatches />}
        />
        <Route
          path="/volunteer/pickups"
          element={<VolunteerPickups />}
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;