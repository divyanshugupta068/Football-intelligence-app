import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { theme, card, text } from "../theme";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ComparePlayer({ playerName }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/compare/player/${playerName}`)
      .then(r => r.json())
      .then(setData);
  }, [playerName]);

  if (!data) return <p style={text.muted}>Loading comparison…</p>;

  const radarData = {
    labels: [
      "Technical",
      "Physical",
      "Tactical",
      "Mental",
      "Statistical",
      "Positional",
      "Adaptability",
      "Experience"
    ],
    datasets: [
      {
        label: playerName,
        data: [
          data.technical,
          data.physical,
          data.tactical,
          data.mental,
          data.statistical,
          data.positional,
          data.adaptability,
          data.experience
        ],
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#3b82f6",
        borderWidth: 2
      }
    ]
  };

  return (
    <div>
      {/* OVERALL */}
      <div style={card.base}>
        <h2>Overall Score: {data.overall.toFixed(1)}</h2>
      </div>

      {/* RADAR */}
      <div style={{ ...card.base, marginTop: 16 }}>
        <Radar data={radarData} />
      </div>

      {/* BREAKDOWN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginTop: 16 }}>
        {Object.entries(data).map(([key, value]) =>
          key !== "overall" ? (
            <div key={key} style={card.base}>
              <h3>{key.toUpperCase()}</h3>
              <p>{value.toFixed(1)} / 100</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}