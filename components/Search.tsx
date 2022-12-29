import { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "./context/ContextProvider";

export function useOutsideHook(
  ref: any,
  setOpen: (value: boolean) => void,
  open: boolean,
  resetFunction: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.classList.contains("blog")
      ) {
        setOpen(false);
        if (!open) {
          // setTimeout(() => resetFunction(), 300);
          resetFunction();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function Search() {
  const { useStore } = useGlobalContext();
  const [searchInput, setStore] = useStore((store) => store.searchInput);
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="font-bold text-xl my-4 underline underline-offset-8 tracking-wider decoration-zinc-400 dark:decoration-zinc-700 decoration-4">
          {searchInput === "" ? "Blog Posts" : "Results"}
        </h1>
      </div>
      <div
        ref={divRef}
        className="cursor-pointer flex justify-center items-center relative"
      >
        <input
          type="text"
          ref={inputRef}
          value={searchInput}
          onChange={(event) => setStore({ searchInput: event.target.value })}
          className={`absolute ${
            open ? "sm:w-80 w-60 opacity-100" : "w-0 opacity-0"
          } dark:bg-zinc-800 bg-gray-300 right-0 px-4 py-2 outline-none rounded-full transition-all duration-300 ease-out`}
        />
        <BiSearch
          role={"button"}
          onClick={btnClick}
          className="text-2xl z-10 mr-3"
        />
      </div>
    </div>
  );
}
