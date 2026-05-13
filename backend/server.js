const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API: Lấy danh sách bài viết của 1 thể loại
app.get("/api/posts/category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const sql =
      "SELECT * FROM posts WHERE category = ? ORDER BY STR_TO_DATE(published_at, '%d/%m/%Y') DESC";

    const [results] = await db.query(sql, [categoryName]);

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách theo thể loại:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi truy vấn cơ sở dữ liệu",
    });
  }
});

// API: Lấy bài viết theo ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const sql = "SELECT * FROM posts WHERE id = ?";
    const [rows] = await db.query(sql, [postId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết có ID này!",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi từ phía Server",
    });
  }
});

// API: Lấy danh sách bài viết liên quan
app.get("/api/posts/:id/related", async (req, res) => {
  try {
    const currentPostId = req.params.id;

    // Bước 1: Lấy category của bài viết hiện tại
    const getCategorySql = "SELECT category FROM posts WHERE id = ?";
    const [currentPost] = await db.query(getCategorySql, [currentPostId]);

    if (currentPost.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết chính",
      });
    }

    const category = currentPost[0].category;

    // Bước 2: Lấy tối đa 5 bài cùng category nhưng khác ID hiện tại
    const relatedSql = `
      SELECT id, title, slug, thumbnail_url, published_at, category 
      FROM posts 
      WHERE category = ? AND id != ? 
      ORDER BY STR_TO_DATE(published_at, '%d/%m/%Y') DESC 
      LIMIT 5
    `;

    const [relatedPosts] = await db.query(relatedSql, [
      category,
      currentPostId,
    ]);

    res.json({
      success: true,
      data: relatedPosts,
    });
  } catch (error) {
    console.error("Lỗi khi lấy bài viết liên quan:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi từ phía Server",
    });
  }
});

// API: Đăng nhập (Admin)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // So sánh trực tiếp email và mật khẩu thường
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const [users] = await db.query(sql, [email, password]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Sai email hoặc mật khẩu!" });
    }

    // Đăng nhập thành công
    const user = users[0];
    res.json({
      success: true,
      message: "Đăng nhập thành công!",
      user: { id: user.id, email: user.email }, // Trả về thông tin (ẩn password đi)
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
});

// API: Lấy toàn bộ danh sách bài viết (Admin)
app.get("/api/posts", async (req, res) => {
  try {
    const sql = "SELECT * FROM posts ORDER BY id DESC";
    const [rows] = await db.query(sql);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
});

// API: Thêm bài viết mới (Admin)
app.post("/api/posts", async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      category,
      published_at,
      publisher,
    } = req.body;

    const sql = `
      INSERT INTO posts (title, slug, excerpt, content, thumbnail_url, category, published_at, publisher) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      category,
      published_at,
      publisher,
    ];

    const [result] = await db.query(sql, params);

    res.json({
      success: true,
      message: "Thêm bài viết thành công!",
      postId: result.insertId,
    });
  } catch (error) {
    console.error("Lỗi thêm bài viết:", error);
    res
      .status(500)
      .json({ success: false, message: "Không thể thêm bài viết" });
  }
});

// API: Cập nhật bài viết theo ID (Admin)
app.put("/api/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      category,
      published_at,
      publisher,
    } = req.body;

    const sql = `
      UPDATE posts 
      SET title = ?, slug = ?, excerpt = ?, content = ?, thumbnail_url = ?, category = ?, published_at = ?, publisher = ? 
      WHERE id = ?
    `;
    const params = [
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      category,
      published_at,
      publisher,
      postId,
    ];

    await db.query(sql, params);

    res.json({ success: true, message: "Cập nhật bài viết thành công!" });
  } catch (error) {
    console.error("Lỗi cập nhật bài viết:", error);
    res
      .status(500)
      .json({ success: false, message: "Không thể cập nhật bài viết" });
  }
});

// API: Xóa bài viết theo ID (Admin)
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const sql = "DELETE FROM posts WHERE id = ?";

    await db.query(sql, [postId]);

    res.json({ success: true, message: "Xóa bài viết thành công!" });
  } catch (error) {
    console.error("Lỗi xóa bài viết:", error);
    res.status(500).json({ success: false, message: "Không thể xóa bài viết" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server Backend đang chạy tại: http://localhost:${port}`);
});
