const express = require ("express");
const router = express.Router();
const {registerUser,loginUser,currentUser}= require("../controllers/panShopadminController");


const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");
const { getPanShopOwnerById } = require("../controllers/panShopController");


//Register
router.post("/registerdeliveryboy",registerUser);

//Login

router.post("/logindeliveryboy",loginUser);

//Current user information

router.get("/currentexecutive",executiveValidateToken,currentUser)

router.route("/:id").get(getPanShopOwnerById);



module.exports =router;