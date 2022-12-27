import { Menu } from "@headlessui/react";
import Link from "next/link";
import React, { ReactNode } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  href: string;
  children: ReactNode;
};

export default function DropdownMenuItem({ href, children }: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={classNames(
            active ? "bg-zinc-200 dark:bg-zinc-700" : "",
            "block px-4 py-2 text-sm"
          )}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
}
