# SnapEdit Clone Project - Todos

## Project Overview
- Clone website SnapEdit (https://snapedit.app/vi)
- Sử dụng HTML, CSS và JavaScript thuần
- Tổ chức file rõ ràng, dễ bảo trì
- Tối ưu hiệu suất và trải nghiệm người dùng

## Pages to Implement
1. Home Page (/vi)
   - [x] Hero Section
   - [x] Features Section
   - [x] How It Works Section
   - [x] Testimonials Section
   - [x] CTA Section
   - [x] FAQ Section
   - [x] Footer

2. Add Watermark Page (/vi/add-watermark)
   - [x] Hero Section
   - [x] Upload Section
   - [x] Editor Section
     - [x] Image Preview
     - [x] Text Watermark Controls
     - [x] Image Watermark Controls
     - [x] Position Controls
     - [x] Download Button
   - [x] Footer

3. Blur Background Page (/vi/blur-bg)
   - [ ] Hero Section
   - [ ] Upload Section
   - [ ] Editor Section
   - [ ] Footer

4. Compress Image Page (/vi/compress-image)
   - [x] Hero Section
   - [x] Upload Section
   - [x] Editor Section
     - [x] Image Preview
     - [x] Compression Settings
       - [x] Quality Control
       - [x] Max Width Control
       - [x] Format Selection
     - [x] Before/After Preview
     - [x] Size Comparison
     - [x] Download Button
   - [x] Footer

5. Convert Image Page (/vi/convert-image)
   - [x] Hero Section
   - [x] Upload Section
   - [x] Editor Section
     - [x] Image Preview
     - [x] Format Selection
       - [x] JPEG
       - [x] PNG
       - [x] WEBP
       - [x] GIF
       - [x] TIFF
       - [x] BMP
       - [x] SVG
       - [x] PDF
     - [x] Before/After Preview
     - [x] Format Comparison
     - [x] Download Button
   - [x] Footer

## Components Status

### Header
- [x] Logo
- [x] Navigation Menu
- [x] Language Switcher
- [x] Login/Signup Buttons
- [x] Mobile Menu Toggle

### Footer
- [x] Logo & Description
- [x] Product Links
- [x] Company Links
- [x] Support Links
- [x] Social Media Icons
- [x] Copyright

### Common Components
- [x] Button Styles
- [x] Form Elements
- [x] Cards
- [x] Icons
- [x] Loading States

## CSS Implementation
- [x] Global Styles
- [x] Layout System
- [x] Typography
- [x] Colors & Variables
- [x] Animations & Transitions
- [x] Responsive Design
- [x] Dark Mode Support

## JavaScript Features
- [x] Mobile Menu Toggle
- [x] Language Switcher
- [x] Smooth Scrolling
- [x] Intersection Observer
- [x] Form Validation
- [x] File Upload Handling
- [x] Image Processing
- [x] Download Functionality

## Add Watermark Page Features
- [x] Drag & Drop Upload
- [x] File Input
- [x] Image Preview
- [x] Text Watermark
  - [x] Text Input
  - [x] Color Picker
  - [x] Size Control
  - [x] Opacity Control
- [x] Image Watermark
  - [x] Image Upload
  - [x] Size Control
  - [x] Opacity Control
- [x] Position Controls
  - [x] 9-Position Grid
  - [x] Position Preview
- [x] Download Functionality
  - [x] Canvas Processing
  - [x] PNG Export
- [x] Reset Functionality

## Compress Image Page Features
- [x] Drag & Drop Upload
- [x] Multiple File Support
- [x] Image Preview
  - [x] Original Image
  - [x] Compressed Image
  - [x] Size Comparison
  - [x] Compression Ratio
- [x] Compression Settings
  - [x] Quality Slider (0-100%)
  - [x] Max Width Input
  - [x] Format Selection (JPEG, PNG, WEBP)
- [x] Image Navigation
  - [x] Previous/Next Buttons
  - [x] Image Counter
- [x] Download Functionality
  - [x] Single Image Download
  - [x] Original Filename Preservation
- [x] Reset Functionality

## Convert Image Page Features
- [x] Drag & Drop Upload
- [x] Multiple File Support
- [x] Image Preview
  - [x] Original Image
  - [x] Converted Image
  - [x] Format Comparison
  - [x] Size Comparison
- [x] Format Selection
  - [x] JPEG
  - [x] PNG
  - [x] WEBP
  - [x] GIF
  - [x] TIFF
  - [x] BMP
  - [x] SVG
  - [x] PDF
- [x] Image Navigation
  - [x] Previous/Next Buttons
  - [x] Image Counter
- [x] Download Functionality
  - [x] Single Image Download
  - [x] Format Preservation
- [x] Reset Functionality

## Pending Tasks
1. Implement remaining pages
2. Add error handling for file uploads
3. Add progress indicators
4. Implement file size validation
5. Add loading states
6. Implement error messages
7. Add success notifications
8. Add image quality controls
9. Implement batch download
10. Add compression presets

## Next Steps
1. Complete Blur Background page
2. Add comprehensive error handling
3. Implement loading states
4. Add success/error notifications
5. Add file size validation
6. Implement progress indicators
7. Add compression presets
8. Implement batch download
9. Add image quality controls
10. Add format conversion presets

## Progress Log
- [2024-03-20] Initial project setup
- [2024-03-20] Completed home page implementation
- [2024-03-20] Added Testimonials, CTA, and FAQ sections
- [2024-03-20] Implemented Add Watermark page
  - Created HTML structure
  - Added CSS styles
  - Implemented JavaScript functionality
  - Added drag & drop upload
  - Implemented watermark controls
  - Added download functionality
- [2024-03-20] Implemented Compress Image page
  - Created HTML structure
  - Added CSS styles
  - Implemented JavaScript functionality
  - Added multiple file support
  - Implemented compression controls
  - Added before/after preview
  - Added download functionality
- [2024-03-20] Implemented Convert Image page
  - Created HTML structure
  - Added CSS styles
  - Implemented JavaScript functionality
  - Added multiple file support
  - Implemented format selection
  - Added before/after preview
  - Added download functionality

## [2024-05-20] Đồng bộ header và điều hướng các trang con

### Công việc đã thực hiện:
- Đã đồng bộ header trên tất cả các trang: home, add-watermark, compress-image, convert-image, blur-bg.
- Header gồm: logo, menu chính (Sản phẩm AI, Giải pháp, Giá, API, Tải App), chọn ngôn ngữ, Đăng nhập, Thử miễn phí, mobile menu.
- Menu Sản phẩm AI là dropdown, liên kết trực tiếp đến các trang con: /add-watermark, /blur-bg, /compress-image, /convert-image.
- Đảm bảo các liên kết này hoạt động đúng, người dùng có thể điều hướng từ home đến các trang con và ngược lại.
- Sử dụng hoàn toàn HTML, CSS, JavaScript thuần, không phụ thuộc framework ngoài.
- Đã cập nhật CSS cho header, dropdown, responsive, mobile menu.
- Đã bổ sung JS cho dropdown, language menu, mobile menu.

### Hướng dẫn kiểm tra:
- Truy cập trang chủ hoặc bất kỳ trang con nào, kiểm tra menu Sản phẩm AI, các liên kết phải chuyển đúng trang.
- Kiểm tra responsive trên mobile, menu thu gọn và dropdown hoạt động tốt.

### Kế hoạch tiếp:
- Tiếp tục chuẩn hóa footer nếu cần.
- Kiểm tra lại toàn bộ trải nghiệm điều hướng và giao diện trên các thiết bị.

## Lịch trình làm lại giao diện Home giống bản gốc SnapEdit

1. ~~Phân tích giao diện gốc: màu nền, font, layout, header, menu, hero, các section, footer.~~ (Đã hoàn thành)
   - Màu nền: gradient hồng nhạt sang tím nhạt.
   - Font: sans-serif, đậm, hiện đại (Inter hoặc tương tự).
   - Header: logo trái, menu ngang (Sản phẩm AI dropdown), ngôn ngữ, đăng nhập, thử miễn phí.
   - Hero: tiêu đề lớn, mô tả, nút CTA xanh, hình minh họa AI.
   - Section: đối tác, tính năng, hướng dẫn, testimonial, FAQ, CTA phụ.
   - Footer: logo, mô tả, các cột link, social, copyright.
   - Style: màu chủ đạo #2563eb, #fff, #f8fafc, gradient, font size lớn, spacing rộng, bo góc lớn, shadow nhẹ, hover rõ, responsive tốt.
2. ~~Thiết lập lại cấu trúc HTML cho trang home theo đúng bố cục gốc.~~ (Đã hoàn thành)
3. Cập nhật style: màu nền, font, kích thước chữ, khoảng cách, responsive, hiệu ứng.
4. Làm lại header: logo, menu, dropdown "Sản phẩm AI", ngôn ngữ, nút đăng nhập/thử miễn phí.
5. Làm lại hero section: tiêu đề lớn, mô tả, nút CTA, hình ảnh minh họa.
6. Làm lại các section tiếp theo: giới thiệu, tính năng, đối tác, testimonial, FAQ, CTA phụ.
7. Làm lại footer: logo, link, thông tin, bản quyền.
8. Kiểm tra lại toàn bộ giao diện trên desktop và mobile.
9. Đảm bảo menu "Sản phẩm AI" chuyển trang đúng như bản gốc.
10. Tối ưu code, kiểm tra lại UX/UI. 