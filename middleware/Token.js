import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401).json({ msg: "Token tidak ditemukan" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email, user) => {
    if (err) return res.sendStatus(403).json({ msg: "Token tidak valid" });
    req.email = email;
    req.user = user;
    next();
  });
};
