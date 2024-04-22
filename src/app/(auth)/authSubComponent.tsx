"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink() {
  const pathname = usePathname();
  const path = pathname.includes("login") ? "/signup" : "/login";
  return (
    <div className="font-semibold ">
      <Link href={path}>
        {pathname.includes("login") ? "Create an Account" : "Log in"}
      </Link>
    </div>
  );
}

export const AuthTitle = () => {
  const pathname = usePathname();

  const title = !pathname.includes("login") ? "Welcome to Chat room" : "Log in";
  return (
    <div className="">
      <h1 className="text-2xl font-medium mb-5">{title} </h1>
    </div>
  );  
};
