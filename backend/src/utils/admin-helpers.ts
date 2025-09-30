// backend/src/utils/admin-helpers.ts

export function calculateTrend(dailyProgress: any[]) {
  if (dailyProgress.length < 2) return { direction: "stable", percentage: 0 };

  // Oblicz średnią z ostatnich 7 dni
  const recent = dailyProgress.slice(0, 7);
  const older = dailyProgress.slice(7, 14);

  if (older.length === 0) return { direction: "stable", percentage: 0 };

  const recentAvg =
    recent.reduce((acc, day) => acc + (day.averageScore || 0), 0) /
    recent.length;

  const olderAvg =
    older.reduce((acc, day) => acc + (day.averageScore || 0), 0) / older.length;

  if (olderAvg === 0) return { direction: "stable", percentage: 0 };

  const change = ((recentAvg - olderAvg) / olderAvg) * 100;

  return {
    direction: change > 5 ? "up" : change < -5 ? "down" : "stable",
    percentage: Math.round(Math.abs(change)),
  };
}
