const mysql = require("mysql2");

// Tạo pool kết nối đến MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "vr", // Tên database bạn đã tạo
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Chuyển đổi sang sử dụng Promise để có thể dùng async/await
const db = pool.promise();

// Kiểm tra kết nối (Tuỳ chọn, giúp bạn biết DB đã kết nối thành công chưa)
db.getConnection()
  .then((connection) => {
    console.log("✅ Kết nối MySQL thành công với database: vr");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MySQL:", err.message);
  });

module.exports = db;
