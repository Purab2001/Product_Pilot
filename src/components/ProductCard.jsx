import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 shadow">
      <figure>
        <Image
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          width={300}
          height={200}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm opacity-70">
          {product.description.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <Link
            href={`/products/${product._id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
