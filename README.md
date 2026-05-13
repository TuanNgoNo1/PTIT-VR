# PTIT Website

Website cổng thông tin Học viện Công nghệ Bưu chính Viễn thông (PTIT).

## Yêu cầu

- Node.js ≥ 18
- MySQL ≥ 8.0

## Cài đặt & Chạy

### 1. Database

```bash
mysql -u root -p
SOURCE database.sql;
```

> DB mặc định: `vr`, user `root`, password `123456`. Đổi trong `backend/db.js` nếu cần.

### 2. Backend

```bash
cd backend
npm install
node server.js
```

Chạy tại http://localhost:5000

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Chạy tại http://localhost:3000

## Cấu trúc

```
├── backend/          # Express API (port 5000)
├── frontend/         # React SPA (port 3000)
│   └── src/
│       ├── components/   # UI components dùng chung
│       ├── pages/        # 12+ trang
│       ├── data/         # Dữ liệu tĩnh
│       ├── hooks/        # Custom hooks
│       ├── utils/        # Helpers, API wrapper
│       └── router/       # React Router config
├── vr/vr/            # VR Tour 360° (KRpano standalone)
└── database.sql      # Schema + seed data (30 bài viết)
```

## Tính năng

- 12 trang công khai: Trang chủ, Giới thiệu, Đào tạo, Tuyển sinh, Khoa-Viện, Nghiên cứu, Hợp tác QT, Sinh viên, Tuyển dụng, Liên hệ, Tìm kiếm, Tin tức
- Hero slider fullscreen với Ken Burns effect
- Sidebar menu 2 cột (giống TMU.edu.vn)
- Search overlay full-screen
- Floating action buttons (Messenger, Phone, Scroll-to-top)
- VR Tour 360° tích hợp (164 ảnh panorama)
- Responsive design
- 13 property-based tests (fast-check)

## VR Tour 360° (tùy chọn)

Thư mục VR Tour (~2GB ảnh panorama) không nằm trên GitHub vì quá lớn. Nếu muốn chạy tính năng "Tham quan 360°":

1. Tải file VR Tour từ Google Drive: `https://drive.google.com/drive/u/2/folders/12DMLA17ltSVaVe0XgoL8TanMR60obliz`
2. Giải nén và copy toàn bộ nội dung vào `frontend/public/vr-tour/`
3. Đảm bảo file `frontend/public/vr-tour/tour.html` tồn tại

```
frontend/public/vr-tour/
├── tour.html          ← file chính
├── tour.js
├── tour.xml
├── app.js
├── style.css
├── panos/             ← 164 thư mục ảnh panorama
├── skin/
└── plugins/
```

Sau đó truy cập http://localhost:3000/tham-quan để xem VR Tour.

> Nếu không có thư mục `vr-tour`, trang `/tham-quan` sẽ hiện trắng - các trang khác vẫn hoạt động bình thường.

## Tech Stack

React 19 · React Router v7 · CSS thuần · Node.js · Express 5 · MySQL 8 · KRpano · DOMPurify · fast-check
