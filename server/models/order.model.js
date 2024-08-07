import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  customer_id: {
    type: String,
    require: true,
  },
  customer_name: {
    type: String,
    require: true,
  },
  items: [
    {
      name: {
        type: String,
        require: true,
      },
      service: {
        type: String,
      },
       category: {
        type: String,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      itemTotal: {
        type: Number,
        require: true,
      },
    },
  ],
  totalItems: {
    type: Number,
    require: true,
  },
  total_quantity: {
    type: Number,
    require: true,
  },
  total_price: {
    type: Number,
    require: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Dipesan",
  },
  picupTime: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  payment: {
    type: String,
  },
  pendingPayment: {
    type: String,
  },
  accept_time: {
    type: Date,
  },
  expTime: {
    type: String,
    default: "0",
  },
});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
