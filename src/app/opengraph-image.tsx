import { ImageResponse } from "next/og";

export const alt =
  "Zakian Maulana Syaifulloh — profil, pengalaman, dan proyek pilihan seorang web developer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        color: "#192238",
        padding: 64,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "62%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            marginBottom: 45,
            color: "#315efb",
          }}
        >
          zakian.dev
        </div>
        <div style={{ display: "flex", fontSize: 44, letterSpacing: -2 }}>
          Halo, saya
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: -7,
            color: "#315efb",
            lineHeight: 1.1,
          }}
        >
          Zakian_
        </div>
        <div style={{ display: "flex", fontSize: 25, marginTop: 18 }}>
          Zakian Maulana Syaifulloh
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 19,
            marginTop: 40,
            color: "#647086",
          }}
        >
          Web Developer · IT Programmer · Bekasi
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 440,
          height: 335,
          position: "absolute",
          right: 58,
          top: 145,
          background: "#f6f8fc",
          border: "1px solid #dce4f2",
          borderRadius: 18,
          flexDirection: "column",
          transform: "rotate(-3deg)",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "20px 26px",
            borderBottom: "1px solid #dce4f2",
            fontSize: 17,
            color: "#647086",
            justifyContent: "space-between",
          }}
        >
          <span>● ● ●</span>
          <span>profil.ts</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "30px 28px",
            fontSize: 20,
            lineHeight: 1.8,
          }}
        >
          <div style={{ display: "flex", color: "#315efb" }}>
            const zakian = {"{"}
          </div>
          <div style={{ display: "flex", paddingLeft: 22 }}>
            peran: &apos;Web Developer&apos;,
          </div>
          <div style={{ display: "flex", paddingLeft: 22 }}>
            pengalaman: &apos;4+ tahun&apos;,
          </div>
          <div style={{ display: "flex", paddingLeft: 22 }}>
            selalu: &apos;Belajar hal baru&apos;
          </div>
          <div style={{ display: "flex", color: "#315efb" }}>{"}"};</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 35,
          left: 64,
          right: 64,
          borderTop: "1px solid #dce4f2",
          paddingTop: 20,
          justifyContent: "space-between",
          fontSize: 16,
          color: "#647086",
        }}
      >
        <span>PERKENALAN · PENGALAMAN · PORTOFOLIO</span>
        <span>Mari berkenalan ↗</span>
      </div>
    </div>,
    size,
  );
}
