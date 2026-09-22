// // import { Link } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // function AdminDashboard() {

// //   const [stats, setStats] = useState({
// //     totalUsers: 0,
// //     totalFoodListings: 0,
// //     totalClaims: 0,
// //     totalPickups: 0,
// //     completedPickups: 0,
// //     completedFood: 0
// //   });
// //   <div
// //   style={{
// //     display: "flex",
// //     gap: "15px",
// //     marginTop: "30px"
// //   }}
// // >
// //   <Link to="/admin/users">
// //     <button>Manage Users</button>
// //   </Link>

// //   <Link to="/admin/food">
// //     <button>Manage Food</button>
// //   </Link>

// //   <Link to="/admin/claims">
// //     <button>View Claims</button>
// //   </Link>

// //   <Link to="/admin/pickups">
// //     <button>View Pickups</button>
// //   </Link>
// // </div>

// //   const fetchStats = async () => {

// //     try {

// //       const token = localStorage.getItem("token");

// //       const response = await axios.get(
// //         "http://127.0.0.1:5000/api/admin/stats",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       setStats(response.data);

// //     } catch (error) {

// //       console.error("Admin stats error:", error);

// //       alert(
// //         error.response?.data?.message ||
// //         "Failed to load admin dashboard"
// //       );
// //     }
// //   };


// //   useEffect(() => {
// //     fetchStats();
// //   }, []);


// //   return (
// //     <div>

// //       <h1>FoodConnect Admin Dashboard</h1>

// //       <p>Platform Overview</p>


// //       <div>

// //         <div>
// //           <h2>{stats.totalUsers}</h2>
// //           <p>Total Users</p>
// //         </div>


// //         <div>
// //           <h2>{stats.totalFoodListings}</h2>
// //           <p>Food Listings</p>
// //         </div>


// //         <div>
// //           <h2>{stats.totalClaims}</h2>
// //           <p>Total Claims</p>
// //         </div>


// //         <div>
// //           <h2>{stats.totalPickups}</h2>
// //           <p>Total Pickups</p>
// //         </div>


// //         <div>
// //           <h2>{stats.completedPickups}</h2>
// //           <p>Completed Pickups</p>
// //         </div>


// //         <div>
// //           <h2>{stats.completedFood}</h2>
// //           <p>Completed Food</p>
// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// // export default AdminDashboard;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalFoodListings: 0,
//     totalClaims: 0,
//     totalPickups: 0,
//     completedPickups: 0,
//     completedFood: 0
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login as admin");
//         return;
//       }

//       const response = await axios.get(
//         "http://127.0.0.1:5000/api/admin/stats",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setStats(response.data);

//     } catch (error) {
//       console.error("Admin stats error:", error);

//       alert(
//         error.response?.data?.message ||
//         "Failed to load admin dashboard"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: "30px" }}>
//         <h2>Loading Admin Dashboard...</h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         padding: "30px",
//         maxWidth: "1200px",
//         margin: "0 auto"
//       }}
//     >
//       {/* Header */}
//       <div style={{ marginBottom: "30px" }}>
//         <h1>FoodConnect Admin Dashboard</h1>

//         <p>
//           Monitor and manage the FoodConnect platform.
//         </p>
//       </div>

//       {/* Statistics */}
//       <h2>Platform Overview</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "20px",
//           marginTop: "20px"
//         }}
//       >
//         {/* Total Users */}
//         <div
//           style={{
//             padding: "25px",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             backgroundColor: "#fff"
//           }}
//         >
//           <h2>{stats.totalUsers}</h2>
//           <p>Total Users</p>
//         </div>

//         {/* Food Listings */}
//         <div
//           style={{
//             padding: "25px",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             backgroundColor: "#fff"
//           }}
//         >
//           <h2>{stats.totalFoodListings}</h2>
//           <p>Food Listings</p>
//         </div>

//         {/* Claims */}
//         <div
//           style={{
//             padding: "25px",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             backgroundColor: "#fff"
//           }}
//         >
//           <h2>{stats.totalClaims}</h2>
//           <p>Total Claims</p>
//         </div>

//         {/* Pickups */}
//         <div
//           style={{
//             padding: "25px",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             backgroundColor: "#fff"
//           }}
//         >
//           <h2>{stats.totalPickups}</h2>
//           <p>Total Pickups</p>
//         </div>

//         {/* Completed Pickups */}
//         <div
//           style={{
//             padding: "25px",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             backgroundColor: "#fff"
//           }}
//         >
//           <h2>{stats.completedPickups}</h2>
//           <p>Completed Pickups</p>
//         </div>

//         {/* Completed Food */}
//         <div
//           style={{
//             padding: "25px",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             backgroundColor: "#fff"
//           }}
//         >
//           <h2>{stats.completedFood}</h2>
//           <p>Completed Food</p>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div style={{ marginTop: "40px" }}>
//         <h2>Admin Management</h2>

//         <div
//           style={{
//             display: "flex",
//             gap: "15px",
//             flexWrap: "wrap",
//             marginTop: "20px"
//           }}
//         >
//           <Link to="/admin/users">
//             <button
//               style={{
//                 padding: "12px 20px",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//             >
//               Manage Users
//             </button>
//           </Link>

//           <Link to="/admin/food">
//             <button
//               style={{
//                 padding: "12px 20px",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//             >
//               Manage Food
//             </button>
//           </Link>

//           <Link to="/admin/claims">
//             <button
//               style={{
//                 padding: "12px 20px",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//             >
//               View Claims
//             </button>
//           </Link>

//           <Link to="/admin/pickups">
//             <button
//               style={{
//                 padding: "12px 20px",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//             >
//               View Pickups
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoodListings: 0,
    totalClaims: 0,
    totalPickups: 0,
    completedPickups: 0,
    completedFood: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data);

    } catch (error) {
      console.error("Admin stats error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Header */}
      <div>
        <h1 className="section-title">
          FoodConnect Admin Dashboard
        </h1>

        <p className="section-subtitle">
          Monitor and manage the FoodConnect platform.
        </p>
      </div>


      {/* Statistics */}
      <h2>Platform Overview</h2>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-number">
            {stats.totalUsers}
          </div>

          <div className="stat-label">
            Total Users
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.totalFoodListings}
          </div>

          <div className="stat-label">
            Food Listings
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.totalClaims}
          </div>

          <div className="stat-label">
            Total Claims
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.totalPickups}
          </div>

          <div className="stat-label">
            Total Pickups
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.completedPickups}
          </div>

          <div className="stat-label">
            Completed Pickups
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-number">
            {stats.completedFood}
          </div>

          <div className="stat-label">
            Completed Food
          </div>
        </div>

      </div>


      {/* Admin Management */}
      <div className="management-section">

        <h2>Admin Management</h2>

        <p className="section-subtitle">
          Manage users, food listings, claims and pickups.
        </p>


        <div className="management-grid">

          <Link to="/admin/users">
            <div className="management-card">
              <div className="management-icon">
                👥
              </div>

              <h3>Manage Users</h3>

              <p>
                View all registered users
              </p>
            </div>
          </Link>


          <Link to="/admin/food">
            <div className="management-card">
              <div className="management-icon">
                🍱
              </div>

              <h3>Manage Food</h3>

              <p>
                View all food listings
              </p>
            </div>
          </Link>


          <Link to="/admin/claims">
            <div className="management-card">
              <div className="management-icon">
                📋
              </div>

              <h3>View Claims</h3>

              <p>
                Monitor food claims
              </p>
            </div>
          </Link>


          <Link to="/admin/pickups">
            <div className="management-card">
              <div className="management-icon">
                🚚
              </div>

              <h3>View Pickups</h3>

              <p>
                Track food deliveries
              </p>
            </div>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;