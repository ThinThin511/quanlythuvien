const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authMiddleware");

// Các route cho nhân viên
router.post("/employees", authMiddleware, employeeController.createEmployee);
router.get("/employees", authMiddleware, employeeController.getAllEmployees);
router.get("/employees/:id", employeeController.getEmployeeById); // Lấy nhân viên theo ID
router.put("/employees/:id", employeeController.updateEmployee); // Cập nhật nhân viên
router.delete("/employees/:id", employeeController.deleteEmployee); // Xóa nhân viên
router.post("/login", employeeController.login); // Đăng nhập
router.post("/register", employeeController.createEmployee);

module.exports = router;
