const express = require("express");
const Router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

Router.route("/order/new").post(isAuthenticatedUser, newOrder);

Router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

Router.route("/orders/me").get(isAuthenticatedUser, myOrder);

Router.route("/merchant/orders").get(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  getAllOrders
);

Router.route("/merchant/order/:id").put(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  updateOrder
);

Router.route("/merchant/order/:id").delete(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  deleteOrder
);
