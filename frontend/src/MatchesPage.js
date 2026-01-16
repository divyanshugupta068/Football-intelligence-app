import { useEffect, useState } from "react";
import { theme, layout, card, text } from "./theme";
import LiveMatchCard from "./components/LiveMatchCard";
import { Flame, CalendarDays } from "lucide-react";

export default function MatchesPage() {
  /* ---------- STATE ---------- */
  const [tab, setTab] = useState("live"); // live | upcoming
  const [matches, setMatches] = useState([]);
  const [fallback, setFallback] = useState([]); // TODAY FALLBACK
  const [leagues, setLeagues] = useState([]);
  const [league, setLeague] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD LEAGUES ---------- */
  useEffect(() => {
    fetch("/leagues")
      .then(r => r.json())
      .then(d => setLeagues(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

useEffect(() => {
  setLoading(true);

  const endpoint =
    tab === "live"
      ? "http://localhost:5000/live-matches"
      : "http://localhost:5000/matches/today";

  fetch(endpoint)
    .then(r => r.json())
    .then(d => {
      const arr = Array.isArray(d) ? d : [];
      setMatches(arr);

      // 👇 fallback if live empty
      if (tab === "live" && arr.length === 0) {
        fetch("/matches/today")
          .then(r => r.json())
          .then(fd =>
            setFallback(Array.isArray(fd) ? fd : [])
          );
      }

      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [tab]);
  /* ---------- AUTO REFRESH LIVE ---------- */
  useEffect(() => {
    if (tab !== "live") return;

    const interval = setInterval(() => {
      fetch("/live-matches")
        .then(r => r.json())
        .then(d => setMatches(Array.isArray(d) ? d : []));
    }, 30000);

    return () => clearInterval(interval);
  }, [tab]);

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Matches</h2>

          {/* LEAGUE FILTER */}
          <select
            value={league}
            onChange={e => setLeague(e.target.value)}
            style={select}
          >
            <option value="all">All Leagues</option>
            {leagues.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* TABS */}
        <div style={tabs}>
          <Tab
            active={tab === "live"}
            icon={<Flame size={14} />}
            label="Live"
            onClick={() => setTab("live")}
          />
          <Tab
            active={tab === "upcoming"}
            icon={<CalendarDays size={14} />}
            label="Today"
            onClick={() => setTab("upcoming")}
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <p style={text.muted}>Loading matches…</p>
        ) : matches.length === 0 ? (
          <div style={card.base}>
            <p style={text.muted}>
              {tab === "live"
                ? "No live matches right now · Showing today’s fixtures"
                : "No matches scheduled today"}
            </p>

            {/* TODAY FALLBACK */}
            {tab === "live" && fallback.length > 0 && (
              <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                {fallback.map(m => (
                  <LiveMatchCard key={m.id} match={m} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {matches.map(m => (
              <LiveMatchCard key={m.id} match={m} />
            ))}
          </div>
        )}
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
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing.md
};

const title = {
  fontSize: theme.sizes.h2,
  fontWeight: 700
};

const select = {
  background: "transparent",
  color: theme.colors.textPrimary,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 10,
  padding: "6px 10px",
  cursor: "pointer"
};

const tabs = {
  display: "flex",
  gap: 12,
  marginBottom: theme.spacing.lg
};
