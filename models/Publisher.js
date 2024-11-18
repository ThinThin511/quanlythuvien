const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const publisherSchema = new mongoose.Schema({
  tenNXB: { type: String, required: true },
  diaChi: { type: String },
});

// Thêm auto-increment vào trường maNXB
publisherSchema.plugin(AutoIncrement, { inc_field: "maNXB" });

module.exports = mongoose.model("Publisher", publisherSchema);
