/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("caffinity_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "caffinity_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const getProductId = (item) => item?._id || item?.id;

  const toggleWishlist = (product) => {
    if (!product) return;
    const prodId = getProductId(product);

    setWishlist((prev) => {
      const exists = prev.some((item) => getProductId(item) === prodId);
      if (exists) {
        return prev.filter((item) => getProductId(item) !== prodId);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some((item) => getProductId(item) === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);