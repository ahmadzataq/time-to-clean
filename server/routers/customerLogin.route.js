import express from "express";
import Customers from "../models/customer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// CUSTOMER LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Customers.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Error comparing passwords." });
          }
          if (result === true) {
            const payload = {
              id: user._id,
              email: user.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });

            return res.status(200).send({
              success: true,
              message: "User Berhasil Login!",
              token: "Bearer " + token,
              id: user._id,
              name: user.name,
            });
          } else {
            return res.status(401).json({ message: "Password tidak cocok." });
          }
        });
      } else {
        return res.status(404).json({ message: "Email tidak terdaftar." });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Terjadi kesalahan." });
  }
});

export default router;
