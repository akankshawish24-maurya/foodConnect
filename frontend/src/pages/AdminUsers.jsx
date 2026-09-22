import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(response.data);

    } catch (error) {

      console.error("Users error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load users"
      );
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div>

      <h1>Users</h1>

      {users.length === 0 ? (

        <p>No users found.</p>

      ) : (

        users.map((user) => (

          <div
            key={user._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >

            <h3>{user.name}</h3>

            <p>Email: {user.email}</p>

            <p>
              Role: {user.role}
            </p>

            <p>
              Phone: {user.phone}
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default AdminUsers;