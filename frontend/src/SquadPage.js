import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { layout, card, text } from "./theme";

export default function SquadPage() {
  const { club } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/club/${club}/squad`)
      .then(r => r.json())
      .then(d => setPlayers(Array.isArray(d) ? d : []));
  }, [club]);

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        <h2>{club} Squad</h2>

        <div style={{ display: "grid", gap: 10 }}>
          {players.map(p => (
            <div
              key={p.id}
              style={{ ...card.base, cursor: "pointer" }}
              onClick={() => navigate(`/player/${p.id}`)}
            >
              <strong>{p.name}</strong>
              <p style={text.muted}>{p.position} · #{p.number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}