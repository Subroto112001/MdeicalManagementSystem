import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Healtho Medical Center — Expert care, human touch";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 88, background: "linear-gradient(125deg, #10283a 10%, #173d59 70%, #3268f5 145%)", color: "white", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}><div style={{ width: 58, height: 58, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: "#3268f5" }}>H</div>Healtho Medical Center</div><div style={{ display: "flex", flexDirection: "column", marginTop: 54, fontSize: 66, lineHeight: 1.08, fontWeight: 800 }}><span>Expert care.</span><span>Human touch.</span></div><div style={{ marginTop: 28, fontSize: 27, color: "#cbdcf3" }}>Trusted doctors · modern diagnostics · compassionate support</div><div style={{ marginTop: 35, width: 100, height: 8, borderRadius: 8, background: "#71a0ff" }}/></div>, size);
}
