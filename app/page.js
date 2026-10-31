"use client";

import { useState } from "react";

const products = [
  { name: "Discord Nitro", description: "اشتراكات نيترو", icon: "💎", price: "يبدأ من 10 ر.س" },
  { name: "Discord Boost", description: "تعزيز السيرفرات", icon: "🚀", price: "يبدأ من 5 ر.س" },
  { name: "أدوات ديسكورد", description: "أدوات وخدمات متنوعة", icon: "🛠️", price: "تواصل معنا" },
  { name: "اشتراكات رقمية", description: "خدمات واشتراكات", icon: "⚡", price: "تواصل معنا" },
];

export default function Home() {
  const [menu, setMenu] = useState(false);

  return (
    <main>
      <header className="header">
        <a className="logo" href="#">RAIZON<span> STORE</span></a>
        <button className="menuBtn" onClick={() => setMenu(!menu)}>☰</button>
        <nav className={menu ? "nav open" : "nav"}>
          <a href="#">الرئيسية</a>
          <a href="#products">المنتجات</a>
          <a href="#about">من نحن</a>
          <a href="https://discord.gg/dpzagUQCc7" target="_blank">الدعم الفني</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroContent">
          <span className="tag">RAIZON STORE</span>
          <h1>كل احتياجاتك الرقمية <span>في مكان واحد</span></h1>
          <p>اكتشف عالم الخدمات والمنتجات الرقمية بأسعار مناسبة وتجربة سهلة.</p>
          <a className="mainBtn" href="#products">تصفح المنتجات ←</a>
        </div>
        <div className="heroIcon">R<span>.</span></div>
      </section>

      <section className="products" id="products">
        <div className="sectionTitle">
          <span>متجرنا</span>
          <h2>أقسام المتجر</h2>
          <p>اختر القسم الذي يناسب احتياجك</p>
        </div>

        <div className="productGrid">
          {products.map((product, index) => (
            <article className="productCard" key={index}>
              <div className="productIcon">{product.icon}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">{product.price}</span>
              <a href="https://discord.gg/dpzagUQCc7" target="_blank">
                الاستفسار عن المنتج ←
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <h2>ليش تختار Raizon Store؟</h2>
        <p>نسعى لتقديم تجربة رقمية سهلة ومنظمة، مع توفير الدعم والمساعدة لعملائنا.</p>
      </section>

      <footer>
        <div className="logo">RAIZON<span> STORE</span></div>
        <p>جميع الحقوق محفوظة © Raizon Store 2026</p>
        <a href="https://discord.gg/dpzagUQCc7" target="_blank">انضم إلى مجتمعنا في Discord</a>
      </footer>
    </main>
  );
}