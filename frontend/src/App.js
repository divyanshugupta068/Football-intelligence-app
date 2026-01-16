import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PlayerProfilePage from "./PlayerProfilePage";
import PlayerDetailPage from "./PlayerDetailPage";
import PlayersPageEnhanced from "./PlayersPageEnhanced";
import {
  Home as HomeIcon,
  BarChart3,
  Activity,
  Sun,
  Moon,
  Users,
  Newspaper,
  TrendingUp
} from "lucide-react";

import Home from "./Home";
import ComparePage from "./ComparePage";
import ClubPage from "./ClubPage";
import NewsPage from "./NewsPage";
import StatsPage from "./StatsPage";
import { getTheme } from "./theme";
import MatchesPage from "./MatchesPage";

export default function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const activeTheme = getTheme(mode);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <div
      style={{
        background: activeTheme.colors.bg,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center"
      }}
    >
      {/* MOBILE FRAME */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          minHeight: "100vh",
          background: activeTheme.colors.bg,
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        {/* TOP BAR */}
        <TopBar
          theme={activeTheme}
          mode={mode}
          setMode={setMode}
        />

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 72 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/player/:id" element={<PlayerDetailPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/players" element={<PlayersPageEnhanced />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/club/:club" element={<ClubPage />} />
          </Routes>
        </div>

        {/* BOTTOM NAV */}
        <BottomNav theme={activeTheme} />
      </div>
    </div>
  );
}

/* ---------- TOP BAR ---------- */
function TopBar({ theme, mode, setMode }) {
  const location = useLocation();

  const titleMap = {
    "/": "Home",
    "/compare": "Compare",
    "/matches": "Matches",
    "/players": "Players",
    "/news": "News"
  };

  const title =
    titleMap[location.pathname] ||
    (location.pathname.startsWith("/club")
      ? "Club"
      : location.pathname.startsWith("/player")
        ? "Player"
        : "Football Intelligence");

  return (
    <div
      style={{
        padding: "16px",
        fontSize: 22,
        fontWeight: 700,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.bg,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      {title}

      <button
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        style={{
          background: "transparent",
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 999,
          padding: 8,
          cursor: "pointer",
          color: theme.colors.textPrimary
        }}
      >
        {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}

/* ---------- BOTTOM NAV ---------- */
function BottomNav({ theme }) {
  const location = useLocation();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.colors.bg,
        borderTop: `1px solid ${theme.colors.border}`,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0"
      }}
    >
      <NavIcon
        to="/"
        label="Home"
        icon={HomeIcon}
        active={location.pathname === "/"}
        theme={theme}
      />

      <NavIcon
        to="/matches"
        label="Matches"
        icon={Activity}
        active={location.pathname === "/matches"}
        theme={theme}
      />

      <NavIcon
        to="/players"
        label="Players"
        icon={Users}
        active={location.pathname === "/players"}
        theme={theme}
      />

      <NavIcon
        to="/news"
        label="News"
        icon={Newspaper}
        active={location.pathname === "/news"}
        theme={theme}
      />

      <NavIcon
        to="/compare"
        label="Compare"
        icon={BarChart3}
        active={location.pathname === "/compare"}
        theme={theme}
      />
    </div>
  );
}

function NavIcon({ to, icon: Icon, label, active, theme }) {
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: active
          ? theme.colors.textPrimary
          : theme.colors.textMuted,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontSize: 12
      }}
    >
      <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
      {label}
    </NavLink>
  );
}
