import { clubs } from "../data/clubs";
import { card, theme} from "../theme";

export default function ClubSelector({ selected, onSelect, onClose }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ marginBottom: 12 }}>Select Favourite Club</h3>

        <div style={grid}>
          {clubs.map(c => (
            <button
              key={c.name}
              onClick={() => {
                onSelect(c);
                onClose();
              }}
              style={{
                ...clubBtn,
                border:
                  selected === c.name
                    ? `2px solid ${theme.colors.accent}`
                    : `1px solid ${theme.colors.border}`
              }}
            >
              <img src={c.logo} alt="" width={36} />
              <span style={label}>{c.name}</span>
            </button>
          ))}
        </div>

        <button onClick={onClose} style={closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50
};

const modal = {
  ...card.base,
  width: "90%",
  maxWidth: 420,
  background: theme.colors.bg
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12
};

const clubBtn = {
  background: "transparent",
  borderRadius: 10,
  padding: 10,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6
};

const label = {
  fontSize: 11,
  color: theme.colors.textSecondary,
  textAlign: "center"
};

const closeBtn = {
  marginTop: 12,
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: theme.colors.border,
  color: theme.colors.textPrimary,
  cursor: "pointer"
};