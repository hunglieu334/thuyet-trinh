# SnapEdit Clone

Dự án này là bản clone website SnapEdit (https://snapedit.app/vi) sử dụng **HTML, CSS, JavaScript** thuần, không dùng framework ngoài. Dự án tổ chức rõ ràng, dễ bảo trì, tối ưu cho trải nghiệm người dùng và hiệu suất.

## 📁 Cấu trúc thư mục

```
/snapeditvn-clone
│
├── index.html                # Trang index gốc 
├── README.md                 # Tài liệu hướng dẫn dự án
├── todos.md                  # Nhật ký và kế hoạch phát triển
├── package.json              # Thông tin và scripts cho npm/Vite
├── vite.config.js            # Cấu hình Vite
├── /src
│   └── /pages
│       ├── /home
│       │   ├── index.html
│       │   ├── style.css
│       │   └── script.js
│       ├── /add-watermark
│       │   ├── index.html
│       │   ├── style.css
│       │   └── script.js
│       ├── /compress-image
│       │   ├── index.html
│       │   ├── style.css
│       │   └── script.js
│       ├── /convert-image
│       │   ├── index.html
│       │   ├── style.css
│       │   └── script.js
│       └── /blur-bg
│           ├── index.html
│           ├── style.css
│           └── script.js
│
├── /assets
│   ├── /images               # Logo, icon, hình minh họa
│   ├── /css                  # CSS dùng chung
│   └── /js                   # JS dùng chung (utils, ...)
└── ...
```

## 🚀 Tính năng chính

- **Trang chủ (Home):**
  - Hero section, giới thiệu, các công cụ nổi bật
  - Menu điều hướng đến các trang con
  - Responsive, tối ưu cho mobile

- **Thêm Watermark:**
  - Upload ảnh, thêm watermark dạng chữ hoặc hình ảnh
  - Tùy chỉnh vị trí, màu sắc, kích thước, độ trong suốt
  - Tải ảnh đã thêm watermark

- **Nén ảnh:**
  - Upload nhiều ảnh, nén dung lượng mà vẫn giữ chất lượng
  - Tùy chỉnh chất lượng, kích thước, định dạng đầu ra
  - So sánh trước/sau, tải ảnh đã nén

- **Chuyển đổi định dạng ảnh:**
  - Upload nhiều ảnh, chọn định dạng đầu ra (JPG, PNG, WEBP, GIF, TIFF, BMP, SVG, PDF)
  - Xem trước, tải ảnh đã chuyển đổi

- **Làm mờ nền ảnh:**
  - Upload ảnh, làm mờ nền tự động bằng AI
  - Tùy chỉnh mức độ mờ, hiệu ứng
  - Tải ảnh đã xử lý

- **Header & Footer đồng bộ:**
  - Menu dropdown, chọn ngôn ngữ, đăng nhập, thử miễn phí
  - Footer với liên kết sản phẩm, công ty, hỗ trợ, mạng xã hội

- **Tối ưu trải nghiệm:**
  - Responsive, mobile menu, animation, smooth scroll
  - Không lưu trữ ảnh trên server, xử lý trực tiếp trên trình duyệt

## 🛠️ Hướng dẫn chạy local

1. Cài đặt dependencies:
   ```
   npm install
   ```
2. Chạy server phát triển:
   ```
   npm run dev
   ```
   Truy cập: http://localhost:5173/src/pages/home/index.html
3. Build production:
   ```
   npm run build
   npm run preview
   ```
   Truy cập: http://localhost:4173/src/pages/home/index.html

## 📒 Ghi chú
- Đường dẫn các trang con là tuyệt đối: `/src/pages/xxx/index.html`
- Không sử dụng framework ngoài, chỉ HTML, CSS, JS thuần.
- Xem thêm chi tiết tiến độ và kế hoạch ở file `todos.md`.

---
**Tác giả:** Dự án clone SnapEdit cho mục đích học tập và thực hành front-end. 