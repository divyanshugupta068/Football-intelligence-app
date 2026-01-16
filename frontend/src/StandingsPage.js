import { useEffect, useState } from "react";
import { theme, layout, card } from "./theme";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Mock standings data for top leagues
const LEAGUE_STANDINGS = {
  "Premier League": [
    { rank: 1, team: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", played: 21, won: 14, drawn: 6, lost: 1, gf: 47, ga: 19, gd: 28, points: 48 },
    { rank: 2, team: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png", played: 21, won: 13, drawn: 6, lost: 2, gf: 45, ga: 20, gd: 25, points: 45 },
    { rank: 3, team: "Man City", logo: "https://media.api-sports.io/football/teams/50.png", played: 21, won: 13, drawn: 4, lost: 4, gf: 48, ga: 27, gd: 21, points: 43 },
    { rank: 4, team: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", played: 21, won: 11, drawn: 6, lost: 4, gf: 42, ga: 25, gd: 17, points: 39 },
    { rank: 5, team: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png", played: 21, won: 11, drawn: 4, lost: 6, gf: 38, ga: 32, gd: 6, points: 37 },
    { rank: 6, team: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png", played: 21, won: 10, drawn: 5, lost: 6, gf: 41, ga: 28, gd: 13, points: 35 },
    { rank: 7, team: "Man United", logo: "https://media.api-sports.io/football/teams/33.png", played: 21, won: 10, drawn: 4, lost: 7, gf: 32, ga: 28, gd: 4, points: 34 },
    { rank: 8, team: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png", played: 21, won: 9, drawn: 5, lost: 7, gf: 35, ga: 29, gd: 6, points: 32 }
  ],
  "La Liga": [
    { rank: 1, team: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png", played: 19, won: 13, drawn: 4, lost: 2, gf: 42, ga: 16, gd: 26, points: 43 },
    { rank: 2, team: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png", played: 19, won: 12, drawn: 4, lost: 3, gf: 48, ga: 22, gd: 26, points: 40 },
    { rank: 3, team: "Atlético Madrid", logo: "https://media.api-sports.io/football/teams/530.png", played: 19, won: 11, drawn: 5, lost: 3, gf: 35, ga: 18, gd: 17, points: 38 },
    { rank: 4, team: "Athletic Bilbao", logo: "https://media.api-sports.io/football/teams/531.png", played: 19, won: 10, drawn: 5, lost: 4, gf: 32, ga: 20, gd: 12, points: 35 },
    { rank: 5, team: "Real Sociedad", logo: "https://media.api-sports.io/football/teams/548.png", played: 19, won: 9, drawn: 4, lost: 6, gf: 28, ga: 22, gd: 6, points: 31 },
    { rank: 6, team: "Villarreal", logo: "https://media.api-sports.io/football/teams/533.png", played: 19, won: 8, drawn: 6, lost: 5, gf: 30, ga: 28, gd: 2, points: 30 }
  ],
  "Bundesliga": [
    { rank: 1, team: "Bayern", logo: "https://media.api-sports.io/football/teams/157.png", played: 17, won: 12, drawn: 3, lost: 2, gf: 52, ga: 18, gd: 34, points: 39 },
    { rank: 2, team: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png", played: 17, won: 11, drawn: 4, lost: 2, gf: 45, ga: 22, gd: 23, points: 37 },
    { rank: 3, team: "RB Leipzig", logo: "https://media.api-sports.io/football/teams/173.png", played: 17, won: 10, drawn: 4, lost: 3, gf: 38, ga: 20, gd: 18, points: 34 },
    { rank: 4, team: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png", played: 17, won: 9, drawn: 4, lost: 4, gf: 35, ga: 25, gd: 10, points: 31 },
    { rank: 5, team: "VfB Stuttgart", logo: "https://media.api-sports.io/football/teams/160.png", played: 17, won: 8, drawn: 5, lost: 4, gf: 32, ga: 28, gd: 4, points: 29 }
  ],
  "Serie A": [
    { rank: 1, team: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png", played: 20, won: 14, drawn: 4, lost: 2, gf: 48, ga: 18, gd: 30, points: 46 },
    { rank: 2, team: "Napoli", logo: "https://media.api-sports.io/football/teams/492.png", played: 20, won: 13, drawn: 4, lost: 3, gf: 42, ga: 22, gd: 20, points: 43 },
    { rank: 3, team: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png", played: 20, won: 12, drawn: 5, lost: 3, gf: 38, ga: 24, gd: 14, points: 41 },
    { rank: 4, team: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png", played: 20, won: 11, drawn: 6, lost: 3, gf: 35, ga: 20, gd: 15, points: 39 },
    { rank: 5, team: "Roma", logo: "https://media.api-sports.io/football/teams/497.png", played: 20, won: 10, drawn: 5, lost: 5, gf: 32, ga: 25, gd: 7, points: 35 },
    { rank: 6, team: "Lazio", logo: "https://media.api-sports.io/football/teams/487.png", played: 20, won: 9, drawn: 6, lost: 5, gf: 30, ga: 24, gd: 6, points: 33 }
  ],
  "Ligue 1": [
    { rank: 1, team: "PSG", logo: "https://media.api-sports.io/football/teams/85.png", played: 18, won: 14, drawn: 3, lost: 1, gf: 45, ga: 15, gd: 30, points: 45 },
    { rank: 2, team: "Monaco", logo: "https://media.api-sports.io/football/teams/91.png", played: 18, won: 11, drawn: 4, lost: 3, gf: 38, ga: 22, gd: 16, points: 37 },
    { rank: 3, team: "Lille", logo: "https://media.api-sports.io/football/teams/79.png", played: 18, won: 10, drawn: 5, lost: 3, gf: 32, ga: 20, gd: 12, points: 35 },
    { rank: 4, team: "Lyon", logo: "https://media.api-sports.io/football/teams/80.png", played: 18, won: 9, drawn: 5, lost: 4, gf: 30, ga: 22, gd: 8, points: 32 },
    { rank: 5, team: "Marseille", logo: "https://media.api-sports.io/football/teams/81.png", played: 18, won: 8, drawn: 6, lost: 4, gf: 28, ga: 24, gd: 4, points: 30 }
  ]
};

export default function StandingsPage() {
  const [selectedLeague, setSelectedLeague] = useState("Premier League");
  const [loading, setLoading] = useState(false);

  const standings = LEAGUE_STANDINGS[selectedLeague] || [];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <Trophy size={24} />
            League Standings
          </h2>
          <p style={subtitleStyle}>Current season standings</p>
        </div>

        {/* League Selector */}
        <div style={leagueSelectorStyle}>
          {Object.keys(LEAGUE_STANDINGS).map(league => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              style={{
                ...leagueButtonStyle,
                background: selectedLeague === league ? theme.colors.accent : "transparent",
                color: selectedLeague === league ? "#fff" : theme.colors.textPrimary,
                borderColor: selectedLeague === league ? theme.colors.accent : theme.colors.border
              }}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Standings Table */}
        <div style={tableContainerStyle}>
          {/* Table Header */}
          <div style={tableHeaderStyle}>
            <div style={rankColumnStyle}>#</div>
            <div style={teamColumnStyle}>Team</div>
            <div style={statColumnStyle}>P</div>
            <div style={statColumnStyle}>W</div>
            <div style={statColumnStyle}>D</div>
            <div style={statColumnStyle}>L</div>
            <div style={statColumnStyle}>GD</div>
            <div style={pointsColumnStyle}>Pts</div>
          </div>

          {/* Table Rows */}
          {standings.map((team, index) => (
            <StandingRow key={team.team} team={team} index={index} />
          ))}
        </div>

        {/* Legend */}
        <div style={legendStyle}>
          <div style={legendItemStyle}>
            <div style={{ ...legendDotStyle, background: "#22c55e" }}></div>
            <span>Champions League</span>
          </div>
          <div style={legendItemStyle}>
            <div style={{ ...legendDotStyle, background: "#3b82f6" }}></div>
            <span>Europa League</span>
          </div>
          <div style={legendItemStyle}>
            <div style={{ ...legendDotStyle, background: "#ef4444" }}></div>
            <span>Relegation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STANDING ROW ---------- */
function StandingRow({ team, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const getRowColor = (rank) => {
    if (rank <= 4) return "#22c55e22";
    if (rank <= 6) return "#3b82f622";
    if (rank >= 18) return "#ef444422";
    return "transparent";
  };

  const getPositionIndicator = (rank) => {
    if (rank === 1) return <TrendingUp size={14} color="#22c55e" />;
    if (rank >= 18) return <TrendingDown size={14} color="#ef4444" />;
    return <Minus size={14} color={theme.colors.textMuted} />;
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "40px 1fr 40px 40px 40px 40px 60px 60px",
    gap: 12,
    padding: "12px 16px",
    borderRadius: theme.radius.md,
    background: isHovered ? theme.colors.surfaceGlass : getRowColor(team.rank),
    border: `1px solid ${isHovered ? theme.colors.border : "transparent"}`,
    alignItems: "center",
    transition: "all 0.3s ease",
    animation: `fadeIn 0.5s ease ${index * 0.05}s both`,
    marginBottom: 8
  };

  return (
    <div
      style={rowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={rankStyle}>
        <span style={{ fontWeight: 700 }}>{team.rank}</span>
        {getPositionIndicator(team.rank)}
      </div>
      <div style={teamInfoStyle}>
        <img src={team.logo} alt={team.team} style={teamLogoStyle} />
        <span style={teamNameStyle}>{team.team}</span>
      </div>
      <div style={statStyle}>{team.played}</div>
      <div style={statStyle}>{team.won}</div>
      <div style={statStyle}>{team.drawn}</div>
      <div style={statStyle}>{team.lost}</div>
      <div style={{ ...statStyle, color: team.gd > 0 ? "#22c55e" : team.gd < 0 ? "#ef4444" : theme.colors.textMuted }}>
        {team.gd > 0 ? "+" : ""}{team.gd}
      </div>
      <div style={pointsStyle}>{team.points}</div>
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
  maxWidth: 1000
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

const leagueSelectorStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
  overflowX: "auto",
  paddingBottom: 8
};

const leagueButtonStyle = {
  padding: "10px 20px",
  borderRadius: theme.radius.pill,
  border: "1px solid",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  transition: "all 0.3s ease",
  whiteSpace: "nowrap"
};

const tableContainerStyle = {
  ...card.base,
  padding: theme.spacing.md
};

const tableHeaderStyle = {
  display: "grid",
  gridTemplateColumns: "40px 1fr 40px 40px 40px 40px 60px 60px",
  gap: 12,
  padding: "12px 16px",
  fontSize: 12,
  fontWeight: 600,
  color: theme.colors.textMuted,
  borderBottom: `2px solid ${theme.colors.border}`,
  marginBottom: 12
};

const rankColumnStyle = {
  textAlign: "center"
};

const teamColumnStyle = {
  textAlign: "left"
};

const statColumnStyle = {
  textAlign: "center"
};

const pointsColumnStyle = {
  textAlign: "center",
  fontWeight: 700
};

const rankStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  fontSize: 14
};

const teamInfoStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12
};

const teamLogoStyle = {
  width: 24,
  height: 24,
  objectFit: "contain"
};

const teamNameStyle = {
  fontSize: 14,
  fontWeight: 600
};

const statStyle = {
  textAlign: "center",
  fontSize: 14,
  color: theme.colors.textSecondary
};

const pointsStyle = {
  textAlign: "center",
  fontSize: 16,
  fontWeight: 800,
  color: theme.colors.textPrimary
};

const legendStyle = {
  display: "flex",
  gap: 24,
  marginTop: 24,
  padding: theme.spacing.md,
  background: theme.colors.surfaceGlass,
  borderRadius: theme.radius.md,
  border: `1px solid ${theme.colors.border}`
};

const legendItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  color: theme.colors.textMuted
};

const legendDotStyle = {
  width: 12,
  height: 12,
  borderRadius: "50%"
};