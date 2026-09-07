"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Code,
  TerminalWindow,
  BracketsCurly,
  ArrowUpRight,
  Database,
  Globe,
  Lightning,
  Receipt,
  ShoppingBag,
  CreditCard,
  Cpu,
  Check,
  Chats,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { useMotionPreference } from "./preferences";
import type { Project } from "@/data/portfolio";
export function LoopScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let inViewport = true;
    const update = () => {
      element.dataset.active = String(inViewport && !document.hidden);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        update();
      },
      { rootMargin: "80px" },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={ref} className={`loop-scene ${className}`} data-active="true">
      {children}
    </div>
  );
}
const roles = [
  "Web Developer",
  "IT Programmer",
  "Pengembang Laravel",
  "Pengembang React",
];
export function TypewriterRole() {
  const reduce = useMotionPreference();
  const [text, setText] = useState(roles[0]);
  useEffect(() => {
    if (reduce) return;
    let role = 0,
      length = roles[0].length,
      deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      if (document.hidden) {
        timer = setTimeout(tick, 800);
        return;
      }
      length += deleting ? -1 : 1;
      setText(roles[role].slice(0, length));
      let delay = deleting ? 45 : 85;
      if (length === 0) {
        role = (role + 1) % roles.length;
        deleting = false;
        delay = 240;
      }
      if (length === roles[role].length && !deleting) {
        deleting = true;
        delay = 2500;
      }
      timer = setTimeout(tick, delay);
    }
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [reduce]);
  return (
    <div className="typed-role">
      <span className="sr-only">Web Developer dan IT Programmer</span>
      <span aria-hidden="true">
        <span className="role-prefix">&gt; </span>
        {reduce ? roles[0] : text}
        <span className="typing-cursor loop">_</span>
      </span>
    </div>
  );
}
const introductionCode = [
  () => (
    <>
      <span className="syntax-comment">
        {"// Kenalan lewat beberapa baris kode."}
      </span>
    </>
  ),
  () => (
    <>
      <span className="syntax-keyword">const</span>{" "}
      <span className="syntax-variable">zakian</span> = {"{"}
    </>
  ),
  () => (
    <>
      {" "}
      nama: <span className="syntax-string">&apos;Zakian Maulana&apos;</span>,
    </>
  ),
  () => (
    <>
      {" "}
      peran: <span className="syntax-string">&apos;Web Developer&apos;</span>,
    </>
  ),
  () => (
    <>
      {" "}
      lokasi:{" "}
      <span className="syntax-string">&apos;Bekasi, Indonesia&apos;</span>,
    </>
  ),
  () => (
    <>
      {" "}
      pengalaman: <span className="syntax-string">&apos;4+ tahun&apos;</span>,
    </>
  ),
  () => (
    <>
      {" "}
      fokus: [<span className="syntax-string">&apos;Web&apos;</span>,{" "}
      <span className="syntax-string">&apos;Bisnis&apos;</span>],
    </>
  ),
  () => (
    <>
      {" "}
      selalu:{" "}
      <span className="syntax-string">&apos;Belajar hal baru&apos;</span>
    </>
  ),
  () => <>{"}"};</>,
  () => <></>,
  () => (
    <>
      <span className="syntax-keyword">export default</span> zakian;
    </>
  ),
];
const stackCode = [
  () => (
    <>
      <span className="syntax-comment">
        {"// Teknologi yang saya gunakan."}
      </span>
    </>
  ),
  () => (
    <>
      <span className="syntax-keyword">const</span>{" "}
      <span className="syntax-variable">stack</span> = {"{"}
    </>
  ),
  () => <> frontend: [</>,
  () => (
    <>
      {" "}
      <span className="syntax-string">&apos;React&apos;</span>,{" "}
      <span className="syntax-string">&apos;Next.js&apos;</span>,
    </>
  ),
  () => (
    <>
      {" "}
      <span className="syntax-string">&apos;TypeScript&apos;</span>,{" "}
      <span className="syntax-string">&apos;Vue&apos;</span>
    </>
  ),
  () => <> ],</>,
  () => (
    <>
      {" "}
      backend: [<span className="syntax-string">&apos;PHP&apos;</span>,{" "}
      <span className="syntax-string">&apos;Laravel&apos;</span>],
    </>
  ),
  () => (
    <>
      {" "}
      data: [<span className="syntax-string">&apos;MySQL&apos;</span>,{" "}
      <span className="syntax-string">&apos;SQL Server&apos;</span>]
    </>
  ),
  () => <>{"}"};</>,
  () => <></>,
  () => (
    <>
      <span className="syntax-keyword">export default</span> stack;
    </>
  ),
];
export function CodeIntro() {
  const [file, setFile] = useState("profil.ts");
  return (
    <LoopScene className="code-scene">
      <div className="scene-orbit orbit-one" aria-hidden="true" />
      <div className="scene-orbit orbit-two" aria-hidden="true" />
      <span className="orbit-satellite loop" aria-hidden="true">
        <span />
      </span>
      <div className="floating-tag tag-react loop" aria-hidden="true">
        <Code size={23} />
        <span>
          React <span className="tag-divider">/</span> Next.js
        </span>
      </div>
      <div className="editor-window loop">
        <div className="editor-top">
          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>kenalan-dulu</span>
          <TerminalWindow size={16} aria-hidden="true" />
        </div>
        <div
          className="editor-tabs"
          role="group"
          aria-label="Pilih cuplikan kode perkenalan"
        >
          {["profil.ts", "stack.ts"].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={file === item}
              onClick={() => setFile(item)}
            >
              <span>TS</span>
              {item}
            </button>
          ))}
          <span className="editor-file-path">src / saya</span>
        </div>
        <div className="code-lines" aria-label={`Cuplikan ${file}`}>
          {(file === "profil.ts" ? introductionCode : stackCode).map(
            (line, index) => (
              <div
                className={`code-line ${index === 7 ? "active-code-line" : ""}`}
                key={`${file}-${index}`}
              >
                <span className="line-number" aria-hidden="true">
                  {index + 1}
                </span>
                <code>
                  {line()}
                  {index === 7 && (
                    <span className="code-caret loop" aria-hidden="true" />
                  )}
                </code>
              </div>
            ),
          )}
        </div>
        <div className="editor-status">
          <span>
            <span className="code-status-dot" />
            TypeScript
          </span>
          <span>
            UTF-8 <span className="editor-status-separator">/</span> profil
            personal
          </span>
        </div>
      </div>
      <div className="floating-tag tag-php loop" aria-hidden="true">
        <BracketsCurly size={23} />
        <span>
          PHP <span className="tag-divider">/</span> Laravel
        </span>
      </div>
      <div className="code-note">
        <span className="hand-arrow" aria-hidden="true">
          ↳
        </span>{" "}
        sedikit tentang saya, dalam kode.
      </div>
    </LoopScene>
  );
}
export function Workflow() {
  const steps = [
    { label: "Pahami", detail: "Kebutuhan bisnis" },
    { label: "Rancang", detail: "Alur & struktur" },
    { label: "Bangun", detail: "Kode & antarmuka" },
    { label: "Rapikan", detail: "Detail & perbaikan" },
  ];
  return (
    <LoopScene className="workflow-scene">
      <div className="workflow-title">
        <TerminalWindow size={18} />
        <span>cara-saya-bekerja.md</span>
        <span className="workflow-slash">~/proses</span>
      </div>
      <div
        className="workflow-track"
        aria-label="Proses kerja: pahami, rancang, bangun, lalu rapikan"
      >
        {steps.map((step, index) => (
          <div
            className="workflow-step"
            key={step.label}
            style={{ "--step": index } as CSSProperties}
          >
            <span className="workflow-node loop">
              {index === 3 ? (
                <Check size={17} />
              ) : (
                <span>{String(index + 1).padStart(2, "0")}</span>
              )}
            </span>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </div>
        ))}
      </div>
      <div className="workflow-code">
        <span className="syntax-keyword">while</span> (adaYangBisaDiperbaiki){" "}
        {"{"} <span className="syntax-variable">belajar</span>(); {"}"}
      </div>
    </LoopScene>
  );
}
export function StackDiagram() {
  return (
    <LoopScene className="stack-diagram">
      <span className="diagram-caption">Satu alur, saling terhubung.</span>
      <div className="stack-core">
        <Code size={42} weight="bold" />
        <span>solusi.web</span>
      </div>
      <div className="diagram-ring diagram-ring-one" aria-hidden="true" />
      <div className="diagram-ring diagram-ring-two" aria-hidden="true" />
      <span className="diagram-orb loop" aria-hidden="true">
        <i />
      </span>
      <div className="stack-node stack-node-web loop">
        <Globe size={25} />
        <span>Antarmuka</span>
      </div>
      <div className="stack-node stack-node-api loop">
        <BracketsCurly size={25} />
        <span>API & logika</span>
      </div>
      <div className="stack-node stack-node-data loop">
        <Database size={25} />
        <span>Database</span>
      </div>
      <code className="diagram-footnote">
        ide <span>→</span> kode <span>→</span> aplikasi
      </code>
    </LoopScene>
  );
}
export function ProjectVisual({ kind }: { kind: Project["id"] }) {
  return (
    <LoopScene className={`project-visual visual-${kind}`}>
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-meta">
        <span>
          {kind === "bayaro"
            ? "BAYARO / POS"
            : kind === "scada"
              ? "SCADA / INDUSTRIAL"
              : "LARAVEL / REALTIME"}
        </span>
        <span>Visual konsep</span>
      </div>
      <div className="visual-content" aria-hidden="true">
        {kind === "bayaro" ? (
          <>
            <div className="pos-backdrop">B.</div>
            <div className="receipt-scene loop">
              <div className="receipt-icon">
                <Receipt size={26} />
                <span>alur.transaksi</span>
              </div>
              <div className="receipt-row">
                <ShoppingBag size={19} />
                <span>Pesanan</span>
                <Check size={17} />
              </div>
              <div className="receipt-row">
                <CreditCard size={19} />
                <span>Pembayaran</span>
                <Check size={17} />
              </div>
              <div className="receipt-rule" />
              <div className="receipt-bottom">
                <span>Siap dicatat.</span>
                <ArrowUpRight size={22} />
              </div>
              <div className="receipt-teeth" />
            </div>
            <span className="pos-symbol loop">
              <BracketsCurly size={34} />
            </span>
            <span className="pos-chip loop">checkout()</span>
          </>
        ) : kind === "scada" ? (
          <>
            <div className="scada-connection connection-left" />
            <div className="scada-connection connection-right" />
            <span className="data-packet packet-left loop" />
            <span className="data-packet packet-right loop" />
            <div className="scada-node sensor-node">
              <Cpu size={30} />
              <span>Perangkat</span>
            </div>
            <div className="scada-center">
              <div className="signal-bars">
                {[
                  0.3, 0.7, 0.5, 1, 0.75, 0.45, 0.9, 0.6, 0.35, 0.7, 0.9, 0.5,
                ].map((height, index) => (
                  <i
                    className="loop"
                    key={index}
                    style={
                      { "--bar": height, "--index": index } as CSSProperties
                    }
                  />
                ))}
              </div>
              <span>Aliran data</span>
            </div>
            <div className="scada-node data-node">
              <Database size={30} />
              <span>Monitor</span>
            </div>
            <code className="visual-code">
              data.map(<span>visualisasikan</span>)
            </code>
          </>
        ) : (
          <>
            <div className="chat-orbit" />
            <div className="chat-symbol">
              <Chats size={90} weight="thin" />
            </div>
            <div className="chat-bubble bubble-one loop">
              <span>Halo, mari berkolaborasi.</span>
              <Check size={15} />
            </div>
            <div className="chat-bubble bubble-two loop">
              <span>Siap, kita mulai.</span>
              <Check size={15} />
            </div>
            <div className="chat-typing loop">
              <i className="loop" />
              <i className="loop" />
              <i className="loop" />
            </div>
            <span className="chat-send loop">
              <PaperPlaneTilt size={23} />
            </span>
          </>
        )}
      </div>
      <code className="visual-footer">
        {kind === "bayaro"
          ? "return pengalamanYangMudah;"
          : kind === "scada"
            ? "await pantauSistem();"
            : "event.broadcast(pesan);"}
        <span className="code-caret loop" aria-hidden="true" />
      </code>
    </LoopScene>
  );
}
export function ContactSignal() {
  return (
    <LoopScene className="contact-signal">
      <span className="signal-ring loop" />
      <span className="signal-ring ring-delayed loop" />
      <span className="signal-center">
        <Lightning size={35} weight="fill" />
      </span>
    </LoopScene>
  );
}
