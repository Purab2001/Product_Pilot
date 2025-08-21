"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Show loading toast
    const loadingToast = toast.loading("Signing in...");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/products",
        redirect: false,
      });

      if (result?.ok) {
        toast.dismiss(loadingToast);
        toast.success("Login successful!");
        router.push("/products");
      } else {
        toast.dismiss(loadingToast);
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/products" });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-base-100 border border-base-300 rounded-lg p-6">
        <div className="py-4 flex justify-center">
          <Link href="/">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <LogIn className="text-primary-content w-7 h-7" />
            </div>
          </Link>
        </div>

        <h1 className="mb-6 text-center text-2xl font-semibold text-base-content">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Lock className="w-4 h-4" /> Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="mb-4 text-right">
            <Link href="/forgot-password" className="link link-primary text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="divider">Or continue with</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-base-content/70">
          Don't have an account?{" "}
          <Link href="/signup" className="link link-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
