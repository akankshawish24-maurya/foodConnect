// import { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "receiver",
//     organizationName: "",
//     address: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData
//       );

//       setMessage(response.data.message);

//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//         "Registration failed"
//       );
//     }
//   };

// return (
//   <div className="auth-page">

//     <div className="auth-card register-card">

//       {/* Logo */}
//       <div className="auth-logo">
//         🍃 FoodConnect
//       </div>

//       {/* Heading */}
//       <h1 className="auth-title">
//         Create Account
//       </h1>

//       <p className="auth-subtitle">
//         Join the FoodConnect community
//       </p>


//       {/* Registration Form */}
//       <form onSubmit={handleSubmit}>

//         {/* Name */}
//         <div className="form-group">

//           <label htmlFor="name">
//             Name
//           </label>

//           <input
//             id="name"
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />

//         </div>


//         {/* Email */}
//         <div className="form-group">

//           <label htmlFor="email">
//             Email
//           </label>

//           <input
//             id="email"
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//         </div>


//         {/* Password */}
//         <div className="form-group">

//           <label htmlFor="password">
//             Password
//           </label>

//           <input
//             id="password"
//             type="password"
//             name="password"
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//         </div>


//         {/* Phone */}
//         <div className="form-group">

//           <label htmlFor="phone">
//             Phone Number
//           </label>

//           <input
//             id="phone"
//             type="tel"
//             name="phone"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />

//         </div>


//         {/* Role */}
//         <div className="form-group">

//           <label htmlFor="role">
//             Register As
//           </label>

//           <select
//             id="role"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           >

//             <option value="receiver">
//               Receiver
//             </option>

//             <option value="donor">
//               Donor
//             </option>

//             <option value="volunteer">
//               Volunteer
//             </option>

//           </select>

//         </div>


//         {/* Organization */}
//         <div className="form-group">

//           <label htmlFor="organizationName">
//             Organization Name
//           </label>

//           <input
//             id="organizationName"
//             type="text"
//             name="organizationName"
//             placeholder="Hostel, NGO, College, etc."
//             value={formData.organizationName}
//             onChange={handleChange}
//             required
//           />

//         </div>


//         {/* Address */}
//         <div className="form-group">

//           <label htmlFor="address">
//             Address
//           </label>

//           <textarea
//             id="address"
//             name="address"
//             placeholder="Enter your address"
//             value={formData.address}
//             onChange={handleChange}
//             rows="3"
//             required
//           />

//         </div>


//         {/* Register Button */}
//         <button
//           type="submit"
//           className="auth-button"
//         >
//           Create Account
//         </button>

//       </form>


//       {/* Login Link */}
//       <p className="auth-footer">

//         Already have an account?{" "}

//         <a href="/login">
//           Login
//         </a>

//       </p>

//     </div>

//   </div>
// );
// }
// export default Register;
import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "receiver",
    organizationName: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  // Update every input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  // Register user
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("REGISTER DATA:", formData);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim(),
          role: formData.role,
          organizationName: formData.organizationName.trim(),
          address: formData.address.trim()
        }
      );

      console.log("REGISTER SUCCESS:", response.data);

      alert(
        response.data.message ||
        "Registration successful"
      );

      // Clear form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "receiver",
        organizationName: "",
        address: ""
      });

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      console.log(
        "BACKEND RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card register-card">

        {/* Logo */}
        <div className="auth-logo">
          🍃 FoodConnect
        </div>

        {/* Heading */}
        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join the FoodConnect community
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label htmlFor="role">
              Register As
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="receiver">
                Receiver
              </option>

              <option value="donor">
                Donor
              </option>

              <option value="volunteer">
                Volunteer
              </option>
            </select>
          </div>

          {/* Organization */}
          <div className="form-group">
            <label htmlFor="organizationName">
              Organization Name
            </label>

            <input
              id="organizationName"
              type="text"
              name="organizationName"
              placeholder="Hostel, NGO, College, etc."
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="auth-footer">
          Already have an account?{" "}

          <a href="/login">
            Login
          </a>
        </p>

      </div>

    </div>
  );
}

export default Register;