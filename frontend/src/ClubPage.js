import { useParams } from "react-router-dom";
import { useState } from "react";
import { theme, layout} from "./theme";

import SquadsPage from "./SquadsPage";
import StandingsPage from "./StandingsPage";
import MatchesPage from "./MatchesPage";

import {
  Users,
  BarChart3,
  Activity
} from "lucide-react";

export default function ClubPage() {
  /* ---------- ROUTE PARAM ---------- */
  const { club } = useParams();

  /* ---------- STATE ---------- */
  const [tab, setTab] = useState("squad"); // squad | standings | matches

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        {/* CLUB HEADER */}
        <div style={header}>
          <h2 style={clubName}>{decodeURIComponent(club)}</h2>
        </div>

        {/* CLUB TABS */}
        <div style={tabs}>
          <Tab
            active={tab === "squad"}
            label="Squad"
            icon={<Users size={14} />}
            onClick={() => setTab("squad")}
          />

          <Tab
            active={tab === "standings"}
            label="Standings"
            icon={<BarChart3 size={14} />}
            onClick={() => setTab("standings")}
          />

          <Tab
            active={tab === "matches"}
            label="Matches"
            icon={<Activity size={14} />}
            onClick={() => setTab("matches")}
          />
        </div>

        {/* TAB CONTENT */}
        <div style={{ marginTop: theme.spacing.lg }}>
          {tab === "squad" && <SquadsPage />}
          {tab === "standings" && <StandingsPage />}
          {tab === "matches" && <MatchesPage />}
        </div>
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function Tab({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: theme.radius.pill,
        border: `1px solid ${theme.colors.border}`,
        background: active ? "#020617" : "transparent",
        color: theme.colors.textPrimary,
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer"
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ---------- STYLES ---------- */

const header = {
  marginBottom: theme.spacing.md
};

const clubName = {
  fontSize: theme.sizes.h2,
  fontWeight: 700
};

const tabs = {
  display: "flex",
  gap: 12
};