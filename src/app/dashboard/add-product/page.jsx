"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ArrowLeft,
  Plus,
  DollarSign,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    weight: "",
    description: "",
    image: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          brand: formData.brand,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          weight: parseFloat(formData.weight),
          image: formData.image,
        }),
      });

      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          brand: "",
          price: "",
          category: "",
          weight: "",
          description: "",
          image: "",
        });

        // Show success message (you can implement toast here)
        alert("Product added successfully!");

        // Redirect to products page
        router.push("/products");
      } else {
        const error = await response.json();
        alert(`Failed to add product: ${error.error}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-base-100">
      <div className="py-8 px-4 mx-auto max-w-7xl lg:py-16">
        {/* Header */}
        <h2 className="mb-4 text-xl font-bold text-base-content">
          Add a new product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Type product name"
                required
              />
            </div>

            {/* Brand */}
            <div className="w-full">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Product brand"
                required
              />
            </div>

            {/* Price */}
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="$2999"
                step="0.01"
                min="0"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home & Garden</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Item Weight */}
            <div>
              <label
                htmlFor="weight"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Item Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="12"
                step="0.1"
                min="0"
                required
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Image URL (optional)
              </label>
              <input
                type="url"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
              />
              <div className="label">
                <span className="label-text-alt text-base-content/60">
                  Leave empty to use default placeholder image
                </span>
              </div>
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-base-content">
                  Preview
                </label>
                <div className="w-32 h-32 bg-base-200 rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full resize-none"
                placeholder="Your description here"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-4 sm:mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary gap-2"
            >
              <Plus className="w-4 h-4" />
              {isLoading ? "Adding product..." : "Add product"}
            </button>

            <Link href="/products" className="btn btn-outline">
              Cancel
            </Link>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-info/10 rounded-lg border border-info/20">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-info rounded-full flex items-center justify-center mt-0.5">
              <span className="text-info-content text-xs">i</span>
            </div>
            <div className="text-sm text-base-content/80">
              <p className="font-medium mb-1">Tips for adding products:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use descriptive names that customers will search for</li>
                <li>Include brand information for better categorization</li>
                <li>Select the most appropriate category</li>
                <li>Provide accurate weight for shipping calculations</li>
                <li>
                  Write detailed descriptions to help customers understand the
                  product
                </li>
                <li>Use high-quality images for better conversion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
