const router=require('express').Router();
const {loginPage,login,logout} = require("../controller/session");

router.get("/login",loginPage);
router.post("/login",login);
router.delete("/login",logout);

module.exports=router;