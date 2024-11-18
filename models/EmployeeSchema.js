const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EmployeeSchema = new mongoose.Schema(
  {
    tenNV: {
      type: String,
      required: true,
      trim: true,
    },
    diaChi: {
      type: String,
      required: true,
    },
    soDienThoai: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Kiểm tra số điện thoại có 10 chữ số
        },
        message: "Số điện thoại không hợp lệ!",
      },
    },
    chucVu: {
      type: String,
      enum: ["Nhân Viên", "Quản Lý", "Giám Đốc"],
      default: "Nhân Viên",
    },
    username: {
      type: String,
      required: true,
      unique: true, // Đảm bảo không trùng lặp
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Đảm bảo mật khẩu ít nhất 6 ký tự
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Mã hóa mật khẩu trước khi lưu vào database
// EmployeeSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("Employee", EmployeeSchema);
