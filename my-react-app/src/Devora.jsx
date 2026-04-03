import { useState, useEffect } from "react";
import logo from "./assets/noback.png";
import faviconImg from "./assets/Logo dynamique sur fond gris sophistiqué.png";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --bg: #F8F6F1;
    --bg2: #F3F0EA;
    --card: #FFFFFF;
    --text: #171717;
    --text2: #5F5A54;
    --text3: #9A948C;
    --border: #EAE3D9;
    --border2: #DDD5C8;
    --accent: #7C3AED;
    --accent-light: #EDE9FE;
    --accent-mid: #A78BFA;
    --font-head: 'Sora', sans-serif;
    --font-body: 'Inter', sans-serif;
    --shadow-sm: 0 1px 3px rgba(23,23,23,0.06), 0 1px 2px rgba(23,23,23,0.04);
    --shadow-md: 0 4px 16px rgba(23,23,23,0.08), 0 2px 6px rgba(23,23,23,0.04);
    --shadow-lg: 0 12px 40px rgba(23,23,23,0.10), 0 4px 12px rgba(23,23,23,0.05);
    --r: 14px;
    --r2: 20px;
    --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  html { scroll-behavior: smooth; }

  html, body, #root {
  width: 100%;
  min-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111110; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
  ::-webkit-scrollbar-track {
    background: #0f0f10;
  }
  /* ─────────── NAVBAR ─────────── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    padding: 0 48px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.35s var(--ease), box-shadow 0.35s var(--ease);
  }
  .navbar.scrolled {
    background: rgba(248,246,241,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 var(--border);
  }
  .nav-logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  width: 120px;
  overflow: visible;
  }

.nav-logo img {
  height: 72px;
  width: auto;
  display: block;
  object-fit: contain;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
  }
  .nav-links a {
    color: var(--text2);
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.1px;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-cta-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .btn-ghost {
    background: transparent;
    color: var(--text2);
    border: 1px solid var(--border2);
    padding: 9px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    white-space: nowrap;
  }
  .btn-ghost:hover {
    color: var(--text);
    border-color: var(--text3);
    background: rgba(23,23,23,0.04);
  }
  .btn-solid {
    background: var(--text);
    color: #fff;
    border: 1px solid var(--text);
    padding: 9px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    white-space: nowrap;
  }
  .btn-solid:hover {
    background: var(--accent);
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 6px;
    background: none;
    border: none;
  }
  .hamburger span {
    width: 22px; height: 1.5px;
    background: var(--text);
    border-radius: 2px;
    transition: all 0.25s var(--ease);
    display: block;
  }
  .mobile-menu {
    display: none;
    position: fixed;
    top: 70px; left: 0; right: 0;
    background: rgba(248,246,241,0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px 28px;
    z-index: 199;
    flex-direction: column;
    gap: 0;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    color: var(--text2);
    text-decoration: none;
    font-size: 15px;
    font-weight: 400;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s;
    display: block;
  }
  .mobile-menu a:hover { color: var(--text); }
  .mobile-menu-ctas {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  /* ─────────── SHARED SECTION ─────────── */
  section {
  padding: 100px 80px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  }
  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
  }
  .section-label::before {
    content: '';
    width: 20px;
    height: 1.5px;
    background: var(--accent);
    display: block;
    flex-shrink: 0;
  }
  .section-title {
    font-family: var(--font-head);
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -1px;
    color: var(--text);
    margin-bottom: 16px;
  }
  .section-sub {
    font-size: 16px;
    color: var(--text2);
    line-height: 1.7;
    max-width: 520px;
    font-weight: 400;
  }
  .section-header { margin-bottom: 60px; }
  .section-header.centered {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .section-header.centered .section-label::before { display: none; }
  .section-header.centered .section-sub { text-align: center; }

  /* ─────────── DIVIDER ─────────── */
  .divider {
    width: 100%;
    max-width: 1040px;
    margin: 0 auto;
    height: 1px;
    background: var(--border);
  }

  /* ─────────── HERO ─────────── */
  .hero {
    padding: 140px 80px 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: 100vh;
  }
  .hero-texture {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 70% 20%, rgba(124,58,237,0.06) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(124,58,237,0.04) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
  }
  .hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 64px 64px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
  }
  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 800px;
    width: 100%;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 6px 14px 6px 8px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text2);
    margin-bottom: 36px;
    box-shadow: var(--shadow-sm);
    letter-spacing: 0.2px;
    width: fit-content;
  }
  .hero-badge-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22C55E;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.15);
    animation: pulse-dot 2.5s ease infinite;
    flex-shrink: 0;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
    50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
  }
  .hero h1 {
    font-family: var(--font-head);
    font-size: clamp(40px, 6vw, 80px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    color: var(--text);
    margin-bottom: 28px;
  }
  .hero h1 .accent-word { color: var(--accent); }
  .hero-sub {
    font-size: clamp(15px, 1.8vw, 19px);
    color: var(--text2);
    line-height: 1.75;
    max-width: 520px;
    font-weight: 400;
    margin-bottom: 44px;
  }
  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }
  .btn-accent {
    background: var(--accent);
    color: #fff;
    border: 1px solid var(--accent);
    padding: 14px 28px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    letter-spacing: 0.2px;
    box-shadow: 0 4px 20px rgba(124,58,237,0.25);
    white-space: nowrap;
  }
  .btn-accent:hover {
    background: #6D28D9;
    border-color: #6D28D9;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(124,58,237,0.35);
  }
  .btn-outline {
    background: var(--card);
    color: var(--text);
    border: 1px solid var(--border2);
    padding: 14px 28px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    letter-spacing: 0.1px;
    box-shadow: var(--shadow-sm);
    white-space: nowrap;
  }
  .btn-outline:hover {
    border-color: var(--accent-mid);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  .hero-stats {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0;
  }
  .hero-stat {
    padding-right: 36px;
    margin-right: 36px;
    border-right: 1px solid var(--border);
  }
  .hero-stat:last-child {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
  }
  .hero-stat-val {
    font-family: var(--font-head);
    font-size: 28px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .hero-stat-label {
    font-size: 12px;
    color: var(--text3);
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  /* ─────────── VALUE SECTION ─────────── */
  .value-section { background: var(--card); width: 100%; }
  .value-section-wrapper {
    padding: 80px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  .value-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 60px;
    margin-bottom: 60px;
  }
  .value-header-left { flex: 1; min-width: 0; }
  .value-header-right { flex: 1; max-width: 440px; min-width: 0; }
  .value-header-right p {
    font-size: 16px;
    color: var(--text2);
    line-height: 1.75;
    font-weight: 400;
    margin-top: 8px;
  }
  .value-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    overflow: hidden;
  }
  .value-card {
    background: var(--card);
    padding: 36px 32px;
    transition: background 0.22s;
    min-width: 0;
  }
  .value-card:hover { background: var(--bg); }
  .value-icon {
    width: 44px; height: 44px;
    background: var(--accent-light);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 20px;
    flex-shrink: 0;
  }
  .value-card h3 {
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
    letter-spacing: -0.2px;
  }
  .value-card p { font-size: 14px; color: var(--text2); line-height: 1.65; }

  /* ─────────── SERVICES ─────────── */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .service-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 40px;
    position: relative;
    transition: all 0.25s var(--ease);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-mid));
    opacity: 0;
    transition: opacity 0.25s;
  }
  .service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--border2); }
  .service-card:hover::before { opacity: 1; }
  .service-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--accent);
    background: var(--accent-light);
    padding: 4px 10px;
    border-radius: 100px;
    margin-bottom: 20px;
    width: fit-content;
  }
  .service-card h3 {
    font-family: var(--font-head);
    font-size: 22px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  .service-card > p {
    font-size: 14px;
    color: var(--text2);
    line-height: 1.7;
    margin-bottom: 28px;
    flex: 1;
  }
  .service-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .service-price {
    font-family: var(--font-head);
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
  }
  .service-price span {
    font-size: 12px;
    color: var(--text3);
    font-weight: 400;
    font-family: var(--font-body);
  }
  .service-delivery {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text3);
    font-weight: 400;
    white-space: nowrap;
  }
  .service-delivery svg { flex-shrink: 0; }
  .service-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border2);
    padding: 11px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    width: fit-content;
  }
  .service-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

  /* ─────────── WHY DEVORA ─────────── */
  .why-section { background: var(--bg2); width: 100%; }
  .why-section-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 80px;
    width: 100%;
  }
  .why-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 60px;
  }
  .why-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 36px 28px;
    transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
    box-shadow: var(--shadow-sm);
    min-width: 0;
  }
  .why-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .why-num {
    font-family: var(--font-head);
    font-size: 13px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 1px;
    margin-bottom: 20px;
    opacity: 0.7;
  }
  .why-icon { font-size: 24px; margin-bottom: 16px; }
  .why-card h3 {
    font-family: var(--font-head);
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 10px;
    letter-spacing: -0.3px;
  }
  .why-card p { font-size: 13.5px; color: var(--text2); line-height: 1.7; }

  /* ─────────── PROCESS ─────────── */
  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
    margin-top: 60px;
  }
  .process-step { position: relative; padding: 0 32px 0 0; min-width: 0; }
  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 22px; right: -12px;
    width: 24px; height: 1px;
    background: var(--border2);
  }
  .step-num-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .step-num {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--card);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
  }
  .process-step h3 {
    font-family: var(--font-head);
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 10px;
    letter-spacing: -0.3px;
  }
  .process-step p { font-size: 14px; color: var(--text2); line-height: 1.7; }

  /* ─────────── PRICING CTA ─────────── */
  .pricing-cta-section {
    background: var(--card);
    width: 100%;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .pricing-cta-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    width: 100%;
  }
  .pricing-cta-text { min-width: 0; }
  .pricing-cta-inner h2 {
    font-family: var(--font-head);
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.8px;
    line-height: 1.2;
    margin-bottom: 10px;
  }
  .pricing-cta-inner p { font-size: 15px; color: var(--text2); line-height: 1.6; }
  .pricing-cta-btns {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  /* ─────────── FAQ ─────────── */
  .faq-list { max-width: 680px; margin: 0 auto; width: 100%; }
  .faq-item { border-bottom: 1px solid var(--border); overflow: hidden; }
  .faq-q {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 0;
    background: transparent;
    border: none;
    color: var(--text);
    font-family: var(--font-head);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s;
    letter-spacing: -0.2px;
  }
  .faq-q:hover { color: var(--accent); }
  .faq-icon {
    width: 28px; height: 28px;
    border: 1px solid var(--border2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--text3);
    font-weight: 300;
    flex-shrink: 0;
    transition: all 0.22s var(--ease);
    line-height: 1;
  }
  .faq-item.open .faq-icon {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    transform: rotate(45deg);
  }
  .faq-a {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s var(--ease), padding 0.35s var(--ease);
    font-size: 14.5px;
    color: var(--text2);
    line-height: 1.75;
  }
  .faq-item.open .faq-a { max-height: 200px; padding-bottom: 22px; }

  /* ─────────── FINAL CTA ─────────── */
  .final-cta-section {
    background: var(--text);
    width: 100%;
    margin: 0;
    position: relative;
    overflow: hidden;
    padding: 100px 0; /* 🔥 بدل 80px */
  }
  .final-cta-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 80px; /* 🔥 padding غير content */
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .final-cta-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 30% 50%, rgba(124,58,237,0.2) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(167,139,250,0.12) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
    width: 100%;
    overflow: hidden;
  }
  .final-cta-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--accent-mid);
    margin-bottom: 24px;
  }
  .final-cta-section h2 {
    font-family: var(--font-head);
    font-size: clamp(32px, 5vw, 60px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -2px;
    line-height: 1.08;
    margin-bottom: 20px;
  }
  .cta-sub {
    font-size: 16px;
    color: rgba(255,255,255,0.55);
    max-width: 440px;
    margin: 0 auto 44px;
    line-height: 1.7;
  }
  .final-cta-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .btn-white {
    background: #fff;
    color: var(--text);
    border: 1px solid #fff;
    padding: 14px 28px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    white-space: nowrap;
  }
  .btn-white:hover {
    background: var(--bg);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
  .btn-ghost-white {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.18);
    padding: 14px 28px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.22s var(--ease);
    white-space: nowrap;
  }
  .btn-ghost-white:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }
  .final-contact-note {
    font-size: 13px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.3px;
  }
  .final-contact-note a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    transition: color 0.2s;
  }
  .final-contact-note a:hover { color: rgba(255,255,255,0.8); }

  /* ─────────── FOOTER ─────────── */
  .footer {
    background: #111110;
    width: 100%;
    margin: 0;
    padding: 0;
    display: block;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 80px 36px;
  }

  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 32px;
  }

  .footer-logo-wrap {
  margin-bottom: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 160px;
  overflow: visible;
  }

.footer-logo-wrap img {
  height: 88px;
  width: auto;
  display: block;
  object-fit: contain;
  }

  .footer-brand p {
    font-size: 13.5px;
    color: rgba(255,255,255,0.35);
    line-height: 1.7;
    max-width: 240px;
  }

  .footer-col h4 {
    font-family: var(--font-head);
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    letter-spacing: 1px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 10px; }

  .footer-col ul li a {
    font-size: 13.5px;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-col ul li a:hover { color: rgba(255,255,255,0.8); }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-bottom p {
    font-size: 12px;
    color: rgba(255,255,255,0.2);
  }

  /* ─────────── ANIMATIONS ─────────── */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* ═══════════════════════════════════════
     RESPONSIVE — TABLET ≤1024px
  ═══════════════════════════════════════ */
  @media (max-width: 1024px) {
    section { padding: 80px 48px; }
    .hero { padding: 120px 48px 80px; }
    .value-section-wrapper { padding: 80px 48px; }
    .why-section-inner { padding: 80px 48px; }
    .pricing-cta-inner { padding: 60px 48px; flex-direction: column; align-items: flex-start; gap: 28px; }
    .final-cta-inner { padding: 80px 48px; }
    .footer-inner { padding: 60px 48px 36px; }
    .value-grid { grid-template-columns: repeat(2, 1fr); }
    .value-header { flex-direction: column; gap: 20px; }
    .value-header-right { max-width: 100%; }
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .why-grid { grid-template-columns: repeat(2, 1fr); }
    .process-steps { grid-template-columns: repeat(2, 1fr); gap: 40px 32px; }
    .process-step::after { display: none; }
    .process-step { padding: 0; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
    .divider { width: calc(100% - 96px); }
  }

  /* ═══════════════════════════════════════
     RESPONSIVE — MOBILE ≤768px
  ═══════════════════════════════════════ */
  @media (max-width: 768px) {
    section { padding: 64px 20px; }
    .hero { padding: 100px 20px 64px; min-height: auto; }
    .hero h1 { letter-spacing: -1px; }
    .hero-ctas { flex-direction: column; align-items: stretch; gap: 12px; margin-bottom: 48px; }
    .hero-ctas .btn-accent,
    .hero-ctas .btn-outline { width: 100%; text-align: center; justify-content: center; }
    .hero-stats { flex-direction: column; gap: 0; width: 100%; }
    .hero-stat {
      border-right: none; padding-right: 0; margin-right: 0;
      border-bottom: 1px solid var(--border);
      padding-bottom: 20px; padding-top: 20px; width: 100%;
    }
    .hero-stat:first-child { padding-top: 0; }
    .hero-stat:last-child { border-bottom: none; padding-bottom: 0; }
    .navbar { padding: 0 20px; height: 64px; }
    .nav-links, .nav-cta-group { display: none; }
    .hamburger { display: flex; }
    .mobile-menu { top: 64px; padding: 12px 20px 24px; }
    .mobile-menu-ctas { flex-direction: column; gap: 10px; }
    .mobile-menu-ctas .btn-outline,
    .mobile-menu-ctas .btn-accent { width: 100%; text-align: center; justify-content: center; padding: 14px 16px; }
    .section-title { letter-spacing: -0.5px; }
    .section-header { margin-bottom: 40px; }
    .value-section-wrapper { padding: 64px 20px; }
    .value-header { gap: 16px; margin-bottom: 40px; }
    .value-grid { grid-template-columns: 1fr; }
    .value-card { padding: 28px 24px; }
    .services-grid { grid-template-columns: 1fr; }
    .service-card { padding: 28px 24px; }
    .why-section-inner { padding: 64px 20px; }
    .why-grid { grid-template-columns: 1fr; margin-top: 40px; }
    .why-card { padding: 28px 24px; }
    .process-steps { grid-template-columns: 1fr; gap: 36px; }
    .pricing-cta-inner { padding: 48px 20px; flex-direction: column; align-items: stretch; gap: 24px; }
    .pricing-cta-btns { flex-direction: column; gap: 10px; }
    .pricing-cta-btns .btn-outline,
    .pricing-cta-btns .btn-accent { width: 100%; text-align: center; justify-content: center; }
    .final-cta-inner { padding: 72px 20px; }
    .final-cta-btns { flex-direction: column; align-items: stretch; gap: 10px; }
    .final-cta-btns a { width: 100%; display: block; }
    .btn-white, .btn-ghost-white { width: 100%; text-align: center; justify-content: center; }
    .footer-inner { padding: 48px 20px 32px; }
    .footer-top { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    .divider { width: calc(100% - 40px); }
    .faq-q { font-size: 14px; }
  }

  /* ═══════════════════════════════════════
     RESPONSIVE — SMALL MOBILE ≤480px
  ═══════════════════════════════════════ */
  @media (max-width: 480px) {
    .hero-badge { font-size: 11px; }
    .hero-stat-val { font-size: 24px; }
    .service-meta { flex-direction: column; align-items: flex-start; gap: 8px; }
    .service-card { padding: 24px 20px; }
  }
`;

/* ─── DATA ─── */

const SERVICES = [
  {
    tag: "Restaurant & Café",
    title: "Restaurant Website",
    desc: "Premium website for restaurants and cafés with menu integration, photo gallery, and seamless contact experience.",
    price: "$1,500",
    delivery: "1–3 days",
    link: "https://devoraservices.youcan.store/products/websites",
  },
  {
    tag: "Digital Experience",
    title: "Digital Menu",
    desc: "Clean and modern digital menu optimized for mobile and fast browsing — no app download needed.",
    price: "$900",
    delivery: "1–3 days",
    link: "https://devoraservices.youcan.store/products/digital-menu",
  },
  {
    tag: "Personal Brand",
    title: "Portfolio Website",
    desc: "Minimal, elegant portfolio for personal brands and creatives. Built to make a lasting first impression.",
    price: "$1,100",
    delivery: "1–3 days",
    link: "https://devoraservices.youcan.store/products/personal-portfolio",
  },
];

const VALUES = [
  { icon: "⚡", title: "Fast Delivery", desc: "From kickoff to launch in 1 to 3 days. No long waits, no drawn-out timelines." },
  { icon: "✦", title: "Premium Design", desc: "Every pixel considered. Modern aesthetics built to position your brand above the rest." },
  { icon: "📱", title: "Mobile Optimized", desc: "Flawless on every screen. Your website looks perfect on phone, tablet, or desktop." },
  { icon: "📈", title: "Conversion-Focused", desc: "Structure and copy crafted to turn visitors into customers with clear flows and strong CTAs." },
];

const WHY = [
  { icon: "🚀", title: "Fast Execution", desc: "We move at the speed of your ambition. Ready to launch in days, not weeks." },
  { icon: "🎨", title: "Premium UI/UX", desc: "Beautiful, functional interfaces that represent your brand with confidence." },
  { icon: "🎯", title: "Built to Convert", desc: "Every section is placed with intention — guiding your visitors toward action." },
  { icon: "💻", title: "Clean Frontend", desc: "Responsive, performant code that loads fast and works everywhere." },
];

const PROCESS = [
  { num: "01", title: "Share Your Project", desc: "Tell us what you need. A quick message is all it takes to get started." },
  { num: "02", title: "Define the Structure", desc: "We map out sections, copy, and layout — aligned to your goals." },
  { num: "03", title: "Design & Build", desc: "We craft your website in our focused workflow. Fast and precise." },
  { num: "04", title: "Review & Launch", desc: "You review, we refine, then we go live. Simple, clean, done." },
];

const FAQS = [
  { q: "How fast is the delivery?", a: "Most projects are delivered within 1 to 3 business days from the time we align on structure and direction. Complex custom projects may take slightly longer, but we always commit to a clear timeline upfront." },
  { q: "Are revisions included?", a: "Yes. Revisions are included throughout the project. We work with you until you're happy with the result — no nickel-and-diming on feedback rounds during the active build." },
  { q: "Is hosting included?", a: "Yes. We deploy your website on Vercel at no extra cost. It's fast, reliable, and gives you a professional URL from day one. Custom domains can be connected easily." },
  { q: "Can I request updates after delivery?", a: "Absolutely. Once launched, additional updates and changes are available. We offer ongoing support packages as well as one-time update requests — just reach out." },
  { q: "What if my project is more custom?", a: "We love unique briefs. For projects outside our standard packages, we work on custom pricing. Just share what you have in mind and we'll put together the right plan." },
];

const NAV = ["Services", "Why Devora", "Process", "FAQ"];
const navId = (item) => item.toLowerCase().replace(/\s+/g, "-");

/* ─── COMPONENT ─── */

export default function Devora() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);

    document.title = "Devora — Built for brands that move fast.";

    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Devora builds premium, high-converting websites for modern brands — delivered in 1–3 days.";
    document.head.appendChild(metaDesc);

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = faviconImg;
    document.head.appendChild(favicon);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      clearTimeout(timer);
      document.head.removeChild(style);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logo} alt="Devora" />
        </button>

        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item}>
              <a href={`#${navId(item)}`} onClick={(e) => { e.preventDefault(); scrollTo(navId(item)); }}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-cta-group">
          <button className="btn-ghost" onClick={() => scrollTo("faq")}>FAQ</button>
          <button className="btn-solid" onClick={() => scrollTo("contact")}>Start Project</button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span style={menuOpen ? { transform: "rotate(45deg) translate(4px, 4.5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0, transform: "scaleX(0)" } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px, -4.5px)" } : {}} />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV.map((item) => (
          <a key={item} href={`#${navId(item)}`} onClick={(e) => { e.preventDefault(); scrollTo(navId(item)); }}>
            {item}
          </a>
        ))}
        <div className="mobile-menu-ctas">
          <button className="btn-outline" onClick={() => scrollTo("contact")}>Contact Us</button>
          <button className="btn-accent" onClick={() => scrollTo("contact")}>Start Project</button>
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-texture" />
        <div className="hero-grid-bg" />
        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Available for new projects · 1–3 day delivery
          </div>
          <h1>
            Built for brands
            <br />
            that <span className="accent-word">move fast.</span>
          </h1>
          <p className="hero-sub">
            We design and build premium, high-converting websites for modern businesses — delivered in 1–3 days.
          </p>
          <div className="hero-ctas">
            <button className="btn-accent" onClick={() => scrollTo("contact")}>Start Project →</button>
            <button className="btn-outline" onClick={() => scrollTo("services")}>View Services</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val">1–3</div>
              <div className="hero-stat-label">Days to delivery</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">100%</div>
              <div className="hero-stat-label">Client satisfaction</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">$900</div>
              <div className="hero-stat-label">Starting price</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <div className="value-section">
        <div className="value-section-wrapper">
          <div className="value-header">
            <div className="value-header-left">
              <div className="section-label">Our Advantage</div>
              <h2 className="section-title">Built for speed.<br />Designed for impact.</h2>
            </div>
            <div className="value-header-right">
              <p>We combine fast execution with premium craft — so you don't have to choose between quality and getting it done now.</p>
            </div>
          </div>
          <div className="value-grid">
            {VALUES.map((v, i) => (
              <div className="value-card fade-in" key={v.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      <section id="services">
        <div className="section-header">
          <div className="section-label">Services</div>
          <h2 className="section-title">What we build</h2>
          <p className="section-sub">Specialized packages crafted for speed, quality, and results. Every project built to the same premium standard.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card fade-in" key={s.title} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="service-tag">{s.tag}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-meta">
                <div className="service-price">{s.price} <span>starting</span></div>
                <div className="service-delivery">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {s.delivery}
                </div>
              </div>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="service-btn"
              >
                Start this project →
              </a>
              </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <div className="why-section" id="why-devora">
        <div className="why-section-inner">
          <div className="section-header">
            <div className="section-label">Why Devora</div>
            <h2 className="section-title">A faster way to launch<br />your brand online</h2>
            <p className="section-sub">Not a generic agency. A focused team that executes with precision and genuinely cares about your outcomes.</p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div className="why-card fade-in" key={w.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="why-num">0{i + 1}</div>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      <section id="process">
        <div className="section-header centered">
          <div className="section-label">Our Process</div>
          <h2 className="section-title">From idea to live<br />in four steps.</h2>
          <p className="section-sub">Simple, transparent, and fast. No surprises — just results.</p>
        </div>
        <div className="process-steps">
          {PROCESS.map((p, i) => (
            <div className="process-step fade-in" key={p.num} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="step-num-wrap">
                <div className="step-num">{p.num}</div>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pricing-cta-section">
        <div className="pricing-cta-inner">
          <div className="pricing-cta-text">
            <h2>Transparent starting prices.<br />Custom projects available.</h2>
            <p>No hidden fees. No long contracts. Just clear pricing and premium output.</p>
          </div>
          <div className="pricing-cta-btns">
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Contact Us</button>
            <button className="btn-accent" onClick={() => scrollTo("contact")}>Start Project →</button>
          </div>
        </div>
      </div>

      <div className="divider" />

      <section id="faq">
        <div className="section-header centered">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common questions</h2>
          <p className="section-sub">Everything you need to know before starting a project with Devora.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div className={`faq-item${openFaq === i ? " open" : ""}`} key={faq.q}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <div className="faq-icon">+</div>
              </button>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <div className="final-cta-section" id="contact">
        <div className="final-cta-bg" />
        <div className="final-cta-inner">
          <div className="final-cta-label">Let's work together</div>
          <h2>Ready to launch<br />your website?</h2>
          <p className="cta-sub">Let's build something premium for your brand.</p>
          <div className="final-cta-btns">
            <a href="mailto:servicesdevora@gmail.com">
              <button className="btn-white">Start Project →</button>
            </a>
            <a href="mailto:servicesdevora@gmail.com">
              <button className="btn-ghost-white">Contact Us</button>
            </a>
          </div>
          <p className="final-contact-note">
            <a href="mailto:servicesdevora@gmail.com">servicesdevora@gmail.com</a>
            {" "}· We respond within 24 hours
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-wrap" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img src={logo} alt="Devora" />
              </div>
              <p>Premium websites for modern businesses. Fast delivery, exceptional design.</p>
            </div>

            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                {NAV.map((item) => (
                  <li key={item}>
                    <a href={`#${navId(item)}`} onClick={(e) => { e.preventDefault(); scrollTo(navId(item)); }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Restaurant Website</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Digital Menu</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Portfolio Website</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:servicesdevora@gmail.com">servicesdevora@gmail.com</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Start a project</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Devora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}