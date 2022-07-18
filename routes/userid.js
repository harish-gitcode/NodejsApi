const router = require("express").Router();
const {userByid,getProfile,updateUser,deleteUser} = require("../controller/user");
const { auth, hasAuth } = require("../controller/auth");

router.param("id", userByid);
router.get("/:id",auth,getProfile);
router.put("/:id",auth,updateUser);
router.delete("/:id",auth,deleteUser);
module.exports = router