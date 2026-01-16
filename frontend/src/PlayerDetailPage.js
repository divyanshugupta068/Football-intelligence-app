import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { theme, layout, card } from "./theme";
import {
    ArrowLeft,
    Trophy,
    Target,
    TrendingUp,
    Activity,
    Award,
    MapPin,
    Calendar,
    Shirt,
    BarChart3
} from "lucide-react";
import { Radar, Bar } from "react-chartjs-2";

export default function PlayerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/player/${encodeURIComponent(id)}`)
            .then(r => r.json())
            .then(data => {
                setPlayer(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div style={pageStyle}>
                <div style={containerStyle}>
                    <div style={loadingStyle}>
                        <div style={spinnerStyle}></div>
                        <p style={{ color: theme.colors.textMuted }}>Loading player...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!player) {
        return (
            <div style={pageStyle}>
                <div style={containerStyle}>
                    <div style={emptyStateStyle}>
                        <p style={{ color: theme.colors.textMuted }}>Player not found</p>
                    </div>
                </div>
            </div>
        );
    }

    const getOVRColor = (ovr) => {
        if (ovr >= 90) return "#facc15";
        if (ovr >= 85) return "#22c55e";
        if (ovr >= 80) return "#3b82f6";
        if (ovr >= 75) return "#a78bfa";
        return "#64748b";
    };

    const ovrColor = getOVRColor(player.overall);

    // Radar chart data
    const radarData = {
        labels: ["Pace", "Dribbling", "Shooting", "Passing", "Defending", "Physical"],
        datasets: [
            {
                label: player.player,
                data: [
                    player.attributes?.pace || 0,
                    player.attributes?.dribbling || 0,
                    player.attributes?.shooting || 0,
                    player.attributes?.passing || 0,
                    player.attributes?.defending || 0,
                    player.attributes?.physical || 0
                ],
                borderColor: ovrColor,
                backgroundColor: `${ovrColor}33`,
                borderWidth: 3,
                pointBackgroundColor: ovrColor,
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 6
            }
        ]
    };

    const radarOptions = {
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    display: true,
                    stepSize: 20,
                    color: theme.colors.textMuted,
                    backdropColor: "transparent"
                },
                grid: { color: theme.colors.border },
                angleLines: { color: theme.colors.border },
                pointLabels: {
                    color: theme.colors.textPrimary,
                    font: { size: 12, weight: "600" }
                }
            }
        },
        plugins: {
            legend: { display: false }
        },
        maintainAspectRatio: true
    };

    // Bar chart for stats
    const statsBarData = {
        labels: ["Goals", "Assists", "Matches", "Shots"],
        datasets: [
            {
                data: [
                    player.stats?.goals || 0,
                    player.stats?.assists || 0,
                    player.stats?.matches || 0,
                    player.stats?.shots || 0
                ],
                backgroundColor: [
                    theme.colors.chartGreen,
                    theme.colors.chartBlue,
                    theme.colors.chartPurple,
                    theme.colors.chartOrange
                ],
                borderRadius: 10,
                barThickness: 40
            }
        ]
    };

    const statsBarOptions = {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { color: theme.colors.border },
                ticks: { color: theme.colors.textMuted }
            },
            y: {
                grid: { display: false },
                ticks: { color: theme.colors.textPrimary, font: { weight: "600" } }
            }
        }
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                {/* Back Button */}
                <button style={backButtonStyle} onClick={() => navigate("/players")}>
                    <ArrowLeft size={20} />
                    Back to Players
                </button>

                {/* Player Header */}
                <div style={headerCardStyle}>
                    <div style={headerContentStyle}>
                        <img
                            src={player.photo}
                            alt={player.player}
                            style={playerPhotoLargeStyle}
                            onError={(e) => {
                                e.target.src = `https://via.placeholder.com/150?text=${player.player?.charAt(0)}`;
                            }}
                        />
                        <div style={headerInfoStyle}>
                            <h1 style={playerNameLargeStyle}>{player.player}</h1>
                            <div style={metaRowStyle}>
                                <div style={metaItemStyle}>
                                    <Shirt size={16} />
                                    <span>{player.position}</span>
                                </div>
                                <div style={metaItemStyle}>
                                    <MapPin size={16} />
                                    <span>{player.nationality}</span>
                                </div>
                                <div style={metaItemStyle}>
                                    <Calendar size={16} />
                                    <span>{player.age} years</span>
                                </div>
                            </div>
                            <div style={clubInfoStyle}>
                                <Trophy size={18} color={theme.colors.accent} />
                                <span style={clubNameStyle}>{player.club}</span>
                                <span style={leaguePillStyle}>{player.league}</span>
                            </div>
                        </div>
                        <div style={ovrBadgeLargeStyle}>
                            <div style={{ fontSize: 48, fontWeight: 900, color: ovrColor }}>
                                {player.overall}
                            </div>
                            <div style={{ fontSize: 14, color: theme.colors.textMuted }}>OVERALL</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={tabsContainerStyle}>
                    <Tab label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                    <Tab label="Stats" active={activeTab === "stats"} onClick={() => setActiveTab("stats")} />
                    <Tab label="Attributes" active={activeTab === "attributes"} onClick={() => setActiveTab("attributes")} />
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div style={contentGridStyle}>
                        {/* Key Stats */}
                        <div style={sectionCardStyle}>
                            <h2 style={sectionTitleStyle}>
                                <Target size={20} />
                                Season Statistics
                            </h2>
                            <div style={statsGridStyle}>
                                <StatBox
                                    icon={Target}
                                    label="Goals"
                                    value={player.stats?.goals || 0}
                                    color={theme.colors.chartGreen}
                                />
                                <StatBox
                                    icon={TrendingUp}
                                    label="Assists"
                                    value={player.stats?.assists || 0}
                                    color={theme.colors.chartBlue}
                                />
                                <StatBox
                                    icon={Activity}
                                    label="Matches"
                                    value={player.stats?.matches || 0}
                                    color={theme.colors.chartPurple}
                                />
                                <StatBox
                                    icon={Award}
                                    label="Shots"
                                    value={player.stats?.shots || 0}
                                    color={theme.colors.chartOrange}
                                />
                            </div>
                        </div>

                        {/* Advanced Metrics */}
                        <div style={sectionCardStyle}>
                            <h2 style={sectionTitleStyle}>
                                <BarChart3 size={20} />
                                Advanced Metrics
                            </h2>
                            <div style={metricsListStyle}>
                                <MetricRow label="xG (Expected Goals)" value={(player.stats?.totalXG || 0).toFixed(2)} />
                                <MetricRow label="Shots per 90" value={(player.stats?.shotsPer90 || 0).toFixed(2)} />
                                <MetricRow label="xG per 90" value={(player.stats?.xGPer90 || 0).toFixed(2)} />
                                <MetricRow label="Avg xG per Shot" value={(player.stats?.avgXGPerShot || 0).toFixed(3)} />
                            </div>
                        </div>

                        {/* Attributes Radar */}
                        <div style={{ ...sectionCardStyle, gridColumn: "1 / -1" }}>
                            <h2 style={sectionTitleStyle}>
                                <Activity size={20} />
                                Attribute Radar
                            </h2>
                            <div style={radarContainerStyle}>
                                <Radar data={radarData} options={radarOptions} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Tab */}
                {activeTab === "stats" && (
                    <div style={contentGridStyle}>
                        <div style={{ ...sectionCardStyle, gridColumn: "1 / -1" }}>
                            <h2 style={sectionTitleStyle}>
                                <BarChart3 size={20} />
                                Season Performance
                            </h2>
                            <div style={barChartContainerStyle}>
                                <Bar data={statsBarData} options={statsBarOptions} />
                            </div>
                        </div>

                        {/* Detailed Stats */}
                        <div style={{ ...sectionCardStyle, gridColumn: "1 / -1" }}>
                            <h2 style={sectionTitleStyle}>Detailed Statistics</h2>
                            <div style={detailedStatsGridStyle}>
                                <DetailedStatCard
                                    category="Attacking"
                                    stats={[
                                        { label: "Goals", value: player.stats?.goals || 0 },
                                        { label: "Assists", value: player.stats?.assists || 0 },
                                        { label: "Total xG", value: (player.stats?.totalXG || 0).toFixed(2) },
                                        { label: "Shots", value: player.stats?.shots || 0 }
                                    ]}
                                    color={theme.colors.chartGreen}
                                />
                                <DetailedStatCard
                                    category="Performance"
                                    stats={[
                                        { label: "Matches Played", value: player.stats?.matches || 0 },
                                        { label: "Shots per 90", value: (player.stats?.shotsPer90 || 0).toFixed(2) },
                                        { label: "xG per 90", value: (player.stats?.xGPer90 || 0).toFixed(2) },
                                        { label: "Avg xG/Shot", value: (player.stats?.avgXGPerShot || 0).toFixed(3) }
                                    ]}
                                    color={theme.colors.chartBlue}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Attributes Tab */}
                {activeTab === "attributes" && (
                    <div style={contentGridStyle}>
                        <div style={{ ...sectionCardStyle, gridColumn: "1 / -1" }}>
                            <h2 style={sectionTitleStyle}>Player Attributes</h2>
                            <div style={attributesGridStyle}>
                                <AttributeBar
                                    label="Pace"
                                    value={player.attributes?.pace || 0}
                                    color="#3b82f6"
                                />
                                <AttributeBar
                                    label="Dribbling"
                                    value={player.attributes?.dribbling || 0}
                                    color="#22c55e"
                                />
                                <AttributeBar
                                    label="Shooting"
                                    value={player.attributes?.shooting || 0}
                                    color="#ef4444"
                                />
                                <AttributeBar
                                    label="Passing"
                                    value={player.attributes?.passing || 0}
                                    color="#f59e0b"
                                />
                                <AttributeBar
                                    label="Defending"
                                    value={player.attributes?.defending || 0}
                                    color="#8b5cf6"
                                />
                                <AttributeBar
                                    label="Physical"
                                    value={player.attributes?.physical || 0}
                                    color="#ec4899"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function Tab({ label, active, onClick }) {
    const tabStyle = {
        padding: "12px 24px",
        borderRadius: theme.radius.pill,
        border: `2px solid ${active ? theme.colors.accent : theme.colors.border}`,
        background: active ? theme.colors.accent : "transparent",
        color: active ? "#fff" : theme.colors.textPrimary,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
        transition: "all 0.3s ease"
    };

    return <button onClick={onClick} style={tabStyle}>{label}</button>;
}

function StatBox({ icon: Icon, label, value, color }) {
    return (
        <div style={{ ...statBoxStyle, borderColor: color }}>
            <Icon size={24} color={color} />
            <div style={{ fontSize: 32, fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: 13, color: theme.colors.textMuted }}>{label}</div>
        </div>
    );
}

function MetricRow({ label, value }) {
    return (
        <div style={metricRowStyle}>
            <span style={{ color: theme.colors.textSecondary }}>{label}</span>
            <span style={{ fontWeight: 700, color: theme.colors.textPrimary }}>{value}</span>
        </div>
    );
}

function DetailedStatCard({ category, stats, color }) {
    return (
        <div style={{ ...detailedStatCardStyle, borderLeftColor: color }}>
            <h3 style={{ ...categoryTitleStyle, color }}>{category}</h3>
            {stats.map((stat, idx) => (
                <div key={idx} style={statRowStyle}>
                    <span>{stat.label}</span>
                    <span style={{ fontWeight: 700 }}>{stat.value}</span>
                </div>
            ))}
        </div>
    );
}

function AttributeBar({ label, value, color }) {
    return (
        <div style={attributeBarContainerStyle}>
            <div style={attributeLabelRowStyle}>
                <span style={{ fontWeight: 600 }}>{label}</span>
                <span style={{ fontWeight: 700, color }}>{value}</span>
            </div>
            <div style={progressBarBgStyle}>
                <div
                    style={{
                        ...progressBarFillStyle,
                        width: `${value}%`,
                        background: color
                    }}
                />
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
    maxWidth: 1200
};

const backButtonStyle = {
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
    marginBottom: 24,
    transition: "all 0.3s ease"
};

const headerCardStyle = {
    ...card.elevated,
    marginBottom: 24,
    background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.surfaceGlass})`
};

const headerContentStyle = {
    display: "flex",
    gap: 24,
    alignItems: "flex-start"
};

const playerPhotoLargeStyle = {
    width: 150,
    height: 150,
    borderRadius: theme.radius.lg,
    objectFit: "cover",
    border: `3px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.lg
};

const headerInfoStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12
};

const playerNameLargeStyle = {
    fontSize: 36,
    fontWeight: 900,
    margin: 0,
    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
};

const metaRowStyle = {
    display: "flex",
    gap: 20,
    flexWrap: "wrap"
};

const metaItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    color: theme.colors.textSecondary
};

const clubInfoStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12
};

const clubNameStyle = {
    fontSize: 18,
    fontWeight: 700,
    color: theme.colors.textPrimary
};

const leaguePillStyle = {
    padding: "6px 14px",
    borderRadius: theme.radius.pill,
    background: theme.colors.accent,
    color: "#fff",
    fontSize: 12,
    fontWeight: 600
};

const ovrBadgeLargeStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: theme.radius.lg,
    border: `3px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    minWidth: 120
};

const tabsContainerStyle = {
    display: "flex",
    gap: 12,
    marginBottom: 24
};

const contentGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20
};

const sectionCardStyle = {
    ...card.base,
    padding: theme.spacing.lg
};

const sectionTitleStyle = {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: theme.colors.textPrimary
};

const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 16
};

const statBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 20,
    borderRadius: theme.radius.md,
    border: "2px solid",
    background: theme.colors.surfaceGlass,
    transition: "all 0.3s ease"
};

const metricsListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 12
};

const metricRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: `1px solid ${theme.colors.border}`
};

const radarContainerStyle = {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20
};

const barChartContainerStyle = {
    padding: 20
};

const detailedStatsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginTop: 20
};

const detailedStatCardStyle = {
    padding: 20,
    borderRadius: theme.radius.md,
    background: theme.colors.surfaceGlass,
    borderLeft: "4px solid"
};

const categoryTitleStyle = {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16
};

const statRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: 14,
    color: theme.colors.textSecondary
};

const attributesGridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20
};

const attributeBarContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8
};

const attributeLabelRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    color: theme.colors.textPrimary
};

const progressBarBgStyle = {
    width: "100%",
    height: 12,
    background: theme.colors.border,
    borderRadius: 999,
    overflow: "hidden"
};

const progressBarFillStyle = {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.5s ease"
};

const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
    gap: 16
};

const spinnerStyle = {
    width: 40,
    height: 40,
    border: `4px solid ${theme.colors.border}`,
    borderTop: `4px solid ${theme.colors.accent}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
};

const emptyStateStyle = {
    ...card.base,
    padding: 60,
    textAlign: "center"
};
