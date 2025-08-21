import React from "react";

export default function Hero() {
  return (
    <div
      className="hero min-h-[calc(100vh-68px)]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1513116476489-7635e79feb27?q=80&w=1093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Discover & Manage Products
          </h1>
          <p className="mb-5">
            Welcome to ProductPilot! Browse our curated product collection, view
            detailed information, and manage your own products with secure
            authentication. Start exploring or sign in to add new products.
          </p>
          <a href="/products" className="btn btn-primary btn-lg">
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
}
