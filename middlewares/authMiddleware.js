const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Lấy token từ header 'Authorization', phần sau từ "Bearer "
  const token = req.header("Authorization")?.split(" ")[1];

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ message: "Token không được cung cấp" });
  }

  try {
    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Thêm thông tin người dùng vào request
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Token không hợp lệ", error: error.message });
  }
};

module.exports = authMiddleware;
