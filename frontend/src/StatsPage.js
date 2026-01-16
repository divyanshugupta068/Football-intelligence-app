import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, layout, card } from "./theme";
import { Trophy, Target, TrendingUp, Zap, Award, Users } from "lucide-react";

export default function StatsPage() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/enhanced")
            .then(r => r.json())
            .then(d => {
                setPlayers(Array.isArray(d) ? d : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Calculate top players
    const topScorers = [...players]
        .sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0))
        .slice(0, 10);

    const topAssisters = [...players]
        .sort((a, b) => (b.stats?.assists || 0) - (a.stats?.assists || 0))
        .slice(0, 10);

    const fastestPlayers = [...players]
        .sort((a, b) => (b.attributes?.pace || 0) - (a.attributes?.pace || 0))
        .slice(0, 10);

    const bestShooters = [...players]
        .sort((a, b) => (b.attributes?.shooting || 0) - (a.attributes?.shooting || 0))
        .slice(0, 10);

    const topRated = [...players]
        .sort((a, b) => (b.overall || 0) - (a.overall || 0))
        .slice(0, 10);

    const bestDribblers = [...players]
        .sort((a, b) => (b.attributes?.dribbling || 0) - (a.attributes?.dribbling || 0))
        .slice(0, 10);

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <h1 style={titleStyle}>
                        <span style={gradientText}>Player Statistics</span>
                    </h1>
                    <p style={subtitleStyle}>
                        Top performers across all categories
                    </p>
                </div>

                {/* Stats Grid */}
                <div style={statsGridStyle}>
                    {/* Top Scorers */}
                    <StatSection
                        title="Top Scorers"
                        icon={Target}
                        color="#22c55e"
                        players={topScorers}
                        getValue={(p) => p.stats?.goals || 0}
                        suffix="goals"
                        loading={loading}
                        onClick={(p) => navigate(`/player/${encodeURIComponent(p.player)}`)}
                    />

                    {/* Top Assisters */}
                    <StatSection
                        title="Top Assisters"
                        icon={TrendingUp}
                        color="#3b82f6"
                        players={topAssisters}
                        getValue={(p) => p.stats?.assists || 0}
                        suffix="assists"
                        loading={loading}
                        onClick={(p) => navigate(`/player/${encodeURIComponent(p.player)}`)}
                    />

                    {/* Fastest Players */}
                    <StatSection
                        title="Fastest Players"
                        icon={Zap}
                        color="#f59e0b"
                        players={fastestPlayers}
                        getValue={(p) => p.attributes?.pace || 0}
                        suffix="pace"
                        loading={loading}
                        onClick={(p) => navigate(`/player/${encodeURIComponent(p.player)}`)}
                    />

                    {/* Best Shooters */}
                    <StatSection
                        title="Best Shooters"
                        icon={Trophy}
                        color="#ef4444"
                        players={bestShooters}
                        getValue={(p) => p.attributes?.shooting || 0}
                        suffix="shooting"
                        loading={loading}
                        onClick={(p) => navigate(`/player/${encodeURIComponent(p.player)}`)}
                    />

                    {/* Top Rated */}
                    <StatSection
                        title="Highest Rated"
                        icon={Award}
                        color="#a78bfa"
                        players={topRated}
                        getValue={(p) => p.overall || 0}
                        suffix="OVR"
                        loading={loading}
                        onClick={(p) => navigate(`/player/${encodeURIComponent(p.player)}`)}
                    />

                    {/* Best Dribblers */}
                    <StatSection
                        title="Best Dribblers"
                        icon={Users}
                        color="#ec4899"
                        players={bestDribblers}
                        getValue={(p) => p.attributes?.dribbling || 0}
                        suffix="dribbling"
                        loading={loading}
                        onClick={(p) => navigate(`/player/${encodeURIComponent(p.player)}`)}
                    />
                </div>
            </div>
        </div>
    );
}

/* ---------- STAT SECTION ---------- */
function StatSection({ title, icon: Icon, color, players, getValue, suffix, loading, onClick }) {
    return (
        <div style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
                <div style={{ ...iconContainerStyle, background: `${color}22`, borderColor: color }}>
                    <Icon size={24} color={color} />
                </div>
                <h2 style={sectionTitleStyle}>{title}</h2>
            </div>

            {loading ? (
                <div style={loadingStyle}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={skeletonRowStyle}></div>
                    ))}
                </div>
            ) : (
                <div style={listStyle}>
                    {players.map((player, index) => (
                        <PlayerRow
                            key={player.player}
                            player={player}
                            rank={index + 1}
                            value={getValue(player)}
                            suffix={suffix}
                            color={color}
                            onClick={() => onClick(player)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------- PLAYER ROW ---------- */
function PlayerRow({ player, rank, value, suffix, color, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const rowStyle = {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: theme.radius.md,
        background: isHovered ? theme.colors.surfaceGlass : "transparent",
        border: `1px solid ${isHovered ? theme.colors.border : "transparent"}`,
        cursor: "pointer",
        transition: "all 0.3s ease",
        animation: `fadeIn 0.5s ease ${rank * 0.05}s both`
    };

    const getRankColor = (rank) => {
        if (rank === 1) return "#facc15";
        if (rank === 2) return "#d4d4d8";
        if (rank === 3) return "#cd7f32";
        return theme.colors.textMuted;
    };

    const rankColor = getRankColor(rank);

    return (
        <div
            style={rowStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div style={{ ...rankBadgeStyle, color: rankColor, borderColor: rankColor }}>
                {rank}
            </div>
            <img
                src={player.photo}
                alt={player.player}
                style={playerPhotoSmallStyle}
                onError={(e) => {
                    e.target.src = `https://via.placeholder.com/40?text=${player.player.charAt(0)}`;
                }}
            />
            <div style={{ flex: 1 }}>
                <div style={playerNameSmallStyle}>{player.player}</div>
                <div style={playerClubSmallStyle}>{player.club}</div>
            </div>
            <div style={{ ...valueStyle, color }}>
                {value}
                <span style={suffixStyle}>{suffix}</span>
            </div>
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
    maxWidth: 1400
};

const headerStyle = {
    marginBottom: 32,
    textAlign: "center"
};

const titleStyle = {
    fontSize: theme.sizes.h1,
    fontWeight: 800,
    margin: 0,
    marginBottom: 8
};

const gradientText = {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
};

const subtitleStyle = {
    fontSize: theme.sizes.body,
    color: theme.colors.textMuted,
    margin: 0
};

const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 24
};

const sectionCardStyle = {
    ...card.elevated,
    padding: theme.spacing.lg
};

const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: `1px solid ${theme.colors.border}`
};

const iconContainerStyle = {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const sectionTitleStyle = {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    color: theme.colors.textPrimary
};

const listStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8
};

const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 12
};

const skeletonRowStyle = {
    height: 64,
    background: theme.colors.border,
    borderRadius: theme.radius.md,
    animation: "pulse 1.5s ease-in-out infinite"
};

const rankBadgeStyle = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 700,
    flexShrink: 0
};

const playerPhotoSmallStyle = {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    objectFit: "cover",
    border: `2px solid ${theme.colors.border}`,
    flexShrink: 0
};

const playerNameSmallStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.textPrimary,
    marginBottom: 2
};

const playerClubSmallStyle = {
    fontSize: 12,
    color: theme.colors.textMuted
};

const valueStyle = {
    fontSize: 24,
    fontWeight: 800,
    display: "flex",
    alignItems: "baseline",
    gap: 4,
    flexShrink: 0
};

const suffixStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.textMuted
};
