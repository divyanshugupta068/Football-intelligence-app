import { useNavigate } from "react-router-dom";
import { Clock, Circle } from "lucide-react";
import { theme, card, text } from "../theme";

export default function LiveMatchCard({ match }) {
  if (!match) return null;

  const navigate = useNavigate(); // ✅ ADDED (REQUIRED FOR MATCH DETAIL)

  const isLive =
    match.minute !== null &&
    match.minute !== undefined &&
    match.minute !== "";

  return (
    <div
      style={{
        ...card.base,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: isLive
          ? "linear-gradient(180deg, #020617, #020617dd)"
          : theme.colors.card,
        border:
          isLive
            ? "1px solid rgba(239,68,68,0.4)"
            : `1px solid ${theme.colors.border}`,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease"
      }}
      onClick={() => navigate(`/match/${match.id}`)} // ✅ ADDED (MATCH DETAIL NAV)
      onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* LIVE BADGE */}
      {isLive && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#ef4444",
            fontWeight: 600
          }}
        >
          <Circle size={8} fill="#ef4444" />
          LIVE
        </div>
      )}

      {/* LEAGUE */}
      <div style={{ ...text.muted, fontSize: 12 }}>
        {match.league}
      </div>

      {/* TEAMS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 12
        }}
      >
        {/* HOME */}
        <TeamBlock team={match.home} align="right" />

        {/* SCORE */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          {match.home.goals ?? "-"}
          <span style={{ opacity: 0.4 }}>:</span>
          {match.away.goals ?? "-"}
        </div>

        {/* AWAY */}
        <TeamBlock team={match.away} align="left" />
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4
        }}
      >
        {isLive ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "#ef4444",
              fontWeight: 600
            }}
          >
            <Clock size={14} />
            {match.minute}'
          </div>
        ) : (
          <div style={{ ...text.muted, fontSize: 12 }}>
            Scheduled
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- SUB COMPONENT ---------- */

function TeamBlock({ team, align }) {
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
        <img
          src={team.logo}
          alt={team.name}
          style={{ width: 24, height: 24 }}
        />
      )}

      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          textAlign: align === "right" ? "right" : "left"
        }}
      >
        {team.name}
      </span>

      {align === "right" && (
        <img
          src={team.logo}
          alt={team.name}
          style={{ width: 24, height: 24 }}
        />
      )}
    </div>
  );
}