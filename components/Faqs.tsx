import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function Faqs() {
  return (
    <AnimateSharedLayout>
      <motion.ul
        layout
        initial={{ borderRadius: 25 }}
        className="h-full overflow-visible"
      >
        <Item
          title="What languages do you work with?"
          content="I have experience working with a variety of programming languages, including Javascript, Typescript and Python. I am always looking to learn and work with new technologies, so this list is always evolving."
        />
        <Item
          title="What types of projects have you completed?"
          content="I have worked on a wide range of projects. I am always looking for new challenges and opportunities to learn and grow as a developer."
        />
        <Item
          title="How can readers get in touch with you?"
          content="You can contact me through the contact form on my blog or through my social media accounts. I am always open to hearing from readers and am happy to answer any questions you may have or consider collaborating on a project."
        />
      </motion.ul>
    </AnimateSharedLayout>
  );
}

function Item({ content, title }: { content: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li
      layout
      className="mb-4 last:mb-0 p-4 cursor-pointer border-2 dark:border-zinc-800 border-gray-300"
      onClick={toggleOpen}
      initial={{ borderRadius: 10 }}
    >
      <motion.div layout className="flex justify-between items-center">
        <h1 className="text-lg font-light">{title}</h1>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </motion.div>
      <AnimatePresence>
        {isOpen && <Content content={content} />}
      </AnimatePresence>
    </motion.li>
  );
}

function Content({ content }: { content: string }) {
  return (
    <motion.div
      className="mt-4 font-extralight text-sm tracking-wide leading-6"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {content}
    </motion.div>
  );
}
