# Nhành — Website thương hiệu (Frontend)

> *Gói trọn bản sắc, nở rộ yêu thương* — Fragrance & Body Care thuần Việt

Website tĩnh (HTML/CSS/JS thuần), **chưa cần backend**. Giỏ hàng và tài khoản được lưu ngay trên trình duyệt bằng `localStorage`.

## ▶️ Cách chạy

Vì website nạp dữ liệu qua JavaScript và ảnh có tên tiếng Việt, **nên chạy qua local server** (không nên mở trực tiếp bằng `file://`):

```bash
# Trong thư mục NHÀNH_WEB
python -m http.server 8000
```

Rồi mở trình duyệt: **http://localhost:8000/index.html**

> Cách khác: dùng extension **Live Server** của VS Code (chuột phải `index.html` → *Open with Live Server*).

## 🗂️ Cấu trúc

```
NHÀNH_WEB/
├─ index.html              # Trang chủ
├─ pages/
│  ├─ products.html        # Cửa hàng + bộ lọc (nhóm mùi, giá, danh mục)
│  ├─ product.html         # Chi tiết sản phẩm (?id=NHxxxx)
│  ├─ collections.html     # BST "Việt Nam trong Hương" (5 vùng đất)
│  ├─ about.html           # Câu chuyện · ý nghĩa logo · tầm nhìn/sứ mệnh · giá trị cốt lõi (#values)
│  ├─ community.html       # Trách nhiệm cộng đồng + bản tin gây quỹ
│  ├─ gifts.html           # Quà tặng / Gift Set
│  ├─ blog.html · post.html        # Bài viết
│  ├─ workshop.html        # Workshop + form đăng ký
│  ├─ contact.html         # Liên hệ
│  ├─ cart.html            # Giỏ hàng + thanh toán (mô phỏng)
│  ├─ account.html         # Đăng nhập/Đăng ký · thông tin · đơn hàng · thông báo
│  ├─ policy.html          # 5 chính sách (?p=...)
│  └─ faq.html             # Câu hỏi thường gặp
├─ assets/
│  ├─ css/style.css        # Design system (xanh rừng + vàng đất, quiet luxury)
│  └─ js/
│     ├─ data.js           # ⭐ Toàn bộ nội dung: sản phẩm, giá, BST, blog, chính sách...
│     └─ app.js            # Header/Footer dùng chung, giỏ hàng, drawer, popup, search
└─ public/                 # Ảnh sản phẩm & logo (giữ nguyên của bạn)
```

## ✏️ Chỉnh sửa nội dung

Hầu hết nội dung (tên, giá, mô tả sản phẩm, bài viết, chính sách, thông tin liên hệ...) đều nằm trong **`assets/js/data.js`** — chỉ cần sửa file này, không cần đụng tới HTML.

## ✨ Tính năng tương tác

- 🛒 **Giỏ hàng** lưu `localStorage`: thêm/xóa/đổi số lượng, cart drawer trượt, thanh "freeship".
- 🔍 **Tìm kiếm** sản phẩm tức thì.
- 🧭 **Bộ lọc** theo danh mục / nhóm mùi / mức giá + sắp xếp.
- 👤 **Tài khoản** (đăng nhập/đăng ký mô phỏng) lưu `localStorage`.
- 💳 **Thanh toán** mô phỏng (COD/Momo/VNPay) — mã giảm giá thử: **`NHANH10`** (giảm 10%).
- 📱 Responsive đầy đủ (desktop / tablet / mobile), menu mobile, popup nhận tin.

## 🖼️ Ảnh sản phẩm (đã tối ưu)
- Ảnh trong `public/products/` đã được **nén từ PNG sang JPG** chất lượng cao (giảm ~93%: 425MB → 28MB) để web tải nhanh.
- **Ảnh PNG gốc** được sao lưu nguyên vẹn trong `public/_originals_png/` — nếu không cần, bạn có thể xóa thư mục này để tiết kiệm dung lượng.

## 🔌 Khi cần backend (giai đoạn sau)
Các điểm cần nối API: thêm/đọc giỏ hàng, đăng nhập/đăng ký thật, đặt hàng (checkout), gửi form (liên hệ/workshop/newsletter). Hiện tất cả đang xử lý phía client để demo.
