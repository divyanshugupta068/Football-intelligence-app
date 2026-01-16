import { useEffect, useState } from "react";
import { theme, layout, card } from "./theme";
import LiveMatchCard from "./components/LiveMatchCard";
import ClubSelector from "./components/ClubSelector";
import { useNavigate } from "react-router-dom";
import { Star, TrendingUp, Trophy, Users, Newspaper as NewsIcon } from "lucide-react";

/* ---------- CLUB DATA ---------- */
const CLUBS = [
  { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
  { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
  { name: "Man City", logo: "https://media.api-sports.io/football/teams/50.png" },
  { name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
  { name: "Bayern", logo: "https://media.api-sports.io/football/teams/157.png" },
  { name: "PSG", logo: "https://media.api-sports.io/football/teams/85.png" }
];

export default function Home() {
  const navigate = useNavigate();

  const [showClubSelector, setShowClubSelector] = useState(false);
  const [favouriteClub, setFavouriteClub] = useState(
    localStorage.getItem("favouriteClub")
  );

  const selectClub = club => {
    localStorage.setItem("favouriteClub", club.name);
    setFavouriteClub(club.name);
    setShowClubSelector(false);
  };

  const [tab, setTab] = useState("forYou");
  const [news, setNews] = useState([]);
  const [forYou, setForYou] = useState([]);

  const [liveMatches, setLiveMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);

  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingForYou, setLoadingForYou] = useState(true);
  const [loadingLive, setLoadingLive] = useState(true);
  const [loadingToday, setLoadingToday] = useState(true);

  /* ---------- LIVE MATCHES ---------- */
  useEffect(() => {
    fetch("/live-matches")
      .then(r => r.json())
      .then(d => setLiveMatches(Array.isArray(d) ? d : []))
      .finally(() => setLoadingLive(false));
  }, []);

  /* ---------- TODAY MATCHES ---------- */
  useEffect(() => {
    fetch("/matches-today")
      .then(r => r.json())
      .then(d => setTodayMatches(Array.isArray(d) ? d : []))
      .finally(() => setLoadingToday(false));
  }, []);

  /* ---------- FOR YOU ---------- */
  useEffect(() => {
    fetch("/for-you")
      .then(r => r.json())
      .then(d => setForYou(Array.isArray(d) ? d : []))
      .finally(() => setLoadingForYou(false));
  }, []);

  /* ---------- NEWS ---------- */
  useEffect(() => {
    if (tab !== "top" && tab !== "transfer") return;

    const url =
      tab === "top"
        ? "http://localhost:5000/news/top"
        : "http://localhost:5000/news/transfers";

    setLoadingNews(true);
    fetch(url)
      .then(r => r.json())
      .then(d => setNews(Array.isArray(d) ? d : []))
      .finally(() => setLoadingNews(false));
  }, [tab]);

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        {/* HEADER */}
        <header style={header}>
          <div>
            <h1 style={title}>
              <span style={gradientText}>Football Intelligence</span>
            </h1>
            {favouriteClub && (
              <p style={subtitle}>Tracking · {favouriteClub}</p>
            )}
          </div>
          <button
            onClick={() => setShowClubSelector(true)}
            style={clubButton}
          >
            <Star size={16} fill={theme.colors.accent} color={theme.colors.accent} /> Club
          </button>
        </header>

        {/* QUICK ACTIONS */}
        <div style={quickActionsStyle}>
          <QuickAction
            icon={Users}
            label="Players"
            count="40+"
            onClick={() => navigate("/players")}
            gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
          />
          <QuickAction
            icon={Trophy}
            label="Matches"
            count="Live"
            onClick={() => navigate("/matches")}
            gradient="linear-gradient(135deg, #22c55e, #16a34a)"
          />
          <QuickAction
            icon={TrendingUp}
            label="Compare"
            count="Stats"
            onClick={() => navigate("/compare")}
            gradient="linear-gradient(135deg, #a78bfa, #8b5cf6)"
          />
          <QuickAction
            icon={NewsIcon}
            label="News"
            count="Latest"
            onClick={() => navigate("/news")}
            gradient="linear-gradient(135deg, #f59e0b, #d97706)"
          />
        </div>

        {/* CLUBS */}
        <div style={clubsSectionStyle}>
          <h2 style={sectionTitle}>⚽ Top Clubs</h2>
          <div style={clubsRow}>
            {CLUBS.map(c => (
              <div
                key={c.name}
                style={clubItem}
                onClick={() =>
                  navigate(`/club/${encodeURIComponent(c.name)}`)
                }
              >
                <div style={clubCircle}>
                  <img src={c.logo} alt={c.name} style={clubLogo} />
                </div>
                <span style={clubText}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE MATCHES */}
        <section>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitle}>🔥 Live Matches</h2>
            <button style={viewAllButton} onClick={() => navigate("/matches")}>
              View All
            </button>
          </div>

          {loadingLive || loadingToday ? (
            <p style={{ color: theme.colors.textMuted }}>Fetching matches…</p>
          ) : liveMatches.length > 0 ? (
            liveMatches.slice(0, 3).map(m => (
              <LiveMatchCard key={m.id} match={m} />
            ))
          ) : todayMatches.length > 0 ? (
            todayMatches.slice(0, 3).map(m => (
              <LiveMatchCard key={m.id} match={m} />
            ))
          ) : (
            <div style={card.base}>
              <p style={{ color: theme.colors.textMuted }}>No matches today</p>
            </div>
          )}
        </section>

        {/* TABS */}
        <div style={tabs}>
          <Tab label="For You" active={tab === "forYou"} onClick={() => setTab("forYou")} />
          <Tab label="Top News" active={tab === "top"} onClick={() => setTab("top")} />
          <Tab label="Transfers" active={tab === "transfer"} onClick={() => setTab("transfer")} />
        </div>

        {/* CONTENT */}
        {tab === "forYou" &&
          (loadingForYou ? (
            <p style={{ color: theme.colors.textMuted }}>Personalizing your feed…</p>
          ) : forYou.length === 0 ? (
            <div style={card.base}>
              <p style={{ color: theme.colors.textMuted }}>No recommendations yet</p>
            </div>
          ) : (
            forYou.slice(0, 5).map((n, i) => (
              <div key={i} style={newsCard}>
                <h3 style={newsTitle}>{n.title}</h3>
                {n.reason && (
                  <p style={{ ...text.muted, color: theme.colors.accent }}>
                    AI Reason · {n.reason}
                  </p>
                )}
              </div>
            ))
          ))}

        {(tab === "top" || tab === "transfer") &&
          (loadingNews ? (
            <p style={{ color: theme.colors.textMuted }}>Loading news…</p>
          ) : news.length === 0 ? (
            <div style={card.base}>
              <p style={{ color: theme.colors.textMuted }}>No news available</p>
            </div>
          ) : (
            news.slice(0, 5).map((n, i) => (
              <div key={i} style={newsCard}>
                <h3 style={newsTitle}>{n.title}</h3>
                <p style={{ color: theme.colors.textMuted }}>
                  {n.source} · {n.time}
                </p>
                {n.image && (
                  <img src={n.image} alt="" style={newsImage} />
                )}
              </div>
            ))
          ))}
      </div>

      {showClubSelector && (
        <ClubSelector
          selected={favouriteClub}
          onSelect={selectClub}
          onClose={() => setShowClubSelector(false)}
        />
      )}
    </div>
  );
}

/* ---------- QUICK ACTION ---------- */
function QuickAction({ icon: Icon, label, count, onClick, gradient }) {
  const [isHovered, setIsHovered] = useState(false);

  const actionStyle = {
    flex: 1,
    minWidth: 140,
    padding: 20,
    borderRadius: theme.radius.md,
    background: gradient,
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered ? theme.shadows.lg : theme.shadows.md,
    display: "flex",
    flexDirection: "column",
    gap: 8
  };

  return (
    <div
      style={actionStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={28} color="#fff" strokeWidth={2} />
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{count}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{label}</div>
      </div>
    </div>
  );
}

/* ---------- TAB ---------- */
function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px",
        borderRadius: theme.radius.pill,
        border: `1px solid ${theme.colors.border}`,
        background: active ? theme.colors.accent : "transparent",
        color: active ? "#fff" : theme.colors.textPrimary,
        cursor: "pointer",
        fontWeight: active ? 600 : 500,
        transition: "all 0.3s ease"
      }}
    >
      {label}
    </button>
  );
}

/* ---------- STYLES ---------- */

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 24,
  alignItems: "flex-start"
};

const title = { fontSize: theme.sizes.h1, fontWeight: 800, margin: 0, marginBottom: 4 };
const subtitle = { fontSize: 13, color: theme.colors.textSecondary, margin: 0 };

const gradientText = {
  background: "linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const clubButton = {
  border: `1px solid ${theme.colors.border}`,
  padding: "8px 16px",
  borderRadius: theme.radius.pill,
  background: theme.colors.surface,
  color: theme.colors.textPrimary,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 600,
  transition: "all 0.3s ease"
};

const quickActionsStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 32,
  overflowX: "auto",
  paddingBottom: 8
};

const clubsSectionStyle = {
  marginBottom: 32
};

const clubsRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 18,
  marginTop: 16
};

const clubItem = {
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  ":hover": {
    transform: "scale(1.05)"
  }
};

const clubCircle = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  border: `2px solid ${theme.colors.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.colors.surface,
  marginBottom: 8,
  transition: "all 0.3s ease"
};

const clubLogo = { width: 36, height: 36 };
const clubText = { fontSize: 12, fontWeight: 500, color: theme.colors.textSecondary };

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16
};

const sectionTitle = {
  fontSize: theme.sizes.h2,
  fontWeight: 700,
  margin: 0
};

const viewAllButton = {
  padding: "6px 14px",
  borderRadius: theme.radius.pill,
  border: `1px solid ${theme.colors.border}`,
  background: "transparent",
  color: theme.colors.accent,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  transition: "all 0.3s ease"
};

const tabs = { display: "flex", gap: 12, margin: "24px 0 16px 0" };
const newsCard = { ...card.base, marginBottom: 12, cursor: "pointer", transition: "all 0.3s ease" };
const newsTitle = { fontSize: 15, fontWeight: 600, margin: 0, marginBottom: 8 };
const newsImage = { width: "100%", height: 160, borderRadius: 8, objectFit: "cover", marginTop: 12 };

const text = {
  muted: {
    color: theme.colors.textSecondary,
    fontSize: 13
  }
};
