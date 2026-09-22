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
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Authorization header missing"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     console.log("DECODED TOKEN:", decoded);

//     req.user = {
//       id: decoded.id || decoded.userId || decoded._id,
//       role: decoded.role
//     };

//     console.log("REQ.USER:", req.user);

//     if (!req.user.id) {
//       return res.status(401).json({
//         message: "User ID missing from token"
//       });
//     }

//     next();

//   } catch (error) {
//     console.log("Authentication error:", error.message);

//     return res.status(401).json({
//       message: "Invalid token"
//     });
//   }
// };

// module.exports = authMiddleware;


// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   console.log("HEADERS RECEIVED:", req.headers);

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Authorization header missing"
//     });
//   }

//   if (!authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       message: "Invalid authorization format"
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();

//   } catch (error) {
//     console.error("JWT ERROR:", error.message);

//     return res.status(401).json({
//       message: "Invalid or expired token"
//     });
//   }
// };

// module.exports = authMiddleware;


// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log("AUTH HEADER:", JSON.stringify(authHeader));

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Authorization header missing"
//     });
//   }

//   // Remove extra spaces and split
//   const parts = authHeader.trim().split(/\s+/);

//   console.log("AUTH PARTS:", parts.length, parts[0]);

//   if (
//     parts.length !== 2 ||
//     parts[0].toLowerCase() !== "bearer"
//   ) {
//     return res.status(401).json({
//       message: "Invalid authorization format"
//     });
//   }

//   const token = parts[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     console.log("TOKEN VERIFIED:", decoded);

//     req.user = decoded;

//     next();

//   } catch (error) {
//     console.log("JWT ERROR:", error.message);

//     return res.status(401).json({
//       message: "Invalid or expired token"
//     });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", JSON.stringify(authHeader));

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }

  const parts = authHeader.trim().split(/\s+/);

  console.log("AUTH PARTS:", parts);

  if (
    parts.length !== 2 ||
    parts[0].toLowerCase() !== "bearer"
  ) {
    return res.status(401).json({
      message: "Invalid authorization format"
    });
  }

  const token = parts[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("TOKEN VERIFIED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {

    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;