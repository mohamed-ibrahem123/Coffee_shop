import { Link } from "react-router-dom";
import { Coffee, Leaf, Award, Users } from "lucide-react";
import "./AboutPage.css";

const stats = [
  { icon: Coffee, number: "15+", label: "Years of Experience" },
  { icon: Users, number: "50K+", label: "Happy Customers" },
  { icon: Award, number: "30+", label: "Drink Varieties" },
  { icon: Leaf, number: "100%", label: "Natural Beans" },
];

const values = [
  {
    title: "Uncompromising Quality",
    desc: "We handpick the finest coffee beans from carefully selected farms around the world, and roast them ourselves to guarantee every cup.",
  },
  {
    title: "Real Passion",
    desc: "Every member of our team loves coffee before they ever work with it. That passion shows in every detail, from preparation to presentation.",
  },
  {
    title: "Sustainability",
    desc: "We work with farmers who follow sustainable practices, and use eco-friendly packaging across all our products.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-badge">Our Story</span>
          <h1 className="about-hero-title">
            From a Single Bean,<br />To a Story in a Cup
          </h1>
          <p className="about-hero-subtitle">
            We don't just sell coffee, we deliver an experience that begins on the farm and ends in your cup
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
          <span className="about-section-label">The Beginning</span>
          <h2>We Started With a Simple Dream</h2>
          <p>
            In 2011, we opened a small coffee shop in a quiet corner, with one dream:
            to serve real coffee with an authentic taste, without exaggeration or artificial shortcuts.
          </p>
          <p>
            Over the years, we grew and expanded, but we stayed true to the same value
            we started with — every cup has to be perfect, no matter how much time and effort it takes.
          </p>
          <p>
            Today, we've become a daily destination for thousands of customers,
            and that's an honor we work to earn every single day.
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
          <span className="about-section-label">Our Values</span>
          <h2>Why Choose Us</h2>
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
        <h2>Ready to Taste the Difference?</h2>
        <p>Browse our drink menu and start your journey with us today</p>
        <Link to="/products" className="about-cta-btn">
          Browse Products
        </Link>
      </section>
    </div>
  );
}