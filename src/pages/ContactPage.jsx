import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./ContactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  مؤقتاً بيطبع في الـ Console بس، لسه مفيش Backend فعلي
    console.log("Form Data:", formData);

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <span className="contact-hero-badge">تواصل معانا</span>
        <h1 className="contact-hero-title">خليك قريب مننا</h1>
        <p className="contact-hero-subtitle">
          عندك سؤال، اقتراح، أو حابب تحكيلنا عن تجربتك؟ إحنا مستنيينك
        </p>
      </section>

      <div className="contact-body">
        {/* Left: Info cards */}
        <div className="contact-info-side">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MapPin size={22} />
            </div>
            <div>
              <h4>زورنا</h4>
              <p>شارع النيل، الزمالك، القاهرة</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={22} />
            </div>
            <div>
              <h4>راسلنا</h4>
              <p>hello@coffeeshop.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Phone size={22} />
            </div>
            <div>
              <h4>اتصل بينا</h4>
              <p>+20 100 123 4567</p>
            </div>
          </div>
          <div className="contact-social">
  <h4>تابعنا</h4>
  <div className="contact-social-icons">
    {/* Instagram */}
    <a href="#" aria-label="Instagram">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </a>

    {/* Facebook */}
    <a href="#" aria-label="Facebook">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      </svg>
    </a>

    {/* Twitter / X */}
    <a href="#" aria-label="Twitter">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
  </div>
</div>

          <div className="contact-hours">
            <h4>مواعيد العمل</h4>
            <div className="contact-hours-row">
              <span>السبت - الخميس</span>
              <span>٨ ص - ١١ م</span>
            </div>
            <div className="contact-hours-row">
              <span>الجمعة</span>
              <span>١٠ ص - ١١ م</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form-side">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>ابعتلنا رسالة</h2>

            <div className="contact-form-row">
              <div className="contact-form-group">
                <label>الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="اسمك"
                  required
                />
              </div>
              <div className="contact-form-group">
                <label>الإيميل</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div className="contact-form-group">
              <label>الموضوع</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="موضوع الرسالة"
                required
              />
            </div>

            <div className="contact-form-group">
              <label>رسالتك</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              <Send size={18} />
              ابعت الرسالة
            </button>

            {submitted && (
              <p className="contact-success-msg">
                ✅ الرسالة اتبعتت! (شوف الـ Console دلوقتي)
              </p>
            )}
          </form>
        </div>
      </div>
<section className="contact-map">
  <iframe
    title="location"
    src="https://maps.google.com/maps?q=Cairo,Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="350"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</section>
    </div>
  );
}