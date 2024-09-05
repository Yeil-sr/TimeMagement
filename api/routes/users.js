const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authenticate = require('../authMiddleware');

router.get("/", authenticate, userController.getUsers);
router.get("/:id", authenticate, userController.getUserId);
router.post("/", userController.addUser); 
router.post("/login", userController.login); 
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;
