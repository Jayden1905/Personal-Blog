import Link from "next/link";
import { getCurrentYear } from "../services/util";

const currYear = getCurrentYear();

export default function Footer() {
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
