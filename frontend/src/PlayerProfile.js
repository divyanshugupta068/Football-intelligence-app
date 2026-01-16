import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { theme, layout, card, text } from "./theme";

function PlayerProfile() {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/player/${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => setData(null));
  }, [name]);

  if (!data) {
    return (
      <div style={layout.page}>
        <div style={layout.container}>
          <p style={text.muted}>Loading player profile…</p>
        </div>
      </div>
    );
  }
if (!data || !data.shots) return <p>Loading player data…</p>;
  return (
    <div style={layout.page}>
      <div style={layout.container}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>{data.player}</h1>

        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <div style={card.base}>
            <p>Total Shots: {data.totalShots}</p>
            <p>Total xG: {data.totalXG.toFixed(2)}</p>
            <p>xG / 90: {data.xGPer90.toFixed(2)}</p>
          </div>

          <div style={card.base}>
            <h3>Attributes</h3>
            <p>Pace: {data.attributes?.pace}</p>
            <p>Dribbling: {data.attributes?.dribbling}</p>
            <p>Shooting: {data.attributes?.shooting}</p>
            <p>Passing: {data.attributes?.passing}</p>
            <p>Defending: {data.attributes?.defending}</p>
            <p>Physical: {data.attributes?.physical}</p>
          </div>

          <div style={card.base}>
            <h3>Shot Log</h3>
            <ul>
              {data.shots.map((s, i) => (
                <li key={i}>
                  {s.minute}' — {s.shotType || "Shot"} ({s.situation || "Open Play"}) · xG {s.xG.toFixed(3)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;