import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080810;
    --bg2: #0d0d1a;
    --bg3: #111128;
    --surface: rgba(255,255,255,0.035);
    --surface2: rgba(255,255,255,0.06);
    --border: rgba(255,255,255,0.07);
    --border2: rgba(138,100,255,0.25);
    --text: #f0eeff;
    --muted: #8882aa;
    --accent: #8a64ff;
    --accent2: #b490ff;
    --accent-glow: rgba(138,100,255,0.35);
    --accent-glow2: rgba(138,100,255,0.12);
    --green: #4dff9e;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --r: 16px;
    --r2: 24px;
    --transition: 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* NOISE TEXTURE */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* NAVBAR */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 40px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background var(--transition), backdrop-filter var(--transition), border-bottom var(--transition);
  }
  .navbar.scrolled {
    background: rgba(8,8,16,0.85);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #fff 30%, var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
  }
  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2px;
    transition: color var(--transition);
  }
  .nav-links a:hover { color: var(--text); }
  .btn-primary {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 10px 22px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all var(--transition);
    box-shadow: 0 0 20px var(--accent-glow);
    letter-spacing: 0.1px;
  }
  .btn-primary:hover {
    background: var(--accent2);
    transform: translateY(-1px);
    box-shadow: 0 0 32px var(--accent-glow);
  }
  .btn-secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border2);
    padding: 10px 22px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all var(--transition);
  }
  .btn-secondary:hover {
    background: var(--surface2);
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { width: 24px; height: 1.5px; background: var(--text); border-radius: 2px; transition: all var(--transition); }

  /* HERO */
  .hero {
    min-height: 100vh;
    padding: 140px 80px 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .hero-glow {
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(138,100,255,0.18) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-60%, -50%);
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }
  .hero-glow2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,144,255,0.1) 0%, transparent 70%);
    top: 20%; left: 5%;
    pointer-events: none;
    animation: pulse 5s ease-in-out infinite reverse;
  }
  @keyframes pulse {
    0%,100% { opacity: 0.6; transform: translate(-60%,-50%) scale(1); }
    50% { opacity: 1; transform: translate(-60%,-50%) scale(1.08); }
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 100px;
    padding: 6px 14px 6px 10px;
    font-size: 12px;
    color: var(--accent2);
    font-weight: 500;
    margin-bottom: 28px;
    width: fit-content;
    letter-spacing: 0.3px;
  }
  .hero-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 8px var(--green);
    animation: blink 2s ease infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(38px, 5vw, 68px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 24px;
    position: relative;
  }
  .hero h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--accent2) 0%, #d4a8ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 17px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 440px;
    font-weight: 300;
  }
  .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
  .hero-ctas .btn-primary { padding: 14px 28px; font-size: 15px; }
  .hero-ctas .btn-secondary { padding: 14px 28px; font-size: 15px; }
  .hero-stats {
    display: flex;
    gap: 40px;
    margin-top: 52px;
  }
  .stat { display: flex; flex-direction: column; }
  .stat-num {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
  }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* HERO VISUAL */
  .hero-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 520px;
  }
  .mock-card {
    position: absolute;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    overflow: hidden;
    backdrop-filter: blur(12px);
    box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
    transition: transform var(--transition);
  }
  .mock-main {
    width: 340px;
    height: 240px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
  .mock-main:hover { transform: translate(-50%,-50%) scale(1.02); }
  .mock-a {
    width: 220px; height: 160px;
    top: 10%; left: 0;
    transform: rotate(-6deg);
    z-index: 2;
    opacity: 0.8;
  }
  .mock-b {
    width: 200px; height: 140px;
    bottom: 8%; right: 0;
    transform: rotate(5deg);
    z-index: 2;
    opacity: 0.75;
  }
  .mock-header {
    height: 36px;
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 6px;
  }
  .mock-dot { width: 8px; height: 8px; border-radius: 50%; }
  .mock-content { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .mock-line { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.06); }
  .mock-line.accent { background: linear-gradient(90deg, var(--accent), var(--accent2)); width: 60%; }
  .mock-line.w80 { width: 80%; }
  .mock-line.w60 { width: 60%; }
  .mock-line.w90 { width: 90%; }
  .mock-line.w40 { width: 40%; }
  .mock-img-placeholder {
    width: 100%; height: 70px;
    background: linear-gradient(135deg, rgba(138,100,255,0.15), rgba(180,144,255,0.08));
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .floating-tag {
    position: absolute;
    background: rgba(13,13,26,0.9);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 10px 16px;
    backdrop-filter: blur(16px);
    white-space: nowrap;
    z-index: 10;
  }
  .tag-label { font-size: 10px; color: var(--muted); margin-bottom: 2px; }
  .tag-val { font-size: 13px; font-weight: 600; font-family: var(--font-display); }
  .tag-green { color: var(--green); }
  .tag-purple { color: var(--accent2); }
  .ft1 { top: 18%; right: -10px; animation: float1 3.5s ease-in-out infinite; }
  .ft2 { bottom: 22%; left: -10px; animation: float2 4s ease-in-out infinite; }
  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }

  /* SECTIONS */
  section { padding: 100px 80px; position: relative; }
  .section-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 16px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .section-sub {
    font-size: 16px;
    color: var(--muted);
    max-width: 480px;
    line-height: 1.7;
    font-weight: 300;
  }
  .section-header { margin-bottom: 60px; }
  .text-center { text-align: center; }
  .section-sub.center { margin: 0 auto; }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border2), transparent);
    margin: 0 80px;
    opacity: 0.5;
  }

  /* VALUE SECTION */
  .value-section { background: var(--bg2); }
  .value-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    overflow: hidden;
  }
  .value-card {
    background: var(--bg2);
    padding: 36px 30px;
    transition: background var(--transition);
  }
  .value-card:hover { background: var(--bg3); }
  .value-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    margin-bottom: 20px;
    background: var(--accent-glow2);
    border: 1px solid var(--border2);
  }
  .value-card h3 {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }
  .value-card p { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* SERVICES */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .service-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 36px 32px;
    position: relative;
    overflow: hidden;
    transition: all var(--transition);
    cursor: default;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, rgba(138,100,255,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity var(--transition);
  }
  .service-card:hover { border-color: var(--border2); transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(138,100,255,0.1); }
  .service-card:hover::before { opacity: 1; }
  .service-emoji { font-size: 28px; margin-bottom: 20px; }
  .service-label { font-size: 11px; color: var(--accent2); font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .service-card h3 { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 12px; }
  .service-card p { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 28px; flex: 1; }
  .service-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .service-price { font-family: var(--font-display); font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
  .service-time { font-size: 12px; color: var(--muted); background: var(--surface2); padding: 4px 12px; border-radius: 100px; border: 1px solid var(--border); }
  .service-btn { width: 100%; background: var(--surface2); border: 1px solid var(--border2); color: var(--text); padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 500; font-family: var(--font-body); cursor: pointer; transition: all var(--transition); }
  .service-btn:hover { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 20px var(--accent-glow); }

  /* WHY */
  .why-section { background: var(--bg2); }
  .why-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .why-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
    transition: all var(--transition);
  }
  .why-card:hover { border-color: var(--border2); background: var(--surface2); }
  .why-num {
    position: absolute;
    top: 28px; right: 32px;
    font-family: var(--font-display);
    font-size: 64px;
    font-weight: 800;
    color: rgba(138,100,255,0.08);
    line-height: 1;
    letter-spacing: -3px;
    pointer-events: none;
  }
  .why-card h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 12px; margin-top: 8px; }
  .why-card p { font-size: 14px; color: var(--muted); line-height: 1.7; }
  .why-icon { font-size: 24px; margin-bottom: 16px; }

  /* PORTFOLIO */
  .portfolio-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
  }
  .portfolio-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: all var(--transition);
    group: true;
  }
  .portfolio-card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
  .portfolio-card.tall { grid-row: span 2; }
  .portfolio-preview {
    width: 100%;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .portfolio-card.tall .portfolio-preview { height: 340px; }
  .portfolio-card:not(.tall) .portfolio-preview { height: 180px; }
  .portfolio-bg { position: absolute; inset: 0; }
  .portfolio-inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
  .portfolio-mock-nav { width: 200px; height: 28px; background: rgba(255,255,255,0.08); border-radius: 8px; display: flex; align-items: center; padding: 0 10px; gap: 6px; }
  .portfolio-mock-nav-dot { width: 5px; height: 5px; border-radius: 50%; }
  .portfolio-mock-hero { width: 200px; height: 80px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px; padding: 12px; }
  .portfolio-mock-line { height: 6px; border-radius: 3px; }
  .portfolio-info { padding: 24px 28px; }
  .portfolio-tag { font-size: 10px; color: var(--accent2); font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
  .portfolio-info h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: -0.3px; margin-bottom: 6px; }
  .portfolio-info p { font-size: 13px; color: var(--muted); }
  .portfolio-arrow {
    position: absolute;
    top: 16px; right: 16px;
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    opacity: 0;
    transition: opacity var(--transition);
  }
  .portfolio-card:hover .portfolio-arrow { opacity: 1; }

  /* PROCESS */
  .process-section { background: var(--bg2); }
  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }
  .process-steps::before {
    content: '';
    position: absolute;
    top: 22px; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border2), var(--accent), var(--border2), transparent);
    opacity: 0.4;
  }
  .process-step { padding: 0 20px; text-align: center; display: flex; flex-direction: column; align-items: center; }
  .step-num {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--bg2);
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: var(--accent2);
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 20px rgba(138,100,255,0.2);
  }
  .process-step h3 { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.3px; }
  .process-step p { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* PRICING */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: end;
  }
  .pricing-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 36px 30px;
    position: relative;
    transition: all var(--transition);
    overflow: hidden;
  }
  .pricing-card.featured {
    background: linear-gradient(160deg, rgba(138,100,255,0.1), rgba(180,144,255,0.05));
    border-color: var(--border2);
    transform: scaleY(1.03);
    box-shadow: 0 0 40px rgba(138,100,255,0.12), 0 0 0 1px rgba(138,100,255,0.2);
  }
  .pricing-card:hover { transform: translateY(-4px); border-color: var(--border2); }
  .pricing-card.featured:hover { transform: scaleY(1.03) translateY(-4px); }
  .pricing-badge {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 100px;
    margin-bottom: 24px;
  }
  .pricing-label { font-size: 11px; color: var(--muted); font-weight: 500; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .pricing-card h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 20px; }
  .pricing-price { font-family: var(--font-display); font-size: 42px; font-weight: 800; letter-spacing: -2px; line-height: 1; margin-bottom: 6px; }
  .pricing-price span { font-size: 16px; font-weight: 400; color: var(--muted); letter-spacing: 0; }
  .pricing-desc { font-size: 13px; color: var(--muted); margin-bottom: 28px; line-height: 1.6; }
  .pricing-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
  .pricing-features li { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
  .pricing-features li::before { content: '✓'; color: var(--accent2); font-weight: 700; font-size: 12px; }
  .pricing-cta { width: 100%; }

  /* FAQ */
  .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 2px; }
  .faq-item {
    border-radius: 14px;
    border: 1px solid var(--border);
    overflow: hidden;
    transition: border-color var(--transition);
  }
  .faq-item.open { border-color: var(--border2); }
  .faq-q {
    width: 100%;
    background: var(--surface);
    border: none;
    padding: 22px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    font-family: var(--font-body);
    color: var(--text);
    text-align: left;
    transition: background var(--transition);
  }
  .faq-q:hover { background: var(--surface2); }
  .faq-item.open .faq-q { background: var(--surface2); }
  .faq-icon {
    width: 24px; height: 24px;
    border-radius: 50%;
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    color: var(--accent2);
    flex-shrink: 0;
    transition: transform var(--transition), background var(--transition);
  }
  .faq-item.open .faq-icon { transform: rotate(45deg); background: var(--accent-glow2); }
  .faq-a {
    background: var(--surface);
    padding: 0 28px;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.75;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s ease;
  }
  .faq-item.open .faq-a { max-height: 200px; padding: 0 28px 22px; }

  /* CTA SECTION */
  .cta-section {
    background: linear-gradient(160deg, rgba(138,100,255,0.08) 0%, transparent 60%);
    border-top: 1px solid var(--border);
    text-align: center;
  }
  .cta-glow {
    position: absolute;
    width: 600px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(138,100,255,0.15) 0%, transparent 70%);
    top: 0; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .cta-section .section-title { font-size: clamp(32px, 5vw, 58px); }
  .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
  .cta-btns .btn-primary { padding: 16px 36px; font-size: 16px; }
  .cta-btns .btn-secondary { padding: 16px 36px; font-size: 16px; }

  /* FOOTER */
  .footer {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    padding: 60px 80px 40px;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 1.5fr repeat(3, 1fr);
    gap: 60px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 32px;
  }
  .footer-brand p { font-size: 14px; color: var(--muted); line-height: 1.7; margin-top: 14px; max-width: 240px; }
  .footer-col h4 { font-family: var(--font-display); font-size: 13px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 20px; color: var(--text); }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-col ul li a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color var(--transition); }
  .footer-col ul li a:hover { color: var(--text); }
  .footer-bottom { display: flex; align-items: center; justify-content: space-between; }
  .footer-bottom p { font-size: 12px; color: var(--muted); }
  .social-links { display: flex; gap: 12px; }
  .social-link {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none;
    color: var(--muted);
    font-size: 14px;
    transition: all var(--transition);
  }
  .social-link:hover { border-color: var(--border2); color: var(--accent2); background: var(--accent-glow2); }

  /* FADE IN */
  .fade-in { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-in.visible { opacity: 1; transform: none; }

  /* MOBILE */
  @media (max-width: 1024px) {
    .value-grid { grid-template-columns: repeat(2, 1fr); }
    .hero { padding: 120px 40px 80px; }
    section { padding: 80px 40px; }
    .divider { margin: 0 40px; }
    .footer { padding: 60px 40px 40px; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
    .portfolio-grid { grid-template-columns: 1fr; }
    .portfolio-card.tall { grid-row: span 1; }
    .portfolio-card.tall .portfolio-preview { height: 240px; }
  }
  @media (max-width: 768px) {
    .navbar { padding: 0 24px; }
    .nav-links { display: none; }
    .nav-cta-desktop { display: none; }
    .hamburger { display: flex; }
    .hero { grid-template-columns: 1fr; padding: 110px 24px 60px; gap: 48px; }
    .hero-visual { height: 320px; }
    .mock-main { width: 260px; height: 180px; }
    .mock-a { width: 160px; height: 120px; }
    .mock-b { width: 150px; height: 110px; }
    section { padding: 64px 24px; }
    .divider { margin: 0 24px; }
    .services-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; }
    .process-steps { grid-template-columns: 1fr 1fr; gap: 32px; }
    .process-steps::before { display: none; }
    .pricing-grid { grid-template-columns: 1fr; }
    .pricing-card.featured { transform: none; }
    .pricing-card.featured:hover { transform: translateY(-4px); }
    .footer { padding: 48px 24px 32px; }
    .footer-top { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    .value-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 24px; flex-wrap: wrap; }
  }
  @media (max-width: 480px) {
    .process-steps { grid-template-columns: 1fr; }
  }

  /* Mobile Nav */
  .mobile-nav {
    position: fixed;
    inset: 0;
    background: rgba(8,8,16,0.98);
    backdrop-filter: blur(24px);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .mobile-nav.open { transform: none; }
  .mobile-nav a {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 700;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: -1px;
    transition: color var(--transition);
  }
  .mobile-nav a:hover { color: var(--text); }
`;

const NAV_LINKS = ["Home","Services","Work","Pricing","Contact"];

const VALUES = [
  { icon: "⚡", title: "Fast Delivery", desc: "Launch-ready in 2–5 days. We move fast without cutting corners on quality." },
  { icon: "✦", title: "Premium Design", desc: "Every pixel is intentional. We craft visually refined, modern websites." },
  { icon: "📱", title: "Mobile Optimized", desc: "Flawless experience on every device. Built responsive from day one." },
  { icon: "🔍", title: "SEO Ready", desc: "Clean structure, fast load times, and proper markup for search engines." },
];

const SERVICES = [
  { emoji: "🍽️", label: "Hospitality", title: "Restaurant & Café Website", desc: "Built for modern hospitality brands. Beautiful menus, reservation flows, and a presence that fills tables.", time: "Delivery in 3–5 days", price: "$1,500" },
  { emoji: "📋", label: "Digital Experience", title: "Digital Menu", desc: "QR-accessible, mobile-first digital menus. Easy to update, beautiful to browse.", time: "Delivery in 2–3 days", price: "$900" },
  { emoji: "👤", label: "Personal Brand", title: "Portfolio Website", desc: "Your work, beautifully presented. A digital identity that opens doors and closes deals.", time: "Delivery in 2–4 days", price: "$1,100" },
  { emoji: "🏢", label: "Business", title: "Business Landing Page", desc: "High-converting single-page sites that turn visitors into leads. Clear, fast, and focused.", time: "Delivery in 2–5 days", price: "$1,200" },
];

const WHY = [
  { icon: "⚡", title: "Fast Execution", desc: "We ship in days, not months. Our focused process eliminates the endless revision cycles that kill timelines." },
  { icon: "✦", title: "Premium UI/UX", desc: "We don't do templates. Every project is designed from scratch with intentional hierarchy and refined aesthetics." },
  { icon: "📈", title: "Conversion-Focused", desc: "Design isn't just beauty — it's strategy. We build structures that guide visitors toward action." },
  { icon: "💻", title: "Clean Frontend", desc: "Fast-loading, responsive, and technically sound. Your website will perform as well as it looks." },
];

const PORTFOLIO = [
  {
    tall: true,
    label: "Restaurant Website",
    title: "Maison Noire",
    desc: "Fine dining experience with table reservations",
    gradient: "linear-gradient(160deg, #1a0a2e 0%, #2d1060 50%, #0d0520 100%)",
    accent: "#9b59b6",
    emoji: "🍷",
  },
  {
    label: "Portfolio Website",
    title: "Alex Chen Studio",
    desc: "Creative direction & brand identity",
    gradient: "linear-gradient(160deg, #0a1628 0%, #162844 100%)",
    accent: "#4a9eff",
    emoji: "🎨",
  },
  {
    label: "Digital Menu",
    title: "Café Lumière",
    desc: "QR-powered mobile menu system",
    gradient: "linear-gradient(160deg, #0d1f0a 0%, #1a3d12 100%)",
    accent: "#4dff9e",
    emoji: "☕",
  },
];

const PROCESS = [
  { num: "01", title: "Share your project", desc: "Tell us about your business, your goals, and your vision." },
  { num: "02", title: "We define structure", desc: "We map out the pages, sections, and user flow." },
  { num: "03", title: "Design & build", desc: "We craft and develop your site with precision." },
  { num: "04", title: "Review & launch", desc: "You approve, we polish, then we go live." },
];

const PRICING = [
  {
    label: "Starter",
    title: "Digital Menu",
    price: "$900",
    desc: "Perfect for cafés and restaurants needing a modern QR menu.",
    features: ["Mobile-first design", "Up to 30 menu items", "QR code integration", "1 revision round", "Delivered in 2–3 days"],
    featured: false,
  },
  {
    label: "Popular",
    title: "Portfolio Website",
    price: "$1,100",
    desc: "Your professional online presence, crafted for impact and memorability.",
    features: ["Up to 5 pages", "Custom design", "Project showcase", "Contact integration", "Delivered in 2–4 days"],
    featured: true,
  },
  {
    label: "Premium",
    title: "Restaurant Website",
    price: "$1,500",
    desc: "Full-featured sites for hospitality brands serious about their digital presence.",
    features: ["Up to 8 pages", "Digital menu included", "Reservation flow", "SEO setup", "Delivered in 3–5 days"],
    featured: false,
  },
];

const FAQS = [
  { q: "How long does it take?", a: "Most projects are delivered within 2–5 days depending on complexity. We'll give you a precise timeline before we start." },
  { q: "Do you offer custom designs?", a: "Yes — every project is built from scratch. We don't use templates. Your website will be unique to your brand." },
  { q: "Is the website mobile-friendly?", a: "Absolutely. All websites are fully responsive and tested across mobile, tablet, and desktop devices." },
  { q: "Can you redesign an existing website?", a: "Yes. We handle redesigns regularly. Share your current site and we'll improve it significantly." },
  { q: "Do you help with hosting and domain setup?", a: "We can guide you through hosting and domain setup, and deploy the website for you as part of the project." },
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function MockCard({ className, colors }) {
  return (
    <div className={`mock-card ${className}`}>
      <div className="mock-header">
        <div className="mock-dot" style={{background:"#ff5f57"}}/>
        <div className="mock-dot" style={{background:"#febc2e"}}/>
        <div className="mock-dot" style={{background:"#28c840"}}/>
      </div>
      <div className="mock-content">
        <div className="mock-img-placeholder" style={{background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`}}>
          <span style={{fontSize:"24px"}}>{colors[2]}</span>
        </div>
        <div className="mock-line accent"/>
        <div className="mock-line w80"/>
        <div className="mock-line w60"/>
        <div className="mock-line w90"/>
        <div className="mock-line w40"/>
      </div>
    </div>
  );
}

function PortfolioPreview({ item }) {
  return (
    <div className="portfolio-preview">
      <div className="portfolio-bg" style={{background: item.gradient}}/>
      <div className="portfolio-inner">
        <div className="portfolio-mock-nav" style={{background: "rgba(255,255,255,0.06)"}}>
          <div className="portfolio-mock-nav-dot" style={{background:"rgba(255,255,255,0.3)", width:5,height:5,borderRadius:"50%"}}/>
          <div className="portfolio-mock-nav-dot" style={{background:"rgba(255,255,255,0.3)", width:5,height:5,borderRadius:"50%"}}/>
          <div style={{flex:1, height:4, background:"rgba(255,255,255,0.08)", borderRadius:2}}/>
        </div>
        <div className="portfolio-mock-hero" style={{background:`linear-gradient(135deg, ${item.accent}22, ${item.accent}08)`, border:`1px solid ${item.accent}30`}}>
          <div style={{fontSize:"28px"}}>{item.emoji}</div>
          <div className="portfolio-mock-line" style={{width:"120px", height:5, background:`${item.accent}50`, borderRadius:3}}/>
          <div className="portfolio-mock-line" style={{width:"80px", height:4, background:"rgba(255,255,255,0.15)", borderRadius:3}}/>
        </div>
      </div>
    </div>
  );
}

export default function Devora() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useFadeIn();

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

      {/* Mobile Nav */}
      <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
        <button className="btn-primary" style={{marginTop:8}} onClick={() => scrollTo("contact")}>Start Project</button>
      </nav>

      {/* Navbar */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">Devora</div>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="btn-primary nav-cta-desktop" onClick={() => scrollTo("contact")}>Start Project</button>
        <div className="hamburger" onClick={() => setMobileOpen(v => !v)}>
          <span style={mobileOpen ? {transform:"rotate(45deg) translate(5px,5px)"} : {}}/>
          <span style={mobileOpen ? {opacity:0} : {}}/>
          <span style={mobileOpen ? {transform:"rotate(-45deg) translate(5px,-5px)"} : {}}/>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-glow"/>
        <div className="hero-glow2"/>
        <div style={{position:"relative", zIndex:1}}>
          <div className="hero-badge fade-in">
            <div className="hero-badge-dot"/>
            Available for new projects
          </div>
          <h1 className="fade-in" style={{transitionDelay:"0.1s"}}>
            Launch a <em>premium</em> website in days, not weeks.
          </h1>
          <p className="hero-sub fade-in" style={{transitionDelay:"0.2s"}}>
            Devora builds modern, high-converting websites for restaurants, cafés, personal brands, and businesses — with premium design and fast delivery.
          </p>
          <div className="hero-ctas fade-in" style={{transitionDelay:"0.3s"}}>
            <button className="btn-secondary" onClick={() => scrollTo("services")}>View Services</button>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Start Project →</button>
          </div>
          <div className="hero-stats fade-in" style={{transitionDelay:"0.4s"}}>
            <div className="stat">
              <span className="stat-num">40+</span>
              <span className="stat-label">Projects delivered</span>
            </div>
            <div className="stat">
              <span className="stat-num">2–5</span>
              <span className="stat-label">Days average delivery</span>
            </div>
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Client satisfaction</span>
            </div>
          </div>
        </div>
        <div className="hero-visual fade-in" style={{transitionDelay:"0.2s"}}>
          <MockCard className="mock-a" colors={["rgba(138,100,255,0.15)","rgba(180,144,255,0.08)","🍽️"]}/>
          <MockCard className="mock-main" colors={["rgba(138,100,255,0.2)","rgba(77,255,158,0.08)","✦"]}/>
          <MockCard className="mock-b" colors={["rgba(74,158,255,0.15)","rgba(138,100,255,0.08)","👤"]}/>
          <div className="floating-tag ft1">
            <div className="tag-label">Status</div>
            <div className="tag-val tag-green">✓ Live in 3 days</div>
          </div>
          <div className="floating-tag ft2">
            <div className="tag-label">Design score</div>
            <div className="tag-val tag-purple">98 / 100</div>
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* VALUES */}
      <section className="value-section" id="home-values">
        <div className="value-grid">
          {VALUES.map((v, i) => (
            <div className="value-card fade-in" key={v.title} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* SERVICES */}
      <section id="services">
        <div className="section-header">
          <span className="section-tag">Services</span>
          <h2 className="section-title">What we build</h2>
          <p className="section-sub">Specialized packages designed for speed, quality, and results. Each built with the same premium standard.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card fade-in" key={s.title} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="service-emoji">{s.emoji}</div>
              <div className="service-label">{s.label}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-meta">
                <div className="service-price">{s.price}</div>
                <div className="service-time">{s.time}</div>
              </div>
              <button className="service-btn" onClick={() => scrollTo("contact")}>Start this project →</button>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* WHY DEVORA */}
      <section className="why-section" id="why">
        <div className="section-header">
          <span className="section-tag">Why Devora</span>
          <h2 className="section-title">Built different,<br/>delivered better.</h2>
          <p className="section-sub">We're not a generic agency. We're a focused team that executes with precision and cares about outcomes.</p>
        </div>
        <div className="why-grid">
          {WHY.map((w, i) => (
            <div className="why-card fade-in" key={w.title} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="why-num">0{i+1}</div>
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* PORTFOLIO */}
      <section id="work">
        <div className="section-header">
          <span className="section-tag">Work</span>
          <h2 className="section-title">Featured projects</h2>
          <p className="section-sub">A selection of recent work. Every project is unique, premium, and built with purpose.</p>
        </div>
        <div className="portfolio-grid">
          {PORTFOLIO.map((item, i) => (
            <div className={`portfolio-card fade-in ${item.tall ? "tall" : ""}`} key={item.title} style={{transitionDelay:`${i*0.12}s`}}>
              <PortfolioPreview item={item}/>
              <div className="portfolio-info">
                <div className="portfolio-tag">{item.label}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="portfolio-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* PROCESS */}
      <section className="process-section" id="process">
        <div className="section-header text-center">
          <span className="section-tag">Process</span>
          <h2 className="section-title">From idea to live<br/>in four steps.</h2>
          <p className="section-sub center">Simple, transparent, and fast. No surprises — just results.</p>
        </div>
        <div className="process-steps">
          {PROCESS.map((p, i) => (
            <div className="process-step fade-in" key={p.num} style={{transitionDelay:`${i*0.12}s`}}>
              <div className="step-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-header text-center">
          <span className="section-tag">Pricing</span>
          <h2 className="section-title">Transparent pricing,<br/>premium results.</h2>
          <p className="section-sub center">No hidden fees. No surprises. Custom projects available — just reach out.</p>
        </div>
        <div className="pricing-grid">
          {PRICING.map((p, i) => (
            <div className={`pricing-card fade-in ${p.featured ? "featured" : ""}`} key={p.title} style={{transitionDelay:`${i*0.1}s`}}>
              {p.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-label">{p.label}</div>
              <h3>{p.title}</h3>
              <div className="pricing-price">
                {p.price} <span>starting</span>
              </div>
              <p className="pricing-desc">{p.desc}</p>
              <ul className="pricing-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className={`pricing-cta ${p.featured ? "btn-primary" : "btn-secondary"}`} style={{borderRadius:"12px"}} onClick={() => scrollTo("contact")}>
                Start this project
              </button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center", marginTop:40}}>
          <p style={{color:"var(--muted)", fontSize:14}}>Need something custom? <a href="#contact" style={{color:"var(--accent2)", textDecoration:"none"}} onClick={() => scrollTo("contact")}>Let's talk →</a></p>
        </div>
      </section>

      <div className="divider"/>

      {/* FAQ */}
      <section id="faq" style={{background:"var(--bg2)"}}>
        <div className="section-header text-center">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Common questions</h2>
          <p className="section-sub center">Everything you need to know before starting a project with Devora.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div className={`faq-item fade-in ${openFaq === i ? "open" : ""}`} key={faq.q} style={{transitionDelay:`${i*0.08}s`}}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <div className="faq-icon">+</div>
              </button>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* FINAL CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-glow"/>
        <span className="section-tag" style={{display:"block", marginBottom:16}}>Let's work together</span>
        <h2 className="section-title fade-in">Ready to launch<br/>your website?</h2>
        <p className="section-sub center fade-in" style={{marginTop:16}}>
          Tell us about your project. We'll get back to you within 24 hours and start planning your premium website.
        </p>
        <div className="cta-btns fade-in">
          <a href="mailto:hello@devora.agency" style={{textDecoration:"none"}}>
            <button className="btn-primary">Start Project →</button>
          </a>
          <a href="mailto:hello@devora.agency" style={{textDecoration:"none"}}>
            <button className="btn-secondary">Contact Us</button>
          </a>
        </div>
        <p style={{marginTop:32, color:"var(--muted)", fontSize:13}}>hello@devora.agency · Response within 24 hours</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">Devora</div>
            <p>Premium websites for modern businesses. Fast delivery, exceptional design.</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              {NAV_LINKS.map(l => <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Restaurant Website</a></li>
              <li><a href="#services">Digital Menu</a></li>
              <li><a href="#services">Portfolio Website</a></li>
              <li><a href="#services">Landing Page</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@devora.agency">hello@devora.agency</a></li>
              <li><a href="#contact">Start a project</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Devora. All rights reserved.</p>
          <div className="social-links">
            {["𝕏","in","ig","be"].map(s => (
              <a key={s} className="social-link" href="#">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
