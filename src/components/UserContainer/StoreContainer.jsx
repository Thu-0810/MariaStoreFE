import {
  StarFilled,
  StarOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Dropdown, Pagination, Spin } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsPagedApi } from "../../api/productApi";
import { getCategoriesApi } from "../../api/categoryApi";

const placeholderImage = "src/assets/img/Illustration80.1.jpg";

function StoreContainer() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);

  const sortMenuItems = [
    { key: "newest", label: "Mới nhất" },
    { key: "oldest", label: "Cũ nhất" },
    { key: "a-z", label: "A-Z" },
    { key: "z-a", label: "Z-A" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch (err) {
        console.error("Fetch categories failed", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProductsPagedApi({
          page: page - 1,
          size: pageSize,
          sort,
          category: selectedCategory,
        });

        setProducts(res.data.content);
        setTotal(res.data.totalElements);
      } catch (err) {
        console.error("Fetch products failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, selectedCategory]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <motion.section
        className="relative h-150 bg-gradient-to-r from-[#d9eafd] to-[#cbdceb] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}>
        <div className="absolute inset-0">
          <img
            src="src/assets/img/Illustration251.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CATEGORY OVERLAY (DYNAMIC) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-2">
          <motion.div
            className="flex gap-4 overflow-x-auto no-scrollbar justify-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setPage(1);
                }}
                className="
              group relative w-48 h-28 rounded-2xl overflow-hidden shadow-sm
              hover:shadow-2xl transition-all duration-300 flex-shrink-0
              cursor-pointer
            "
                variants={staggerItem}>
                <img
                  src={placeholderImage}
                  alt={cat.name}
                  className="
                w-full h-full object-cover
                transition-transform duration-500
                group-hover:scale-110
              "
                />

                <div
                  className={`
                absolute inset-0 transition-opacity duration-300
                ${
                  selectedCategory === cat.name
                    ? "bg-black/0"
                    : "bg-black/30 group-hover:bg-black/0"
                }
              `}
                />

                <div className="absolute bottom-0 left-0 w-full p-3 z-10">
                  <h3 className="font-semibold text-white text-left">
                    {cat.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-36 py-6">
        {/* SORT */}
        <motion.div
          className="flex justify-end mb-6"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <span className="text-[#133e87] font-semibold">
            Sắp xếp theo:&nbsp;
          </span>
          <Dropdown
            menu={{
              items: sortMenuItems,
              onClick: ({ key }) => {
                setSort(key);
                setPage(1);
              },
            }}>
            <span className="cursor-pointer text-[#133e87] font-semibold flex items-center gap-1 hover:text-[#608bc1]">
              {sortMenuItems.find((i) => i.key === sort)?.label}
              <DownOutlined className="text-[#608bc1]" />
            </span>
          </Dropdown>

          {selectedCategory && (
            <span
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
              }}
              className="ml-4 cursor-pointer text-sm text-[#608bc1] hover:underline">
              Bỏ lọc
            </span>
          )}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                whileHover={{ y: -5 }}>
                <Card
                  bodyStyle={{ padding: "8px" }}
                  cover={
                    <div className="relative">
                      <img
                        src={placeholderImage}
                        alt={product.name}
                        className="w-full h-70 object-cover"
                      />
                      <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center">
                        <ShoppingCartOutlined className="text-white" />
                      </button>
                    </div>
                  }
                  onClick={() => navigate(`/detail/${product.id}`)}>
                  <h4 className="text-sm font-medium text-[#133e87] line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-bold text-[#133e87]">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex text-xs">
                      <StarFilled className="text-yellow-400" />
                      <StarFilled className="text-yellow-400" />
                      <StarFilled className="text-yellow-400" />
                      <StarFilled className="text-yellow-400" />
                      <StarOutlined className="text-[#d1d1d1]" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center mt-10">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default StoreContainer;