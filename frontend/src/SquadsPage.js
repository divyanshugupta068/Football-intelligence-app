import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { theme, layout, card } from "./theme";
import { Users, Target, TrendingUp, Award } from "lucide-react";

export default function SquadsPage() {
  const { club } = useParams();
  const navigate = useNavigate();

  const [squad, setSquad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState("All");

  // Load squad from enhanced players
  useEffect(() => {
    if (!club) return;

    setLoading(true);

    // Fetch all players and filter by club
    fetch("/players/enhanced")
      .then(r => r.json())
      .then(players => {
        if (Array.isArray(players)) {
          // Filter players by club name
          const clubPlayers = players.filter(p =>
            p.club.toLowerCase() === decodeURIComponent(club).toLowerCase()
          );
          setSquad(clubPlayers);
        }
        setLoading(false);
      })
      .catch(() => {
        setSquad([]);
        setLoading(false);
      });
  }, [club]);

  // Helper function to categorize position
  const getPositionCategory = (pos) => {
    if (!pos) return "FWD";
    if (pos === "GK") return "GK";
    if (["CB", "LB", "RB", "LWB", "RWB"].includes(pos)) return "DEF";
    if (["CM", "CDM", "CAM", "LM", "RM"].includes(pos)) return "MID";
    if (["ST", "LW", "RW", "CF"].includes(pos)) return "FWD";
    return "FWD";
  };

  // Filter by position
  const filteredSquad = position === "All"
    ? squad
    : squad.filter(p => getPositionCategory(p.position) === position);

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>
              <Users size={24} />
              {decodeURIComponent(club)} Squad
            </h2>
            <p style={subtitleStyle}>
              {squad.length} players • {filteredSquad.length} showing
            </p>
          </div>
        </div>

        {/* POSITION FILTER */}
        <div style={filterBarStyle}>
          {["All", "GK", "DEF", "MID", "FWD"].map(p => (
            <button
              key={p}
              onClick={() => setPosition(p)}
              style={{
                ...filterButtonStyle,
                background: position === p ? theme.colors.accent : "transparent",
                color: position === p ? "#fff" : theme.colors.textPrimary,
                borderColor: position === p ? theme.colors.accent : theme.colors.border
              }}
            >
              {p === "All" ? "All Players" :
                p === "GK" ? "Goalkeepers" :
                  p === "DEF" ? "Defenders" :
                    p === "MID" ? "Midfielders" :
                      "Forwards"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div style={loadingStyle}>
            {[1, 2, 3].map(i => (
              <div key={i} style={skeletonCardStyle}></div>
            ))}
          </div>
        ) : squad.length === 0 ? (
          <div style={emptyStateStyle}>
            <p style={{ color: theme.colors.textMuted }}>
              No players found for {decodeURIComponent(club)}
            </p>
          </div>
        ) : filteredSquad.length === 0 ? (
          <div style={emptyStateStyle}>
            <p style={{ color: theme.colors.textMuted }}>
              No {position === "GK" ? "goalkeepers" :
                position === "DEF" ? "defenders" :
                  position === "MID" ? "midfielders" : "forwards"} in this squad
            </p>
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredSquad.map((player, index) => (
              <PlayerCard
                key={player.player}
                player={player}
                index={index}
                onClick={() => navigate(`/player/${encodeURIComponent(player.player)}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- PLAYER CARD ---------- */
function PlayerCard({ player, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    ...card.base,
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered ? theme.shadows.lg : theme.shadows.sm,
    animation: `fadeIn 0.5s ease ${index * 0.05}s both`
  };

  const getOVRColor = (ovr) => {
    if (ovr >= 90) return "#facc15";
    if (ovr >= 85) return "#22c55e";
    if (ovr >= 80) return "#3b82f6";
    return "#a78bfa";
  };

  const ovrColor = getOVRColor(player.overall);

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={playerHeaderStyle}>
        <img
          src={player.photo}
          alt={player.player}
          style={playerPhotoStyle}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/60?text=${player.player.charAt(0)}`;
          }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={playerNameStyle}>{player.player}</h3>
          <div style={badgeContainerStyle}>
            <span style={positionBadgeStyle}>{player.position}</span>
            <span style={ageBadgeStyle}>{player.age}y</span>
          </div>
          <p style={nationalityStyle}>{player.nationality}</p>
        </div>
        <div style={{ ...ovrBadgeStyle, borderColor: ovrColor, color: ovrColor }}>
          {player.overall}
        </div>
      </div>

      {/* Stats */}
      <div style={statsRowStyle}>
        <StatItem icon={Target} value={player.stats?.goals || 0} label="Goals" />
        <StatItem icon={TrendingUp} value={player.stats?.assists || 0} label="Assists" />
        <StatItem icon={Award} value={player.stats?.matches || 0} label="Matches" />
      </div>
    </div>
  );
}

/* ---------- STAT ITEM ---------- */
function StatItem({ icon: Icon, value, label }) {
  return (
    <div style={statItemStyle}>
      <Icon size={14} style={{ color: theme.colors.accent }} />
      <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 10, color: theme.colors.textMuted }}>{label}</div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  ...layout.page,
  paddingBottom: 80
};

const containerStyle = {
  ...layout.container,
  maxWidth: 1200
};

const headerStyle = {
  marginBottom: 24
};

const titleStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontSize: theme.sizes.h2,
  fontWeight: 800,
  margin: 0,
  marginBottom: 8
};

const subtitleStyle = {
  fontSize: theme.sizes.small,
  color: theme.colors.textMuted,
  margin: 0
};

const filterBarStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
  overflowX: "auto",
  paddingBottom: 8
};

const filterButtonStyle = {
  padding: "10px 20px",
  borderRadius: theme.radius.pill,
  border: "1px solid",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  transition: "all 0.3s ease",
  whiteSpace: "nowrap"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 20
};

const loadingStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 20
};

const skeletonCardStyle = {
  ...card.base,
  height: 180,
  animation: "pulse 1.5s ease-in-out infinite"
};

const emptyStateStyle = {
  ...card.base,
  padding: 60,
  textAlign: "center"
};

const playerHeaderStyle = {
  display: "flex",
  gap: 16,
  marginBottom: 16,
  alignItems: "flex-start"
};

const playerPhotoStyle = {
  width: 60,
  height: 60,
  borderRadius: theme.radius.md,
  objectFit: "cover",
  border: `2px solid ${theme.colors.border}`
};

const playerNameStyle = {
  fontSize: 16,
  fontWeight: 700,
  margin: 0,
  marginBottom: 8
};

const badgeContainerStyle = {
  display: "flex",
  gap: 6,
  marginBottom: 4
};

const positionBadgeStyle = {
  padding: "4px 10px",
  borderRadius: theme.radius.sm,
  fontSize: 11,
  fontWeight: 600,
  background: theme.colors.accent,
  color: "#fff"
};

const ageBadgeStyle = {
  padding: "4px 10px",
  borderRadius: theme.radius.sm,
  fontSize: 11,
  fontWeight: 600,
  background: theme.colors.surfaceGlass,
  color: theme.colors.textSecondary,
  border: `1px solid ${theme.colors.border}`
};

const nationalityStyle = {
  fontSize: 12,
  color: theme.colors.textMuted,
  margin: 0
};

const ovrBadgeStyle = {
  width: 48,
  height: 48,
  borderRadius: theme.radius.md,
  border: "3px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: 800
};

const statsRowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12
};

const statItemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: 12,
  background: theme.colors.surfaceGlass,
  borderRadius: theme.radius.sm,
  border: `1px solid ${theme.colors.border}`
};
