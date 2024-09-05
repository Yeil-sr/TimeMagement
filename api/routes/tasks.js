const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const authenticate = require('../authMiddleware');

router.get("/", authenticate, taskController.getTasks); 
router.post("/", authenticate, taskController.addTask);
router.put("/:id", authenticate, taskController.updateTask);
router.delete("/:id", authenticate, taskController.deleteTask);

module.exports = router;
