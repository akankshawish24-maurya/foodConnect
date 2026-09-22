// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DonorDashboard from "./pages/DonorDashboard";
// import ReceiverDashboard from "./pages/ReceiverDashboard";
// import VolunteerDashboard from "./pages/VolunteerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
// //     <Route
// //   path="/donor/dashboard"
// //   element={<DonorDashboard />}
// // />

// // <Route
// //   path="/receiver/dashboard"
// //   element={<ReceiverDashboard />}
// // />

// // <Route
// //   path="/volunteer/dashboard"
// //   element={<VolunteerDashboard />}
// // />

// // <Route
// //   path="/admin/dashboard"
// //   element={<AdminDashboard />}
// // />
//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;