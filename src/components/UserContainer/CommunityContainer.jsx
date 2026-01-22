import { Card, Spin, message } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { postApi } from "../../api/postApi";

const API_HOST = "http://localhost:8080";

const toCoverSrc = (post) => {
  const path = post?.coverImage || post?.cover_image;
  if (!path) return "src/assets/img/Illustration153.jpg";
  return path.startsWith("http") ? path : `${API_HOST}${path}`;
};

function CommunityContainer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await postApi.list({ page: 0, size: 60 });
      const content = res.data?.content || [];
      content.sort((a, b) => {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        if (db !== da) return db - da;
        return (b.id || 0) - (a.id || 0);
      });
      setPosts(content);
    } catch (e) {
      message.error(e?.response?.data?.message || t("community.load_failed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { featured, allPosts, otherPosts } = useMemo(() => {
    return {
      featured: posts.slice(0, 3),
      allPosts: posts.slice(3, 9),
      otherPosts: posts.slice(9, 15),
    };
  }, [posts]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/img/Illustration311.jpg')" }}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      <main className="relative z-10 max-w-[90%] md:max-w-5xl mx-auto px-4 py-6 sm:py-10 lg:py-12">
        <Card className="bg-gray-300/70 backdrop-blur-md border-none rounded-3xl p-4 sm:p-6 lg:p-10 shadow-lg">
          {/* HERO */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}>
            <motion.h1
              className="text-[#133e87] text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              {t("community.title")}
            </motion.h1>

            <motion.p
              className="text-[#608bc1] text-base sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}>
              {t("community.subtitle")}
            </motion.p>
          </motion.div>

          {loading && (
            <div className="flex justify-center py-6">
              <Spin />
            </div>
          )}

          {/* FEATURED */}
          <motion.section
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}>
            <motion.h2
              className="text-[#133e87] text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              {t("community.featured")}
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } },
              }}>
              {featured.map((p) => (
                <CardItem
                  key={p.id}
                  item={{ src: toCoverSrc(p), title: p.title }}
                  onClick={() => navigate(`/detail-community/${p.id}`)}
                />
              ))}
              {!loading && featured.length === 0 && (
                <div className="text-[#608bc1]">
                  {t("community.empty_posts")}
                </div>
              )}
            </motion.div>
          </motion.section>

          {/* ALL POSTS */}
          <ArticleSection
            title={t("community.all_posts")}
            items={allPosts.map((p) => ({
              id: p.id,
              src: toCoverSrc(p),
              title: p.title,
            }))}
            onItemClick={(id) => navigate(`/detail-community/${id}`)}
          />

          {/* OTHER POSTS */}
          <ArticleSection
            title={t("community.other_posts")}
            items={otherPosts.map((p) => ({
              id: p.id,
              src: toCoverSrc(p),
              title: p.title,
            }))}
            onItemClick={(id) => navigate(`/detail-community/${id}`)}
          />
        </Card>
      </main>
    </div>
  );
}

function CardItem({ item, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      }`}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <div className="relative">
        <img
          src={item.src || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-48 sm:h-56 lg:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 z-10">
        <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

function ArticleSection({ title, items, onItemClick }) {
  const { t } = useTranslation();

  return (
    <motion.section
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}>
      <motion.h2
        className="text-[#133e87] text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}>
        {title}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}>
        {items.map((item, idx) => (
          <CardItem
            key={item.id ?? idx}
            item={item}
            onClick={item.id ? () => onItemClick?.(item.id) : undefined}
          />
        ))}
        {items.length === 0 && (
          <div className="text-[#608bc1]">Chưa có bài viết.</div>
        )}
      </motion.div>

      <motion.div
        className="text-center mt-6 sm:mt-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}>
        <motion.button
          className="border border-[#CCCCCC] text-[#133e87] bg-white hover:bg-[#133e87] hover:text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => {}}>
          {t("nav.more")} →
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

export default CommunityContainer;