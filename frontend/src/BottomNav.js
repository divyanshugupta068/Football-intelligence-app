import { NavLink } from "react-router-dom";
import { theme } from "./theme";

export default function BottomNav() {
  return (
    <div style={nav}>
      <NavItem to="/" label="Home" icon="🏠" />
      <NavItem to="/compare" label="Compare" icon="📊" />
      <NavItem to="/tv" label="TV" icon="▶️" />
    </div>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...item,
        color: isActive ? "#fff" : theme.colors.textMuted
      })}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 12 }}>{label}</span>
    </NavLink>
  );
}

/* ---------- STYLES ---------- */

const nav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 64,
  background: "#000",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderTop: "1px solid #222",
  zIndex: 100
};

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  gap: 4
};
