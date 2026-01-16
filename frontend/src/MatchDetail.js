import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { theme, layout, card, text } from "./theme";
import { Clock } from "lucide-react";

export default function MatchDetail() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/match/${id}`)
      .then(r => r.json())
      .then(d => {
        setMatch(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={layout.page}>
        <p style={text.muted}>Loading match details…</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div style={layout.page}>
        <p style={text.muted}>Match data unavailable</p>
      </div>
    );
  }

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        {/* SCORE HEADER */}
        <div
          style={{
            ...card.base,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          <div style={{ ...text.muted, fontSize: 13 }}>
            {match.league}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 16
            }}
          >
            <Team team={match.home} align="right" />

            <div
              style={{
                fontSize: 28,
                fontWeight: 800
              }}
            >
              {match.home.goals} : {match.away.goals}
            </div>

            <Team team={match.away} align="left" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              fontSize: 13,
              color: "#ef4444",
              fontWeight: 600
            }}
          >
            <Clock size={14} />
            {match.minute}'
          </div>
        </div>

        {/* EVENTS */}
        <section style={{ marginTop: theme.spacing.lg }}>
          <h3 style={{ marginBottom: 12 }}>Match Events</h3>

          {match.events.length === 0 ? (
            <div style={card.base}>
              <p style={text.muted}>No events available</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {match.events.map((e, i) => (
                <div
                  key={i}
                  style={{
                    ...card.base,
                    padding: 12,
                    fontSize: 13
                  }}
                >
                  <strong>{e.minute}'</strong> — {e.type}  
                  <div style={text.muted}>{e.player}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------- TEAM BLOCK ---------- */
function Team({ team, align }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: align === "right" ? "flex-end" : "flex-start"
      }}
    >
      {align === "left" && (
        <img src={team.logo} alt={team.name} style={{ width: 28 }} />
      )}
      <strong>{team.name}</strong>
      {align === "right" && (
        <img src={team.logo} alt={team.name} style={{ width: 28 }} />
      )}
    </div>
  );
}