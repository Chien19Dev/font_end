const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export interface CartItem {
  id: string;
  variant_id: string;
  quantity: number;
  variant?: {
    id: string;
    color: string;
    size: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: string;
      image_url: string[];
    };
  };
}

export async function addToCart(variant_id: string, quantity: number = 1) {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ variant_id, quantity }),
  });

  if (!res.ok) {
    throw new Error('Không thể thêm sản phẩm vào giỏ hàng');
  }

  return res.json();
}

export async function getUserCart(): Promise<CartItem[]> {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Không thể lấy giỏ hàng');
  }

  return res.json();
}

export async function deleteCartItem(id: string) {
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Xoá sản phẩm khỏi giỏ hàng thất bại');
  }

  return res.json();
}
