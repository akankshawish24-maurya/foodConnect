// function Navbar() {
//   return (
//     <nav>
//       <h2>FoodConnect</h2>

//       <div>
//         <a href="/">Home</a>
//         <a href="/about">About</a>
//         <a href="/how-it-works">How It Works</a>
//         <a href="/login">Login</a>
//         <a href="/register">Register</a>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🍃 FoodConnect
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;