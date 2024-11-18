const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const upload = require("../middlewares/uploadMiddleware");

router.post("/", upload.single("image"), bookController.createBook); // Tạo sách
router.get("/", bookController.getBooks); // Lấy danh sách sách
router.get("/:id", bookController.getBookById); // Lấy sách theo mã
router.put("/:id", upload.single("image"), bookController.updateBook); // Cập nhật sách
router.delete("/:id", bookController.deleteBook); // Xóa sách

module.exports = router;
