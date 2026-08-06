import { useParams, Link } from "react-router-dom";
import "./BlogPostPage.css";

const blogPosts = {
  1: {
    title: "أفضل طريقة لتحضير القهوة في البيت",
    category: "Brewing Tips",
    date: "١ أغسطس ٢٠٢٦",
    readTime: "٥ دقايق",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
    author: "Coffee Shop Team",
    content: [
      "عمل كوباية قهوة زي الكافيهات المحترفة مش محتاج معدات غالية، محتاج بس تعرف الأساسيات الصح.",
      "أول حاجة: نوعية البن. اختار حبوب طازة اتحمصت من مدة قريبة، وطحنها لحظة التحضير أفضل بكتير من البن المطحون الجاهز.",
      "ثاني حاجة: نسبة القهوة للمية. النسبة المثالية عادة بتكون 1:16 (يعني 15 جرام بن لكل 240 مل مية).",
      "ثالث حاجة: درجة حرارة المية. المفروض تكون بين 90-96 درجة مئوية، مش مغلية تماماً عشان متحرقش البن.",
      "وأخيراً: الوقت. اتركها تتخمر من 3 لـ 4 دقايق حسب طريقة التحضير اللي بتستخدمها (فرنش برس، V60، أو غيرها).",
    ],
  },
  2: {
    title: "الفرق بين الإسبريسو واللاتيه والكابتشينو",
    category: "Coffee 101",
    date: "٢٨ يوليو ٢٠٢٦",
    readTime: "٤ دقايق",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200",
    author: "Coffee Shop Team",
    content: [
      "الإسبريسو هو الأساس اللي بتتبني عليه كل المشروبات التانية — شوت قهوة مركز بيتعمل بضغط مية ساخنة على بن مطحون ناعم.",
      "اللاتيه = شوت إسبريسو + كمية كبيرة من اللبن المبخر + طبقة رغوة رقيقة فوق. طعمه ناعم وخفيف.",
      "الكابتشينو = نفس مكونات اللاتيه بس بنسب مختلفة — تلت إسبريسو، تلت لبن مبخر، وتلت رغوة كثيفة. طعمه أقوى وأغنى.",
      "يعني لو بتحب طعم القهوة واضح، اختار كابتشينو. ولو بتحب مشروب ناعم وخفيف، اللاتيه هيكون أنسب ليك.",
    ],
  },
  3: {
    title: "رحلة حبة القهوة من المزرعة للكوباية",
    category: "Origins",
    date: "٢٠ يوليو ٢٠٢٦",
    readTime: "٦ دقايق",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200",
    author: "Coffee Shop Team",
    content: [
      "رحلة حبة القهوة بتبدأ في مزارع على ارتفاعات عالية في دول زي إثيوبيا والبرازيل وكولومبيا.",
      "بعد الحصاد، الحبوب بتتقشر وتتجفف، وبعدين بتتفرز حسب الجودة والحجم.",
      "أهم مرحلة هي التحميص (Roasting) — دي اللي بتحدد طعم القهوة النهائي، من فاتح وحامضي لغامق وقوي.",
      "وأخيراً بتتطحن وتوصلك في كوبايتك، بعد رحلة طويلة عبرت آلاف الكيلومترات ومراحل دقيقة قبل ما توصلك.",
    ],
  },
  4: {
    title: "فوائد الشاي الأخضر للصحة",
    category: "Health",
    date: "١٥ يوليو ٢٠٢٦",
    readTime: "٣ دقايق",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=1200",
    author: "Coffee Shop Team",
    content: [
      "الشاي الأخضر غني بمضادات الأكسدة اللي بتساعد الجسم يقاوم الالتهابات والإجهاد التأكسدي.",
      "بيحتوي على كمية معتدلة من الكافيين، فبيدّيك طاقة من غير الترمنة اللي بتحصل مع القهوة أحياناً.",
      "دراسات كتير بتربط شرب الشاي الأخضر بانتظام بتحسين التركيز وصحة القلب.",
      "جرب تشربه من غير سكر عشان تستمتع بطعمه الطبيعي وتاخد أقصى استفادة منه.",
    ],
  },
};

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="blog-post-notfound">
        <h1>المقال مش موجود</h1>
        <Link to="/blog">← رجوع للمدونة</Link>
      </div>
    );
  }

  return (
    <article className="blog-post-page">
      <div className="blog-post-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="blog-post-hero-overlay">
          <Link to="/blog" className="blog-post-back">← رجوع للمدونة</Link>
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
          <Link to="/blog" className="blog-post-cta">تصفح مقالات أخرى</Link>
        </div>
      </div>
    </article>
  );
}