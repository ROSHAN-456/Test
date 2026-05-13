"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
:root {
  --c: #00f5ff; --c2: #00c8d4; --cg: rgba(0,245,255,0.18);
  --p: #a855f7; --pg: rgba(168,85,247,0.25);
  --gold: #fbbf24; --red: #ff3b5c; --grn: #00ff88;
  --bg: #020810; --bg2: #030c18;
  --panel: rgba(0,14,30,0.94); --pb: rgba(0,245,255,0.12);
  --txt: #b0d4e8; --dim: #3a6070;
}
.imp-root,.imp-root *,.imp-root *::before,.imp-root *::after{box-sizing:border-box;margin:0;padding:0;}
.imp-root{background:var(--bg);color:var(--txt);font-family:'Rajdhani',sans-serif;overflow-x:hidden;cursor:none;min-height:100vh;position:relative;}
.imp-root a,.imp-root button{cursor:none;}
.imp-scanlines{position:fixed;inset:0;pointer-events:none;z-index:9000;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 3px);animation:scan-move 20s linear infinite;}
@keyframes scan-move{to{background-position:0 60px;}}
.imp-gbg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(0,245,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,.018) 1px,transparent 1px);background-size:72px 72px;animation:grid-drift 40s linear infinite;}
@keyframes grid-drift{0%{transform:perspective(600px) rotateX(5deg) translateY(0);}100%{transform:perspective(600px) rotateX(5deg) translateY(72px);}}
.imp-nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:14px 48px;background:linear-gradient(180deg,rgba(2,8,16,.98) 0%,rgba(2,8,16,.4) 100%);border-bottom:1px solid rgba(0,245,255,.07);backdrop-filter:blur(12px);}
.imp-nlogo{display:flex;align-items:center;gap:10px;background:none;border:none;text-decoration:none;}
.imp-nlt{font-family:'Orbitron',monospace;font-size:16px;font-weight:900;color:#fff;letter-spacing:5px;text-shadow:0 0 24px var(--c);}
.imp-nst{display:flex;align-items:center;gap:7px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--dim);letter-spacing:2px;}
.imp-sdot{width:6px;height:6px;border-radius:50%;background:var(--grn);box-shadow:0 0 8px var(--grn);animation:blink 2.2s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
.imp-nyr{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;color:var(--c);letter-spacing:3px;text-shadow:0 0 10px var(--c);}
.imp-hud{position:fixed;font-family:'Share Tech Mono',monospace;font-size:8.5px;color:rgba(0,245,255,.3);letter-spacing:1.5px;pointer-events:none;z-index:500;line-height:1.9;}
.imp-htl{top:90px;left:22px;}.imp-htr{top:90px;right:22px;text-align:right;}.imp-hbl{bottom:46px;left:22px;}.imp-hbr{bottom:46px;right:22px;text-align:right;}
.imp-page{position:relative;z-index:10;min-height:100vh;opacity:0;transform:translateY(18px);transition:opacity .5s cubic-bezier(.4,0,.2,1),transform .5s cubic-bezier(.4,0,.2,1);display:none;flex-direction:column;}
.imp-page.visible{opacity:1;transform:translateY(0);}
.imp-hero{text-align:center;position:relative;padding:54px 24px 30px;z-index:10;width:100%;max-width:1100px;margin:0 auto;pointer-events:none;}
.imp-hero button,.imp-hero a{pointer-events:auto;}
.imp-h-ather{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;letter-spacing:8px;color:#fff;margin-bottom:22px;display:flex;align-items:center;justify-content:center;gap:14px;animation:fadeUp .9s ease both;text-shadow:0 0 10px rgba(0,245,255,1),0 0 24px rgba(0,245,255,.75),0 0 52px rgba(0,245,255,.4),0 0 90px rgba(0,200,255,.2);}
.imp-aico{width:18px;height:18px;border:1px solid var(--c);transform:rotate(45deg);display:inline-flex;align-items:center;justify-content:center;box-shadow:0 0 8px var(--c);font-size:8px;color:var(--c);}
.imp-htitle{font-family:'Orbitron',monospace;font-size:clamp(72px,12vw,160px);font-weight:900;line-height:.9;color:#fff;letter-spacing:8px;text-transform:uppercase;animation:fadeDown 1s ease .15s both;}
.imp-gt{text-shadow:0 0 32px rgba(0,245,255,.9),0 0 64px rgba(0,245,255,.45),0 0 128px rgba(0,245,255,.18);animation:title-flicker 6s ease-in-out infinite;}
@keyframes title-flicker{0%,100%{text-shadow:0 0 32px rgba(0,245,255,.9),0 0 64px rgba(0,245,255,.45);}89%,92%{text-shadow:0 0 32px rgba(0,245,255,.9),0 0 64px rgba(0,245,255,.45);}90%{text-shadow:0 0 6px rgba(0,245,255,.2);}}
.imp-hsub{font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:500;letter-spacing:7px;color:var(--c);text-transform:uppercase;margin-top:12px;animation:fadeUp .9s ease .35s both;}
.imp-htag{font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--dim);letter-spacing:3px;margin-top:14px;animation:fadeUp .9s ease .5s both;}
.imp-hcta{display:flex;gap:18px;justify-content:center;margin-top:42px;animation:fadeUp .9s ease .65s both;}
.imp-btnp{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:14px 42px;background:var(--c);color:var(--bg);border:none;clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);transition:all .22s;box-shadow:0 0 32px rgba(0,245,255,.5);display:inline-block;}
.imp-btnp:hover{box-shadow:0 0 60px rgba(0,245,255,.9);transform:translateY(-2px);}
.imp-hcd{display:flex;gap:0;justify-content:center;margin-top:38px;animation:fadeUp .9s ease .8s both;}
.imp-cdi{text-align:center;padding:0 24px;border-right:1px solid rgba(0,245,255,.12);}
.imp-cdi:last-child{border-right:none;}
.imp-cdn{font-family:'Orbitron',monospace;font-size:38px;font-weight:700;color:var(--c);text-shadow:0 0 20px var(--c);display:block;line-height:1;}
.imp-cdl{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:3px;color:var(--dim);text-transform:uppercase;margin-top:5px;display:block;}
.imp-ticker-wrap{width:100%;overflow:hidden;background:rgba(0,245,255,.03);border-top:1px solid rgba(0,245,255,.07);padding:9px 0;position:relative;z-index:10;}
.imp-ticker{display:flex;gap:52px;white-space:nowrap;animation:tick 36s linear infinite;font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--dim);letter-spacing:2px;}
@keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.imp-tsp{color:var(--c);}
.imp-apanel{background:var(--panel);border:1px solid var(--pb);padding:38px 34px;position:relative;backdrop-filter:blur(20px);display:flex;flex-direction:column;overflow:hidden;}
.imp-apanel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--c),transparent);animation:sweep-line 4s ease-in-out infinite;}
@keyframes sweep-line{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.imp-apanel::after{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,245,255,.012) 4px,rgba(0,245,255,.012) 5px);}
.imp-pc{position:absolute;width:18px;height:18px;border-color:var(--c);border-style:solid;opacity:.6;}
.imp-pc-tl{top:0;left:0;border-width:2px 0 0 2px;}.imp-pc-bl{bottom:0;left:0;border-width:0 0 2px 2px;}.imp-pc-tr{top:0;right:0;border-width:2px 2px 0 0;}.imp-pc-br{bottom:0;right:0;border-width:0 2px 2px 0;}
.imp-apt{font-family:'Orbitron',monospace;font-size:22px;font-weight:700;letter-spacing:5px;text-transform:uppercase;margin-bottom:4px;}
.imp-aps{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:3px;color:var(--dim);text-transform:uppercase;margin-bottom:28px;}
.imp-flabel{display:block;font-family:'Share Tech Mono',monospace;font-size:9px;font-weight:600;letter-spacing:3px;color:var(--c);margin-bottom:7px;text-transform:uppercase;}
.imp-fg{margin-bottom:18px;}
.imp-iw{position:relative;}
.imp-iico{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;opacity:.35;}
.imp-finput{width:100%;background:rgba(0,0,0,.55);border:1px solid rgba(0,245,255,.14);color:var(--txt);font-family:'Rajdhani',sans-serif;font-size:14px;padding:11px 12px 11px 38px;outline:none;transition:border-color .2s,box-shadow .2s;font-weight:500;}
.imp-finput:focus{border-color:var(--c);box-shadow:0 0 18px rgba(0,245,255,.15),inset 0 0 8px rgba(0,245,255,.04);background:rgba(0,245,255,.025);}
.imp-finput::placeholder{color:var(--dim);}
.imp-iw::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--c);transition:width .35s ease;}
.imp-iw:focus-within::after{width:100%;}
.imp-flink{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--c);text-decoration:none;display:block;text-align:right;margin-top:6px;opacity:.55;transition:opacity .2s;background:none;border:none;letter-spacing:1px;}
.imp-flink:hover{opacity:1;}
.imp-btnauth{width:100%;font-family:'Orbitron',monospace;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;padding:14px 20px;border:none;transition:all .22s;position:relative;overflow:hidden;margin-top:16px;display:flex;align-items:center;justify-content:center;}
.imp-btnauth::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .4s;}
.imp-btnauth:hover::before{left:100%;}
.imp-btnc{background:var(--c);color:var(--bg);box-shadow:0 0 32px rgba(0,245,255,.4);}
.imp-btnc:hover{box-shadow:0 0 56px rgba(0,245,255,.8);transform:translateY(-1px);}
.imp-alert{display:none;background:rgba(255,59,92,.08);border:1px solid rgba(255,59,92,.3);color:var(--red);font-family:'Share Tech Mono',monospace;font-size:9.5px;padding:9px 12px;margin-bottom:16px;letter-spacing:1px;}
.imp-succ{display:none;background:rgba(0,255,136,.07);border:1px solid rgba(0,255,136,.3);color:var(--grn);font-family:'Share Tech Mono',monospace;font-size:9.5px;padding:9px 12px;margin-bottom:16px;letter-spacing:1px;}
.imp-show{display:block!important;}
.imp-aclogo{font-family:'Orbitron',monospace;font-size:30px;font-weight:900;color:#fff;letter-spacing:5px;text-shadow:0 0 40px var(--c),0 0 80px rgba(0,245,255,.2);text-align:center;margin-top:14px;animation:title-flicker 5s ease-in-out infinite;}
.imp-acsub{font-family:'Rajdhani',sans-serif;font-size:10px;letter-spacing:4px;color:var(--c);text-transform:uppercase;text-align:center;margin-top:7px;}
.imp-backlink{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--c);letter-spacing:2px;transition:opacity .2s;opacity:.6;background:none;border:none;}
.imp-backlink:hover{opacity:1;}
#imp-loader{position:fixed;inset:0;z-index:99990;background:#000208;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;transition:opacity 1.8s ease;}
#imp-loader.fade-out{opacity:0;pointer-events:none;}
#imp-loader-title{position:absolute;top:42px;left:50%;transform:translateX(-50%);font-family:'Orbitron',monospace;font-size:clamp(22px,3.2vw,34px);font-weight:900;color:#fff;letter-spacing:10px;z-index:10;text-shadow:0 0 50px rgba(0,245,255,1),0 0 100px rgba(0,245,255,.5);white-space:nowrap;animation:title-flicker 4s ease-in-out infinite;}
#imp-loader-sub{position:absolute;top:98px;left:50%;transform:translateX(-50%);font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:5px;color:rgba(0,245,255,.4);z-index:10;white-space:nowrap;}
#imp-loader-status{position:absolute;top:128px;left:50%;transform:translateX(-50%);font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:2px;color:rgba(0,255,136,.8);z-index:10;white-space:nowrap;min-width:320px;text-align:center;transition:opacity .3s;}
#imp-hold-btn{position:absolute;bottom:98px;left:50%;transform:translateX(-50%);z-index:10;font-family:'Orbitron',monospace;font-size:11px;font-weight:700;letter-spacing:4px;color:var(--bg);background:var(--c);border:none;padding:14px 52px;clip-path:polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%);box-shadow:0 0 36px rgba(0,245,255,.75),0 0 72px rgba(0,245,255,.3);user-select:none;touch-action:none;transition:box-shadow .15s,transform .15s;}
#imp-hold-btn.held{box-shadow:0 0 100px rgba(0,245,255,1),0 0 200px rgba(0,245,255,.6);transform:translateX(-50%) scale(1.06);}
.imp-btn-ring{position:absolute;inset:-10px;border:1.5px solid rgba(0,245,255,.45);clip-path:polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%);animation:ring-pulse 1.5s ease-in-out infinite;pointer-events:none;}
@keyframes ring-pulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.9;transform:scale(1.08)}}
#imp-hold-hint{position:absolute;bottom:74px;left:50%;transform:translateX(-50%);font-family:'Share Tech Mono',monospace;font-size:8.5px;letter-spacing:3px;color:rgba(0,245,255,.4);white-space:nowrap;z-index:10;}
#imp-loader-bar-wrap{position:absolute;bottom:38px;left:50%;transform:translateX(-50%);width:380px;z-index:10;}
#imp-loader-bar-label{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:3px;color:rgba(0,245,255,.5);text-align:center;margin-bottom:7px;}
#imp-loader-bar-track{width:100%;height:2px;background:rgba(0,245,255,.08);position:relative;}
#imp-loader-bar-fill{height:100%;background:linear-gradient(90deg,var(--p),var(--c));box-shadow:0 0 12px var(--c);transition:width .08s linear;}
#imp-loader-bar-seg{position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(90deg,transparent,transparent 31px,rgba(0,0,0,.5) 31px,rgba(0,0,0,.5) 32px);}
#imp-warp-overlay{position:absolute;inset:0;z-index:20;pointer-events:none;}
@keyframes fadeUp{from{opacity:0;transform:translateY(-14px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeDown{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
`;

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const barPctRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current, warpC = warpRef.current;
    const btn = btnRef.current, barFill = barFillRef.current;
    const barPct = barPctRef.current, statusEl = statusRef.current;
    if (!canvas || !warpC) return;
    const ctx = canvas.getContext("2d")!;
    const warpCtx = warpC.getContext("2d")!;
    let W = 0, H = 0;
    const resize = () => { W = canvas.width = warpC.width = window.innerWidth; H = canvas.height = warpC.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);

    const TOTAL_DUR = 28000, BASE_SPD = 1 / TOTAL_DUR, HELD_SPD = BASE_SPD * 14;
    let held = false, progress = 0, done = false;
    const STATUSES = ["▸ INITIALIZING NEURAL CORTEX...","▸ LOADING MOTOR SYSTEMS...","▸ CALIBRATING OPTICAL SENSORS...","▸ ACTIVATING POWER CORE...","▸ SYNCING HOLOGRAPHIC HUD...","▸ RUNNING THREAT ASSESSMENT...","▸ CIRCUIT MATRIX ONLINE...","▸ AI CONSCIOUSNESS BOOTING...","✓ UNIT ONLINE — ENTERING IMPERIUM"];
    let lastStatIdx = -1;
    const updateStatus = () => {
      if (!statusEl) return;
      const idx = Math.min(Math.floor(progress * (STATUSES.length - 1)), STATUSES.length - 2);
      if (progress >= 0.98) { statusEl.textContent = STATUSES[STATUSES.length - 1]; }
      else if (idx !== lastStatIdx) { statusEl.style.opacity = "0"; setTimeout(() => { if (statusEl) { statusEl.textContent = STATUSES[idx]; statusEl.style.opacity = "1"; } }, 140); lastStatIdx = idx; }
    };

    let robotPulse = 0, eyeFlicker = 0, circuitPhase = 0;
    const circuitSparks: any[] = [];

    function drawLabFloor() {
      const fy = H * 0.82; ctx.save();
      ctx.strokeStyle = "rgba(0,245,255,0.06)"; ctx.lineWidth = 0.7;
      const vp = { x: W * 0.5, y: fy - H * 0.12 };
      for (let c = 0; c <= 22; c++) { const bx = W * (c / 22); ctx.beginPath(); ctx.moveTo(bx, fy + 80); ctx.lineTo(vp.x, vp.y); ctx.stroke(); }
      for (let r = 1; r <= 10; r++) { const t = r / 10; const lx = vp.x + (0 - vp.x) * t, rx = vp.x + (W - vp.x) * t, ly = vp.y + (fy + 80 - vp.y) * t; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ly); ctx.stroke(); }
      const fg = ctx.createRadialGradient(W * 0.5, fy, 0, W * 0.5, fy, W * 0.45);
      fg.addColorStop(0, "rgba(0,245,255,0.06)"); fg.addColorStop(1, "transparent");
      ctx.fillStyle = fg; ctx.fillRect(0, fy - 20, W, 120); ctx.restore();
    }

    function drawVolumetricLight(prog: number) {
      ctx.save(); const cx2 = W * 0.5, ty = H * 0.05, beamA = 0.06 + prog * 0.14;
      const bg2 = ctx.createLinearGradient(cx2, ty, cx2, H * 0.7);
      bg2.addColorStop(0, `rgba(0,245,255,${beamA})`); bg2.addColorStop(0.3, `rgba(0,180,255,${beamA * 0.4})`); bg2.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.moveTo(cx2 - 8, ty); ctx.lineTo(cx2 + 8, ty); ctx.lineTo(cx2 + W * 0.22, H * 0.75); ctx.lineTo(cx2 - W * 0.22, H * 0.75); ctx.closePath(); ctx.fillStyle = bg2; ctx.fill(); ctx.restore();
    }

    function drawRobot(prog: number, isHeld: boolean) {
      robotPulse += 0.04 * (isHeld ? 2.5 : 1); eyeFlicker += 0.12; circuitPhase += 0.025 * (isHeld ? 3 : 1);
      const cx2 = W * 0.5, baseY = H * 0.78, S = Math.min(W, H) * 0.44 * Math.min(1, 0.25 + prog * 1.05);
      const ep = 0.5 + 0.5 * Math.sin(robotPulse * 2);
      const eyeA = prog > 0.12 ? Math.min(1, (prog - 0.12) / 0.18) * (0.9 + 0.1 * Math.sin(eyeFlicker)) : 0;
      const eyeCol = isHeld ? "0,255,220" : "0,220,255";
      const circA = Math.min(1, prog * 2.8);
      const by = -S * 0.02;

      // Ground glow
      const refG = ctx.createRadialGradient(cx2, baseY + 10, 0, cx2, baseY + 10, S * 0.6 * 1.3);
      refG.addColorStop(0, `rgba(${eyeCol},${0.18 * ep})`); refG.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.ellipse(cx2, baseY + 12, S * 0.6 * 1.3, S * 0.6 * 0.28, 0, 0, Math.PI * 2); ctx.fillStyle = refG; ctx.fill();

      ctx.save(); ctx.translate(cx2, baseY);

      // Legs
      [[-1], [1]].forEach(([fl]) => {
        const lx = fl * S * 0.155, ly = by;
        const thG = ctx.createLinearGradient(lx - S * 0.08, ly - S * 0.44, lx + S * 0.08, ly - S * 0.14);
        thG.addColorStop(0, fl > 0 ? "#2a3d55" : "#1c2e44"); thG.addColorStop(0.4, "#0e1e30"); thG.addColorStop(1, "#070f1c");
        ctx.beginPath(); ctx.roundRect(lx - S * 0.075, ly - S * 0.44, S * 0.145, S * 0.3, [6, 6, 3, 3]); ctx.fillStyle = thG; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.28)`; ctx.lineWidth = 0.9; ctx.stroke();
        const kc = ctx.createRadialGradient(lx, ly - S * 0.14, 0, lx, ly - S * 0.14, S * 0.06);
        kc.addColorStop(0, "#2a4060"); kc.addColorStop(1, "#050d18");
        ctx.beginPath(); ctx.arc(lx, ly - S * 0.14, S * 0.052, 0, Math.PI * 2); ctx.fillStyle = kc; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.6)`; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(lx - S * 0.07, ly - S * 0.13, S * 0.13, S * 0.27, [3, 3, 4, 4]); ctx.fillStyle = "#0c1824"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.2)`; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(lx - S * 0.1, ly + S * 0.12, S * 0.2, S * 0.08, [2, 2, 4, 4]); ctx.fillStyle = "#18283e"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.4)`; ctx.lineWidth = 1; ctx.stroke();
        if (prog > 0.3) { ctx.fillStyle = `rgba(${eyeCol},${0.3 * ep})`; ctx.shadowColor = `rgba(${eyeCol},1)`; ctx.shadowBlur = 6; ctx.fillRect(lx - S * 0.09, ly + S * 0.195, S * 0.18, 1.5); ctx.shadowBlur = 0; }
      });

      // Torso
      const torsoY = by - S * 0.46, torsoH = S * 0.4, torsoW = S * 0.4;
      const tG = ctx.createLinearGradient(-torsoW * 0.55, torsoY, torsoW * 0.55, torsoY + torsoH);
      tG.addColorStop(0, "#1e3350"); tG.addColorStop(0.5, "#0c1e32"); tG.addColorStop(1, "#050e1c");
      ctx.beginPath(); ctx.roundRect(-torsoW * 0.5, torsoY, torsoW, torsoH, [8, 8, 5, 5]); ctx.fillStyle = tG; ctx.fill();
      ctx.strokeStyle = `rgba(${eyeCol},0.35)`; ctx.lineWidth = 1.3; ctx.stroke();

      // Power core
      if (prog > 0.25) {
        const cA = Math.min(1, (prog - 0.25) / 0.25), coreY = torsoY + torsoH * 0.38;
        const cHalo = ctx.createRadialGradient(0, coreY, 0, 0, coreY, S * 0.18);
        cHalo.addColorStop(0, `rgba(${eyeCol},${cA * 0.55 * (0.7 + 0.3 * ep)})`); cHalo.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(0, coreY, S * 0.18, 0, Math.PI * 2); ctx.fillStyle = cHalo; ctx.fill();
        ctx.beginPath(); ctx.arc(0, coreY, S * 0.085, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${eyeCol},${cA * 0.9})`; ctx.lineWidth = 1.5; ctx.shadowColor = `rgba(${eyeCol},1)`; ctx.shadowBlur = 16 * cA; ctx.stroke(); ctx.shadowBlur = 0;
        const cInner = ctx.createRadialGradient(0, coreY, 0, 0, coreY, S * 0.038);
        cInner.addColorStop(0, "rgba(255,255,255,1)"); cInner.addColorStop(0.4, `rgba(${eyeCol},0.9)`); cInner.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(0, coreY, S * 0.038, 0, Math.PI * 2); ctx.fillStyle = cInner; ctx.fill();
      }

      // Arms
      [[-1], [1]].forEach(([fl]) => {
        const ax = fl * (torsoW * 0.5 + S * 0.045), shY = torsoY + S * 0.06;
        ctx.beginPath(); ctx.arc(ax, shY, S * 0.072, 0, Math.PI * 2); ctx.fillStyle = "#0d1e30"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.5)`; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.save(); ctx.translate(ax, shY); ctx.rotate(fl * (0.1 + 0.03 * Math.sin(robotPulse * 0.6)));
        ctx.beginPath(); ctx.roundRect(-S * 0.058, 0, S * 0.108, S * 0.28, [5, 5, 3, 3]); ctx.fillStyle = "#0d1828"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.22)`; ctx.lineWidth = 0.9; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(-S * 0.05, S * 0.28, S * 0.095, S * 0.24, [3, 3, 4, 4]); ctx.fillStyle = "#111e30"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.2)`; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(-S * 0.062, S * 0.51, S * 0.12, S * 0.095, [4, 4, 6, 6]); ctx.fillStyle = "#0c1828"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.45)`; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      });

      // Head
      const headY = torsoY - S * 0.3, headW = S * 0.34, headH = S * 0.26;
      const hG = ctx.createLinearGradient(-headW * 0.5, headY, headW * 0.5, headY + headH);
      hG.addColorStop(0, "#1e3254"); hG.addColorStop(0.65, "#0c1b32"); hG.addColorStop(1, "#06101e");
      ctx.beginPath(); ctx.roundRect(-headW * 0.5, headY, headW, headH, [14, 14, 8, 8]); ctx.fillStyle = hG; ctx.fill();
      ctx.strokeStyle = `rgba(${eyeCol},0.45)`; ctx.lineWidth = 1.4; ctx.stroke();

      // Antenna
      ctx.beginPath(); ctx.moveTo(0, headY - S * 0.01); ctx.lineTo(0, headY - S * 0.1);
      ctx.strokeStyle = `rgba(${eyeCol},0.5)`; ctx.lineWidth = 1.2; ctx.stroke();
      if (prog > 0.45) {
        ctx.beginPath(); ctx.arc(0, headY - S * 0.1, S * 0.015, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${eyeCol},${0.8 + 0.2 * Math.sin(eyeFlicker * 2)})`;
        ctx.shadowColor = `rgba(${eyeCol},1)`; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
      }

      // Eyes
      const eyeY = headY + headH * 0.38;
      [[-1], [1]].forEach(([fl]) => {
        const ex2 = fl * headW * 0.26;
        ctx.beginPath(); ctx.roundRect(ex2 - S * 0.065, eyeY - S * 0.035, S * 0.12, S * 0.065, 5); ctx.fillStyle = "#020810"; ctx.fill();
        ctx.strokeStyle = `rgba(${eyeCol},0.35)`; ctx.lineWidth = 0.9; ctx.stroke();
        if (eyeA > 0) {
          const eyeG2 = ctx.createRadialGradient(ex2, eyeY, 0, ex2, eyeY, S * 0.06);
          eyeG2.addColorStop(0, "rgba(255,255,255,1)"); eyeG2.addColorStop(0.2, `rgba(${eyeCol},${eyeA})`); eyeG2.addColorStop(1, "transparent");
          ctx.save(); ctx.beginPath(); ctx.roundRect(ex2 - S * 0.06, eyeY - S * 0.03, S * 0.11, S * 0.06, 4); ctx.clip();
          ctx.beginPath(); ctx.arc(ex2, eyeY, S * 0.06, 0, Math.PI * 2); ctx.fillStyle = eyeG2; ctx.fill(); ctx.restore();
          ctx.shadowColor = `rgba(${eyeCol},1)`; ctx.shadowBlur = 20 * eyeA;
          ctx.beginPath(); ctx.arc(ex2, eyeY, S * 0.018, 0, Math.PI * 2); ctx.fillStyle = `rgba(${eyeCol},${eyeA})`; ctx.fill(); ctx.shadowBlur = 0;
        }
      });

      // Body glow
      if (prog > 0.18) {
        const ga = Math.min(1, (prog - 0.18) / 0.45) * 0.14 * (0.65 + 0.35 * ep);
        const bodyG2 = ctx.createRadialGradient(0, torsoY + torsoH * 0.5, 0, 0, torsoY + torsoH * 0.5, S * 0.9);
        bodyG2.addColorStop(0, `rgba(${eyeCol},${ga})`); bodyG2.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(0, torsoY + torsoH * 0.5, S * 0.9, 0, Math.PI * 2); ctx.fillStyle = bodyG2; ctx.fill();
      }
      ctx.restore();
    }

    let endPhase = 0;
    function drawPortalEnd(dt: number) {
      endPhase = Math.min(1, endPhase + dt * 0.003);
      warpCtx.clearRect(0, 0, W, H);
      const cx2 = W * 0.5, cy2 = H * 0.5, mR = Math.max(W, H) * 0.95;
      for (let i = 0; i < 12; i++) {
        const r = mR * ((endPhase + i * 0.085) % 1), a = (1 - (endPhase + i * 0.085) % 1) * 0.75;
        warpCtx.beginPath(); warpCtx.arc(cx2, cy2, r, 0, Math.PI * 2);
        warpCtx.strokeStyle = i % 2 === 0 ? `rgba(0,245,255,${a})` : `rgba(168,85,247,${a * 0.7})`;
        warpCtx.lineWidth = 2.5 - r / mR * 2.2; warpCtx.stroke();
      }
      if (endPhase > 0.55) {
        const tp = (endPhase - 0.55) / 0.45;
        warpCtx.save(); warpCtx.globalAlpha = tp;
        warpCtx.font = `900 ${Math.min(W * 0.11, 76)}px Orbitron,monospace`;
        warpCtx.textAlign = "center"; warpCtx.textBaseline = "middle";
        warpCtx.fillStyle = `rgba(255,255,255,${tp})`;
        warpCtx.shadowColor = "rgba(0,245,255,1)"; warpCtx.shadowBlur = 50 * tp;
        warpCtx.fillText("UNIT ONLINE", cx2, cy2 - 48 * tp);
        warpCtx.fillText("IMPERIUM", cx2, cy2 + 12 * tp); warpCtx.restore();
      }
      return endPhase >= 1;
    }

    let lastT = 0, rafId = 0;
    function frame(ts: number) {
      const dt = Math.min(ts - lastT, 50); lastT = ts;
      if (!done) progress = Math.min(1, progress + (held ? HELD_SPD : BASE_SPD) * dt);
      const pct = Math.round(progress * 100);
      if (barFill) barFill.style.width = pct + "%";
      if (barPct) barPct.textContent = String(pct);
      updateStatus();
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.9);
      bg.addColorStop(0, "#04101e"); bg.addColorStop(0.75, "#01060e"); bg.addColorStop(1, "#000306");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      drawVolumetricLight(progress); drawLabFloor(); drawRobot(progress, held);
      if (progress >= 1 && !done) { done = true; startEnd(); return; }
      rafId = requestAnimationFrame(frame);
    }

    function startEnd() {
      let prev = 0;
      function ef(ts: number) {
        const dt = Math.min(ts - prev, 50) / 1000; prev = ts;
        ctx.clearRect(0, 0, W, H);
        const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
        bg.addColorStop(0, "#04101e"); bg.addColorStop(1, "#000306"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        drawVolumetricLight(1); drawLabFloor(); drawRobot(1.0, false);
        const fin = drawPortalEnd(dt * 1000);
        if (fin) { const el = document.getElementById("imp-loader"); if (el) el.classList.add("fade-out"); setTimeout(() => onDone(), 1800); }
        else requestAnimationFrame(ef);
      }
      requestAnimationFrame(ef);
    }

    const setHeld = (v: boolean) => { held = v; if (btn) v ? btn.classList.add("held") : btn.classList.remove("held"); };
    const md = () => setHeld(true), mu = () => setHeld(false);
    const ts2 = (e: TouchEvent) => { e.preventDefault(); setHeld(true); };
    if (btn) { btn.addEventListener("mousedown", md); btn.addEventListener("touchstart", ts2, { passive: false }); }
    window.addEventListener("mouseup", mu); window.addEventListener("touchend", mu);
    rafId = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); window.removeEventListener("mouseup", mu); window.removeEventListener("touchend", mu); };
  }, [onDone]);

  return (
    <div id="imp-loader">
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div id="imp-loader-title">IMPERIUM</div>
      <div id="imp-loader-sub">INITIALIZING NEURAL UPLINK · 2080</div>
      <div id="imp-loader-status" ref={statusRef}>▸ SCANNING SECTOR ALPHA...</div>
      <canvas ref={warpRef} id="imp-warp-overlay" />
      <button id="imp-hold-btn" ref={btnRef}><span className="imp-btn-ring"></span>HOLD TO ACCELERATE</button>
      <div id="imp-hold-hint">PRESS &amp; HOLD · PLASMA BOOST ENGAGED</div>
      <div id="imp-loader-bar-wrap">
        <div id="imp-loader-bar-label">APPROACH VECTOR: <span ref={barPctRef}>0</span>%</div>
        <div id="imp-loader-bar-track"><div id="imp-loader-bar-fill" ref={barFillRef} style={{ width: "0%" }}></div><div id="imp-loader-bar-seg"></div></div>
      </div>
    </div>
  );
}

// ─── SPACE BACKGROUND ─────────────────────────────────────────────────────────
function CinematicSpace() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = 0, H = 0, rafId = 0;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    const onMouse = (e: MouseEvent) => { tmx = e.clientX / window.innerWidth; tmy = e.clientY / window.innerHeight; };
    window.addEventListener("mousemove", onMouse, { passive: true });
    const mkStars = (n: number, rMin: number, rMax: number, aMin: number, aMax: number, parallax: number) =>
      Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), r: rMin + Math.random() * (rMax - rMin), a: aMin + Math.random() * (aMax - aMin), tp: Math.random() * Math.PI * 2, ts: 0.3 + Math.random() * 0.8, parallax, col: Math.random() > 0.9 ? "200,180,255" : "255,255,255" }));
    const starsDeep = mkStars(300, 0.2, 0.8, 0.15, 0.55, 0.004);
    const starsMid = mkStars(150, 0.5, 1.4, 0.25, 0.75, 0.012);
    const starsNear = mkStars(50, 1.2, 2.8, 0.4, 0.9, 0.028);
    const NEBS = [{ x: .18, y: .22, rx: .55, ry: .28, col: "20,0,60", a: .055, phase: 0 }, { x: .82, y: .15, rx: .48, ry: .32, col: "0,20,80", a: .065, phase: 1.2 }, { x: .5, y: .7, rx: .62, ry: .25, col: "40,0,100", a: .045, phase: 2.4 }];
    const meteors: any[] = [];
    let lastMeteor = 0;
    let lastT2 = 0;
    function frame(ts: number) {
      const dt = Math.min((ts - lastT2) / 1000, 0.05); lastT2 = ts; const t = ts / 1000;
      mx += (tmx - mx) * 0.055; my += (tmy - my) * 0.055;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 1.1);
      bg.addColorStop(0, "#020818"); bg.addColorStop(0.7, "#000408"); bg.addColorStop(1, "#000205");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      NEBS.forEach(n => {
        n.phase += 0.00008 * dt * 60;
        const nx = (n.x + Math.sin(n.phase) * 0.015 + (mx - 0.5) * 0.03) * W;
        const ny = (n.y + Math.cos(n.phase * 0.7) * 0.01 + (my - 0.5) * 0.02) * H;
        ctx.save();
        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.rx * W);
        ng.addColorStop(0, `rgba(${n.col},${n.a * 2.2})`); ng.addColorStop(0.4, `rgba(${n.col},${n.a})`); ng.addColorStop(1, "transparent");
        ctx.translate(nx, ny); ctx.scale(1, n.ry / n.rx); ctx.beginPath(); ctx.arc(0, 0, n.rx * W, 0, Math.PI * 2); ctx.fillStyle = ng; ctx.fill(); ctx.restore();
      });
      [starsDeep, starsMid, starsNear].forEach(layer => {
        layer.forEach((st: any) => {
          st.tp += dt * st.ts;
          const twinkle = 0.55 + 0.45 * Math.sin(st.tp);
          const sx = ((st.x + (mx - 0.5) * -st.parallax) % 1 + 1) % 1;
          ctx.beginPath(); ctx.arc(sx * W, st.y * H, st.r * twinkle, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${st.col},${st.a * twinkle})`; ctx.fill();
        });
      });
      if (t - lastMeteor > 3 + Math.random() * 6) {
        lastMeteor = t;
        if (meteors.length < 4) { const angle = Math.PI / 6 + Math.random() * Math.PI / 6; meteors.push({ x: Math.random() * W, y: -30, vx: Math.cos(angle) * 12, vy: Math.sin(angle) * 12, len: 100 + Math.random() * 150, life: 0, maxLife: 0.7 + Math.random() * 0.6 }); }
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]; m.life += dt; m.x += m.vx * dt * 60; m.y += m.vy * dt * 60;
        const lp = m.life / m.maxLife, alpha = lp < 0.15 ? lp / 0.15 : lp > 0.7 ? (1 - (lp - 0.7) / 0.3) : 1;
        const ang = Math.atan2(m.vy, m.vx);
        const mg = ctx.createLinearGradient(m.x, m.y, m.x - Math.cos(ang) * m.len, m.y - Math.sin(ang) * m.len);
        mg.addColorStop(0, `rgba(200,220,255,${alpha * 0.9})`); mg.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - Math.cos(ang) * m.len, m.y - Math.sin(ang) * m.len);
        ctx.strokeStyle = mg; ctx.lineWidth = 1.5 + alpha; ctx.stroke();
        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.3, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
      vig.addColorStop(0, "transparent"); vig.addColorStop(0.7, "rgba(0,0,8,0.18)"); vig.addColorStop(1, "rgba(0,0,16,0.72)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

// ─── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const label = document.createElement("div");
    label.style.cssText = `position:fixed;pointer-events:none;z-index:1000000;font-family:'Share Tech Mono',monospace;font-size:8px;color:rgba(0,245,255,.5);letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;`;
    label.textContent = "SYS.TRACK"; document.body.appendChild(label);
    const S: any = { mx: 0, my: 0, ox: 0, oy: 0, ix: 0, iy: 0, vx: 0, vy: 0, mode: "default", sparks: [], ringAngle: 0, magnetX: 0, magnetY: 0 };
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize, { passive: true });
    const onMove = (e: MouseEvent) => {
      S.vx = e.clientX - S.mx; S.vy = e.clientY - S.my; S.mx = e.clientX; S.my = e.clientY;
      let node: Element | null = document.elementFromPoint(e.clientX, e.clientY);
      let mode = "default";
      for (let i = 0; i < 4 && node; i++, node = node.parentElement) { const t = node.tagName?.toLowerCase() || ""; if (t === "button") { mode = "button"; break; } if (t === "a") { mode = "link"; break; } }
      S.mode = mode; label.style.transform = `translate3d(${e.clientX + 18}px,${e.clientY + 14}px,0)`;
      label.textContent = { default: "SYS.TRACK", button: "ACTIVATE", link: "NAVIGATE" }[mode] || "SYS.TRACK";
      S.magnetX = e.clientX; S.magnetY = e.clientY;
      const spd = Math.hypot(S.vx, S.vy);
      if (spd > 8) { const ang = Math.atan2(S.vy, S.vx); S.sparks.push({ x: e.clientX, y: e.clientY, vx: -Math.cos(ang) * (1.5 + Math.random() * 3), vy: -Math.sin(ang) * (1.5 + Math.random() * 3), life: 1, maxLife: 0.3 + Math.random() * 0.3, r: 1 + Math.random() * 2, col: Math.random() > 0.5 ? "0,245,255" : "138,46,255" }); }
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    let rafId = 0;
    function frame(ts: number) {
      const t = ts / 1000; ctx.clearRect(0, 0, canvas.width, canvas.height);
      S.ix += (S.magnetX - S.ix) * 0.28; S.iy += (S.magnetY - S.iy) * 0.28;
      S.ox += (S.magnetX - S.ox) * 0.13; S.oy += (S.magnetY - S.oy) * 0.13;
      const outerR = S.mode === "button" ? 38 : 26, coreR = S.mode === "button" ? 7 : 5;
      S.ringAngle += 0.016 * (2.2 + (S.mode === "button" ? 1.5 : 0));
      const glowR = outerR + 28;
      const gG = ctx.createRadialGradient(S.ox, S.oy, 0, S.ox, S.oy, glowR);
      gG.addColorStop(0, "rgba(0,245,255,0.065)"); gG.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(S.ox, S.oy, glowR, 0, Math.PI * 2); ctx.fillStyle = gG; ctx.fill();
      ctx.save(); ctx.translate(S.ox, S.oy); ctx.rotate(S.ringAngle);
      for (let i = 0; i < 4; i++) { const sa = (i / 4) * Math.PI * 2, ea = sa + (Math.PI * 2 / 4) * 0.56; ctx.beginPath(); ctx.arc(0, 0, outerR, sa, ea); ctx.strokeStyle = "rgba(0,245,255,.85)"; ctx.lineWidth = 1.4; ctx.shadowColor = "rgba(0,245,255,1)"; ctx.shadowBlur = 9; ctx.stroke(); } ctx.restore();
      ctx.save(); ctx.translate(S.ix, S.iy);
      const cG = ctx.createRadialGradient(-coreR * 0.3, -coreR * 0.3, 0, 0, 0, coreR);
      cG.addColorStop(0, "#fff"); cG.addColorStop(0.4, "#00f5ff"); cG.addColorStop(1, "#0077ff");
      ctx.beginPath(); ctx.arc(0, 0, coreR, 0, Math.PI * 2); ctx.fillStyle = cG; ctx.shadowColor = "#00f5ff"; ctx.shadowBlur = 18; ctx.fill(); ctx.restore();
      for (let i = S.sparks.length - 1; i >= 0; i--) { const sp = S.sparks[i]; sp.x += sp.vx; sp.y += sp.vy; sp.vy += 0.07; sp.life -= 0.016 / sp.maxLife; if (sp.life <= 0) { S.sparks.splice(i, 1); continue; } ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * sp.life, 0, Math.PI * 2); ctx.fillStyle = `rgba(${sp.col},${sp.life * 0.9})`; ctx.shadowColor = `rgb(${sp.col})`; ctx.shadowBlur = 6; ctx.fill(); }
      ctx.shadowBlur = 0; rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rafId); document.removeEventListener("mousemove", onMove); window.removeEventListener("resize", resize); label.remove(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999999, width: "100%", height: "100%" }} />;
}

// ─── HUD TIME ─────────────────────────────────────────────────────────────────
function HudTime() {
  const [t, setT] = useState("");
  useEffect(() => { const tick = () => { const n = new Date(); setT("TIME: " + String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0") + ":" + String(n.getSeconds()).padStart(2, "0")); }; tick(); const id = setInterval(tick, 1000); return () => clearInterval(id); }, []);
  return <>{t}</>;
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function Countdown() {
  const TARGET = new Date("2026-05-19T05:00:00Z").getTime();
  const calc = () => { const diff = Math.max(0, TARGET - Date.now()); return { d: String(Math.floor(diff / 864e5)).padStart(2, "0"), h: String(Math.floor(diff % 864e5 / 36e5)).padStart(2, "0"), m: String(Math.floor(diff % 36e5 / 6e4)).padStart(2, "0"), s: String(Math.floor(diff % 6e4 / 1e3)).padStart(2, "0") }; };
  const [cd, setCd] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => { setCd(calc()); const id = setInterval(() => setCd(calc()), 1000); return () => clearInterval(id); }, []);
  return (
    <div className="imp-hcd">
      {[["d", "DAYS"], ["h", "HOURS"], ["m", "MINUTES"], ["s", "SECONDS"]].map(([k, l]) => (
        <div className="imp-cdi" key={k}><span className="imp-cdn">{(cd as any)[k]}</span><span className="imp-cdl">{l}</span></div>
      ))}
    </div>
  );
}

// ─── NETWORK CANVAS ───────────────────────────────────────────────────────────
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!; let W = 0, H = 0;
    const resize = () => { W = c.width = c.parentElement?.offsetWidth || window.innerWidth; H = c.height = c.parentElement?.offsetHeight || window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28 }));
    let rafId = 0;
    function frame() {
      ctx.clearRect(0, 0, W, H); pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 115) { ctx.strokeStyle = `rgba(0,245,255,${0.055 * (1 - d / 115)})`; ctx.lineWidth = .45; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "all" }} />;
}

// ─── PAGE WRAPPER ─────────────────────────────────────────────────────────────
function Page({ id, active, children, style = {} }: { id: string; active: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (active) { el.style.display = "flex"; requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("visible"))); }
    else { el.classList.remove("visible"); const t = setTimeout(() => { el.style.display = "none"; }, 420); return () => clearTimeout(t); }
  }, [active]);
  return <div ref={ref} id={id} className="imp-page" style={{ display: "none", paddingTop: 76, ...style }}>{children}</div>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [page, setPage] = useState("pl");
  const [loginAlert, setLoginAlert] = useState(""); const [loginSucc, setLoginSucc] = useState("");
  const [loginEmail, setLoginEmail] = useState(""); const [loginPwd, setLoginPwd] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => { const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); return () => document.head.removeChild(s); }, []);

  const go = useCallback((id: string) => { setPage(id); setLoginAlert(""); setLoginSucc(""); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  function doLogin() {
    setLoginAlert(""); setLoginSucc("");
    if (!loginEmail || !loginPwd) { setLoginAlert("⚠ FILL ALL REQUIRED FIELDS."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) { setLoginAlert("⚠ INVALID EMAIL FORMAT."); return; }
    if (loginPwd.length < 6) { setLoginAlert("⚠ PASSWORD TOO SHORT."); return; }
    setLoginLoading(true);
    setTimeout(() => { setLoginLoading(false); setLoginSucc("✓ AUTHENTICATION SUCCESSFUL. ENTERING IMPERIUM..."); setTimeout(() => go("pl"), 2200); }, 1600);
  }

  return (
    <div className="imp-root">
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}
      <Cursor />
      <div className="imp-scanlines"></div>
      <div className="imp-gbg"></div>
      <CinematicSpace />
      <div className="imp-hud imp-htl">SYS.STATUS: <span style={{ color: "var(--grn)" }}>ONLINE</span><br />NODE: 2080.ATHER.NET<br /><HudTime /></div>
      <div className="imp-hud imp-htr">THREAT: <span style={{ color: "var(--red)" }}>CRITICAL</span><br />SECTORS.HIT: 04<br />MISSION: ACTIVE</div>
      <div className="imp-hud imp-hbl">BUILD: v2080.IMPERIUM<br />QSH: ENABLED</div>
      <div className="imp-hud imp-hbr">ATHER.TECH.CORP<br />© 2080 IMPERIUM</div>
      <nav className="imp-nav">
        <button className="imp-nlogo" onClick={() => go("pl")}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 4L20 14L28 8L24 20H8L4 8L12 14L16 4Z" stroke="#00f5ff" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><rect x="8" y="22" width="16" height="4" rx="1" fill="rgba(0,245,255,.22)" stroke="#00f5ff" strokeWidth="1" /></svg>
          <span className="imp-nlt">IMPERIUM</span>
        </button>
        <div className="imp-nst"><div className="imp-sdot"></div>ATHERA · SYSTEM ONLINE · 2080</div>
        <div className="imp-nyr">2080</div>
      </nav>

      <Page id="pl" active={page === "pl"} style={{ alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <NetworkCanvas />
        <div className="imp-hero">
          <div className="imp-h-ather"><span className="imp-aico">◆</span>ATHERA PRESENTS<span className="imp-aico">◆</span></div>
          <h1 className="imp-htitle"><span className="imp-gt">IMPERIUM</span></h1>
          <div className="imp-hsub">— AN IMMERSIVE AI CHALLENGE EXPERIENCE —</div>
          <div className="imp-htag">BUILD · SOLVE · RESTORE · THE FUTURE IS IN YOUR CODE</div>
          <div className="imp-hcta"><button className="imp-btnp" onClick={() => go("plog")}>LOGIN</button></div>
          <Countdown />
        </div>
        <div className="imp-ticker-wrap">
          <div className="imp-ticker">
            {["⚡ IMPERIUM AWAKENS", "HEALTHCARE: COMPROMISED", "FINANCE: COMPROMISED", "SECURITY: BREACHED", "INFRASTRUCTURE: CRITICAL", "ONLY YOUR CODE CAN SAVE US", "REGISTRATION OPEN · JOIN THE RESISTANCE"].map((t, i) => (<span key={i}>{t}<span className="imp-tsp"> ///</span></span>))}
            {["⚡ IMPERIUM AWAKENS", "HEALTHCARE: COMPROMISED", "FINANCE: COMPROMISED", "SECURITY: BREACHED", "INFRASTRUCTURE: CRITICAL", "ONLY YOUR CODE CAN SAVE US", "REGISTRATION OPEN · JOIN THE RESISTANCE"].map((t, i) => (<span key={"b" + i}>{t}<span className="imp-tsp"> ///</span></span>))}
          </div>
        </div>
      </Page>

      <Page id="plog" active={page === "plog"} style={{ alignItems: "center", justifyContent: "center", padding: "100px 24px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", maxWidth: 440 }}>
          <svg viewBox="0 0 32 32" fill="none" style={{ filter: "drop-shadow(0 0 12px var(--c))", width: 48, height: 48 }}><path d="M16 4L20 14L28 8L24 20H8L4 8L12 14L16 4Z" stroke="#00f5ff" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><rect x="8" y="22" width="16" height="4" rx="1" fill="rgba(0,245,255,.28)" stroke="#00f5ff" strokeWidth="1" /></svg>
          <div className="imp-aclogo">IMPERIUM</div>
          <div className="imp-acsub" style={{ marginTop: -16 }}>AN IMMERSIVE AI CHALLENGE</div>
          <div className="imp-apanel" style={{ width: "100%", position: "relative" }}>
            <div className="imp-pc imp-pc-tl"></div><div className="imp-pc imp-pc-bl"></div><div className="imp-pc imp-pc-tr"></div><div className="imp-pc imp-pc-br"></div>
            <div className="imp-apt" style={{ color: "var(--c)" }}>LOGIN</div>
            <div className="imp-aps">WELCOME BACK, RECRUIT.</div>
            {loginAlert && <div className="imp-alert imp-show">{loginAlert}</div>}
            {loginSucc && <div className="imp-succ imp-show">{loginSucc}</div>}
            <div className="imp-fg">
              <label className="imp-flabel">EMAIL ADDRESS</label>
              <div className="imp-iw"><span className="imp-iico">📧</span><input type="email" className="imp-finput" placeholder="Enter your email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} /></div>
            </div>
            <div className="imp-fg">
              <label className="imp-flabel">PASSWORD</label>
              <div className="imp-iw"><span className="imp-iico">🔒</span><input type="password" className="imp-finput" placeholder="Enter your password" value={loginPwd} onChange={e => setLoginPwd(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} /></div>
              <button className="imp-flink">FORGOT PASSWORD?</button>
            </div>
            <button className="imp-btnauth imp-btnc" onClick={doLogin} style={{ opacity: loginLoading ? 0.6 : 1 }}>{loginLoading ? "AUTHENTICATING..." : "LOGIN"}</button>
            <div style={{ textAlign: "center", marginTop: 16 }}><button className="imp-backlink" onClick={() => go("pl")}>← BACK TO BASE</button></div>
          </div>
        </div>
      </Page>
    </div>
  );
}
