import { useTheme } from "next-themes";
import { FiSun } from "react-icons/fi";
import { RiMoonFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ThemeToggleButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          className="rounded-md p-3 font-extrabold text-lg bg-orange-200 hover:bg-orange-300 text-black transition-all duration-200 ease-out"
          onClick={() => setTheme("light")}
        >
          <FiSun className="w-4 h-4" role="button" />
        </button>
      );
    } else {
      return (
        <button
          className="rounded-md p-3 font-extrabold text-lg bg-violet-600 hover:bg-violet-700 text-white transition-all duration-200 ease-out"
          onClick={() => setTheme("dark")}
        >
          <RiMoonFill className="w-4 h-4" role="button" />
        </button>
      );
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderThemeChanger()}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;
