"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products and show only first 4
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          // Show only the first 4 products (most recent)
          setProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content">
              Loading featured products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-base-200">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Package className="text-primary-content w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-base-content">
              Featured Products
            </h2>
          </div>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover our most popular and newest products. Each one carefully
            selected to bring you the best quality and value.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-base-content/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">
              No products available yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Check back soon for our featured products
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* View All Products Button */}
            <div className="text-center">
              <Link href="/products" className="btn btn-primary btn-lg gap-2">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
