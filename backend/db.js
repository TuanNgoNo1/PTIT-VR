const mysql = require("mysql2");

// Tạo pool kết nối đến MySQL
// Ưu tiên đọc từ environment variables (cho deploy), fallback về localhost (cho dev)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "vr",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : undefined,
});

// Chuyển đổi sang sử dụng Promise để có thể dùng async/await
const db = pool.promise();

// Kiểm tra kết nối
db.getConnection()
  .then((connection) => {
    console.log("✅ Kết nối MySQL thành công");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MySQL:", err.message);
  });

module.exports = db;
