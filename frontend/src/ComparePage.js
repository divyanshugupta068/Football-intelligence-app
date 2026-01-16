import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Scatter, Radar } from "react-chartjs-2";
import { theme, layout, card, text } from "./theme";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

/* ---------- SHOT CLUSTERING ---------- */
function clusterShots(shots, grid = 8) {
  const map = {};
  shots.forEach(s => {
    if (typeof s.x !== "number" || typeof s.y !== "number") return;
    const gx = Math.floor(s.x * grid);
    const gy = Math.floor(s.y * grid);
    const key = `${gx}-${gy}`;
    if (!map[key]) {
      map[key] = {
        x: gx / grid + 1 / (2 * grid),
        y: gy / grid + 1 / (2 * grid),
        count: 0
      };
    }
    map[key].count += 1;
  });
  return Object.values(map);
}

/* ---------- SKELETON ---------- */
function Skeleton({ height = 120 }) {
  return (
    <div
      style={{
        height,
        borderRadius: theme.radius.sm,
        background:
          "linear-gradient(90deg, #020617 25%, #020617aa 37%, #020617 63%)",
        animation: "pulse 1.4s ease infinite"
      }}
    />
  );
}

export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------- STATE ---------- */
  const [players, setPlayers] = useState([]);
  const [playerA, setPlayerA] = useState(searchParams.get("A") || "");
  const [playerB, setPlayerB] = useState(searchParams.get("B") || "");
  const [tab, setTab] = useState(searchParams.get("tab") || "stats");

  const [shotsA, setShotsA] = useState([]);
  const [shotsB, setShotsB] = useState([]);
  const [aiA, setAiA] = useState([]);
  const [aiB, setAiB] = useState([]);

  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  /* 🔍 ADDED: SEARCH STATE */
  const [search, setSearch] = useState("");

  /* ---------- LOAD PLAYERS ---------- */
  useEffect(() => {
    fetch("http://localhost:5000/players/enhanced")
      .then(r => r.json())
      .then(d => {
        setPlayers(Array.isArray(d) ? d : []);
        setLoadingPlayers(false);
      })
      .catch(() => setLoadingPlayers(false));
  }, []);

  /* ---------- URL SYNC ---------- */
  useEffect(() => {
    const params = {};
    if (playerA) params.A = playerA;
    if (playerB) params.B = playerB;
    params.tab = tab;
    setSearchParams(params, { replace: true });
  }, [playerA, playerB, tab, setSearchParams]);

  /* ---------- LOAD PLAYER DATA ---------- */
  useEffect(() => {
    if (!playerA || !playerB) return;

    setLoadingData(true);

    Promise.all([
      fetch(`http://localhost:5000/player/${playerA}`).then(r => r.json()),
      fetch(`http://localhost:5000/player/${playerB}`).then(r => r.json()),
      fetch(`http://localhost:5000/ai/player/${playerA}`).then(r => r.json()),
      fetch(`http://localhost:5000/ai/player/${playerB}`).then(r => r.json())
    ]).then(([a, b, ai1, ai2]) => {
      setShotsA(a?.shots || []);
      setShotsB(b?.shots || []);
      setAiA(ai1?.insights || []);
      setAiB(ai2?.insights || []);
      setLoadingData(false);
    });
  }, [playerA, playerB]);

  /* ---------- FILTERED PLAYERS (ADDED) ---------- */
  const filteredPlayers = players.filter(p =>
    p.player.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- PLAYER OBJECTS ---------- */
  const A = players.find(p => p.player === playerA) || {};
  const B = players.find(p => p.player === playerB) || {};

  // Extract attributes - handle both old and new data structure
  const AAttr = A.attributes || {
    pace: 0,
    dribbling: 0,
    shooting: 0,
    passing: 0,
    defending: 0,
    physical: 0
  };
  const BAttr = B.attributes || {
    pace: 0,
    dribbling: 0,
    shooting: 0,
    passing: 0,
    defending: 0,
    physical: 0
  };

  const clustersA = clusterShots(shotsA);
  const clustersB = clusterShots(shotsB);

  /* ---------- BAR DATA ---------- */
  const statBar = (label, a, b) => ({
    labels: [playerA, playerB],
    datasets: [
      {
        label,
        data: [Number(a) || 0, Number(b) || 0],
        backgroundColor: [
          theme.colors.chartGreen,
          theme.colors.chartBlue
        ],
        borderRadius: 10,
        barThickness: 26
      }
    ]
  });

  /* ---------- RADAR DATA ---------- */
  const radarData = {
    labels: ["Pace", "Dribbling", "Shooting", "Passing", "Defending", "Physical"],
    datasets: [
      {
        label: playerA,
        data: [
          AAttr.pace || 0,
          AAttr.dribbling || 0,
          AAttr.shooting || 0,
          AAttr.passing || 0,
          AAttr.defending || 0,
          AAttr.physical || 0
        ],
        borderColor: theme.colors.chartGreen,
        backgroundColor: "rgba(34,197,94,0.15)",
        borderWidth: 2
      },
      {
        label: playerB,
        data: [
          BAttr.pace || 0,
          BAttr.dribbling || 0,
          BAttr.shooting || 0,
          BAttr.passing || 0,
          BAttr.defending || 0,
          BAttr.physical || 0
        ],
        borderColor: theme.colors.chartBlue,
        backgroundColor: "rgba(59,130,246,0.15)",
        borderWidth: 2
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: "#1e293b" },
        angleLines: { color: "#1e293b" }
      }
    },
    plugins: {
      legend: { labels: { color: theme.colors.textPrimary } }
    }
  };

  /* ---------- SCATTER ---------- */
  const scatterData = (clusters, rgb) => ({
    datasets: [
      {
        data: clusters.map(c => ({ x: c.x, y: c.y })),
        pointRadius: clusters.map(c => Math.min(8 + c.count * 2, 22)),
        backgroundColor: `rgba(${rgb},0.75)`
      }
    ]
  });

  const scatterOptions = {
    parsing: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { min: 0, max: 1, display: false },
      y: { min: 0, max: 1, display: false }
    }
  };

  return (
    <div style={layout.page}>
      {loadingPlayers && <div style={{ display: "none" }} />}

      <div style={layout.container}>
        <h1 style={{ fontSize: theme.sizes.h1 }}>Player Comparison</h1>

        {/* 🔍 SEARCH INPUT (ADDED) */}
        <input
          placeholder="Search players…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            marginTop: 12,
            marginBottom: 12,
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            background: theme.colors.bg,
            color: theme.colors.textPrimary
          }}
        />

        {/* SELECTORS */}
        <div style={{ display: "flex", gap: 12 }}>
          <select style={selectStyle} value={playerA} onChange={e => setPlayerA(e.target.value)}>
            <option value="">Select Player A</option>
            {filteredPlayers.map(p => (
              <option key={p.player}>{p.player}</option>
            ))}
          </select>

          <select style={selectStyle} value={playerB} onChange={e => setPlayerB(e.target.value)}>
            <option value="">Select Player B</option>
            {filteredPlayers.map(p => (
              <option key={p.player}>{p.player}</option>
            ))}
          </select>
        </div>

        {!playerA || !playerB ? (
          <div style={{ ...card.base, marginTop: 20 }}>
            <p style={text.muted}>Select two players to begin comparison.</p>
          </div>
        ) : loadingData ? (
          <Skeleton height={260} />
        ) : (
          <>
            {/* OVR */}
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <OVRBadge name={playerA} value={A.overall} />
              <OVRBadge name={playerB} value={B.overall} />
            </div>

            {/* TABS */}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <Tab label="Stats" active={tab === "stats"} onClick={() => setTab("stats")} />
              <Tab label="Radar" active={tab === "radar"} onClick={() => setTab("radar")} />
              <Tab label="Shot Map" active={tab === "shots"} onClick={() => setTab("shots")} />
              <Tab label="AI" active={tab === "ai"} onClick={() => setTab("ai")} />
            </div>

            {/* STATS */}
            {tab === "stats" && (
              <div style={{ ...card.base, marginTop: 20 }}>
                {["Pace", "Dribbling", "Shooting", "Passing", "Defending", "Physical"].map(k => (
                  <Bar
                    key={k}
                    data={statBar(k, AAttr[k.toLowerCase()], BAttr[k.toLowerCase()])}
                    options={barOptions}
                  />
                ))}
              </div>
            )}

            {/* RADAR */}
            {tab === "radar" && (
              <div style={{ ...card.base, marginTop: 20 }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            )}

            {/* SHOTS */}
            {tab === "shots" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ ...card.base }}>
                  <h3>{playerA}</h3>
                  <Scatter data={scatterData(clustersA, "34,197,94")} options={scatterOptions} />
                </div>
                <div style={{ ...card.base }}>
                  <h3>{playerB}</h3>
                  <Scatter data={scatterData(clustersB, "59,130,246")} options={scatterOptions} />
                </div>
              </div>
            )}

            {/* AI */}
            {tab === "ai" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <InsightCard title={playerA} insights={aiA} />
                <InsightCard title={playerB} insights={aiB} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

const selectStyle = {
  background: theme.colors.bg,
  color: theme.colors.textPrimary,
  border: `1px solid ${theme.colors.border}`,
  padding: 10,
  borderRadius: 8
};

const barOptions = {
  responsive: true,
  scales: {
    y: { min: 0, max: 100, grid: { color: "#1e293b" } },
    x: { grid: { display: false } }
  },
  plugins: {
    legend: { labels: { color: theme.colors.textPrimary } }
  }
};

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: theme.radius.pill,
        border: `1px solid ${theme.colors.border}`,
        background: active ? "#1e293b" : "transparent",
        color: theme.colors.textPrimary
      }}
    >
      {label}
    </button>
  );
}

function InsightCard({ title, insights }) {
  return (
    <div style={card.base}>
      <h3>{title}</h3>
      {insights.length === 0
        ? <p style={text.muted}>No insights available</p>
        : insights.map((i, idx) => (
          <p key={idx} style={text.muted}>• {i}</p>
        ))}
    </div>
  );
}

function OVRBadge({ name, value }) {
  let color = "#64748b";
  if (value >= 90) color = "#facc15";
  else if (value >= 80) color = "#22c55e";
  else if (value >= 70) color = "#3b82f6";

  return (
    <div
      style={{
        ...card.base,
        width: 160,
        textAlign: "center",
        border: `2px solid ${color}`
      }}
    >
      <h3>{name}</h3>
      <div style={{ fontSize: 42, fontWeight: 800, color }}>
        {value ?? "—"}
      </div>
      <p style={text.muted}>OVR</p>
    </div>
  );
}