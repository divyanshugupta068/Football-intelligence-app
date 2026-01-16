import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { layout, card, text, theme } from "./theme";
import { User } from "lucide-react";

export default function PlayerProfilePage() {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`http://localhost:5000/player/${id}/profile`)
      .then(r => r.json())
      .then(d => {
        setPlayer(d || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        <h1 style={{ fontSize: theme.sizes.h1 }}>
          <User size={22} /> Player Profile
        </h1>

        {loading ? (
          <p style={text.muted}>Loading player data…</p>
        ) : !player ? (
          <div style={card.base}>
            <p style={text.muted}>Player not found</p>
          </div>
        ) : (
          <div style={{ ...card.base, display: "flex", gap: 20 }}>
            {/* PHOTO */}
            <img
              src={player.player?.photo}
              alt={player.player?.name}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${theme.colors.border}`
              }}
            />

            {/* INFO */}
            <div>
              <h2 style={{ marginBottom: 6 }}>
                {player.player?.name}
              </h2>

              <p style={text.muted}>
                {player.player?.age} years · {player.player?.nationality}
              </p>

              <p style={{ marginTop: 8 }}>
                <strong>Position:</strong>{" "}
                {player.statistics?.[0]?.games?.position || "—"}
              </p>

              <p>
                <strong>Club:</strong>{" "}
                {player.statistics?.[0]?.team?.name || "—"}
              </p>

              <p>
                <strong>League:</strong>{" "}
                {player.statistics?.[0]?.league?.name || "—"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}