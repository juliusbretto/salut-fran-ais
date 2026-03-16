export default function QuizCard({ counterText, children, inputProps }) {
  return (
    <div style={{ width: 400, height: 250, background: "#e8e8e8", borderRadius: 12, color: "#333", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: 10, boxSizing: "border-box", position: "relative" }}>
      <div style={{ position: "absolute", top: 10, right: 10, fontSize: 14, color: "#666" }}>{counterText}</div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, textAlign: "center", width: "100%" }}>
        <span style={{ fontSize: 18, lineHeight: 1.4, wordBreak: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>{children}</span>
      </div>
      <input {...inputProps} style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", background: "#c8c8c8", color: "#666", textAlign: "left", ...(inputProps?.style || {}) }} />
    </div>
  );
}



