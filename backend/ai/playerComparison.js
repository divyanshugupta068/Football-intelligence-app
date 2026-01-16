// backend/ai/playerComparison.js

function normalize(value, min, max) {
  if (max === min) return 50;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function computeTechnical(player) {
  return (
    0.25 * normalize(player.passAccuracy, 60, 95) +
    0.2 * normalize(player.dribbleSuccess, 30, 70) +
    0.2 * normalize(player.goals / player.xG || 1, 0.5, 1.5) +
    0.15 * normalize(player.progressivePasses, 2, 10) +
    0.1 * normalize(1 / (player.miscontrols || 1), 0.1, 1) +
    0.1 * normalize(player.weakFootUsage, 0.05, 0.3)
  );
}

function computePhysical(player) {
  return (
    0.25 * normalize(player.minutes, 500, 3000) +
    0.2 * normalize(player.sprints, 5, 25) +
    0.15 * normalize(player.acceleration, 40, 80) +
    0.15 * normalize(player.duelsWon, 40, 75) +
    0.15 * normalize(player.aerialsWon, 1, 6) +
    0.1 * normalize(player.agility, 40, 80)
  );
}

function computeTactical(player) {
  return (
    0.3 * normalize(player.interceptions, 1, 5) +
    0.25 * normalize(player.keyPasses, 0.5, 3) +
    0.2 * normalize(player.positioningScore, 40, 90) +
    0.15 * normalize(player.pressures, 5, 30) +
    0.1 * normalize(player.tackles, 1, 4)
  );
}

function computeStatistical(player) {
  return (
    0.35 * normalize(player.goals + player.assists, 1, 30) +
    0.35 * normalize(player.keyPasses, 0.5, 4) +
    0.3 * normalize(player.defensiveActions, 2, 15)
  );
}

function computeMental(player) {
  return (
    0.3 * player.consistency +
    0.25 * player.pressureHandling +
    0.2 * player.composure +
    0.15 * player.leadership +
    0.1 * player.mentality
  );
}

function computeOverall(scores) {
  return (
    0.2 * scores.technical +
    0.15 * scores.physical +
    0.15 * scores.tactical +
    0.1 * scores.mental +
    0.15 * scores.statistical +
    0.1 * scores.positional +
    0.075 * scores.adaptability +
    0.075 * scores.experience
  );
}

module.exports = function comparePlayer(player) {
  const scores = {
    technical: computeTechnical(player),
    physical: computePhysical(player),
    tactical: computeTactical(player),
    mental: computeMental(player),
    statistical: computeStatistical(player),
    positional: normalize(player.roleFit, 40, 90),
    adaptability: normalize(player.adaptability, 40, 90),
    experience: normalize(player.experience, 1, 15)
  };

  scores.overall = computeOverall(scores);
  return scores;
};