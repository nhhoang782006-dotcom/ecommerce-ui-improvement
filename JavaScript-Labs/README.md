# JavaScript Labs — Nguyễn Huy Hoàng

## Thông tin học phần

- **Sinh viên:** Nguyễn Huy Hoàng
- **MSSV:** 31241026670
- **Mã lớp học phần:** 26C1INF50902702
- **Hạn nộp:** 23:00 ngày 17/11/2026 (giờ Việt Nam)
- **Portfolio:** [Mở website JavaScript Labs](https://nhhoang782006-dotcom.github.io/ecommerce-ui-improvement/JavaScript-Labs/)
- **Repository:** [ecommerce-ui-improvement](https://github.com/nhhoang782006-dotcom/ecommerce-ui-improvement)
- **GitHub Pages:** [https://nhhoang782006-dotcom.github.io/ecommerce-ui-improvement/JavaScript-Labs/](https://nhhoang782006-dotcom.github.io/ecommerce-ui-improvement/JavaScript-Labs/)

## Mục tiêu

Thực hành JavaScript qua 29 bài độc lập: nền tảng ngôn ngữ ở Lab08, DOM và sự kiện ở Lab09, jQuery ở Lab10. Mỗi bài có trang mở trực tiếp, demo thao tác, giải thích và đường dẫn đi tiếp.

## Cấu trúc

```text
JavaScript-Labs/
├── index.html                 # Portfolio
├── assets/
│   ├── site.css               # Giao diện dùng chung
│   ├── site.js                # Tiện ích điều hướng nhỏ
│   └── vendor/jquery-3.7.1.min.js
├── Lab08/
│   ├── index.html
│   └── Exercise01..Exercise11/
├── Lab09/
│   ├── index.html
│   └── Exercise01..Exercise08/
└── Lab10/
    ├── index.html
    ├── jquery-loader.js          # Shared CDN loader with local fallback
    └── Exercise01..Exercise10/
        └── Exercise01/load-jquery.js  # Version/source status demo
```

## Mở website

Từ thư mục chứa repository, chạy một static server:

```powershell
python -m http.server 8000
```

Mở `http://localhost:8000/ecommerce-ui-improvement/JavaScript-Labs/`. Nếu chạy server bên trong thư mục repository, mở `http://localhost:8000/JavaScript-Labs/`.

Các bài dùng HTML, CSS và JavaScript tĩnh; không cần backend hoặc bước build.

## Kiểm thử E2E

Các kiểm thử dùng Playwright Test với Microsoft Edge cài trên máy:

```powershell
npm ci
npm run test:e2e
```

Mặc định suite chạy qua đúng tiền tố repository local để bắt lỗi đường dẫn tương đối. Chạy cùng suite với Pages sau khi triển khai:

```powershell
$env:E2E_BASE_URL = "https://nhhoang782006-dotcom.github.io/ecommerce-ui-improvement/JavaScript-Labs/"
npm run test:e2e
Remove-Item Env:E2E_BASE_URL
```

Báo cáo HTML của Playwright nằm trong `playwright-report/`; các file kết quả tạm được bỏ qua bởi Git.

## Nguồn dữ liệu bài GET

Bản GitHub Pages chạy HTTPS. Endpoint HTTP trong ví dụ gốc của giáo trình không cung cấp kết nối HTTPS có chứng chỉ hợp lệ, vì vậy bài GET trên Pages sử dụng API HTTPS công khai sau khi đã kiểm tra phản hồi:

`https://countriesnow.space/api/v0.1/countries/cities/q?country=Vietnam`

API trả danh sách tên thành phố dưới dạng `data: string[]`; demo đổi mỗi tên thành `{ name }` để trình bày luồng duyệt đối tượng. Trang giải thích rõ nguồn này khác dịch vụ của giáo trình. Lỗi mạng, phản hồi rỗng và timeout được hiển thị; demo không tự thay phản hồi bằng dữ liệu giả.

Bài 10.9 giữ yêu cầu `$.get()` và đặt thời gian chờ dùng chung 15 giây; bài 10.10 kiểm tra riêng trạng thái `jqXHR` với cùng giới hạn.

## Tóm tắt nội dung

| Lab | Chủ đề | Số bài |
|---|---|---:|
| Lab08 | Language foundations: biến, hàm, mảng, đối tượng | 11 |
| Lab09 | DOM, sự kiện, biểu mẫu | 8 |
| Lab10 | jQuery, hiệu ứng, AJAX | 10 |

## Tài liệu nộp

Báo cáo được lưu riêng bên ngoài repository để không xuất hiện trên GitHub Pages. Tên file: `31241026670_NguyenHuyHoang_JavaScript_Labs.docx`.
