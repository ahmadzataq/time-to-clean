import express from "express";
import Customers from "../models/customer.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CUSTOMER LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Customers.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            const payload = {
              id: user._id,
              email: user.email,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
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
            return res.json({ message: "Password tidak cocok." });
          }
        });
      } else {
        return res.json({ message: "Email tidak terdaftar." });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Terjadi kesalahan." });
  }
});
export default router;
