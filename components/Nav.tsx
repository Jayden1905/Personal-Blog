import Link from "next/link";
import Logo from "./Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import { useRouter } from "next/router";
import DropdownMenu from "./DropdownMenu";

export default function Nav() {
  const router = useRouter();
  const pathname = router.pathname;

  const activeLink = (href: string, currentPath: string) => {
    return currentPath === href ? true : false;
  };

  return (
    <div className="backdrop-blur-md fixed w-full z-20 py-4 top-0 px-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center gap-8">
          <Logo />
          <Link
            href={"/about"}
            className={`sm:inline-block hidden hover:underline underline-offset-4 p-2 ${
              activeLink("/about", pathname) ? "bg-glassTeal text-black" : ""
            }`}
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className={`sm:inline-block hidden hover:underline underline-offset-4 p-2 ${
              activeLink("/contact", pathname) ? "bg-glassTeal text-black" : ""
            }`}
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-4">
          <ThemeToggleButton />
          <div className="sm:hidden block">
            <DropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
