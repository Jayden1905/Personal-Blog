import { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BlogPost } from "../interfaces/schema";
import { useGlobalContext } from "./context/ContextProvider";
import { useOutsideHook } from "./Search";
import { capitalize } from "../pages/categories/[tag]";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

type Props = {
  posts: BlogPost[];
  slug: string;
};

export default function SearchCategories({ posts, slug }: Props) {
  const { useStore } = useGlobalContext();
  const [searchInput, setStore] = useStore((store) => store.searchInput);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, []);

  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allTags = new Set<string>();
  posts.map((post) => post.tags.map((tag) => allTags.add(tag.name)));

  const resetSearchInput = () => {
    setStore({ searchInput: "" });
  };

  useEffect(() => {
    resetSearchInput();
  }, [open]);

  useOutsideHook(divRef, setOpen, open, resetSearchInput);

  const btnClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      resetSearchInput();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-4 items-center mb-10">
      <div className="flex gap-1 justify-center items-center">
        <div
          onClick={() => router.back()}
          className="cursor-pointer underline underline-offset-4 font-normal"
        >
          Index
        </div>
        <IoIosArrowForward className="text-xl font-extralight opacity-50" />
        <span className="font-extrabold text-orange-500">
          {capitalize(slug)}
        </span>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div
          ref={divRef}
          className="cursor-pointer flex justify-center items-center relative"
        >
          <input
            type="text"
            ref={inputRef}
            value={searchInput}
            onChange={(event) => setStore({ searchInput: event.target.value })}
            className={`${
              open ? "sm:w-80 w-32 opacity-100" : "w-0 opacity-0"
            } dark:bg-zinc-800 bg-gray-300 right-0 px-4 sm:py-2 py-1 outline-none rounded-full transition-all duration-300 ease-out`}
          />
          {!open && (
            <BiSearch
              role={"button"}
              name="search"
              onClick={btnClick}
              className="absolute text-2xl z-10 transition-all duration-300 ease-out"
            />
          )}
        </div>
      </div>
    </div>
  );
}
