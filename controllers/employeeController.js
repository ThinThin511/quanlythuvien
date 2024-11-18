const Employee = require("../models/EmployeeSchema"); // Đảm bảo đường dẫn đúng với nơi chứa model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Tạo nhân viên mới

// Lấy danh sách tất cả nhân viên
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống!", error: error.message });
  }
};

// Lấy thông tin nhân viên theo ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại!" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống!", error: error.message });
  }
};

// Cập nhật thông tin nhân viên
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại!" });
    }
    res
      .status(200)
      .json({ message: "Cập nhật nhân viên thành công!", employee });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống!", error: error.message });
  }
};

// Xóa nhân viên
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại!" });
    }
    res.status(200).json({ message: "Xóa nhân viên thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống!", error: error.message });
  }
};

// Đăng nhập
// Đăng nhập nhân viên
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem username có tồn tại không
    const employee = await Employee.findOne({ username });
    if (!employee) {
      return res.status(400).json({ message: "Username không tồn tại" });
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu trong database
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: employee._id,
        username: employee.username,
        chucVu: employee.chucVu,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Đăng nhập thành công", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi đăng nhập", error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { tenNV, diaChi, soDienThoai, chucVu, username, password } = req.body;

    // Kiểm tra nếu username đã tồn tại
    const existingEmployee = await Employee.findOne({ username });
    if (existingEmployee) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo nhân viên mới
    const newEmployee = new Employee({
      tenNV,
      diaChi,
      soDienThoai,
      chucVu,
      username,
      password: hashedPassword,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Nhân viên đã được tạo thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi tạo nhân viên",
      error: error.message,
    });
  }
};
