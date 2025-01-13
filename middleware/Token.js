import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401).json({ msg: "Token tidak ditemukan" });
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email, user) => {
//     if (err) return res.sendStatus(403).json({ msg: "Token tidak valid" });
//     req.email = email;
//     req.user = user;
//     next();
//   });
// };

// import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Akses token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    console.log("Token Error:", err.message);
    return res.status(401).json({ msg: "Token tidak valid" });
  }
};

export const AdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Akses token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);
    req.admin = { id: decoded.adminId};
    next();
  } catch (err) {
    console.log("Token Error:", err.message);
    return res.status(401).json({ msg: "Token tidak valid" });
  }
};
