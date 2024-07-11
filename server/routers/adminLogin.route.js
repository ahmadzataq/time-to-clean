import express from "express";
import Users from "../models/user.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ADMIN LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({ email: email }).then((user) => {
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
              message: "User is logged in successfully",
              token: "Bearer " + token,
              id: user._id,
            });
          } else {
            res.json({ message: "Password doesn't match." });
          }
        });
      } else {
        res.json({ message: "Email doesn't exist." });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;

// CREATE ADMIN ACCOUNT
router.post("/registeradmin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Users.findOne({ email: email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin account already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Users({
      email: email,
      password: hashedPassword,
      role: 'admin' // Assuming 'role' field is used to distinguish admin users
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin account created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin account." });
  }
});
