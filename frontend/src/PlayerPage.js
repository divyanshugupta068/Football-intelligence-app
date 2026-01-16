import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { layout, card, text } from "./theme";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/player/${id}/profile`)
      .then(r => r.json())
      .then(setPlayer);
  }, [id]);

  if (!player) return <p style={text.muted}>Loading player…</p>;

  const p = player.player;

  return (
    <div style={layout.page}>
      <div style={layout.container}>
        <h2>{p.name}</h2>
        <p style={text.muted}>
          {p.nationality} · {p.age} yrs · {p.height}
        </p>

        <div style={card.base}>
          <p>Position: {player.statistics[0].games.position}</p>
          <p>Appearances: {player.statistics[0].games.appearences}</p>
          <p>Goals: {player.statistics[0].goals.total}</p>
          <p>Assists: {player.statistics[0].goals.assists}</p>
        </div>
      </div>
    </div>
  );
}