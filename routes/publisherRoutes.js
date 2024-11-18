const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisherController");

router.post("/publishers", publisherController.createPublisher); // Tạo mới nhà xuất bản
router.get("/publishers", publisherController.getPublishers); // Lấy danh sách nhà xuất bản
router.get("/publishers/:id", publisherController.getPublisherById); // Lấy chi tiết nhà xuất bản
router.put("/publishers/:id", publisherController.updatePublisher); // Cập nhật nhà xuất bản
router.delete("/publishers/:id", publisherController.deletePublisher); // Xóa nhà xuất bản

module.exports = router;
