import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>My Wishlist</h1>
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Heart size={48} />
        <p>WishList لا تحتوي علي منتجات</p>
        <Link to="/products">تصفح المنتجات</Link>
      </div>
    </div>
  );
}