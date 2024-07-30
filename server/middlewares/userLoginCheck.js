import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userLoginCheck = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error("No authorization header provided");

    const token = authorization.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;
    req.id = id;
    req.email = email;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!", error: error.message });
  }
};

export default userLoginCheck;
