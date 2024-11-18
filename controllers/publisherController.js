const Publisher = require("../models/Publisher");

// Thêm nhà xuất bản mới
exports.createPublisher = async (req, res) => {
  try {
    const publisher = new Publisher(req.body);
    await publisher.save();
    res.status(201).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách nhà xuất bản
exports.getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin nhà xuất bản theo ID
exports.getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (publisher) res.json(publisher);
    else res.status(404).json({ message: "Publisher not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin nhà xuất bản
exports.updatePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (publisher) res.json(publisher);
    else res.status(404).json({ message: "Publisher not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa nhà xuất bản
exports.deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndDelete(req.params.id);
    if (publisher) res.json({ message: "Publisher deleted" });
    else res.status(404).json({ message: "Publisher not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
