// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     console.log("Authorization Header:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "No token provided"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     console.log("Decoded Token:", decoded);

//     req.user = decoded;

//     next();

//   } catch (error) {
//     console.log("Auth Error:", error.message);

//     return res.status(401).json({
//       message: "Invalid token"
//     });
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED TOKEN:", decoded);

    req.user = {
      id: decoded.id || decoded.userId || decoded._id,
      role: decoded.role
    };

    console.log("REQ.USER:", req.user);

    if (!req.user.id) {
      return res.status(401).json({
        message: "User ID missing from token"
      });
    }

    next();

  } catch (error) {
    console.log("Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;