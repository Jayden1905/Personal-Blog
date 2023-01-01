import Link from "next/link";

export const getCurrentYear = () => {
  const today = new Date();
  return today.getFullYear();
};

export default function Footer() {
  return (
    <div className="w-full h-full">
      <footer className="text-zinc-500 p-4 text-center mx-auto">
        &copy; {getCurrentYear()}
        <Link href={"https://www.oddinary.tech/"} target="_blank">
          Oddinary
        </Link>
        . All rights reserved.
      </footer>
    </div>
  );
}
