import { useEffect, useState } from "react";
import { layout, card, text, theme } from "./theme";
import { useNavigate } from "react-router-dom";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 SEARCH + FILTER STATE */
  const [search, setSearch] = useState("");
  const [clubFilter, setClubFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/players")
      .then(r => r.json())
      .then(d => {
        setPlayers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* 🔥 FILTERED PLAYERS */
  const filteredPlayers = players
    .filter(p =>
      p.player.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      clubFilter === "all" ? true : p.club === clubFilter
    );

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        {/* 🔥 TITLE */}
        <h1 style={{ color: theme.colors.textPrimary }}>
          Players
        </h1>

        {/* 🔍 SEARCH + CLUB FILTER */}
        {!loading && players.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 16,
              flexWrap: "wrap"
            }}
          >
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search player..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 8,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.card,
                color: theme.colors.textPrimary
              }}
            />

            {/* CLUB FILTER */}
            <select
              value={clubFilter}
              onChange={e => setClubFilter(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: 8,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.card,
                color: theme.colors.textPrimary
              }}
            >
              <option value="all">All Clubs</option>
              {[...new Set(players.map(p => p.club).filter(Boolean))].map(
                club => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* 🔄 LOADING */}
        {loading && (
          <p style={text.muted}>Loading players…</p>
        )}

        {/* ❌ EMPTY STATE */}
        {!loading && filteredPlayers.length === 0 && (
          <div style={card.base}>
            <p style={text.muted}>No matching players found</p>
          </div>
        )}

        {/* ✅ PLAYERS LIST */}
        {!loading && filteredPlayers.length > 0 && (
          <div style={{ display: "grid", gap: 12 }}>
            {filteredPlayers.map(p => (
              <div
                key={p.player}
                style={{
                  ...card.base,
                  cursor: "pointer"
                }}
                onClick={() =>
                  navigate(`/player/${encodeURIComponent(p.player)}`)
                }
              >
                <h3 style={{ color: theme.colors.textPrimary }}>
                  {p.player}
                </h3>
                <p style={text.muted}>{p.club}</p>
                <p>Overall: {p.overall}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
