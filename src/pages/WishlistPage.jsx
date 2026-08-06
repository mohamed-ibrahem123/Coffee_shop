import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/products/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  return (
    <div className="wishlist-page-container" style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}>
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (

        <div style={{ textAlign: "center", marginTop: "60px", color: "#6b7280" }}>
          <Heart size={64} style={{ margin: "0 auto 16px", color: "#9ca3af" }} />
          <p style={{ fontSize: "18px", marginBottom: "16px" }}>Your wishlist is currently empty.</p>
          <Link
            to="/products"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#45271b",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Explore Products
          </Link>
        </div>
      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px"
          }}
        >
          {wishlist.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}