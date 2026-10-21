# Gác Sách — Giao diện gợi ý cho FAHASA

Một trang danh mục sách responsive, xây bằng HTML và CSS thuần, lấy cảm hứng từ trải nghiệm mua sách trực tuyến của FAHASA. Đây là bài tập giao diện độc lập; không thuộc sở hữu hoặc được FAHASA bảo trợ.

## Xem thử

- Mở `index.html` trực tiếp trong trình duyệt, hoặc chạy một static server trong thư mục này (ví dụ: `python -m http.server 8000`) rồi truy cập `http://localhost:8000`.
- Mỗi tựa sách và nút “Xem tại FAHASA” dẫn đến trang sản phẩm nguồn.

## Cấu trúc

```text
ecommerce-ui-improvement/
├── index.html
├── css/style.css
├── images/             # minh họa bìa sách tự thiết kế dạng SVG
├── README.md
├── AI_USAGE.md
└── docs/
    ├── website-survey.md
    └── validation.md
```

## Nội dung và dữ liệu

Bốn sản phẩm và giá đang hiển thị được đối chiếu trên FAHASA ngày 21/10/2026. Giá, khuyến mãi, đánh giá và tình trạng hàng có thể thay đổi. Các hình bìa trên trang là minh họa tự dựng, không phải ảnh bìa chính thức. Nguồn quan sát và phân biệt dữ kiện với đề xuất xem tại [`docs/website-survey.md`](docs/website-survey.md).

## Phạm vi

Trang tập trung vào phần danh mục/khám phá sách. Các hành động mua hàng thực tế được chuyển tới trang FAHASA; trang bài tập không có giỏ hàng, đăng nhập, thanh toán hay backend riêng. Ghi nhận việc sử dụng AI tại [`AI_USAGE.md`](AI_USAGE.md).
