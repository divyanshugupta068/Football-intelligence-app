import { useEffect, useState } from "react";
import { theme, layout, card } from "./theme";
import { Newspaper, TrendingUp, Users, Trophy, Clock } from "lucide-react";

export default function NewsPage() {
    const [tab, setTab] = useState("all");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        let url = "http://localhost:5000/news/top";
        if (tab === "transfers") {
            url = "http://localhost:5000/news/transfers";
        }

        fetch(url)
            .then(r => r.json())
            .then(d => {
                setNews(Array.isArray(d) ? d : []);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [tab]);

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <div>
                        <h1 style={titleStyle}>
                            <span style={gradientText}>Football News</span>
                        </h1>
                        <p style={subtitleStyle}>Latest updates from the world of football</p>
                    </div>
                </div>

                {/* Category Tabs */}
                <div style={tabsStyle}>
                    <CategoryTab
                        icon={Newspaper}
                        label="All News"
                        active={tab === "all"}
                        onClick={() => setTab("all")}
                    />
                    <CategoryTab
                        icon={TrendingUp}
                        label="Transfers"
                        active={tab === "transfers"}
                        onClick={() => setTab("transfers")}
                    />
                    <CategoryTab
                        icon={Trophy}
                        label="Matches"
                        active={tab === "matches"}
                        onClick={() => setTab("matches")}
                    />
                    <CategoryTab
                        icon={Users}
                        label="Teams"
                        active={tab === "teams"}
                        onClick={() => setTab("teams")}
                    />
                </div>

                {/* News Grid */}
                {loading ? (
                    <div style={loadingStyle}>
                        <div style={spinnerStyle}></div>
                        <p style={{ color: theme.colors.textMuted }}>Loading latest news...</p>
                    </div>
                ) : (
                    <div style={newsGridStyle}>
                        {news.map((article, idx) => (
                            <NewsCard key={idx} article={article} />
                        ))}
                    </div>
                )}

                {news.length === 0 && !loading && (
                    <div style={emptyStateStyle}>
                        <Newspaper size={48} style={{ color: theme.colors.textMuted, marginBottom: 16 }} />
                        <p style={{ color: theme.colors.textMuted }}>No news available</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- CATEGORY TAB ---------- */
function CategoryTab({ icon: Icon, label, active, onClick }) {
    const tabStyle = {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 20px",
        borderRadius: theme.radius.pill,
        border: active ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.border}`,
        background: active
            ? `linear-gradient(135deg, ${theme.colors.accent}22, ${theme.colors.accent}11)`
            : theme.colors.surface,
        color: active ? theme.colors.textPrimary : theme.colors.textMuted,
        cursor: "pointer",
        fontSize: theme.sizes.small,
        fontWeight: active ? 600 : 500,
        transition: "all 0.3s ease",
        whiteSpace: "nowrap",
        boxShadow: active ? theme.shadows.glow : "none"
    };

    return (
        <button onClick={onClick} style={tabStyle}>
            <Icon size={18} />
            {label}
        </button>
    );
}

/* ---------- NEWS CARD ---------- */
function NewsCard({ article }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        ...card.base,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? theme.shadows.md : theme.shadows.sm,
        borderColor: isHovered ? theme.colors.accent : theme.colors.border,
        overflow: "hidden"
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return "Recently";
        try {
            const date = new Date(timeStr);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString();
        } catch {
            return "Recently";
        }
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {article.image && (
                <div style={imageContainerStyle}>
                    <img
                        src={article.image}
                        alt={article.title}
                        style={newsImageStyle}
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                    <div style={imageOverlayStyle}></div>
                </div>
            )}

            <div style={{ padding: article.image ? "16px" : "0" }}>
                <h3 style={newsTitleStyle}>{article.title}</h3>

                <div style={newsMetaStyle}>
                    <div style={sourceStyle}>
                        <Newspaper size={14} />
                        <span>{article.source || "Football News"}</span>
                    </div>
                    <div style={timeStyle}>
                        <Clock size={14} />
                        <span>{formatTime(article.time)}</span>
                    </div>
                </div>

                {article.reason && (
                    <div style={aiReasonStyle}>
                        <span style={aiLabelStyle}>AI</span>
                        {article.reason}
                    </div>
                )}
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

const headerStyle = {
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

const tabsStyle = {
    display: "flex",
    gap: 12,
    marginBottom: 24,
    overflowX: "auto",
    paddingBottom: 8
};

const newsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 20
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
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const imageContainerStyle = {
    position: "relative",
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginBottom: 16
};

const newsImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
};

const imageOverlayStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
};

const newsTitleStyle = {
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
    marginBottom: 12,
    color: theme.colors.textPrimary,
    lineHeight: 1.4
};

const newsMetaStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    fontSize: 12,
    color: theme.colors.textMuted
};

const sourceStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6
};

const timeStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6
};

const aiReasonStyle = {
    marginTop: 12,
    padding: 12,
    background: `linear-gradient(135deg, ${theme.colors.accent}11, ${theme.colors.accent}05)`,
    borderLeft: `3px solid ${theme.colors.accent}`,
    borderRadius: theme.radius.sm,
    fontSize: 13,
    color: theme.colors.textSecondary,
    display: "flex",
    alignItems: "flex-start",
    gap: 8
};

const aiLabelStyle = {
    padding: "2px 8px",
    background: theme.colors.accent,
    color: "#fff",
    borderRadius: theme.radius.sm,
    fontSize: 10,
    fontWeight: 700,
    flexShrink: 0
};
