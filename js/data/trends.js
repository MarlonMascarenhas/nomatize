/**
 * trends.js — Dados de tendências e popularidade de nomes.
 *
 * Simula dados de tendências baseados em padrões observados no IBGE
 * e estimativas de popularidade. Usado para gerar gráficos no
 * painel de tendências.
 */

/**
 * Dados de popularidade por ano (simulados com base em tendências reais).
 * Cada entrada: { ano, masculino: [...], feminino: [...] }
 * Os valores representam estimativas de popularidade relativa (0-100).
 */

export const TrendData = {
  years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],

  masculino: {
    Miguel:    [58, 62, 65, 68, 72, 75, 78, 80, 83, 85],
    Arthur:    [45, 50, 55, 60, 65, 70, 75, 80, 84, 88],
    Heitor:    [30, 35, 40, 45, 50, 55, 60, 65, 70, 74],
    Davi:      [55, 58, 60, 62, 64, 66, 67, 68, 69, 70],
    Bernardo:  [35, 38, 42, 46, 50, 54, 58, 62, 65, 68],
    Gabriel:   [50, 52, 54, 56, 57, 58, 59, 60, 60, 60],
    Pedro:     [48, 49, 50, 51, 52, 52, 53, 53, 54, 54],
    Theo:      [20, 25, 30, 36, 42, 48, 55, 60, 65, 70],
    Gael:      [15, 18, 22, 28, 34, 40, 46, 52, 58, 63],
    Noah:      [8, 12, 16, 22, 28, 35, 42, 48, 55, 60],
    Benjamin:  [12, 16, 20, 25, 30, 35, 40, 45, 50, 55],
    Samuel:    [20, 22, 25, 28, 32, 36, 40, 44, 48, 52],
    Enzo:      [40, 42, 44, 45, 46, 46, 45, 44, 42, 40],
    João:      [60, 60, 60, 59, 59, 58, 58, 57, 57, 56],
    Luca:      [10, 14, 18, 24, 30, 36, 42, 48, 54, 58],
    Ravi:      [5, 7, 10, 14, 18, 24, 30, 36, 42, 48],
    Levi:      [8, 10, 14, 18, 22, 28, 34, 40, 45, 50],
    Nicolas:   [30, 32, 34, 36, 38, 40, 42, 44, 45, 46],
    Henrique:  [35, 36, 37, 38, 39, 40, 40, 41, 41, 41],
    Oliver:    [6, 8, 12, 16, 22, 28, 34, 40, 46, 52],
  },

  feminino: {
    Alice:     [40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
    Sophia:    [55, 58, 62, 65, 68, 70, 72, 74, 75, 76],
    Helena:    [35, 40, 45, 50, 55, 60, 65, 70, 74, 78],
    Valentina: [30, 35, 40, 45, 50, 55, 60, 65, 68, 72],
    Laura:     [45, 48, 50, 52, 54, 56, 58, 60, 62, 64],
    Isabella:  [40, 42, 44, 46, 48, 50, 52, 54, 55, 56],
    Maria:     [70, 70, 69, 69, 68, 68, 67, 67, 66, 66],
    Luna:      [15, 20, 26, 32, 38, 44, 50, 56, 62, 68],
    Maya:      [10, 14, 18, 24, 30, 36, 42, 48, 54, 60],
    Aurora:    [8, 12, 16, 22, 28, 34, 40, 46, 52, 58],
    Eloá:      [12, 16, 20, 26, 32, 38, 44, 50, 56, 62],
    Liz:       [8, 12, 16, 22, 28, 34, 40, 46, 52, 58],
    Chloe:     [6, 8, 12, 16, 22, 28, 34, 40, 46, 50],
    Sofia:     [50, 52, 54, 56, 58, 60, 62, 64, 65, 66],
    Julia:     [48, 49, 50, 51, 52, 52, 53, 53, 54, 54],
    Beatriz:   [40, 41, 42, 43, 44, 44, 45, 45, 46, 46],
    Manuela:   [20, 24, 28, 32, 36, 40, 44, 48, 52, 56],
    Clara:     [25, 28, 30, 32, 34, 36, 38, 40, 42, 44],
    Cecilia:   [20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
    Ayla:      [4, 6, 8, 12, 16, 22, 28, 34, 40, 46],
  },
};

/**
 * Retorna os nomes que mais subiram de popularidade.
 */
export function getRisingNames(gender = 'masculino', topN = 5) {
  const data = TrendData[gender];
  if (!data) return [];

  const names = Object.keys(data);
  const withGrowth = names.map(name => {
    const values = data[name];
    const growth = values[values.length - 1] - values[0];
    const recentGrowth = values[values.length - 1] - values[values.length - 3];
    return { name, values, growth, recentGrowth };
  });

  return withGrowth
    .sort((a, b) => b.growth - a.growth)
    .slice(0, topN);
}

/**
 * Retorna os nomes que mais desceram de popularidade.
 */
export function getFallingNames(gender = 'masculino', topN = 3) {
  const data = TrendData[gender];
  if (!data) return [];

  const names = Object.keys(data);
  const withGrowth = names.map(name => {
    const values = data[name];
    const growth = values[values.length - 1] - values[0];
    return { name, values, growth };
  });

  return withGrowth
    .sort((a, b) => a.growth - b.growth)
    .slice(0, topN);
}

/**
 * Retorna dados formatados para Chart.js.
 */
export function getChartData(names, gender = 'masculino') {
  const data = TrendData[gender];
  if (!data) return null;

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16',
    '#6366f1', '#d946ef', '#0ea5e9', '#22c55e', '#eab308',
  ];

  return {
    labels: TrendData.years,
    datasets: names.map((name, i) => ({
      label: name,
      data: data[name] || [],
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length] + '20',
      tension: 0.3,
      fill: false,
    })),
  };
}

export default TrendData;
