import { Link } from "react-router-dom";
import "./BlogPage.css";

const blogPosts = [
  {
    id: 1,
    title: "The Best Way to Brew Coffee at Home",
    excerpt: "Learn the right steps to make a perfect cup of coffee, just like your favorite professional cafe, without leaving your house.",
    category: "Brewing Tips",
    date: "August 1, 2026",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Espresso vs. Latte vs. Cappuccino: What's the Difference?",
    excerpt: "Can't tell them apart? We'll break down the differences in ingredients, taste, and preparation in a simple way.",
    category: "Coffee 101",
    date: "July 28, 2026",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Journey of a Coffee Bean, From Farm to Cup",
    excerpt: "A fascinating story of how coffee beans are harvested and roasted before they reach your morning cup.",
    category: "Origins",
    date: "July 20, 2026",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Health Benefits of Green Tea",
    excerpt: "Discover why green tea has become an essential drink for health-conscious people around the world.",
    category: "Health",
    date: "July 15, 2026",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      <div className="blog-hero">
        <span className="blog-hero-badge">Our Journal</span>
        <h1 className="blog-hero-title">The Coffee Chronicles</h1>
        <p className="blog-hero-subtitle">
          Stories, tips, and insights from the world of coffee and beverages
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <div className="blog-card-image-wrapper">
              <img src={post.image} alt={post.title} className="blog-card-image" />
              <span className="blog-card-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span className="blog-card-dot">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <span className="blog-card-link">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}