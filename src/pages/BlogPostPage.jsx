import { useParams, Link } from "react-router-dom";
import "./BlogPostPage.css";

const blogPosts = {
  1: {
    title: "The Best Way to Brew Coffee at Home",
    category: "Brewing Tips",
    date: "August 1, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
    author: "Coffee Shop Team",
    content: [
      "Making a cup of coffee like a professional cafe doesn't require expensive equipment, it just requires knowing the right basics.",
      "First: bean quality. Choose fresh beans that were recently roasted, and grinding them right before brewing is far better than pre-ground coffee.",
      "Second: coffee-to-water ratio. The ideal ratio is usually 1:16 (15 grams of coffee per 240ml of water).",
      "Third: water temperature. It should be between 90-96°C, not fully boiling so it doesn't burn the beans.",
      "And finally: time. Let it brew for 3 to 4 minutes depending on the method you're using (French press, V60, or others).",
    ],
  },
  2: {
    title: "Espresso vs. Latte vs. Cappuccino: What's the Difference?",
    category: "Coffee 101",
    date: "July 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200",
    author: "Coffee Shop Team",
    content: [
      "Espresso is the base that every other drink is built on — a concentrated coffee shot made by pushing hot water through finely ground coffee under pressure.",
      "A latte = one shot of espresso + a large amount of steamed milk + a thin layer of foam on top. Its taste is smooth and light.",
      "A cappuccino = the same ingredients as a latte but in different ratios — one third espresso, one third steamed milk, and one third thick foam. Its taste is stronger and richer.",
      "So if you like a bold coffee flavor, go for a cappuccino. If you prefer something smooth and light, a latte will suit you better.",
    ],
  },
  3: {
    title: "The Journey of a Coffee Bean, From Farm to Cup",
    category: "Origins",
    date: "July 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200",
    author: "Coffee Shop Team",
    content: [
      "The journey of a coffee bean begins on high-altitude farms in countries like Ethiopia, Brazil, and Colombia.",
      "After harvesting, the beans are hulled and dried, then sorted by quality and size.",
      "The most important stage is roasting — this is what determines the final flavor, from light and acidic to dark and bold.",
      "Finally, it's ground and reaches your cup, after a long journey covering thousands of kilometers and precise steps before it gets to you.",
    ],
  },
  4: {
    title: "The Health Benefits of Green Tea",
    category: "Health",
    date: "July 15, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=1200",
    author: "Coffee Shop Team",
    content: [
      "Green tea is rich in antioxidants that help the body fight inflammation and oxidative stress.",
      "It contains a moderate amount of caffeine, giving you energy without the jitters that sometimes come with coffee.",
      "Many studies link regular green tea consumption with improved focus and better heart health.",
      "Try drinking it without sugar to enjoy its natural flavor and get the most benefit out of it.",
    ],
  },
};

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="blog-post-notfound">
        <h1>Post Not Found</h1>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="blog-post-page">
      <div className="blog-post-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="blog-post-hero-overlay">
          <Link to="/blog" className="blog-post-back">← Back to Blog</Link>
          <span className="blog-post-category">{post.category}</span>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span>{post.author}</span>
            <span className="blog-post-dot">•</span>
            <span>{post.date}</span>
            <span className="blog-post-dot">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="blog-post-body">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <div className="blog-post-footer">
          <Link to="/blog" className="blog-post-cta">Browse More Articles</Link>
        </div>
      </div>
    </article>
  );
}