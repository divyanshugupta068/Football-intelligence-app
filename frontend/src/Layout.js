import { Outlet, NavLink } from "react-router-dom";
import { theme } from "./theme";

export default function Layout() {
  return (
    <div style={{ background: theme.colors.bg, minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          gap: "24px",
          padding: "16px 32px",
          borderBottom: `1px solid ${theme.colors.border}`
        }}
      >
        <NavItem to="/" label="Home" />
        <NavItem to="/compare" label="Compare" />
      </nav>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        color: isActive
          ? theme.colors.accent
          : theme.colors.textMuted,
        textDecoration: "none",
        fontWeight: 600,
        paddingBottom: "6px",
        borderBottom: isActive
          ? `2px solid ${theme.colors.accent}`
          : "none"
      })}
    >
      {label}
    </NavLink>
  );
}
