const { checkUser } = require("../middleware/auth.middleware");
const { Router } = require("express");
const {
  handle_new_member,
  get_all_members,
  get_one_member,
  delete_member,
  update_member
} = require("../controllers/member.controller");

const router = Router();

router.post("/", checkUser, handle_new_member);

router.get("/", get_all_members);

router.get("/:id", get_one_member);

router.delete("/:id", checkUser, delete_member);

router.put("/:id", checkUser, update_member);

module.exports = router;
