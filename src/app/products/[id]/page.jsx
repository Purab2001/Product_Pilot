"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (product && product.image) {
      setThumbnail(product.image);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      // Debug: Log the product ID being fetched
      console.log("Fetching product with ID:", params.id);

      const response = await fetch(`/api/products/${params.id}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);

        if (response.status === 404) {
          setError("Product not found");
        } else if (response.status === 400) {
          setError("Invalid product ID");
        } else {
          setError(errorData.error || "Failed to load product");
        }
        return;
      }

      const data = await response.json();
      console.log("Fetched product:", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="alert alert-error max-w-md">
            <span>{error}</span>
          </div>
          <Link href="/products" className="btn btn-primary mt-4">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link href="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Create an images array - since we only have one image, we'll use it for the gallery
  const images = [product.image || "/placeholder-product.jpg"];

  // Generate a rating (since we don't have ratings in our schema, we'll use a default)
  const rating = 4;

  // Calculate offer price (20% discount for demo)
  const offerPrice = Math.round(product.price * 0.8);

  return (
    <div className="bg-base-200">
      <div className="max-w-7xl container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <p className="text-sm text-base-content/70 mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /
          <Link href="/products" className="hover:text-primary">
            {" "}
            Products
          </Link>{" "}
          /<span> {product.category}</span> /
          <span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          {/* Image Gallery */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-base-300 rounded overflow-hidden cursor-pointer hover:border-primary transition-colors"
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="border border-base-300 max-w-96 rounded overflow-hidden">
              <Image
                src={thumbnail || images[0]}
                alt="Selected product"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium text-base-content">
              {product.name}
            </h1>

            {/* Brand */}
            <p className="text-base-content/70 mt-1">by {product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-0.5 mt-3">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  rating > i ? (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                        fill="#2f27ce"
                      />
                    </svg>
                  ) : (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                        fill="#2f27ce"
                        fillOpacity="0.35"
                      />
                    </svg>
                  )
                )}
              <p className="text-base ml-2 text-base-content/70">({rating})</p>
            </div>

            {/* Pricing */}
            <div className="mt-6">
              <p className="text-base-content/50 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium text-base-content">
                MRP: ${offerPrice}
              </p>
              <span className="text-base-content/60 text-sm">
                (inclusive of all taxes)
              </span>
            </div>

            {/* Product Info */}
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-base-content/60">Category:</span>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <span className="text-base-content/60">Weight:</span>
                  <p className="font-medium">{product.weight} kg</p>
                </div>
              </div>
            </div>

            {/* About Product */}
            <p className="text-base font-medium mt-6 text-base-content">
              About Product
            </p>
            <div className="text-base-content/70 mt-2">
              <p>{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center mt-10 gap-4 text-base">
              <button className="btn btn-outline btn-lg">Add to Cart</button>
              <button className="btn btn-primary btn-lg">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
