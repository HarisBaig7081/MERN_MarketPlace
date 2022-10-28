const express = require("express");
const Router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getMerchantProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

Router.route("/products").get(getAllProducts);

Router.route("/merchant/products").get(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  getMerchantProducts
);

Router.route("/merchant/products/new").post(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  createProduct
);

Router.route("/merchant/product/:id").put(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  updateProduct
);

Router.route("/merchant/product/:id").delete(
  isAuthenticatedUser,
  authorizeRoles("Merchant"),
  deleteProduct
);

Router.route("/product/:id").get(getProductDetails);

Router.route("/review").put(isAuthenticatedUser, createProductReview);

Router.route("/reviews").get(getProductReviews);

Router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = Router;
