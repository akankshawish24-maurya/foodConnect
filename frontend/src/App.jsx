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

import Login from "./pages/Login";
import Register from "./pages/Register";

import DonorDashboard from "./pages/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddFood from "./pages/AddFood";
import MyListings from "./pages/MyListings";
import EditFood from "./pages/EditFood";
import AvailableFood from "./pages/AvailableFood";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
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
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;