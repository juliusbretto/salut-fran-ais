export default function GrammarDropdown({ open, onToggle, children }) {
  return (
    <div style={{ position: "absolute", right: 16, top: 20 }}>
      <button 
        onClick={onToggle}
        style={{ padding: "8px 12px", fontSize: 14, borderRadius: 6, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer", color: "#333" }}
      >
        📚 Grammar
      </button>
      {open && (
        <div style={{ position: "absolute", top: 40, right: 0, background: "white", border: "1px solid #ccc", borderRadius: 8, padding: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 300, maxWidth: 400, maxHeight: '70vh', overflowY: 'auto', zIndex: 1000 }}>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: 20 }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}



