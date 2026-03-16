export default function TopBar({ title, onBack, rightSlot }) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {onBack && <button onClick={onBack} style={{ position: "absolute", left: 16 }}>← Retour</button>}
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{ position: "absolute", right: 16, top: 20 }}>{rightSlot}</div>
      </div>
    )
  }


