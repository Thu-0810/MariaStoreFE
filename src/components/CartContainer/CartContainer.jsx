import { useState } from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import QuantityControl from "../QuantityControl";
import { useNavigate } from "react-router-dom";

const initialCartItems = [
  {
    id: 1,
    name: '"Trời sao"',
    category: "Xám",
    price: 2814380,
    quantity: 1,
    image: "../src/assets/img/Illustration309.jpg",
  },
  {
    id: 2,
    name: "Nhãn dán ôm",
    category: "Nâu",
    price: 282550,
    quantity: 1,
    image: "../src/assets/img/Illustration80.1.jpg",
  },
  {
    id: 3,
    name: "Fanart Shishigami Leona",
    category: "Vàng",
    price: 721800,
    quantity: 1,
    image: "../src/assets/img/Illustration153.jpg",
  },
  {
    id: 4,
    name: '"Chúc may mắn"',
    category: "Tím",
    price: 1040500,
    quantity: 1,
    image: "../src/assets/img/Illustration314.jpg",
  },
];

const CartContainer = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/70 via-purple-100/60 to-pink-100/60 backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-start pt-24">
            <div className="w-full max-w-2xl">
              {/* Header */}
              <div className="bg-[#133d87] text-white text-center py-3 rounded-t-xl font-semibold">
                Giỏ hàng của bạn
              </div>

              <div className="bg-white/90 rounded-b-xl shadow-lg px-8 py-10 text-center">
                <p className="text-[#133d87] font-medium">
                  Không có sản phẩm nào trong giỏ hàng của bạn
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-grow">
              <div className="grid grid-cols-12 bg-[#133d87] text-white rounded-xl px-6 py-4 font-semibold">
                <div className="col-span-5">Thông tin sản phẩm</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Thành tiền</div>
                <div className="col-span-1"></div>
              </div>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center bg-white/95 rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition">
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-30 h-40 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-bold text-xl l text-[#133d87]">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#133d87]">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <QuantityControl
                        value={item.quantity}
                        min={1}
                        onDecrease={() => updateQuantity(item.id, -1)}
                        onIncrease={() => updateQuantity(item.id, 1)}
                      />
                    </div>

                    <div className="col-span-2 text-center font-medium text-[#133d87]">
                      {item.price.toLocaleString()}đ
                    </div>

                    <div className="col-span-2 text-center font-bold text-[#133d87]">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </div>

                    <div className="col-span-1 text-center">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[300px]">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center sticky top-24">
                <div className="text-[#133d87] font-bold">Tổng tiền</div>

                <div className="text-3xl font-black text-[#133d87] my-4">
                  {totalPrice.toLocaleString()}đ
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  className="!bg-[#133d87] hover:!bg-[#123b7a]"
                  onClick={() => navigate("/checkout")}>
                  THANH TOÁN
                </Button>

                <div
                  className="text-xs text-[#133d87] mt-3 cursor-pointer hover:underline"
                  onClick={() => navigate("/store")}>
                  Tiếp tục mua sắm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContainer;