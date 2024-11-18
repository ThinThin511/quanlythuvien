const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Định nghĩa schema cho sách
const bookSchema = new mongoose.Schema({
  tenSach: { type: String, required: true },
  tacGia: { type: String, required: true },
  theLoai: { type: String },
  namXuatBan: { type: Date },
  maNXB: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
  soLuong: { type: Number, default: 1 },
  image: { type: String }, // Thêm trường để lưu đường dẫn ảnh
});

// Thêm auto-increment vào trường maSach
bookSchema.plugin(AutoIncrement, { inc_field: "maSach" });

module.exports = mongoose.model("Book", bookSchema);
