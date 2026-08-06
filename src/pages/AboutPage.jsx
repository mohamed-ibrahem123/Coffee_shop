import { Link } from "react-router-dom";
import { Coffee, Leaf, Award, Users } from "lucide-react";
import "./AboutPage.css";

const stats = [
  { icon: Coffee, number: "١٥+", label: "سنة خبرة" },
  { icon: Users, number: "٥٠ك+", label: "عميل سعيد" },
  { icon: Award, number: "٣٠+", label: "نوع مشروب" },
  { icon: Leaf, number: "١٠٠٪", label: "بن طبيعي" },
];

const values = [
  {
    title: "جودة بلا حدود",
    desc: "بنختار أفضل حبوب البن من مزارع مختارة بعناية حوالين العالم، ونحمصها بنفسنا عشان نضمن كل كوباية.",
  },
  {
    title: "شغف حقيقي",
    desc: "كل فرد في فريقنا بيحب القهوة قبل ما يشتغل بيها. الشغف ده بتحسه في كل تفصيلة من التحضير للتقديم.",
  },
  {
    title: "استدامة",
    desc: "بنتعامل مع مزارعين بيعملوا بطرق مستدامة، وبنستخدم عبوات صديقة للبيئة في كل منتجاتنا.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-badge">حكايتنا</span>
          <h1 className="about-hero-title">
            من حبة بن صغيرة،<br />لكوباية بتحكي قصة
          </h1>
          <p className="about-hero-subtitle">
            مش بنبيع قهوة بس، بنقدم تجربة بتبدأ من المزرعة ولحد ما توصلك في كوبايتك
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700"
            alt="Coffee Shop"
          />
        </div>
        <div className="about-story-text">
          <span className="about-section-label">البداية</span>
          <h2>بدأنا بحلم بسيط</h2>
          <p>
            في سنة ٢٠١١، بدأنا كوفي شوب صغير في ركن هادي، بحلم واحد بس: نقدم قهوة
            حقيقية بطعم أصيل، من غير مبالغة أو حاجات صناعية.
          </p>
          <p>
            مع مرور السنين، كبرنا وتوسعنا، بس فضلنا محافظين على نفس القيمة اللي
            بدأنا بيها — كل كوباية لازم تكون مثالية، مهما كلفنا الوقت والمجهود.
          </p>
          <p>
            دلوقتي بقينا وجهة يومية لآلاف العملاء، وده شرف بنحافظ عليه كل يوم.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div className="about-stat-card" key={i}>
              <div className="about-stat-icon">
                <Icon size={26} />
              </div>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-header">
          <span className="about-section-label">قيمنا</span>
          <h2>ليه تختارنا</h2>
        </div>
        <div className="about-values-grid">
          {values.map((value, i) => (
            <div className="about-value-card" key={i}>
              <div className="about-value-number">{`0${i + 1}`}</div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>جاهز تجرب الفرق؟</h2>
        <p>تصفح قائمة مشروباتنا وابدأ رحلتك معانا دلوقتي</p>
        <Link to="/products" className="about-cta-btn">
          تصفح المنتجات
        </Link>
      </section>
    </div>
  );
}