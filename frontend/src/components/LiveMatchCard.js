import { useEffect, useState } from "react";
import { theme, card, text } from "../theme";

export default function LiveMatchCard({ match }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match) return;

    const params = new URLSearchParams({
      home: match.home.name,
      away: match.away.name,
      homeGoals: match.home.goals,
      awayGoals: match.away.goals,
      minute: match.minute
    });

    fetch(`http://localhost:5000/ai/live-summary?${params}`)
      .then(r => r.json())
      .then(d => {
        setSummary(d.summary);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [match]);

  if (!match || !match.home || !match.away) return null;

  return (
    <div style={{ ...card.base, display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ ...text.muted, fontSize: 11 }}>
        {match.league} · {match.minute}'
      </p>

      <div style={row}>
        <Team team={match.home} />
        <strong style={score}>
          {match.home.goals} - {match.away.goals}
        </strong>
        <Team team={match.away} />
      </div>

      {/* AI SUMMARY */}
      <div
        style={{
          marginTop: 6,
          padding: "8px",
          borderRadius: 8,
          background: "#020617",
          border: `1px solid ${theme.colors.border}`
        }}
      >
        <p style={{ ...text.muted, fontSize: 12 }}>
          🤖 {loading ? "Analyzing match…" : summary}
        </p>
      </div>
    </div>
  );
}

function Team({ team }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {team.logo && <img src={team.logo} alt="" width={24} />}
      <span style={{ fontSize: 13 }}>{team.name}</span>
    </div>
  );
}

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const score = {
  fontSize: 18,
  fontWeight: 700
};