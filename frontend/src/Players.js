import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ComparePlayers() {
  const [players, setPlayers] = useState([]);
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/players")
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  const getPlayer = (name) => players.find(p => p.player === name);

  const A = getPlayer(playerA);
  const B = getPlayer(playerB);

  const chartData = (label, valueA, valueB) => ({
    labels: [A?.player, B?.player],
    datasets: [
      {
        label,
        data: [valueA, valueB],
        backgroundColor: ["#4CAF50", "#2196F3"]
      }
    ]
  });

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>⚔️ Player Comparison</h1>

      {/* Selectors */}
      <div style={{ marginBottom: "20px" }}>
        <select value={playerA} onChange={e => setPlayerA(e.target.value)}>
          <option value="">Select Player A</option>
          {players.map(p => (
            <option key={p.player} value={p.player}>{p.player}</option>
          ))}
        </select>

        <span style={{ margin: "0 15px" }}>vs</span>

        <select value={playerB} onChange={e => setPlayerB(e.target.value)}>
          <option value="">Select Player B</option>
          {players.map(p => (
            <option key={p.player} value={p.player}>{p.player}</option>
          ))}
        </select>
      </div>

      {/* Charts */}
      {A && B && (
        <>
          <h2>📊 Visual Comparison</h2>

          <Bar data={chartData("Shots", A.shots, B.shots)} />
          <Bar data={chartData("Total xG", A.totalXG, B.totalXG)} />
          <Bar
            data={chartData(
              "Avg xG / Shot",
              A.totalXG / A.shots,
              B.totalXG / B.shots
            )}
          />

          <h2>📋 Numerical Comparison</h2>

          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Metric</th>
                <th>{A.player}</th>
                <th>{B.player}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shots</td>
                <td>{A.shots}</td>
                <td>{B.shots}</td>
              </tr>
              <tr>
                <td>Total xG</td>
                <td>{A.totalXG.toFixed(2)}</td>
                <td>{B.totalXG.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Avg xG / Shot</td>
                <td>{(A.totalXG / A.shots).toFixed(3)}</td>
                <td>{(B.totalXG / B.shots).toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ComparePlayers;
