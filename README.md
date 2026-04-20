Định dạng cột Excel đang hỗ trợ
Bạn có thể dùng các cột sau (linh hoạt alias):
Bắt buộc:
name
price
category (hoặc category_id, category_slug)
Tùy chọn:
description
discount_percent
image_url (nhiều ảnh ngăn cách , hoặc |)
image_hover_url
subcategory (hoặc subcategory_id, subcategory_slug)
variants (JSON array), hoặc:
variant_colors
variant_sizes
variant_quantities
Ví dụ nhanh cho variants bằng cột tách:

variant_colors: Đen|Trắng
variant_sizes: M|L
variant_quantities: 10|8
