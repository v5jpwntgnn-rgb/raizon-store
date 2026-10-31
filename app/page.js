"use client";

import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Discord Nitro", category: "اشتراكات", price: 25, icon: "💎" },
  { id: 2, name: "Discord Boost", category: "تعزيز السيرفرات", price: 10, icon: "🚀" },
  { id: 3, name: "أدوات ديسكورد", category: "أدوات", price: 15, icon: "🛠️" },
  { id: 4, name: "اشتراكات رقمية", category: "اشتراكات", price: 30, icon: "⚡" },
];

export default function Home() {
  const [admin, setAdmin] = useState(false);
  const [tab, setTab] = useState("overview");
  const [products] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  function createOrder(product) {
    const number = "RZ-" + Math.floor(10000 + Math.random() * 90000);
    const order = {
      id: number,
      product: product.name,
      price: product.price,
      status: "قيد التنفيذ",
      date: new Date().toLocaleDateString("ar-SA"),
      employee: "لم يتم الاستلام",
    };
    setOrders([order, ...orders]);
    setSelected(order);
  }

  function updateOrder(id, status) {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status } : o
    ));
    setSelected(null);
    setNotice("تم تحديث حالة الطلب");
  }

  function adminLogin() {
    if (password === "CHANGE-ME-123") {
      setAdmin(true);
      setLogin(false);
      setPassword("");
    } else {
      setNotice("كلمة المرور غير صحيحة");
    }
  }

  return (
    <main>
      <header className="topbar">
        <a href="#" className="brand">RAIZON <span>STORE</span></a>
        <nav>
          <a href="#home">الرئيسية</a>
          <a href="#products">المنتجات</a>
          <a href="#about">من نحن</a>
        </nav>
        <a className="discord" href="https://discord.gg/dpzagUQCc7" target="_blank">
          الدعم الفني ↗
        </a>
      </header>

      {!admin ? (
        <>
          <section className="hero" id="home">
            <div className="heroText">
              <span className="eyebrow">WELCOME TO RAIZON STORE</span>
              <h1>ارتقِ بتجربتك<br /><span>الرقمية معنا.</span></h1>
              <p>وجهتك للخدمات والمنتجات الرقمية، بتجربة سهلة وخدمة تهتم بتفاصيلك.</p>
              <a href="#products" className="primary">اكتشف المنتجات ←</a>
            </div>
            <div className="heroMark">R<span>.</span></div>
          </section>

          <section className="features">
            <div>⚡ <b>سرعة الخدمة</b><small>متابعة طلبك باستمرار</small></div>
            <div>🛡️ <b>دعم العملاء</b><small>فريق جاهز لمساعدتك</small></div>
            <div>💎 <b>منتجات رقمية</b><small>خيارات متنوعة</small></div>
          </section>

          <section className="productsSection" id="products">
            <div className="sectionHead">
              <span>OUR PRODUCTS</span>
              <h2>اكتشف منتجاتنا</h2>
              <p>اختر المنتج المناسب لك وابدأ طلبك.</p>
            </div>
            <div className="productGrid">
              {products.map(p => (
                <article className="productCard" key={p.id}>
                  <div className="productIcon">{p.icon}</div>
                  <span className="category">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p>خدمة رقمية متوفرة عبر متجر Raizon.</p>
                  <div className="productBottom">
                    <strong>{p.price} ر.س</strong>
                    <button onClick={() => createOrder(p)}>اطلب الآن ←</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {selected && (
            <div className="overlay">
              <div className="modal">
                <button className="close" onClick={() => setSelected(null)}>×</button>
                <div className="successIcon">✓</div>
                <h2>تم إنشاء طلبك</h2>
                <p>رقم الطلب الخاص بك:</p>
                <strong className="orderNumber">{selected.id}</strong>
                <span className="status pending">قيد التنفيذ</span>
                <p>انسخ رقم الطلب وأرسله للإدارة في تذكرة ديسكورد.</p>
                <button onClick={() => navigator.clipboard?.writeText(selected.id)}>
                  نسخ رقم الطلب
                </button>
                <a className="primary" href="https://discord.gg/dpzagUQCc7" target="_blank">
                  الانتقال إلى ديسكورد
                </a>
              </div>
            </div>
          )}

          <section className="about" id="about">
            <span>ABOUT RAIZON</span>
            <h2>تجربة رقمية مختلفة</h2>
            <p>نعمل على توفير تجربة منظمة لعملائنا من لحظة الطلب حتى اكتمال الخدمة.</p>
          </section>

          <footer>
            <div className="brand">RAIZON <span>STORE</span></div>
            <p>جميع الحقوق محفوظة © Raizon Store</p>
            <a href="https://discord.gg/dpzagUQCc7" target="_blank">Discord ↗</a>
            <button className="adminLink" onClick={() => setLogin(true)}>دخول الإدارة</button>
          </footer>
        </>
      ) : (
        <section className="dashboard">
          <aside className="sidebar">
            <div className="brand">RAIZON <span>ADMIN</span></div>
            <p>لوحة التحكم</p>
            {[
              ["overview", "نظرة عامة"],
              ["orders", "الطلبات"],
              ["products", "المنتجات"],
              ["staff", "الموظفون والصلاحيات"],
              ["settings", "الإعدادات"],
            ].map(([id, label]) => (
              <button className={tab === id ? "active" : ""} key={id}
                onClick={() => setTab(id)}>{label}</button>
            ))}
            <button onClick={() => setAdmin(false)}>العودة للمتجر ↗</button>
          </aside>

          <div className="adminContent">
            <div className="adminHeader">
              <div><span>RAIZON STORE</span><h1>لوحة الإدارة</h1></div>
              <span className="adminBadge">المالك</span>
            </div>

            {tab === "overview" && <>
              <h2>نظرة عامة</h2>
              <div className="stats">
                <div><small>إجمالي الطلبات</small><b>{orders.length}</b></div>
                <div><small>قيد التنفيذ</small><b>{orders.filter(o => o.status === "قيد التنفيذ").length}</b></div>
                <div><small>تم التنفيذ</small><b>{orders.filter(o => o.status === "تم التنفيذ").length}</b></div>
                <div><small>المنتجات</small><b>{products.length}</b></div>
              </div>
              <h2>أحدث الطلبات</h2>
              <Orders orders={orders} updateOrder={updateOrder} />
            </>}

            {tab === "orders" && <>
              <h2>إدارة الطلبات</h2>
              <Orders orders={orders} updateOrder={updateOrder} />
            </>}

            {tab === "products" && <>
              <h2>المنتجات</h2>
              <p>المنتجات الحالية في واجهة المتجر:</p>
              {products.map(p => <div className="adminRow" key={p.id}>{p.icon} {p.name} — {p.price} ر.س</div>)}
            </>}

            {tab === "staff" && <>
              <h2>الموظفون والصلاحيات</h2>
              <p>إدارة حسابات الموظفين وإسناد صلاحيات الطلبات ستكون متاحة بعد ربط نظام المستخدمين.</p>
            </>}

            {tab === "settings" && <>
              <h2>إعدادات المتجر</h2>
              <p>إعدادات الدفع والدومين وربط ديسكورد تحتاج إلى إكمال الربط الخلفي.</p>
            </>}
          </div>
        </section>
      )}

      {login && (
        <div className="overlay">
          <div className="modal">
            <button className="close" onClick={() => setLogin(false)}>×</button>
            <h2>دخول الإدارة</h2>
            <p>أدخل كلمة المرور للمتابعة</p>
            <input type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="كلمة المرور" />
            <button onClick={adminLogin}>دخول</button>
          </div>
        </div>
      )}

      {notice && <button className="notice" onClick={() => setNotice("")}>{notice} ×</button>}
    </main>
  );
}

function Orders({ orders, updateOrder }) {
  if (!orders.length) return <p className="empty">لا توجد طلبات حتى الآن.</p>;

  return (
    <div className="tableWrap">
      <table>
        <thead><tr><th>رقم الطلب</th><th>المنتج</th><th>السعر</th><th>الحالة</th><th>الإجراء</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.product}</td><td>{o.price} ر.س</td>
              <td>{o.status}</td>
              <td>
                {o.status !== "تم التنفيذ" &&
                  <button onClick={() => updateOrder(o.id, "تم التنفيذ")}>تم التنفيذ</button>}
                <button onClick={() => updateOrder(o.id, "ملغي")}>إلغاء</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}