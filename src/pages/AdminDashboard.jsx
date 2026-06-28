/**
 * AdminDashboard.jsx — Premium e-commerce admin dashboard
 * Stack: React + Bootstrap 5 + Framer Motion
 * Design: Stripe/Linear inspired — clean whites, slate neutrals,
 *         indigo accent, tight typography, generous whitespace
 */

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../layouts/AdminLayout";

// ─────────────────────────────────────────────
// Design tokens (injected once via <style>)
// ─────────────────────────────────────────────
const GLOBAL_STYLES = `
  :root {
    --c-bg:          #ffffff;
    --c-surface:     #f8f9fb;
    --c-border:      #e4e7ec;
    --c-border-soft: #f0f2f5;

    --c-text-primary:   #0f1117;
    --c-text-secondary: #5c6370;
    --c-text-muted:     #9aa0ab;

    --c-accent:      #4f46e5;
    --c-accent-soft: #ede9fe;
    --c-accent-text: #3730a3;

    --c-green:       #16a34a;
    --c-green-soft:  #dcfce7;
    --c-green-text:  #14532d;

    --c-amber:       #d97706;
    --c-amber-soft:  #fef3c7;
    --c-amber-text:  #92400e;

    --c-red:         #dc2626;
    --c-red-soft:    #fee2e2;
    --c-red-text:    #7f1d1d;

    --c-blue:        #2563eb;
    --c-blue-soft:   #dbeafe;
    --c-blue-text:   #1e3a8a;

    --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-hover: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
  }

  [data-theme="dark"] {
    --c-bg:          #0f1117;
    --c-surface:     #1a1d27;
    --c-border:      #2a2d3a;
    --c-border-soft: #1f2230;

    --c-text-primary:   #f1f3f9;
    --c-text-secondary: #8b92a5;
    --c-text-muted:     #555d72;

    --c-accent:      #6366f1;
    --c-accent-soft: #1e1b4b;
    --c-accent-text: #a5b4fc;

    --c-green:       #22c55e;
    --c-green-soft:  #052e16;
    --c-green-text:  #86efac;

    --c-amber:       #f59e0b;
    --c-amber-soft:  #2d1a00;
    --c-amber-text:  #fde68a;

    --c-red:         #ef4444;
    --c-red-soft:    #2d0000;
    --c-red-text:    #fca5a5;

    --c-blue:        #3b82f6;
    --c-blue-soft:   #1e1b4b;
    --c-blue-text:   #93c5fd;

    --shadow-card: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
    --shadow-hover: 0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2);
  }

  .adm-dashboard * { box-sizing: border-box; }

  .adm-dashboard {
    background: var(--c-surface);
    min-height: 100vh;
    padding: 2rem 1.5rem 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
  }

  /* Header */
  .adm-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .adm-header-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--c-text-primary);
    letter-spacing: -0.02em;
    margin: 0;
  }
  .adm-header-sub {
    font-size: 0.875rem;
    color: var(--c-text-muted);
    margin: 0.2rem 0 0;
  }
  .adm-dark-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.9rem;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-sm);
    font-size: 0.8125rem;
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all 0.15s ease;
    font-weight: 500;
  }
  .adm-dark-toggle:hover {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }

  /* Section titles */
  .adm-section-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--c-text-muted);
    margin: 0 0 0.875rem;
  }

  /* Stat card */
  .stat-card {
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.375rem;
    box-shadow: var(--shadow-card);
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
  .stat-card:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-1px);
  }
  .stat-card-accent {
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    border-radius: 4px 0 0 4px;
  }
  .stat-icon-wrap {
    width: 38px; height: 38px;
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.125rem;
    margin-bottom: 0.875rem;
    flex-shrink: 0;
  }
  .stat-label {
    font-size: 0.8125rem;
    color: var(--c-text-secondary);
    font-weight: 500;
    margin: 0 0 0.25rem;
  }
  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--c-text-primary);
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0 0 0.5rem;
  }
  .stat-trend {
    font-size: 0.78rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  /* Card shell (generic) */
  .adm-card {
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    overflow: hidden;
  }
  .adm-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.125rem 1.375rem;
    border-bottom: 1px solid var(--c-border-soft);
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .adm-card-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--c-text-primary);
    margin: 0;
  }
  .adm-card-body {
    padding: 1.25rem 1.375rem;
  }

  /* Orders table */
  .adm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  .adm-table th {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--c-text-muted);
    padding: 0.7rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--c-border);
    background: var(--c-surface);
    white-space: nowrap;
  }
  .adm-table td {
    padding: 0.875rem 1rem;
    color: var(--c-text-primary);
    border-bottom: 1px solid var(--c-border-soft);
    vertical-align: middle;
  }
  .adm-table tr:last-child td { border-bottom: none; }
  .adm-table tbody tr:hover td { background: var(--c-surface); }

  /* Badge */
  .badge-status {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.22rem 0.6rem;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .badge-green  { background: var(--c-green-soft);  color: var(--c-green-text); }
  .badge-green .badge-dot  { background: var(--c-green); }
  .badge-amber  { background: var(--c-amber-soft);  color: var(--c-amber-text); }
  .badge-amber .badge-dot  { background: var(--c-amber); }
  .badge-red    { background: var(--c-red-soft);    color: var(--c-red-text); }
  .badge-red .badge-dot    { background: var(--c-red); }
  .badge-blue   { background: var(--c-blue-soft);   color: var(--c-blue-text); }
  .badge-blue .badge-dot   { background: var(--c-blue); }

  /* Quick actions */
  .quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
  }
  .quick-action-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--c-text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
    box-shadow: var(--shadow-card);
  }
  .quick-action-btn:hover {
    border-color: var(--c-accent);
    color: var(--c-accent);
    text-decoration: none;
    box-shadow: var(--shadow-hover);
    transform: translateY(-1px);
  }
  .quick-action-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    transition: transform 0.15s ease;
  }
  .quick-action-btn:hover .quick-action-icon {
    transform: scale(1.1);
  }

  /* Revenue bar */
  .rev-bar-wrap {
    width: 100%;
    height: 6px;
    background: var(--c-border);
    border-radius: 999px;
    overflow: hidden;
    margin-top: 0.625rem;
  }
  .rev-bar-fill {
    height: 100%;
    background: var(--c-accent);
    border-radius: 999px;
    transition: width 1s ease;
  }

  /* Avatar */
  .adm-avatar {
    width: 30px; height: 30px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;
    color: var(--c-accent-text);
    background: var(--c-accent-soft);
    letter-spacing: 0.02em;
  }

  /* Empty / loading states */
  .adm-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    gap: 0.75rem;
    color: var(--c-text-muted);
    text-align: center;
  }
  .adm-empty-icon { font-size: 2.25rem; opacity: 0.4; }
  .adm-empty-title { font-size: 0.9375rem; font-weight: 600; color: var(--c-text-secondary); margin: 0; }
  .adm-empty-sub   { font-size: 0.8125rem; margin: 0; }

  .adm-skeleton {
    background: linear-gradient(90deg, var(--c-border-soft) 25%, var(--c-border) 50%, var(--c-border-soft) 75%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.4s infinite;
    border-radius: 6px;
    display: inline-block;
  }
  @keyframes skeleton-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* View-all link */
  .adm-link {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--c-accent);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    transition: opacity 0.15s;
  }
  .adm-link:hover { opacity: 0.75; }

  /* Responsive */
  @media (max-width: 768px) {
    .adm-dashboard { padding: 1rem 0.875rem 2.5rem; }
    .stat-value    { font-size: 1.375rem; }
    .adm-table th:nth-child(3),
    .adm-table td:nth-child(3) { display: none; }
  }
  @media (max-width: 480px) {
    .adm-table th:nth-child(5),
    .adm-table td:nth-child(5) { display: none; }
  }
`;

// ─────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.075 } },
};

const tableRow = {
  hidden:  { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function formatNGN(amount) {
  return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
}

function getOrderStatus(order, index) {
  // Derive a plausible status from available data for display
  if (order.status) return order.status;
  const statuses = ["Delivered", "Processing", "Pending", "Shipped"];
  return statuses[index % statuses.length];
}

function statusBadge(status) {
  const map = {
    Delivered:  "badge-green",
    Shipped:    "badge-blue",
    Processing: "badge-amber",
    Pending:    "badge-amber",
    Cancelled:  "badge-red",
  };
  return map[status] || "badge-blue";
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Reusable statistic card */
function StatCard({ label, value, icon, accentColor, trendLabel, trendUp, loading }) {
  return (
    <motion.div variants={fadeUp} className="stat-card" style={{ paddingLeft: "1.625rem" }}>
      <div className="stat-card-accent" style={{ background: accentColor }} />
      <div
        className="stat-icon-wrap"
        style={{ background: `${accentColor}18`, color: accentColor }}
      >
        {icon}
      </div>
      {loading ? (
        <>
          <div className="adm-skeleton" style={{ width: "60%", height: 12, marginBottom: 8 }} />
          <div className="adm-skeleton" style={{ width: "40%", height: 28, marginBottom: 8 }} />
          <div className="adm-skeleton" style={{ width: "50%", height: 10 }} />
        </>
      ) : (
        <>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
          {trendLabel && (
            <span
              className="stat-trend"
              style={{
                background: trendUp ? "var(--c-green-soft)"  : "var(--c-red-soft)",
                color:      trendUp ? "var(--c-green-text)"  : "var(--c-red-text)",
              }}
            >
              {trendUp ? "↑" : "↓"} {trendLabel}
            </span>
          )}
        </>
      )}
    </motion.div>
  );
}

/** Quick action button */
function QuickAction({ to, icon, label, iconBg, iconColor }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link to={to} className="quick-action-btn">
        <div
          className="quick-action-icon"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <span>{label}</span>
        <span style={{ marginLeft: "auto", opacity: 0.4, fontSize: "0.75rem" }}>→</span>
      </Link>
    </motion.div>
  );
}

/** Empty state */
function EmptyState({ icon, title, subtitle }) {
  return (
    <div className="adm-empty">
      <div className="adm-empty-icon">{icon}</div>
      <p className="adm-empty-title">{title}</p>
      <p className="adm-empty-sub">{subtitle}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────────
export default function AdminDashboard() {
  const [dark, setDark]       = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers]     = useState([]);

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById("adm-styles")) {
      const el = document.createElement("style");
      el.id = "adm-styles";
      el.textContent = GLOBAL_STYLES;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById("adm-styles");
      if (el) el.remove();
    };
  }, []);

  // Propagate dark mode to a wrapper attribute
  useEffect(() => {
    const root = document.getElementById("adm-root");
    if (root) root.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // Load data
  useEffect(() => {
    const t = setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("smarttech-users")) || [];
      setUsers(stored);
      setLoading(false);
    }, 600); // brief delay to show loading state
    return () => clearTimeout(t);
  }, []);

  const orders = useMemo(
    () => JSON.parse(localStorage.getItem("smarttech-orders")) || [],
    []
  );

  const wishlistCount = useMemo(
    () => JSON.parse(localStorage.getItem("smarttech-wishlist"))?.length || 0,
    []
  );

  const totalRevenue = useMemo(
    () => orders.reduce((acc, o) => acc + (o.total || 0), 0),
    [orders]
  );

  const recentOrders = useMemo(
    () => [...orders].reverse().slice(0, 5),
    [orders]
  );

  // Derive a simple "avg order value" for the revenue card
  const avgOrder = orders.length ? Math.round(totalRevenue / orders.length) : 0;

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <AdminLayout>
      <div id="adm-root" data-theme={dark ? "dark" : "light"}>
        <div className="adm-dashboard">

          {/* ── Header ── */}
          <div className="adm-header">
            <div>
              <h1 className="adm-header-title">Dashboard</h1>
              <p className="adm-header-sub">{today}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button className="adm-dark-toggle" onClick={() => setDark((d) => !d)}>
                {dark ? "☀ Light" : "☾ Dark"}
              </button>
              <Link to="/admin/orders" className="adm-dark-toggle" style={{ textDecoration: "none" }}>
                + New Order
              </Link>
            </div>
          </div>

          {/* ── Stat cards ── */}
          <p className="adm-section-label">Overview</p>
          <motion.div
            className="row g-3 mb-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                label="Total Orders"
                value={orders.length}
                icon="📦"
                accentColor="#4f46e5"
                trendLabel="All time"
                trendUp={true}
                loading={loading}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                label="Registered Users"
                value={users.length}
                icon="👤"
                accentColor="#0ea5e9"
                trendLabel="Active accounts"
                trendUp={true}
                loading={loading}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                label="Total Revenue"
                value={formatNGN(totalRevenue)}
                icon="💰"
                accentColor="#16a34a"
                trendLabel={`Avg ${formatNGN(avgOrder)} / order`}
                trendUp={true}
                loading={loading}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                label="Wishlist Items"
                value={wishlistCount}
                icon="♡"
                accentColor="#e11d48"
                trendLabel="Saved products"
                trendUp={false}
                loading={loading}
              />
            </div>
          </motion.div>

          {/* ── Main grid: orders + revenue summary ── */}
          <div className="row g-3 mb-4">

            {/* Recent orders */}
            <div className="col-12 col-xl-8">
              <motion.div
                className="adm-card"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <div className="adm-card-header">
                  <p className="adm-card-title">Recent Orders</p>
                  <Link to="/admin/orders" className="adm-link">
                    View all →
                  </Link>
                </div>

                {loading ? (
                  <div className="adm-card-body">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", alignItems: "center" }}>
                        <div className="adm-skeleton" style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div className="adm-skeleton" style={{ width: "40%", height: 11, marginBottom: 6 }} />
                          <div className="adm-skeleton" style={{ width: "60%", height: 10 }} />
                        </div>
                        <div className="adm-skeleton" style={{ width: 60, height: 10 }} />
                      </div>
                    ))}
                  </div>
                ) : recentOrders.length === 0 ? (
                  <EmptyState
                    icon="📭"
                    title="No orders yet"
                    subtitle="Orders placed by customers will appear here"
                  />
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Email</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <motion.tbody variants={stagger} initial="hidden" animate="visible">
                        {recentOrders.map((order, i) => {
                          const status = getOrderStatus(order, i);
                          const name   = order.name || "Guest";
                          return (
                            <motion.tr key={i} variants={tableRow}>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                                  <div className="adm-avatar">{initials(name)}</div>
                                  <span style={{ fontWeight: 500 }}>{name}</span>
                                </div>
                              </td>
                              <td style={{ color: "var(--c-text-secondary)" }}>
                                {order.email || "N/A"}
                              </td>
                              <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                {formatNGN(order.total)}
                              </td>
                              <td>
                                <span className={`badge-status ${statusBadge(status)}`}>
                                  <span className="badge-dot" />
                                  {status}
                                </span>
                              </td>
                              <td style={{ color: "var(--c-text-secondary)", whiteSpace: "nowrap" }}>
                                {new Date(order.date || Date.now()).toLocaleDateString("en-NG", {
                                  day: "2-digit", month: "short", year: "numeric",
                                })}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </motion.tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Revenue summary panel */}
            <div className="col-12 col-xl-4">
              <motion.div
                className="adm-card"
                style={{ height: "100%" }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <div className="adm-card-header">
                  <p className="adm-card-title">Revenue Summary</p>
                </div>
                <div className="adm-card-body">
                  {loading ? (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} style={{ marginBottom: "1.25rem" }}>
                          <div className="adm-skeleton" style={{ width: "50%", height: 10, marginBottom: 8 }} />
                          <div className="adm-skeleton" style={{ width: "100%", height: 6, borderRadius: 999 }} />
                        </div>
                      ))}
                    </>
                  ) : orders.length === 0 ? (
                    <EmptyState icon="📊" title="No revenue yet" subtitle="Place orders to see revenue data" />
                  ) : (
                    <>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <p style={{ fontSize: "0.8125rem", color: "var(--c-text-secondary)", margin: "0 0 0.25rem" }}>
                          All-time revenue
                        </p>
                        <p style={{ fontSize: "1.625rem", fontWeight: 700, color: "var(--c-text-primary)", margin: 0, letterSpacing: "-0.025em" }}>
                          {formatNGN(totalRevenue)}
                        </p>
                      </div>

                      {[
                        { label: "Total orders",   val: orders.length,        max: Math.max(orders.length, 1),      pct: 100 },
                        { label: "Avg order value", val: formatNGN(avgOrder), max: 1, pct: Math.min((avgOrder / 50000) * 100, 100) },
                        { label: "Wishlist saves",  val: wishlistCount,        max: 1, pct: Math.min(wishlistCount * 10, 100) },
                      ].map((row) => (
                        <div key={row.label} style={{ marginBottom: "1.125rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                            <span style={{ fontSize: "0.8125rem", color: "var(--c-text-secondary)" }}>{row.label}</span>
                            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--c-text-primary)" }}>{row.val}</span>
                          </div>
                          <div className="rev-bar-wrap">
                            <motion.div
                              className="rev-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${row.pct}%` }}
                              transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}

                      <div style={{
                        marginTop: "1.25rem",
                        padding: "0.875rem 1rem",
                        background: "var(--c-accent-soft)",
                        borderRadius: "var(--radius-sm)",
                      }}>
                        <p style={{ fontSize: "0.75rem", color: "var(--c-accent-text)", fontWeight: 600, margin: "0 0 0.2rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Revenue per user
                        </p>
                        <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--c-accent)", margin: 0, letterSpacing: "-0.02em" }}>
                          {users.length ? formatNGN(Math.round(totalRevenue / users.length)) : "—"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Quick actions ── */}
          <p className="adm-section-label">Quick Actions</p>
          <motion.div
            className="quick-actions-grid mb-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <QuickAction
              to="/admin/orders"
              icon="📦"
              label="All Orders"
              iconBg="var(--c-accent-soft)"
              iconColor="var(--c-accent)"
            />
            <QuickAction
              to="/admin/products"
              icon="🛍"
              label="Manage Products"
              iconBg="var(--c-green-soft)"
              iconColor="var(--c-green)"
            />
            <QuickAction
              to="/admin/users"
              icon="👥"
              label="View Users"
              iconBg="var(--c-blue-soft)"
              iconColor="var(--c-blue)"
            />
            <QuickAction
              to="/admin/products/new"
              icon="＋"
              label="Add Product"
              iconBg="var(--c-amber-soft)"
              iconColor="var(--c-amber)"
            />
          </motion.div>

        </div>
      </div>
    </AdminLayout>
  );
}
