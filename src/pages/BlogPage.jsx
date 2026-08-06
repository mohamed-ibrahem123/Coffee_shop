import { Link } from "react-router-dom";
import "./BlogPage.css";

const blogPosts = [
  {
    id: 1,
    title: "أفضل طريقة لتحضير القهوة في البيت",
    excerpt: "تعرف على الخطوات الصح لعمل كوب قهوة مثالي زي الكافيهات المحترفة من غير ما تخرج من بيتك.",
    category: "Brewing Tips",
    date: "١ أغسطس ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    readTime: "٥ دقايق",
  },
  {
    id: 2,
    title: "الفرق بين الإسبريسو واللاتيه والكابتشينو",
    excerpt: "مش عارف تفرق بينهم؟ هنشرحلك الفرق في المكونات والطعم والطريقة بشكل بسيط.",
    category: "Coffee 101",
    date: "٢٨ يوليو ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
    readTime: "٤ دقايق",
  },
  {
    id: 3,
    title: "رحلة حبة القهوة من المزرعة للكوباية",
    excerpt: "قصة مشوقة عن إزاي حبة القهوة بتتحصد وبتتحمص لحد ما توصلك في كوبايتك الصبح.",
    category: "Origins",
    date: "٢٠ يوليو ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600",
    readTime: "٦ دقايق",
  },
  {
    id: 4,
    title: "فوائد الشاي الأخضر للصحة",
    excerpt: "اكتشف ليه الشاي الأخضر بقى مشروب أساسي لمحبي الصحة حوالين العالم.",
    category: "Health",
    date: "١٥ يوليو ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600",
    readTime: "٣ دقايق",
  },
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      <div className="blog-hero">
        <span className="blog-hero-badge">Our Journal</span>
        <h1 className="blog-hero-title">The Coffee Chronicles</h1>
        <p className="blog-hero-subtitle">
          حكايات، نصايح، ومعلومات عن عالم القهوة والمشروبات
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
              <span className="blog-card-link">اقرأ المزيد →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}