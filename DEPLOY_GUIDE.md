# Hướng dẫn Deploy Full Stack (Free Tier)

Hướng dẫn deploy toàn bộ hệ thống PTIT Website lên cloud miễn phí.

## Tổng quan kiến trúc deploy

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Vercel        │     │   Render.com     │     │   Aiven         │
│   (Frontend)    │────▶│   (Backend API)  │────▶│   (MySQL DB)    │
│   React SPA     │     │   Express.js     │     │   Free tier     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │
         │ iframe
         ▼
┌─────────────────┐
│ Firebase Hosting│
│ (VR Tour 360°) │
│ 10GB free       │
└─────────────────┘
```

| Thành phần | Dịch vụ | Free tier | Thời gian setup |
|------------|---------|-----------|-----------------|
| Frontend | Vercel | 100GB bandwidth/tháng | 5 phút |
| Backend | Render | 750h/tháng | 10 phút |
| Database | Aiven | 5GB MySQL | 5 phút |
| VR Tour | Firebase Hosting | 10GB storage, 360MB/ngày | 10 phút |

Tổng: ~30 phút, $0.

---

## Bước 1: Database MySQL (Aiven)

### 1.1 Tạo tài khoản
1. Vào https://aiven.io/free
2. Sign up bằng GitHub hoặc Google
3. Xác nhận email

### 1.2 Tạo MySQL service
1. Click **Create Service**
2. Chọn **MySQL**
3. Cloud: **Google Cloud** hoặc **AWS**
4. Region: **Singapore** (gần VN nhất)
5. Plan: **Free** (1 CPU, 1GB RAM, 5GB storage)
6. Service name: `ptit-db`
7. Click **Create Service**
8. Đợi 1-2 phút cho status = Running

### 1.3 Lấy thông tin kết nối
1. Vào service vừa tạo → tab **Overview**
2. Copy các thông tin:
   - **Host**: `mysql-xxxx-xxxx.aiven.io`
   - **Port**: `12345`
   - **User**: `avnadmin`
   - **Password**: `xxxxxxxx`
   - **Database**: `defaultdb`

### 1.4 Import dữ liệu
1. Vào tab **SQL Editor** (hoặc dùng MySQL Workbench/DBeaver kết nối)
2. Copy nội dung file `database.sql` từ repo
3. **XÓA 2 dòng đầu tiên** (vì Aiven đã có DB sẵn):
   ```sql
   -- XÓA 2 dòng này:
   CREATE DATABASE IF NOT EXISTS `vr` ...
   USE `vr`;
   ```
4. Paste phần còn lại vào SQL Editor → Run
5. Kiểm tra: `SELECT COUNT(*) FROM posts;` → phải ra 30

---

## Bước 2: Backend API (Render.com)

### 2.1 Tạo tài khoản
1. Vào https://render.com
2. Sign up bằng GitHub

### 2.2 Tạo Web Service
1. Click **New** → **Web Service**
2. Chọn **Build and deploy from a Git repository** → Next
3. Connect GitHub → chọn repo `TuanNgoNo1/PTIT-VR`
4. Cấu hình:
   - **Name**: `ptit-backend`
   - **Region**: Singapore
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: **Free**

### 2.3 Thêm Environment Variables
Vào tab **Environment** → thêm từng biến:

| Key | Value |
|-----|-------|
| `DB_HOST` | (Host từ Aiven bước 1.3) |
| `DB_PORT` | (Port từ Aiven bước 1.3) |
| `DB_USER` | `avnadmin` |
| `DB_PASSWORD` | (Password từ Aiven bước 1.3) |
| `DB_NAME` | `defaultdb` |

### 2.4 Deploy
1. Click **Create Web Service**
2. Đợi build + deploy (~2-3 phút)
3. Khi status = **Live**, copy URL: `https://ptit-backend.onrender.com`
4. Test: mở `https://ptit-backend.onrender.com/api/posts` → phải thấy JSON 30 bài viết

> **Lưu ý**: Render free tier sleep sau 15 phút không có request. Lần đầu truy cập mất ~30s để wake up.

---

## Bước 3: Frontend (Vercel)

### 3.1 Tạo tài khoản
1. Vào https://vercel.com
2. Sign up bằng GitHub

### 3.2 Import project
1. Click **Add New** → **Project**
2. Chọn repo `TuanNgoNo1/PTIT-VR` → **Import**
3. Cấu hình:
   - **Root Directory**: click **Edit** → nhập `frontend` → confirm
   - **Framework Preset**: Create React App (tự detect)
   - Build Command: `npm run build` (mặc định)
   - Output Directory: `build` (mặc định)

### 3.3 Thêm Environment Variable
Trước khi deploy, thêm biến:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://ptit-backend.onrender.com` (URL từ bước 2.4) |

### 3.4 Deploy
1. Click **Deploy**
2. Đợi build (~1-2 phút)
3. Khi xong → được URL: `https://ptit-vr-xxxx.vercel.app`
4. Mở URL → website hoạt động!

### 3.5 Custom domain (tùy chọn)
1. Vào Settings → Domains
2. Thêm domain tùy chỉnh nếu có

---

## Bước 4: VR Tour 360° (Firebase Hosting)

Firebase Hosting cho phép **10GB storage miễn phí** → đủ cho VR Tour ~2GB.

### 4.1 Tạo project Firebase
1. Vào https://console.firebase.google.com
2. Click **Add project** → tên: `ptit-vr-tour` → Continue
3. Tắt Google Analytics (không cần) → **Create project**

### 4.2 Cài Firebase CLI
Mở terminal:
```bash
npm install -g firebase-tools
firebase login
```
Đăng nhập bằng Google account.

### 4.3 Khởi tạo hosting
Trong thư mục chứa VR Tour (thư mục `vr/vr/` hoặc `frontend/public/vr-tour/`):
```bash
cd đường/dẫn/tới/thư-mục-vr-tour

firebase init hosting
```

Trả lời các câu hỏi:
- **Select a project**: chọn `ptit-vr-tour`
- **What do you want to use as your public directory?**: `.` (dấu chấm = thư mục hiện tại)
- **Configure as a single-page app?**: `No`
- **Set up automatic builds with GitHub?**: `No`
- **Overwrite index.html?**: `No`

### 4.4 Deploy VR Tour
```bash
firebase deploy --only hosting
```

Đợi upload (~5-10 phút tùy tốc độ mạng, ~2GB).

Khi xong → được URL: `https://ptit-vr-tour.web.app`

Test: mở URL → phải thấy VR Tour hoạt động.

### 4.5 Cập nhật iframe URL trong frontend

Sửa file `frontend/src/pages/VirtualTour/VirtualTourPage.jsx`:

```jsx
// Đổi src từ local sang Firebase URL
<iframe
  src="https://ptit-vr-tour.web.app/tour.html"
  ...
/>
```

Hoặc dùng env var:
```jsx
src={process.env.REACT_APP_VR_URL || "/vr-tour/tour.html"}
```

Thêm env var trên Vercel:
| Key | Value |
|-----|-------|
| `REACT_APP_VR_URL` | `https://ptit-vr-tour.web.app/tour.html` |

Redeploy Vercel (tự động khi push code hoặc manual trigger).

---

## Tổng kết URLs sau khi deploy

| Thành phần | URL |
|------------|-----|
| Website chính | `https://ptit-vr-xxxx.vercel.app` |
| Backend API | `https://ptit-backend.onrender.com` |
| VR Tour 360° | `https://ptit-vr-tour.web.app` |
| Database | `mysql-xxxx.aiven.io:12345` |

---

## Troubleshooting

### Backend trả về lỗi kết nối DB
- Kiểm tra env vars trên Render có đúng không
- Aiven MySQL có đang Running không
- Đã import `database.sql` chưa

### Frontend hiện "Đang tải..." mãi
- Backend Render đang sleep → đợi 30s
- Kiểm tra `REACT_APP_API_URL` trên Vercel có đúng URL Render không
- Mở DevTools → Console xem lỗi CORS không

### VR Tour trắng
- Kiểm tra Firebase URL có đúng không
- Mở `https://ptit-vr-tour.web.app/tour.html` trực tiếp xem có hoạt động không
- Kiểm tra `REACT_APP_VR_URL` trên Vercel

### CORS error
Backend đã có `cors()` middleware. Nếu vẫn lỗi, thêm origin cụ thể:
```javascript
// backend/server.js
app.use(cors({
  origin: ['https://ptit-vr-xxxx.vercel.app', 'http://localhost:3000']
}));
```

### Render sleep quá lâu
Dùng https://uptimerobot.com (free) để ping backend mỗi 14 phút → giữ cho không sleep.

---

## Chi phí

| Dịch vụ | Plan | Chi phí |
|---------|------|---------|
| Vercel | Hobby | $0 |
| Render | Free | $0 |
| Aiven | Free | $0 |
| Firebase Hosting | Spark (free) | $0 |
| **Tổng** | | **$0/tháng** |

Giới hạn đáng chú ý:
- Render: sleep sau 15 phút, 750h/tháng
- Aiven: 5GB storage, 1 DB
- Firebase: 10GB storage, 360MB transfer/ngày
- Vercel: 100GB bandwidth/tháng
