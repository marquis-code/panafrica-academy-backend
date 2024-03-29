const { checkUser } = require("../middleware/auth.middleware");
const { Router } = require("express");
const {
  handle_new_memberPurchase,
  get_all_memberPurchases,
  get_one_memberPurchase,
  delete_memberPurchase,
} = require("../controllers/memberPurchase.controller");

const router = Router();

router.post("/", handle_new_memberPurchase);

router.get("/", checkUser, get_all_memberPurchases);

router.get("/:id", checkUser, get_one_memberPurchase);

router.delete("/:id", checkUser, delete_memberPurchase);

module.exports = router;
