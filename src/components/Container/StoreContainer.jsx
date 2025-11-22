import {
  HeartOutlined,
  StarFilled,
  StarOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown } from "antd";

const products = [
  {
    id: 1,
    name: "Gif Tặng Thú",
    price: "430.850đ",
    image: "src/assets/img/Illustration85.1.jpg",
  },
  {
    id: 2,
    name: "2D Andres Mỹ",
    price: "574.975đ",
    image: "src/assets/img/Illustration43.1.jpg",
  },
  {
    id: 3,
    name: "Fanart Mania Monuments",
    price: "692.850đ",
    image: "src/assets/img/Illustration219.jpg",
  },
  {
    id: 4,
    name: "Kj Neko Sugar Halloween",
    price: "850.225đ",
    image: "src/assets/img/Illustration336.png",
  },
  {
    id: 5,
    name: "Neko Đen Sen",
    price: "392.850đ",
    image: "src/assets/img/Illustration80.1.jpg",
  },
  {
    id: 6,
    name: "Tình Sánh",
    price: "723.900đ",
    image: "src/assets/img/Illustration122.jpg",
  },
  {
    id: 7,
    name: "Tết Thú",
    price: "492.850đ",
    image: "src/assets/img/Illustration132.jpg",
  },
  {
    id: 8,
    name: "Cánh Cụt",
    price: "392.850đ",
    image: "src/assets/img/Illustration128.jpg",
  },
  {
    id: 9,
    name: "Sticker Bộ Mania Monuments",
    price: "2.357.000đ",
    image: "src/assets/img/Illustration158.jpg",
  },
  {
    id: 10,
    name: "Tàu Thương Đường",
    price: "723.900đ",
    image: "src/assets/img/Illustration133.jpg",
  },
  {
    id: 11,
    name: "Fanart Gensys",
    price: "523.800đ",
    image: "src/assets/img/Illustration172.jpg",
  },
  {
    id: 12,
    name: "Donut",
    price: "692.850đ",
    image: "src/assets/img/Illustration200.jpg",
  },
];
function StoreContainer() {
  const sortMenuItems = [
    { key: "newest", label: "Mới nhất" },
    { key: "oldest", label: "Cũ nhất" },
    { key: "a-z", label: "A-Z" },
    { key: "z-a", label: "Z-A" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Hero Section */}
      <section className="relative h-150 bg-gradient-to-r from-[#d9eafd] to-[#cbdceb] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src\assets\img\Illustration251.jpg"
            alt="Anime character with balloons"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-2">
          <div className="flex gap-4 overflow-x-auto no-scrollbar justify-center">
            {[
              { src: "src/assets/img/Illustration128.jpg", title: "Nhãn Dán" },
              { src: "src/assets/img/Illustration156.jpg", title: "Chibi" },
              {
                src: "src/assets/img/Illustration157.2.jpg",
                title: "Ảnh Động",
              },
              {
                src: "src/assets/img/Illustration212.jpg",
                title: "Biểu Tượng Cảm Xúc",
              },
              {
                src: "src/assets/img/Illustration318.1.jpg",
                title: "Tranh Chân Dung",
              },
              { src: "src/assets/img/Kigoro.2.jpg", title: "2D Avatar" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative w-48 h-28 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex-shrink-0">
                {/* Ảnh */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full p-3 z-10">
                  <h3 className="font-semibold text-white text-left">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-36 py-6">
        <div className="flex justify-end mb-6">
          <span className="text-[#133e87] font-semibold">
            Sắp xếp theo:&nbsp;
          </span>
          <Dropdown
            menu={{ items: sortMenuItems }}
            trigger={["click"]}
            placement="bottomRight">
            <span className="cursor-pointer text-[#133e87] font-semibold flex items-center gap-1 hover:text-[#608bc1]">
              Mặc định
              <DownOutlined className="text-[#608bc1]" />
            </span>
          </Dropdown>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white border border-[#d9d9d9] hover:shadow-md transition-shadow"
              bodyStyle={{ padding: "8px" }}
              cover={
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-70 object-cover"
                  />
                  {/* Icon giỏ hàng tròn, nền đen mờ */}
                  <button
                    // onClick={() => addToCart(product)}
                    className="
              absolute bottom-2 right-2
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-gray-300 hover:bg-gray-400
              transition
            ">
                    <ShoppingCartOutlined className="text-white text-lg" />
                  </button>
                </div>
              }>
              <h4 className="text-sm font-medium text-[#133e87] mb-1 line-clamp-2">
                {product.name}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#133e87]">
                  {product.price}
                </span>
                <div className="flex items-center gap-0.5 text-xs">
                  <StarFilled className="text-yellow-400" />
                  <StarFilled className="text-yellow-400" />
                  <StarFilled className="text-yellow-400" />
                  <StarFilled className="text-yellow-400" />
                  <StarOutlined className="text-[#d1d1d1]" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            1
          </Button>
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            2
          </Button>
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            3
          </Button>
          <span className="text-[#608bc1]">...</span>
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            8
          </Button>
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            9
          </Button>
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            10
          </Button>
          <Button size="small" className="text-[#608bc1] border-[#d9d9d9]">
            →
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StoreContainer;