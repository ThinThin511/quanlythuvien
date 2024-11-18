const Book = require("../models/book");
const fs = require("fs");
const path = require("path");

// Tạo sách mới
exports.createBook = async (req, res) => {
  const { tenSach, tacGia, theLoai, namXuatBan, maNXB, soLuong } = req.body;
  const image = req.file ? req.file.filename : null;

  // Kiểm tra dữ liệu đầu vào
  if (!tenSach || !tacGia || !maNXB) {
    return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" });
  }

  try {
    // Tạo sách mới
    const newBook = new Book({
      tenSach,
      tacGia,
      theLoai,
      namXuatBan,
      maNXB,
      soLuong,
      image,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Lỗi khi tạo sách:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy danh sách sách
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("maNXB", "tenNXB");
    res.status(200).json(books);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy sách theo ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Lỗi khi lấy sách:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật sách
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenSach, tacGia, theLoai, maNXB, namXuatBan, soLuong } = req.body;

    // Tìm sách cũ
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại" });
    }

    // Dữ liệu cập nhật
    let updatedData = { tenSach, tacGia, theLoai, maNXB, namXuatBan, soLuong };

    // Kiểm tra nếu có file ảnh mới
    if (req.file) {
      // Xóa ảnh cũ nếu tồn tại
      if (book.image) {
        const oldImagePath = path.join(__dirname, "../", book.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Xóa file ảnh cũ
        }
      }

      // Gán đường dẫn file ảnh mới
      updatedData.image = req.file.filename;
    }

    // Cập nhật sách
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm sách cần xóa
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Không tìm thấy sách để xóa" });
    }

    // Xóa file ảnh nếu tồn tại
    if (book.image) {
      const imagePath = path.join(__dirname, "../", book.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Xóa file ảnh
      }
    }

    // Xóa sách khỏi database
    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Xóa sách thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sách", error: error.message });
  }
};
