const express = require("express")
const router = express.Router();
const User = require("../models/user.model.js")
const {getUsers, getUser, createUser,updateUser, deleteUser, registerUser, loginUser } = require('../Controllers/user.controller.js')

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;