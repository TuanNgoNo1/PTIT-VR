# Deploy lên Railway (All-in-One)

Deploy toàn bộ hệ thống PTIT Website (Frontend + Backend + MySQL + VR Tour) trên 1 platform duy nhất.

**Chi phí: $0 (free $5 credit/tháng, dùng ~$3-4)**

---

## Bước 1: Tạo tài khoản Railway

1. Vào https://railway.app
2. Sign in bằng **GitHub**
3. Xác nhận email nếu cần

---

## Bước 2: Tạo MySQL Database

1. Trong Railway dashboard → **New Project**
2. Click **+ New** → **Database** → **MySQL**
3. Đợi 30s cho DB ready (icon xanh)
4. Click vào MySQL service → tab **Data** → **Query**
5. Copy toàn bộ nội dung file `database.sql` từ repo
6. **Xóa 2 dòng đầu** trước khi paste:
   ```sql
   -- XÓA 2 dòng này:
   CREATE DATABASE IF NOT EXISTS `vr` ...
   USE `vr`;
   ```
7. Paste phần còn lại vào Query editor → **Run**
8. Kiểm tra: chạy `SELECT COUNT(*) FROM posts;` → phải ra **30**

---

## Bước 3: Deploy Backend

1. Trong cùng project → **+ New** → **GitHub Repo**
2. Chọn repo `TuanNgoNo1/PTIT-VR`
3. Railway hỏi cấu hình:
   - **Root Directory**: `backend`
   - Hoặc sau khi deploy, vào Settings → General → Root Directory = `backend`
4. Railway tự detect Node.js, build `npm install`, start `node server.js`
5. Vào tab **Variables** → **+ New Variable** → **Add Reference** → chọn MySQL service
   - Railway tự inject: `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`, `MYSQLPORT`
6. Thêm thủ công các biến mapping (vì code dùng `DB_HOST` không phải `MYSQLHOST`):

   | Variable | Value |
   |----------|-------|
   | `DB_HOST` | `${{MySQL.MYSQLHOST}}` |
   | `DB_PORT` | `${{MySQL.MYSQLPORT}}` |
   | `DB_USER` | `${{MySQL.MYSQLUSER}}` |
   | `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
   | `DB_NAME` | `${{MySQL.MYSQLDATABASE}}` |

7. Vào **Settings** → **Networking** → **Generate Domain**
8. Copy URL backend: `https://ptit-backend-xxx.up.railway.app`
9. Test: mở URL + `/api/posts` → phải thấy JSON 30 bài viết

---

## Bước 4: Deploy Frontend

1. Trong cùng project → **+ New** → **GitHub Repo**
2. Chọn lại repo `TuanNgoNo1/PTIT-VR` (Railway cho phép deploy nhiều service từ 1 repo)
3. Vào **Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve -s build -l $PORT`
4. Vào tab **Variables**, thêm:

   | Variable | Value |
   |----------|-------|
   | `REACT_APP_API_URL` | `https://ptit-backend-xxx.up.railway.app` (URL từ bước 3.8) |

5. Cần cài `serve` để serve static files. Thêm vào **Build Command**:
   ```
   npm install && npm run build && npm install -g serve
   ```
   Hoặc đơn giản hơn, sửa Start Command:
   ```
   npx serve -s build -l $PORT
   ```
6. Vào **Settings** → **Networking** → **Generate Domain**
7. Copy URL frontend: `https://ptit-vr-xxx.up.railway.app`

---

## Bước 5: Xong!

Mở URL frontend → website hoạt động đầy đủ:
- Tất cả 12+ trang
- Tin tức từ API (backend → MySQL)
- VR Tour 360° tại `/tham-quan`

---

## Tóm tắt URLs

| Service | URL |
|---------|-----|
| Frontend | `https://ptit-vr-xxx.up.railway.app` |
| Backend API | `https://ptit-backend-xxx.up.railway.app` |
| MySQL | Internal (tự kết nối giữa services) |

---

## Chi phí ước tính

| Thành phần | Chi phí/tháng |
|------------|---------------|
| Backend (Node.js, idle) | ~$2-3 |
| MySQL (256MB RAM) | ~$0.50 |
| Frontend (static serve) | ~$0.50 |
| Storage (~400MB) | ~$0.10 |
| **Tổng** | **~$3-4** |

Free credit: **$5/tháng** → Dư.

---

## Troubleshooting

### Backend không kết nối được MySQL
- Kiểm tra đã thêm reference variables chưa (bước 3.6)
- Vào MySQL service → tab Variables → copy `MYSQLHOST` kiểm tra

### Frontend hiện "Đang tải..." mãi
- Backend chưa deploy xong → đợi
- `REACT_APP_API_URL` sai → kiểm tra lại URL backend
- CORS: backend đã có `cors()` middleware, nếu vẫn lỗi thêm origin cụ thể

### VR Tour trắng khi vào /tham-quan
- Kiểm tra file `frontend/public/vr-tour/tour.html` có trong repo không
- Railway build có include thư mục `public/` không (mặc định CRA sẽ copy)

### Build timeout
- Railway free cho 30 phút build → 400MB repo mất ~5-10 phút, OK

### Vượt $5 credit
- Vào dashboard → Usage tab xem chi tiết
- Giảm chi phí: pause services khi không dùng

---

## So sánh với multi-platform

| | Railway (all-in-one) | Vercel + Render + Aiven + Firebase |
|---|---|---|
| Số platform | 1 | 4 |
| Setup time | 15 phút | 45 phút |
| Quản lý | 1 dashboard | 4 dashboards |
| VR Tour | Included | Cần Firebase riêng |
| Cold start | Không (24/7) | Render sleep 15 phút |
| Chi phí | ~$4/tháng (free credit) | $0 nhưng phức tạp |
| Custom domain | Có | Có |
