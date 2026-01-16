import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, layout, card } from "./theme";
import { Search, TrendingUp, Award, Target, Heart, Filter, SortAsc } from "lucide-react";

const LEAGUE_COLORS = {
    "Premier League": "#38003c",
    "La Liga": "#ee8707",
    "Bundesliga": "#d20515",
    "Serie A": "#024494",
    "Ligue 1": "#dae025"
};

export default function PlayersPageEnhanced() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("all");
    const [selectedPosition, setSelectedPosition] = useState("all");
    const [selectedRating, setSelectedRating] = useState("all");
    const [sortBy, setSortBy] = useState("overall");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoritePlayers');
        return saved ? JSON.parse(saved) : [];
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Load leagues
        fetch("/leagues")
            .then(r => r.json())
            .then(d => setLeagues(Array.isArray(d) ? d : []))
            .catch(() => setLeagues([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        const url = selectedLeague === "all"
            ? "http://localhost:5000/players/enhanced"
            : `http://localhost:5000/players/enhanced?league=${encodeURIComponent(selectedLeague)}`;

        fetch(url)
            .then(r => r.json())
            .then(d => {
                setPlayers(Array.isArray(d) ? d : []);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [selectedLeague]);

    const toggleFavorite = (playerName) => {
        const newFavorites = favorites.includes(playerName)
            ? favorites.filter(p => p !== playerName)
            : [...favorites, playerName];
        setFavorites(newFavorites);
        localStorage.setItem('favoritePlayers', JSON.stringify(newFavorites));
    };

    // Filter and sort players
    const filteredPlayers = players
        .filter(p => {
            // Search filter
            const matchesSearch = p.player.toLowerCase().includes(search.toLowerCase()) ||
                p.club.toLowerCase().includes(search.toLowerCase());

            // Position filter
            const matchesPosition = selectedPosition === "all" || p.position === selectedPosition;

            // Rating filter
            let matchesRating = true;
            if (selectedRating === "90+") matchesRating = p.overall >= 90;
            else if (selectedRating === "85-89") matchesRating = p.overall >= 85 && p.overall < 90;
            else if (selectedRating === "80-84") matchesRating = p.overall >= 80 && p.overall < 85;
            else if (selectedRating === "75-79") matchesRating = p.overall >= 75 && p.overall < 80;

            return matchesSearch && matchesPosition && matchesRating;
        })
        .sort((a, b) => {
            if (sortBy === "overall") return b.overall - a.overall;
            if (sortBy === "pace") return (b.attributes?.pace || 0) - (a.attributes?.pace || 0);
            if (sortBy === "shooting") return (b.attributes?.shooting || 0) - (a.attributes?.shooting || 0);
            if (sortBy === "goals") return (b.stats?.goals || 0) - (a.stats?.goals || 0);
            if (sortBy === "name") return a.player.localeCompare(b.player);
            return 0;
        });

    // Get unique positions
    const positions = [...new Set(players.map(p => p.position))].sort();

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <div>
                        <h1 style={titleStyle}>
                            <span style={gradientText}>Elite Players</span>
                        </h1>
                        <p style={subtitleStyle}>
                            {filteredPlayers.length} players {selectedLeague !== "all" ? `in ${selectedLeague}` : "across all leagues"}
                        </p>
                    </div>
                    <button style={filterToggleButton} onClick={() => setShowFilters(!showFilters)}>
                        <Filter size={20} />
                        {showFilters ? "Hide" : "Show"} Filters
                    </button>
                </div>

                {/* Search Bar */}
                <div style={searchContainerStyle}>
                    <Search size={20} style={searchIconStyle} />
                    <input
                        type="text"
                        placeholder="Search players or clubs..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={searchInputStyle}
                    />
                </div>

                {/* Filters Section */}
                {showFilters && (
                    <div style={filtersContainerStyle}>
                        {/* League Filter */}
                        <div style={filterGroupStyle}>
                            <label style={filterLabelStyle}>League</label>
                            <div style={leagueFilterStyle}>
                                <LeagueChip
                                    label="All Leagues"
                                    active={selectedLeague === "all"}
                                    onClick={() => setSelectedLeague("all")}
                                />
                                {leagues.map(league => (
                                    <LeagueChip
                                        key={league}
                                        label={league}
                                        active={selectedLeague === league}
                                        onClick={() => setSelectedLeague(league)}
                                        color={LEAGUE_COLORS[league]}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Position Filter */}
                        <div style={filterGroupStyle}>
                            <label style={filterLabelStyle}>Position</label>
                            <select
                                value={selectedPosition}
                                onChange={(e) => setSelectedPosition(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="all">All Positions</option>
                                {positions.map(pos => (
                                    <option key={pos} value={pos}>{pos}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div style={filterGroupStyle}>
                            <label style={filterLabelStyle}>Rating</label>
                            <select
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="all">All Ratings</option>
                                <option value="90+">90+ (World Class)</option>
                                <option value="85-89">85-89 (Elite)</option>
                                <option value="80-84">80-84 (Excellent)</option>
                                <option value="75-79">75-79 (Very Good)</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div style={filterGroupStyle}>
                            <label style={filterLabelStyle}>
                                <SortAsc size={16} style={{ marginRight: 6 }} />
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="overall">Overall Rating</option>
                                <option value="pace">Pace</option>
                                <option value="shooting">Shooting</option>
                                <option value="goals">Goals</option>
                                <option value="name">Name (A-Z)</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Players Grid */}
                {loading ? (
                    <div style={gridStyle}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <div style={gridStyle}>
                        {filteredPlayers.map((player, index) => (
                            <PlayerCard
                                key={player.player}
                                player={player}
                                index={index}
                                isFavorite={favorites.includes(player.player)}
                                onToggleFavorite={() => toggleFavorite(player.player)}
                                onClick={() => navigate(`/player/${encodeURIComponent(player.player)}`)}
                            />
                        ))}
                    </div>
                )}

                {filteredPlayers.length === 0 && !loading && (
                    <div style={emptyStateStyle}>
                        <p style={{ color: theme.colors.textMuted }}>No players found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- SKELETON CARD ---------- */
function SkeletonCard() {
    return (
        <div style={skeletonCardStyle}>
            <div style={skeletonHeaderStyle}>
                <div style={skeletonPhotoStyle}></div>
                <div style={{ flex: 1 }}>
                    <div style={skeletonTextStyle}></div>
                    <div style={{ ...skeletonTextStyle, width: "60%", marginTop: 8 }}></div>
                </div>
                <div style={skeletonBadgeStyle}></div>
            </div>
            <div style={skeletonStatsStyle}>
                <div style={skeletonStatStyle}></div>
                <div style={skeletonStatStyle}></div>
                <div style={skeletonStatStyle}></div>
            </div>
        </div>
    );
}

/* ---------- LEAGUE CHIP ---------- */
function LeagueChip({ label, active, onClick, color }) {
    const chipStyle = {
        padding: "10px 18px",
        borderRadius: theme.radius.pill,
        border: active ? `2px solid ${color || theme.colors.accent}` : `1px solid ${theme.colors.border}`,
        background: active
            ? `linear-gradient(135deg, ${color || theme.colors.accent}22, ${color || theme.colors.accent}11)`
            : "transparent",
        color: active ? theme.colors.textPrimary : theme.colors.textMuted,
        cursor: "pointer",
        fontSize: theme.sizes.small,
        fontWeight: active ? 600 : 500,
        transition: "all 0.3s ease",
        whiteSpace: "nowrap",
        boxShadow: active ? `0 0 20px ${color || theme.colors.accent}33` : "none"
    };

    return <button onClick={onClick} style={chipStyle}>{label}</button>;
}

/* ---------- PLAYER CARD ---------- */
function PlayerCard({ player, index, isFavorite, onToggleFavorite, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        ...card.base,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered ? theme.shadows.lg : theme.shadows.sm,
        borderColor: isHovered ? theme.colors.accent : theme.colors.border,
        animation: `fadeIn 0.5s ease ${index * 0.05}s both`,
        position: "relative"
    };

    const getOVRColor = (ovr) => {
        if (ovr >= 90) return "#facc15";
        if (ovr >= 85) return "#22c55e";
        if (ovr >= 80) return "#3b82f6";
        if (ovr >= 75) return "#a78bfa";
        return "#64748b";
    };

    const ovrColor = getOVRColor(player.overall);

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Favorite Button */}
            <button
                style={favoriteButtonStyle}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
            >
                <Heart
                    size={20}
                    fill={isFavorite ? theme.colors.danger : "none"}
                    color={isFavorite ? theme.colors.danger : theme.colors.textMuted}
                />
            </button>

            <div onClick={onClick}>
                {/* Header */}
                <div style={playerHeaderStyle}>
                    <img
                        src={player.photo}
                        alt={player.player}
                        style={playerPhotoStyle}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80?text=" + player.player.charAt(0);
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        <h3 style={playerNameStyle}>{player.player}</h3>
                        <p style={playerClubStyle}>{player.club}</p>
                        <div style={badgeContainerStyle}>
                            <span style={{ ...positionBadgeStyle, background: LEAGUE_COLORS[player.league] || theme.colors.accent }}>
                                {player.position}
                            </span>
                            <span style={leagueBadgeStyle}>{player.league}</span>
                        </div>
                    </div>
                    <div style={{ ...ovrBadgeStyle, borderColor: ovrColor, color: ovrColor }}>
                        {player.overall}
                    </div>
                </div>

                {/* Stats */}
                <div style={statsGridStyle}>
                    <StatItem icon={Target} label="Goals" value={player.stats?.goals || 0} />
                    <StatItem icon={TrendingUp} label="Assists" value={player.stats?.assists || 0} />
                    <StatItem icon={Award} label="Matches" value={player.stats?.matches || 0} />
                </div>

                {/* Progress Bar */}
                <div style={progressContainerStyle}>
                    <div style={progressLabelStyle}>
                        <span style={{ fontSize: 12, color: theme.colors.textMuted }}>Performance</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: ovrColor }}>
                            {player.overall}%
                        </span>
                    </div>
                    <div style={progressBarBgStyle}>
                        <div
                            style={{
                                ...progressBarFillStyle,
                                width: `${player.overall}%`,
                                background: `linear-gradient(90deg, ${ovrColor}, ${ovrColor}dd)`
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- STAT ITEM ---------- */
function StatItem({ icon: Icon, label, value }) {
    return (
        <div style={statItemStyle}>
            <Icon size={16} style={{ color: theme.colors.accent, marginBottom: 4 }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: theme.colors.textPrimary }}>
                {value}
            </div>
            <div style={{ fontSize: 11, color: theme.colors.textMuted }}>{label}</div>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24
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
    fontSize: theme.sizes.small,
    color: theme.colors.textMuted,
    margin: 0
};

const filterToggleButton = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 20px",
    borderRadius: theme.radius.pill,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.textPrimary,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.3s ease"
};

const searchContainerStyle = {
    position: "relative",
    marginBottom: 20
};

const searchIconStyle = {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    color: theme.colors.textMuted
};

const searchInputStyle = {
    width: "100%",
    padding: "14px 14px 14px 48px",
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    backdropFilter: "blur(20px)",
    color: theme.colors.textPrimary,
    fontSize: theme.sizes.body,
    outline: "none",
    transition: "all 0.3s ease"
};

const filtersContainerStyle = {
    ...card.elevated,
    marginBottom: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20
};

const filterGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8
};

const filterLabelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.textSecondary,
    display: "flex",
    alignItems: "center"
};

const selectStyle = {
    padding: "10px 14px",
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: 14,
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease"
};

const leagueFilterStyle = {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 8,
    gridColumn: "1 / -1"
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 20
};

const favoriteButtonStyle = {
    position: "absolute",
    top: 12,
    right: 12,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
    transition: "all 0.3s ease"
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
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    objectFit: "cover",
    border: `2px solid ${theme.colors.border}`,
    background: theme.colors.surface
};

const playerNameStyle = {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    marginBottom: 4,
    color: theme.colors.textPrimary
};

const playerClubStyle = {
    fontSize: 14,
    color: theme.colors.textMuted,
    margin: 0,
    marginBottom: 8
};

const badgeContainerStyle = {
    display: "flex",
    gap: 6
};

const positionBadgeStyle = {
    padding: "4px 10px",
    borderRadius: theme.radius.sm,
    fontSize: 11,
    fontWeight: 600,
    color: "#fff"
};

const leagueBadgeStyle = {
    padding: "4px 10px",
    borderRadius: theme.radius.sm,
    fontSize: 11,
    fontWeight: 600,
    background: theme.colors.surfaceGlass,
    color: theme.colors.textSecondary,
    border: `1px solid ${theme.colors.border}`
};

const ovrBadgeStyle = {
    width: 56,
    height: 56,
    borderRadius: theme.radius.md,
    border: "3px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 800,
    background: theme.colors.surface
};

const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginBottom: 16
};

const statItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
    background: theme.colors.surfaceGlass,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.border}`
};

const progressContainerStyle = {
    marginTop: 12
};

const progressLabelStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6
};

const progressBarBgStyle = {
    width: "100%",
    height: 6,
    background: theme.colors.border,
    borderRadius: 999,
    overflow: "hidden"
};

const progressBarFillStyle = {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.5s ease"
};

// Skeleton styles
const skeletonCardStyle = {
    ...card.base,
    animation: "pulse 1.5s ease-in-out infinite"
};

const skeletonHeaderStyle = {
    display: "flex",
    gap: 16,
    marginBottom: 16
};

const skeletonPhotoStyle = {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    background: theme.colors.border
};

const skeletonTextStyle = {
    height: 16,
    background: theme.colors.border,
    borderRadius: 4,
    width: "80%"
};

const skeletonBadgeStyle = {
    width: 56,
    height: 56,
    borderRadius: theme.radius.md,
    background: theme.colors.border
};

const skeletonStatsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12
};

const skeletonStatStyle = {
    height: 60,
    background: theme.colors.border,
    borderRadius: theme.radius.sm
};
