import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" scroll={false} className="font-bold text-2xl">
      Oddinary's Blog
    </Link>
  );
};

export default Logo;
