# CSS nâng cao · Lab 07

Nguyễn Huy Hoàng · MSSV 31241026670 · Lớp học phần 26C1INF50902702

Lab 07 thực hành luồng tài liệu, định vị, bố cục nhiều cột, thiết kế responsive và các hiệu ứng CSS qua 19 Exercise. Trang chủ giới thiệu nội dung đã học. Mỗi bài có hướng dẫn quan sát, demo chạy độc lập và liên kết đến mã nguồn.

- [Repository GitHub](https://github.com/nhhoang782006-dotcom/ecommerce-ui-improvement)
- [GitHub Pages dự kiến](https://nhhoang782006-dotcom.github.io/ecommerce-ui-improvement/CSS-NangCao/)

## Chạy cục bộ

Tại thư mục gốc repository, chạy `python -m http.server 8000` rồi mở [trang CSS nâng cao](http://localhost:8000/CSS-NangCao/). Vào [mục lục Lab 07](Lab07/) và chọn bài muốn kiểm tra. Chọn **Mở demo riêng** để quan sát ở toàn bộ cửa sổ hoặc đổi chiều rộng viewport trong DevTools.

## Các nhóm bài

| Exercise | Nội dung |
| --- | --- |
| [7.1–7.4](Lab07/#dong-va-dinh-vi) | Luồng tài liệu, block và inline, định vị tương đối và tuyệt đối, lớp chồng |
| [7.5–7.9](Lab07/#float-va-clear) | Float, clear và chú thích chồng lên ảnh |
| [7.10–7.13](Lab07/#bo-cuc-responsive) | Bố cục hai cột, ba cột, media queries và viewport |
| [7.14–7.18](Lab07/#hieu-ung) | Transform, transition, filter và animation |
| [7.19](Lab07/#bootstrap) | Lưới Bootstrap, navbar, panel, list-group, jumbotron và nút |

## Cấu trúc

```text
CSS-NangCao/
├── index.html
├── assets/
├── Lab07/
│   ├── index.html
│   ├── Exercise01/ … Exercise19/
│   └── demos/
│       ├── lab07-exercise*.html
│       ├── lab07-exercise*.css
│       ├── bootstrap/
│       └── images/
└── README.md
```

Exercise 7.13 tiếp tục trên [HTML của 7.12](Lab07/demos/lab07-exercise12.html) và hai stylesheet desktop/mobile. Trang 7.12 tập trung vào bố cục tại 480px và 481px. Trang 7.13 dùng cùng demo để quan sát viewport và việc đổi điều hướng giữa danh sách và ô chọn. Exercise 7.19 nạp stylesheet Bootstrap cục bộ.

## Nguồn

HTML, CSS khởi đầu và tài nguyên demo thuộc Lab 7, chương *Advanced CSS: Layout* trong *Fundamentals of Web Development*, ấn bản 2, Randy Connolly và Ricardo Hoar, Pearson. Giữ [README nguồn](Lab07/demos/README.md) cùng các tệp thực hành để đối chiếu. Bootstrap v3.3.7 (Copyright 2011–2016 Twitter, Inc.) đi kèm theo [giấy phép MIT](Lab07/demos/bootstrap/LICENSE).
