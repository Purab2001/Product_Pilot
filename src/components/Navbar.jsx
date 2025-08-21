"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { User } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="navbar bg-base-100 px-4 max-w-7xl mx-auto">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            {session && (
              <li>
                <Link href="/dashboard/add-product">Add Product</Link>
              </li>
            )}
          </ul>
        </div>
        <Link href="/" className="font-bold text-xl">
          ProductPilot
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          {session && (
            <li>
              <Link href="/dashboard/add-product">Add Product</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <div className="mr-2">
          <ThemeToggle />
        </div>
        {status === "loading" ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-7 h-7 text-base-content" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="justify-between">{session.user?.name}</span>
              </li>
              <li>
                <Link href="/dashboard/add-product">Add Product</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
