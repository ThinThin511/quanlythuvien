const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const cors = require("cors");

// Kết nối đến MongoDB
connectDB();

// Middleware để parse JSON
app.use(express.json());
app.use(cors());

// Định nghĩa các route
app.get("/", (req, res) => {
  res.send("Library Management API");
});

// Cấu hình static để phục vụ file
app.use("/uploads", express.static("uploads"));
// Middleware xử lý lỗi tổng quát
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Có lỗi xảy ra từ server" });
});

// Thêm các route cho nhà xuất bản
const publisherRoutes = require("./routes/publisherRoutes");
app.use("/api", publisherRoutes);
// Thêm các route cho sách
const bookRoutes = require("./routes/book");
app.use("/api/books", bookRoutes);

const employeeRoutes = require("./routes/employee");
app.use("/api/employees", employeeRoutes);
// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware xử lý đường dẫn không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ message: "Đường dẫn không tồn tại" });
});
