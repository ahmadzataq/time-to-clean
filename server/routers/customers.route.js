import express from "express";
import multer from "multer";
import Customers from "../models/customer.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE CUSTOMER
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Customers.findOne({ email: email });
    if (emailCheck) {
      return res.json({ message: "Email sudah terdaftar." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/customers/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newCustomer = new Customers({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          address: req.body.address,
        });
        await newCustomer.save().then((user) => {
          const payload = {
            id: user._id,
            email: user.email,
          };

          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "7d",
          });

          return res.status(200).send({
            success: true,
            message: "Berhasil daftar.",
            token: "Bearer " + token,
            id: user._id,
            name: user.name,
          });
        });
      });
    }
  } catch (error) {
    return res.status(500).send({ message: "Terjadi kesalahan." });
  }
});


// ALL CUSTOMER
router.get("/", async (req, res) => {
  await Customers.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Pelanggan tidak ditemukan." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mencari pelanggan." });
    });
});

// SINGLE CUSTOMER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Customers.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Pelanggan tidak ditemukan." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mencari pelanggan." });
    });
});

// UPDATE CUSTOMER
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.json({ Message: "Data yang akan diupdate tidak boleh kosong." });
  }
  // If no new thumbnail found.
  if (req.body.oldPassword) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    await Customers.findOne({ email: email }).then((customer) => {
      if (customer) {
        bcrypt.compare(oldPassword, customer.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Customers.findByIdAndUpdate(
                id,
                { password: hash },
                {
                  useFindAndModify: false,
                }
              )
                .then((data) => {
                  if (!data) {
                    res.json({ message: "Gagal mengupdate." });
                  } else {
                    res.json({ message: "Sukses Mengupdate." });
                  }
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error dalam mengupdate pelanggan." });
                });
            });
          } else {
            res.json({ message: "Password salah." });
          }
        });
      } else {
        res.json({ message: "Terjadi kesalahan." });
      }
    });
  } else if (req.body.thumb) {
    await Customers.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Gagal mengupdate." });
        } else {
          res.json({ data, message: "Berhasil mengupdate." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error dalam mengupdate pelanggan." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/customers/${oldThumb}`);

    await Customers.findByIdAndUpdate(
      id,
      { ...req.body, thumb: req.file.filename },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.json({ message: "Gagal mengupdate." });
        } else {
          res.json({ message: "Berhasil mengupdate." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error dalam mengupdate pelanggan." });
      });
  }
});

// DELETE CUSTOMER
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/customers/${thumb}`);

  await Customers.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Gagal menghapus." });
      } else {
        res.status(200).send("Berhasil dihapus.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam menghapus pelanggan." });
    });
});

export default router;
