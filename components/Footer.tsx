import Link from "next/link";

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="w-full h-full">
      <footer className="text-zinc-500 p-4 text-center mx-auto">
        &copy; {year}
        <Link href={"https://www.oddinary.tech/"} target="_blank">
          Oddinary
        </Link>
        . All rights reserved.
      </footer>
    </div>
  );
}
