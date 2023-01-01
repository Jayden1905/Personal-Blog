import Link from "next/link";
import { getCurrentYear } from "../services/util";

export default function Footer() {
  const currYear = getCurrentYear();
  return (
    <div className="w-full h-full">
      <footer className="text-zinc-500 p-4 text-center mx-auto">
        &copy; {currYear}
        <Link href={"https://www.oddinary.tech/"} target="_blank">
          Oddinary
        </Link>
        . All rights reserved.
      </footer>
    </div>
  );
}
