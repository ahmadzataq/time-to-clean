import express from "express";
import Orders from "../models/order.model.js";
const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const newOrder = new Orders({
      customer_id: req.body.customer_id,
      customer_name: req.body.customer_name,
      items: req.body.items,
      totalItems: req.body.totalItems,
      picupTime: req.body.picupTime,
      total_quantity: req.body.total_quantity,
      total_price: req.body.total_price,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      payment: req.body.payment,
      pendingPayment: req.body.pendingPayment,
    });
    await newOrder.save().then((data) => {
      res.send("Berhasil Dipesan.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL ORDER
router.get("/", async (req, res) => {
  await Orders.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Pesanan tidak ditemukan." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mencari pesanan." });
    });
});

// SINGLE ORDER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Orders.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Pesanan tidak ditemukan." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mencari pesanan." });
    });
});

// UPDATE ORDER
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data yang akan diupdate tidak boleh kosong." });
  }
  await Orders.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Gagal mengupdate." });
      } else {
        res.send("Berhasil diupdated.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam mengupdate pesanan." });
    });
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Orders.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Gagal menghapus." });
      } else {
        res.status(200).send("Berhasil dihapus.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error dalam menghapus pesanan." });
    });
});

// UPDATE REVIEW STATUS AFTER FOOD REVIEW
router.put("/:id/review", async (req, res) => {
  const id = req.params.id;
  try {
    const { food_id } = req.body;
    const order = await Orders.findById(id);
    if (order) {
      const food = order.items.find((r) => r._id.toString() === food_id);
      if (food) {
        res.send(food);
        await Orders.updateOne(
          { _id: id, "items._id": food_id },
          { $set: { "items.$.review": "Yes" } }
        );
      }
    } else {
      res.json({ message: "Pesanan tidak ditemukan." });
    }
  } catch (error) {
    res.json({ message: "Terjadi kesalahan." });
  }
});

export default router;
