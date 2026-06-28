import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const revenueData = [
  { day: "Jun 1", revenue: 4200 }, { day: "Jun 3", revenue: 5800 },
  { day: "Jun 5", revenue: 4900 }, { day: "Jun 7", revenue: 7200 },
  { day: "Jun 9", revenue: 6100 }, { day: "Jun 11", revenue: 8900 },
  { day: "Jun 13", revenue: 7600 }, { day: "Jun 15", revenue: 9400 },
  { day: "Jun 17", revenue: 8200 }, { day: "Jun 19", revenue: 11200 },
  { day: "Jun 21", revenue: 10100 }, { day: "Jun 23", revenue: 12800 },
  { day: "Jun 25", revenue: 11500 }, { day: "Jun 27", revenue: 13900 },
  { day: "Jun 29", revenue: 15200 },
];

const ordersData = [
  { day: "Mon", completed: 42, pending: 18, cancelled: 5 },
  { day: "Tue", completed: 58, pending: 22, cancelled: 8 },
  { day: "Wed", completed: 51, pending: 15, cancelled: 3 },
  { day: "Thu", completed: 73, pending: 28, cancelled: 10 },
  { day: "Fri", completed: 89, pending: 31, cancelled: 7 },
  { day: "Sat", completed: 95, pending: 19, cancelled: 4 },
  { day: "Sun", completed: 67, pending: 24, cancelled: 6 },
];

const trafficData = [
  { name: "Organic", value: 38, color: "#6366F1" },
  { name: "Paid Ads", value: 27, color: "#10B981" },
  { name: "Social", value: 22, color: "#F59E0B" },
  { name: "Direct", value: 13, color: "#EC4899" },
];

const topProducts = [
  { id: 1, name: "MacBook Pro M3", category: "Laptops", sales: 284, revenue: 852000, change: 12.4 },
  { id: 2, name: "iPhone 15 Pro Max", category: "Phones", sales: 512, revenue: 716800, change: 8.7 },
  { id: 3, name: "Sony WH-1000XM5", category: "Audio", sales: 673, revenue: 268800, change: -2.1 },
  { id: 4, name: "iPad Pro 12.9\"", category: "Tablets", sales: 198, revenue: 259400, change: 18.9 },
  { id: 5, name: "Samsung Galaxy S24", category: "Phones", sales: 341, revenue: 238700, change: 5.3 },
];

const activityFeed = [
  { id: 1, type: "order", icon: "🛍️", text: "New order #ST-8821 placed", sub: "iPhone 15 Pro Max × 2", time: "Just now", color: "#6366F1" },
  { id: 2, type: "payment", icon: "💳", text: "Payment received", sub: "$2,398.00 via Stripe", time: "2 min ago", color: "#10B981" },
  { id: 3, type: "product", icon: "📦", text: "Product added", sub: "AirPods Pro 3rd Gen", time: "14 min ago", color: "#F59E0B" },
  { id: 4, type: "user", icon: "👤", text: "New customer signup", sub: "james.okafor@gmail.com", time: "28 min ago", color: "#EC4899" },
  { id: 5, type: "order", icon: "🛍️", text: "New order #ST-8820 placed", sub: "MacBook Pro M3", time: "41 min ago", color: "#6366F1" },
  { id: 6, type: "payment", icon: "💳", text: "Payment received", sub: "$3,499.00 via Paystack", time: "1h ago", color: "#10B981" },
];

const metrics = [
  { label: "Total Revenue", value: 284750, prefix: "$", change: 18.2, up: true, icon: "💰", sub: "This month" },
  { label: "Total Orders", value: 4821, prefix: "", change: 11.4, up: true, icon: "🛒", sub: "This month" },
  { label: "Avg Order Value", value: 590, prefix: "$", change: 6.1, up: true, icon: "📊", sub: "Per order" },
  { label: "Conversion Rate", value: 4.72, prefix: "", suffix: "%", change: -1.8, up: false, icon: "🎯", sub: "Store visits" },
  { label: "Active Users", value: 12480, prefix: "", change: 22.7, up: true, icon: "👥", sub: "Last 30 days" },
];

const navItems = [
  { label: "Dashboard", icon: "📊", active: true },
  { label: "Orders", icon: "🛒", active: false },
  { label: "Products", icon: "📦", active: false },
  { label: "Analytics", icon: "📈", active: false },
  { label: "Customers", icon: "👥", active: false },
  { label: "Settings", icon: "⚙️", active: false },
];

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = null;
    const duration = 1400;
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return <span>{prefix}{formatted}{suffix}</span>;
}

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1E2028", border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 10, padding: "10px 16px", fontSize: 13,
    }}>
      <p style={{ color: "#9CA3AF", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "#6366F1", fontWeight: 600, margin: 0 }}>
          {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
          {p.name !== "revenue" && ` ${p.name}`}
        </p>
      ))}
    </div>
  );
};

// ─── METRIC CARD ─────────────────────────────────────────────────────────
function MetricCard({ metric, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), index * 120 + 200); }, [index]);

  return (
    <div style={{
      background: "rgba(30,32,40,0.8)",
      border: "1px solid rgba(99,102,241,0.15)",
      borderRadius: 16,
      padding: "20px 22px",
      backdropFilter: "blur(12px)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: 80, height: 80,
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        borderRadius: "0 16px 0 0",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>{metric.label}</span>
        <span style={{ fontSize: 20 }}>{metric.icon}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#F9FAFB", marginBottom: 8, fontFamily: "monospace" }}>
        <AnimatedNumber
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix || ""}
          decimals={metric.decimals || 0}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
          background: metric.up ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
          color: metric.up ? "#10B981" : "#EF4444",
        }}>
          {metric.up ? "↑" : "↓"} {Math.abs(metric.change)}%
        </span>
        <span style={{ fontSize: 12, color: "#6B7280" }}>{metric.sub}</span>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [revenueRange, setRevenueRange] = useState("30d");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const styles = {
    root: {
      display: "flex", minHeight: "100vh",
      background: "#0A0B0F", color: "#F9FAFB",
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: "relative", overflow: "hidden",
    },
    sidebar: {
      width: 240, background: "rgba(14,15,20,0.95)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, height: "100vh",
      zIndex: 100, backdropFilter: "blur(20px)",
      transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    },
    sidebarDesktop: {
      width: 240, background: "rgba(14,15,20,0.95)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      flexShrink: 0,
    },
    main: {
      flex: 1, display: "flex", flexDirection: "column",
      minWidth: 0, opacity: mounted ? 1 : 0,
      transition: "opacity 0.6s ease",
    },
    navbar: {
      height: 64, background: "rgba(14,15,20,0.8)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center",
      padding: "0 24px", gap: 16,
      backdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 50,
    },
    content: { padding: "24px", flex: 1 },
    sectionTitle: {
      fontSize: 16, fontWeight: 600, color: "#F3F4F6",
      marginBottom: 16, marginTop: 0,
    },
    card: {
      background: "rgba(30,32,40,0.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, padding: 20,
      backdropFilter: "blur(12px)",
    },
  };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, flexShrink: 0,
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", lineHeight: 1.2 }}>SmartTech</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Collections Admin</div>
          </div>
        </div>
        <div style={{
          marginTop: 12, padding: "6px 10px",
          background: "rgba(16,185,129,0.1)", borderRadius: 8,
          border: "1px solid rgba(16,185,129,0.2)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "#10B981", fontWeight: 500 }}>All systems operational</span>
        </div>
      </div>

      <div style={{ padding: "0 12px", flex: 1 }}>
        <div style={{ fontSize: 10, color: "#4B5563", fontWeight: 600, letterSpacing: "0.1em", padding: "8px 8px 4px" }}>MAIN MENU</div>
        {navItems.map(item => (
          <button key={item.label} onClick={() => { setActiveNav(item.label); setSidebarOpen(false); }}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 10, border: "none", cursor: "pointer",
              marginBottom: 2, textAlign: "left",
              background: activeNav === item.label ? "rgba(99,102,241,0.15)" : "transparent",
              color: activeNav === item.label ? "#818CF8" : "#9CA3AF",
              transition: "all 0.15s",
              fontSize: 13, fontWeight: activeNav === item.label ? 600 : 400,
            }}
            onMouseEnter={e => { if (activeNav !== item.label) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { if (activeNav !== item.label) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
            {activeNav === item.label && (
              <span style={{
                marginLeft: "auto", width: 4, height: 4, borderRadius: "50%",
                background: "#6366F1",
              }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366F1, #EC4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff",
          }}>AO</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#F9FAFB" }}>Admin Ola</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Super Admin</div>
          </div>
          <span style={{ marginLeft: "auto", color: "#6B7280", cursor: "pointer", fontSize: 16 }}>⚙️</span>
        </div>
      </div>
    </>
  );

  return (
    <div style={styles.root}>
      {/* Desktop Sidebar */}
      <div style={{ ...styles.sidebarDesktop, display: "flex" }} className="sidebar-desktop">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          zIndex: 99, backdropFilter: "blur(4px)",
        }} />
      )}
      <div style={{ ...styles.sidebar, transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}>
        <SidebarContent />
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Navbar */}
        <div style={styles.navbar}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontSize: 20, padding: 4, display: "flex" }}
            className="menu-btn">☰</button>
          <div style={{
            flex: 1, maxWidth: 360, height: 36,
            background: "rgba(255,255,255,0.05)", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", gap: 8, padding: "0 12px",
          }}>
            <span style={{ color: "#4B5563", fontSize: 15 }}>🔍</span>
            <span style={{ fontSize: 13, color: "#4B5563" }}>Search orders, products, customers...</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{
              position: "relative", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
              width: 36, height: 36, cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              🔔
              <span style={{
                position: "absolute", top: 6, right: 6, width: 8, height: 8,
                background: "#EF4444", borderRadius: "50%", border: "2px solid #0A0B0F",
              }} />
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366F1, #EC4899)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer",
            }}>AO</div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Page Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#F9FAFB" }}>
              Good morning, Admin 👋
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>
              Here's what's happening with SmartTech Collections today.
            </p>
          </div>

          {/* Metric Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14, marginBottom: 24,
          }}>
            {metrics.map((m, i) => <MetricCard key={m.label} metric={m} index={i} />)}
          </div>

          {/* Charts Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, marginBottom: 20 }}>

            {/* Revenue Chart */}
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#F3F4F6" }}>Revenue Analytics</h2>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>Daily revenue over the past 30 days</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["7d", "30d", "12m"].map(r => (
                    <button key={r} onClick={() => setRevenueRange(r)} style={{
                      padding: "5px 12px", borderRadius: 8, border: "1px solid",
                      borderColor: revenueRange === r ? "#6366F1" : "rgba(255,255,255,0.08)",
                      background: revenueRange === r ? "rgba(99,102,241,0.15)" : "transparent",
                      color: revenueRange === r ? "#818CF8" : "#6B7280",
                      cursor: "pointer", fontSize: 12, fontWeight: 500,
                      transition: "all 0.15s",
                    }}>{r}</button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5}
                    dot={false} activeDot={{ r: 5, fill: "#6366F1", strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders + Traffic */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 20 }}>
            {/* Orders Bar Chart */}
            <div style={styles.card}>
              <h2 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#F3F4F6" }}>Orders This Week</h2>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "#6B7280" }}>By status breakdown</p>
              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                {[["#10B981", "Completed"], ["#F59E0B", "Pending"], ["#EF4444", "Cancelled"]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: c, display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{l}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ordersData} barSize={8} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Traffic Pie */}
            <div style={styles.card}>
              <h2 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#F3F4F6" }}>Traffic Sources</h2>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "#6B7280" }}>Where your visitors come from</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={trafficData} innerRadius={50} outerRadius={72}
                      dataKey="value" strokeWidth={0} paddingAngle={3}>
                      {trafficData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{
                      background: "#1E2028", border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: 10, fontSize: 13,
                    }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {trafficData.map(t => (
                    <div key={t.name} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      marginBottom: 12,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: t.color, display: "inline-block" }} />
                        <span style={{ fontSize: 13, color: "#9CA3AF" }}>{t.name}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#F3F4F6" }}>{t.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products + Activity */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {/* Top Products */}
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#F3F4F6" }}>Top Products</h2>
                <button style={{
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                  color: "#818CF8", borderRadius: 8, padding: "4px 12px",
                  fontSize: 12, cursor: "pointer", fontWeight: 500,
                }}>View all</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["Product", "Sales", "Revenue", ""].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "0 0 10px", color: "#6B7280", fontWeight: 500, fontSize: 11, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={p.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "11px 0" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: 8,
                              background: `hsl(${i * 55 + 230}, 60%, 20%)`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 15, flexShrink: 0,
                            }}>
                              {["💻", "📱", "🎧", "📱", "📱"][i]}
                            </div>
                            <div>
                              <div style={{ color: "#F3F4F6", fontWeight: 500, fontSize: 13 }}>{p.name}</div>
                              <div style={{ color: "#6B7280", fontSize: 11 }}>{p.category}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "11px 8px", color: "#9CA3AF", whiteSpace: "nowrap" }}>{p.sales.toLocaleString()}</td>
                        <td style={{ padding: "11px 8px", color: "#F3F4F6", fontWeight: 600, whiteSpace: "nowrap" }}>
                          ${(p.revenue / 1000).toFixed(0)}k
                        </td>
                        <td style={{ padding: "11px 0" }}>
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
                            background: p.change > 0 ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                            color: p.change > 0 ? "#10B981" : "#EF4444",
                          }}>
                            {p.change > 0 ? "+" : ""}{p.change}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Feed */}
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#F3F4F6" }}>Recent Activity</h2>
                <span style={{
                  display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#10B981",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                  Live
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {activityFeed.map((item, i) => (
                  <div key={item.id} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: "10px 0",
                    borderBottom: i < activityFeed.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16,
                    }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#F3F4F6" }}>{item.text}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 1 }}>{item.sub}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#4B5563", whiteSpace: "nowrap", paddingTop: 2 }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: 32 }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .menu-btn { display: none !important; }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
}
