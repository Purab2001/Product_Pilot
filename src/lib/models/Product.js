import mongoose from "mongoose";

// Clear any existing model to avoid caching issues
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "/placeholder-product.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
