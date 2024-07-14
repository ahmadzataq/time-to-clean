import express from "express";
import multer from "multer";
import Users from "../models/user.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Users.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "Sudah terdaftar." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/users/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash("admin", saltRounds, async (err, hash) => {
        const newUser = new Users({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
          thumb: avatar,
          address: req.body.address,
        });
        await newUser.save().then((data) => {
          res.json({ message: "User berhasil ditambahkan." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// ALL USER
router.get("/", async (req, res) => {
  await Users.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User tidak ditemukan." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mencari user." });
    });
});

// SINGLE USER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Users.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User tidak ditemukan." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mencari user." });
    });
});

// UPDATE USER
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

    await Users.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(oldPassword, admin.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Users.findByIdAndUpdate(
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
                    res.json({ message: "Berhasil mengupdate." });
                  }
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error dalam mengupdate pelanggan." });
                });
            });
          } else {
            res.json({ message: "Password tidak cocok." });
          }
        });
      } else {
        res.json({ message: "Terjadi kesalahan." });
      }
    });
  } else if (req.body.thumb) {
    await Users.findByIdAndUpdate(id, req.body, {
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
        res.json({ message: "Error dalam mengupdate user." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/users/${oldThumb}`);

    await Users.findByIdAndUpdate(
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
        res.json({ message: "Error dalam mengupdate user." });
      });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;

  // const filePath = `uploads/users/${thumb}`;
  // const copy = `uploads/copy/${thumb}`;
  // fs.copyFile(filePath, copy, (error) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     console.log("File has been moved to another folder.");
  //   }
  // });

  fs.unlinkSync(`uploads/users/${thumb}`);

  await Users.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Gagal menghapus." });
      } else {
        res.status(200).send("Berhasil menghapus.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam menghapus user." });
    });
});

export default router;
