const express = require('express');
const router = express.Router();

const { getAll, updateUserById } = require("../controllers/users");

router.get("/getAll", getAll); // route to retrieve all users
router.put("/updateUser/:id", updateUserById); // update user by id

module.exports = router; // Export the router object




