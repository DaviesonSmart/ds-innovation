/**
 * Hero.jsx — SmartTech Collections
 * Premium luxury fashion hero — fully responsive
 *
 * Layout strategy per breakpoint:
 *   Mobile  (<768px)  → Full-bleed background image + content overlay, single column
 *   Tablet  (768–991px) → Stacked: image top half (fixed height), content below
 *   Desktop (992px+)  → Side-by-side split: content left 52%, image right 48%
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroFashion from "../assets/hero.jpg";

// ─────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────
const T = {
  gold:        "#c9a96e",
  goldDark:    "#a07840",
  white:       "#ffffff",
  offWhite:    "rgba(255,255,255,0.88)",
  muted:       "rgba(255,255,255,0.52)",
  dark:        "#0a0a0a",
};

// ─────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0, y = 28) => ({
  hidden:  { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } },
});
const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay } },
});
const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } },
});
const slideRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: "easeOut" } },
});

const floatAnim  = { y: [-4, 4, -4],  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
const floatAnim2 = { y: [3, -5, 3],   transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } };

// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────
function Stars({ count = 5, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill={T.gold}>
          <path d="M8 1l1.85 3.75L14 5.6l-3 2.93.71 4.13L8 10.5l-3.71 2.16L5 8.53 2 5.6l4.15-.85z" />
        </svg>
      ))}
    </span>
  );
}

function FloatCard({ icon, label, value, sub, style, animProp }) {
  return (
    <motion.div animate={animProp} style={{ ...S.floatCard, ...style }}>
      <div style={S.floatCardIcon}>{icon}</div>
      <div>
        <div style={S.floatCardLabel}>{label}</div>
        <div style={S.floatCardValue}>{value}</div>
        {sub && <div style={S.floatCardSub}>{sub}</div>}
      </div>
    </motion.div>
  );
}

function StatPill({ value, label }) {
  return (
    <div style={S.statPill}>
      <span style={S.statValue}>{value}</span>
      <span style={S.statLabel}>{label}</span>
    </div>
  );
}

function CollectionChip({ name, to, delay }) {
  return (
    <motion.div variants={fadeUp(delay, 12)}>
      <Link to={to} style={S.collectionChip}>
        {name}
        <span style={{ marginLeft: 6, opacity: 0.6, fontSize: 11 }}>→</span>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Shared image + overlays — rendered in two places
// (full-bleed bg on mobile, right panel on desktop)
// ─────────────────────────────────────────────────────────
function HeroImage({ objectPosition = "center top" }) {
  return (
    <motion.div
      variants={scaleIn(0.1)}
      initial="hidden"
      animate="visible"
      style={{ position: "absolute", inset: 0 }}
    >
      <img
        src={heroFashion}
        alt="Premium fashion collection"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          display: "block",
        }}
      />
      {/* Left-blend: fades into dark panel on desktop, strong bottom-up darkening on mobile */}
      <div className="hero-img-blend-left"  aria-hidden="true" />
      <div className="hero-img-blend-bottom" aria-hidden="true" />
      <div className="hero-img-shimmer"      aria-hidden="true" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Base section ── */
        .hero-section-premium {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #0a0a0a;
        }

        /* ── Gold rule ── */
        .gold-rule {
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          animation: ruleExpand 1.4s ease-out 0.3s forwards;
          width: 0;
          z-index: 20;
        }
        @keyframes ruleExpand { to { width: 100%; } }

        /* ── Corner ornaments ── */
        .corner-ornament {
          position: absolute;
          width: 50px; height: 50px;
          z-index: 15;
          pointer-events: none;
        }
        .corner-ornament.tl {
          top: 1.25rem; left: 1.25rem;
          border-left: 1px solid rgba(201,169,110,0.3);
          border-top:  1px solid rgba(201,169,110,0.3);
        }
        .corner-ornament.br {
          bottom: 1.25rem; right: 1.25rem;
          border-right:  1px solid rgba(201,169,110,0.3);
          border-bottom: 1px solid rgba(201,169,110,0.3);
        }

        /* ── Scroll indicator ── */
        .scroll-indicator {
          position: absolute;
          bottom: 1.75rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 5px;
          z-index: 20; cursor: pointer;
        }
        .scroll-mouse {
          width: 20px; height: 32px;
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: 10px;
          display: flex; justify-content: center;
          padding-top: 5px;
        }
        .scroll-dot {
          width: 3px; height: 6px;
          background: #c9a96e; border-radius: 2px;
          animation: scrollBounce 1.8s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(7px); opacity: 0.25; }
        }
        .scroll-text {
          font-family: 'Inter', sans-serif;
          font-size: 9px; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.3); text-transform: uppercase;
        }

        /* ── Image overlay layers ── */
        .hero-img-blend-left {
          position: absolute; inset: 0;
          background: linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.2) 30%, transparent 70%);
          z-index: 1;
        }
        .hero-img-blend-bottom {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.1) 50%, transparent 100%);
          z-index: 1;
        }
        .hero-img-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,169,110,0.07) 0%, transparent 60%);
          z-index: 2; pointer-events: none;
        }

        /* ── Button hover ── */
        .hero-cta-primary, .hero-cta-secondary { transition: all 0.25s ease !important; }
        .hero-cta-primary:hover  { background: #b8924f !important; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,169,110,0.35) !important; }
        .hero-cta-secondary:hover { background: rgba(255,255,255,0.1) !important; transform: translateY(-2px); }

        /* ════════════════════════════════════════════
           MOBILE  (320px – 767px)
           Full-bleed background image, content overlaid
        ════════════════════════════════════════════ */
        @media (max-width: 767px) {
          .hero-section-premium {
            min-height: 100svh;
            display: flex; flex-direction: column;
          }

          /* Background image covers the whole section */
          .hero-bg-image {
            position: absolute; inset: 0;
            z-index: 0;
          }

          /* Tablet image panel — hidden on mobile */
          .hero-tablet-image { display: none; }

          /* Desktop right panel — hidden on mobile */
          .hero-right-panel { display: none !important; }

          /* Content sits on top of the bg image */
          .hero-left-panel {
            position: relative;
            z-index: 10;
            width: 100% !important;
            min-height: 100svh;
            padding: 5.5rem 1.25rem 6.5rem !important;
            display: flex; flex-direction: column; justify-content: flex-end;
          }

          .hero-display-title {
            font-size: clamp(2.8rem, 14vw, 4.2rem) !important;
          }
          .hero-subheading { max-width: 100% !important; font-size: 0.9rem !important; }
          .hero-stats-row  { flex-wrap: wrap; gap: 1rem !important; }
          .hero-cta-row    { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; }
          .hero-cta-primary, .hero-cta-secondary { min-width: 180px; }

          /* On mobile the left-blend goes stronger so text reads well */
          .hero-img-blend-left {
            background: linear-gradient(to top,
              rgba(10,10,10,0.92) 0%,
              rgba(10,10,10,0.6)  45%,
              rgba(10,10,10,0.25) 100%
            );
          }
          .hero-img-blend-bottom { display: none; }

          /* Float cards hidden on mobile — too cramped */
          .hero-float-cards { display: none; }

          /* Compact trust row on mobile */
          .hero-trust-row  { gap: 0.875rem !important; }
          .hero-collections-row { flex-wrap: wrap; }

          /* Scroll indicator pushed up slightly */
          .scroll-indicator { bottom: 1.25rem; }
        }

        /* ════════════════════════════════════════════
           TABLET  (768px – 991px)
           Stacked: image top, content below
        ════════════════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 991px) {
          .hero-section-premium {
            display: flex; flex-direction: column;
          }

          /* bg image layer off — tablet uses explicit image block */
          .hero-bg-image { display: none; }

          /* Tablet image strip — visible tall block at top */
          .hero-tablet-image {
            display: block;
            position: relative;
            width: 100%;
            height: 52vw;   /* keeps portrait proportions without extra height */
            max-height: 480px;
            overflow: hidden;
            flex-shrink: 0;
          }

          /* Desktop right panel — hidden on tablet */
          .hero-right-panel { display: none !important; }

          /* Content block below image */
          .hero-left-panel {
            position: relative;
            z-index: 5;
            width: 100% !important;
            padding: 2.5rem 2.5rem 5rem !important;
            background: #0a0a0a;
          }

          .hero-display-title {
            font-size: clamp(3rem, 7vw, 4.5rem) !important;
          }
          .hero-stats-row { flex-wrap: wrap; gap: 1.25rem !important; }
          .hero-cta-row   { flex-direction: row !important; gap: 0.875rem !important; }

          /* On tablet the image blends downward into the dark content area */
          .hero-img-blend-left {
            background: linear-gradient(to right, transparent 0%, transparent 100%);
          }
          .hero-img-blend-bottom {
            background: linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.4) 35%, transparent 70%);
          }

          /* One floating card on tablet — best seller, top-right of image */
          .hero-float-cards .fc-new-arrival,
          .hero-float-cards .fc-delivery    { display: none; }
          .hero-float-cards .fc-best-seller {
            top: auto !important;
            bottom: 1rem !important;
            right: 1.25rem !important;
          }
        }

        /* ════════════════════════════════════════════
           DESKTOP  (992px+)
           Side-by-side split layout
        ════════════════════════════════════════════ */
        @media (min-width: 992px) {
          .hero-section-premium {
            min-height: 100svh;
            display: flex; flex-direction: row; align-items: stretch;
          }

          /* Full-bleed bg and tablet strip both hidden on desktop */
          .hero-bg-image     { display: none; }
          .hero-tablet-image { display: none; }

          /* Right panel visible */
          .hero-right-panel {
            display: block !important;
            width: 48%; position: relative; overflow: hidden;
          }

          .hero-left-panel {
            width: 52% !important;
            padding: 7rem 4rem 7rem 5rem !important;
            display: flex; flex-direction: column; justify-content: center;
            position: relative; z-index: 5;
          }

          .hero-display-title {
            font-size: clamp(3.5rem, 6.5vw, 6rem) !important;
          }

          /* All three float cards visible on desktop */
          .hero-float-cards .fc-new-arrival,
          .hero-float-cards .fc-delivery { display: flex !important; }
        }

        /* ── Shared float-card container (desktop absolute, tablet relative) ── */
        .hero-float-cards { pointer-events: none; }
        .hero-float-cards > * { pointer-events: auto; }
      `}</style>

      <section className="hero-section-premium" aria-label="Hero banner">

        {/* ── Decorative chrome ── */}
        <div className="gold-rule"           aria-hidden="true" />
        <div className="corner-ornament tl"  aria-hidden="true" />
        <div className="corner-ornament br"  aria-hidden="true" />

        {/* ══ MOBILE: full-bleed background image ══
            Sits at z-index 0 behind the content panel */}
        <div className="hero-bg-image" aria-hidden="true">
          <HeroImage objectPosition="center 20%" />
        </div>

        {/* ══ TABLET: image strip above content ══ */}
        <div className="hero-tablet-image">
          <HeroImage objectPosition="center 15%" />

          {/* One float card on tablet */}
          <div className="hero-float-cards" style={{ position: "absolute", inset: 0 }}>
            <motion.div
              className="fc-best-seller"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ position: "absolute", bottom: "1rem", right: "1.25rem", zIndex: 10 }}
            >
              <FloatCard
                animProp={floatAnim}
                icon={<span style={{ fontSize: 16 }}>🏆</span>}
                label="BEST SELLER"
                value="Evening Gown"
                sub="★ 4.9 — 840 sold"
                style={{ minWidth: 155 }}
              />
            </motion.div>
          </div>
        </div>

        {/* ══ LEFT PANEL — all content, all breakpoints ══ */}
        <div className="hero-left-panel">

          {/* Eyebrow */}
          <motion.div
            variants={slideRight(0.2)}
            initial="hidden"
            animate="visible"
            style={S.eyebrow}
          >
            <div style={S.eyebrowLine} aria-hidden="true" />
            <span style={S.eyebrowText}>SmartTech Collections · 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-display-title"
            variants={fadeUp(0.35)}
            initial="hidden"
            animate="visible"
            style={S.displayTitle}
          >
            <span style={{ display: "block", fontStyle: "italic", color: T.gold }}>Dressed</span>
            <span style={{ display: "block" }}>for Every</span>
            <span style={{ display: "block", fontStyle: "italic" }}>Chapter.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="hero-subheading"
            variants={fadeUp(0.55)}
            initial="hidden"
            animate="visible"
            style={S.subheading}
          >
            Curated gowns, tailored skirts, and statement pieces for women
            who move through the world with intention.
          </motion.p>

          {/* Rating row */}
          <motion.div
            variants={fadeUp(0.68)}
            initial="hidden"
            animate="visible"
            style={S.ratingRow}
          >
            <div style={S.avatarStack}>
              {["A", "M", "F", "T"].map((l, i) => (
                <div key={i} style={{ ...S.avatarChip, zIndex: 4 - i, marginLeft: i === 0 ? 0 : -8 }}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Stars count={5} size={13} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.white, fontFamily: "'Inter', sans-serif" }}>
                  4.9
                </span>
              </div>
              <div style={{ fontSize: 12, color: T.muted, fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                from 2,400+ verified customers
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="hero-cta-row"
            variants={fadeUp(0.78)}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", gap: "0.875rem", alignItems: "center", marginBottom: "2.25rem", flexWrap: "wrap" }}
          >
            <Link to="/shop"             className="hero-cta-primary"   style={S.ctaPrimary}>Shop Collection</Link>
            <Link to="/shop?filter=new"  className="hero-cta-secondary" style={S.ctaSecondary}>
              New Arrivals <span style={{ marginLeft: 8, fontSize: 16 }}>→</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats-row"
            variants={fadeUp(0.88)}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", gap: "1.75rem", marginBottom: "2rem" }}
          >
            <StatPill value="12K+" label="Orders Delivered" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.12)", alignSelf: "stretch" }} aria-hidden="true" />
            <StatPill value="98%"  label="Satisfaction Rate" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.12)", alignSelf: "stretch" }} aria-hidden="true" />
            <StatPill value="3–5d" label="Nationwide Delivery" />
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeUp(0.96)} initial="hidden" animate="visible">
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted, fontFamily: "'Inter', sans-serif", marginBottom: "0.625rem" }}>
              Browse Categories
            </div>
            <motion.div
              className="hero-collections-row"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}
            >
              {[
                { name: "Gowns",     to: "/shop?cat=gowns" },
                { name: "Skirts",    to: "/shop?cat=skirts" },
                { name: "Crop Tops", to: "/shop?cat=tops" },
                { name: "Sets",      to: "/shop?cat=sets" },
                { name: "Evening",   to: "/shop?cat=evening" },
              ].map((c, i) => (
                <CollectionChip key={c.name} name={c.name} to={c.to} delay={i * 0.06} />
              ))}
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeIn(1.1)}
            initial="hidden"
            animate="visible"
            className="hero-trust-row"
            style={S.trustRow}
          >
            {[
              { icon: "🔒", label: "Secure Checkout" },
              { icon: "↩",  label: "30-Day Returns" },
              { icon: "✦",  label: "Premium Quality" },
            ].map((b) => (
              <div key={b.label} style={S.trustBadge}>
                <span style={{ fontSize: 12 }}>{b.icon}</span>
                <span style={{ fontSize: 11, color: T.muted, fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em" }}>
                  {b.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══ RIGHT PANEL — desktop only ══ */}
        <div className="hero-right-panel">
          <HeroImage objectPosition="center top" />

          {/* Three floating cards — all visible on desktop */}
          <div className="hero-float-cards" style={{ position: "absolute", inset: 0 }}>

            {/* Best Seller */}
            <motion.div
              className="fc-best-seller"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
              style={{ position: "absolute", top: "12%", right: "8%", zIndex: 10 }}
            >
              <FloatCard
                animProp={floatAnim}
                icon={<span style={{ fontSize: 18 }}>🏆</span>}
                label="BEST SELLER"
                value="Evening Gown"
                sub="★ 4.9 — 840 sold"
                style={{ minWidth: 170 }}
              />
            </motion.div>

            {/* New Arrival */}
            <motion.div
              className="fc-new-arrival"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7, ease: "easeOut" }}
              style={{ position: "absolute", top: "38%", right: "5%", zIndex: 10 }}
            >
              <FloatCard
                animProp={floatAnim2}
                icon={<span style={{ fontSize: 18 }}>✨</span>}
                label="NEW ARRIVAL"
                value="Satin Midi Skirt"
                sub="Just dropped"
                style={{ minWidth: 165 }}
              />
            </motion.div>

            {/* Fast Delivery */}
            <motion.div
              className="fc-delivery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
              style={{ position: "absolute", bottom: "22%", right: "10%", zIndex: 10 }}
            >
              <motion.div animate={floatAnim} style={{ ...S.floatCard, minWidth: 155 }}>
                <div style={S.floatCardIcon}><span style={{ fontSize: 16 }}>⚡</span></div>
                <div>
                  <div style={S.floatCardLabel}>FAST DELIVERY</div>
                  <div style={{ ...S.floatCardValue, fontSize: 14 }}>3–5 Business Days</div>
                  <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                    <Stars count={5} size={10} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Vertical label */}
            <motion.div
              variants={fadeIn(1.2)}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              style={{
                position: "absolute", bottom: "10%", left: "6%", zIndex: 10,
                writingMode: "vertical-rl", textOrientation: "mixed",
                transform: "rotate(180deg)",
                fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)", fontFamily: "'Inter', sans-serif",
              }}
            >
              Collection 2026
            </motion.div>

            {/* Gold dots */}
            <motion.div
              variants={fadeIn(1.4)}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              style={{ position: "absolute", top: "60%", left: "4%", zIndex: 6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                  style={{
                    width: i === 1 ? 6 : 4, height: i === 1 ? 6 : 4,
                    borderRadius: "50%", background: T.gold, marginBottom: 6,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────
const S = {
  eyebrow:     { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" },
  eyebrowLine: { width: 32, height: 1, background: T.gold, flexShrink: 0 },
  eyebrowText: { fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold },
  displayTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(3.5rem, 6.5vw, 6rem)",
    fontWeight: 300, lineHeight: 1.05,
    color: T.white, margin: "0 0 1.5rem", letterSpacing: "-0.01em",
  },
  subheading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
    fontWeight: 300, color: T.offWhite,
    lineHeight: 1.7, maxWidth: 420, marginBottom: "1.75rem", letterSpacing: "0.01em",
  },
  ratingRow:  { display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.875rem" },
  avatarStack: { display: "flex", alignItems: "center" },
  avatarChip: {
    width: 30, height: 30, borderRadius: "50%",
    background: T.goldDark, border: `2px solid ${T.dark}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: T.white,
    fontFamily: "'Inter', sans-serif", position: "relative",
  },
  ctaPrimary: {
    display: "inline-flex", alignItems: "center",
    padding: "0.875rem 2rem", background: T.gold, color: "#1a1008",
    fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
    fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
    textDecoration: "none", borderRadius: 0, border: "none", cursor: "pointer",
    boxShadow: "0 4px 20px rgba(201,169,110,0.2)",
  },
  ctaSecondary: {
    display: "inline-flex", alignItems: "center",
    padding: "0.875rem 1.5rem", background: "rgba(255,255,255,0.06)", color: T.white,
    fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
    fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase",
    textDecoration: "none", borderRadius: 0,
    border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
  },
  statPill:  { display: "flex", flexDirection: "column", gap: 2 },
  statValue: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, color: T.white, lineHeight: 1, letterSpacing: "-0.01em" },
  statLabel: { fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 400, color: T.muted, letterSpacing: "0.04em", textTransform: "uppercase" },
  collectionChip: {
    display: "inline-flex", alignItems: "center",
    padding: "0.35rem 0.875rem",
    border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2,
    fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400,
    color: "rgba(255,255,255,0.7)", textDecoration: "none",
    letterSpacing: "0.04em", transition: "all 0.2s ease",
    background: "rgba(255,255,255,0.03)",
  },
  trustRow:  { display: "flex", gap: "1.5rem", flexWrap: "wrap", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)" },
  trustBadge: { display: "flex", alignItems: "center", gap: 6 },
  floatCard: {
    display: "flex", alignItems: "center", gap: "0.75rem",
    padding: "0.75rem 1rem",
    background: "rgba(15,15,20,0.68)",
    backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
  },
  floatCardIcon: {
    width: 36, height: 36, borderRadius: 8,
    background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  floatCardLabel: { fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold, marginBottom: 2 },
  floatCardValue: { fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: T.white, lineHeight: 1.2 },
  floatCardSub:   { fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 },
};
