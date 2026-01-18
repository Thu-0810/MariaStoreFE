import { motion } from "framer-motion";

export default function CategoryButtons({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <motion.div
      className="px-6 py-8"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-2xl text-lg font-semibold shadow-md transition-all ${
              selectedCategory === cat.name
                ? "bg-[#133e87] text-white"
                : "bg-white/80 text-[#133e87] hover:bg-[#e8f1ff]"
            }`}>
            {cat.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}