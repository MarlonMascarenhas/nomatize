/**
 * random.js — Utilitários de aleatoriedade para geração de nomes.
 *
 * Fornece funções de randomização mais sofisticadas que Math.random(),
 * incluindo seleção ponderada, aleatoriedade com semente e
 * embaralhamento Fisher-Yates.
 */

/**
 * Retorna um elemento aleatório de um array.
 */
export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Retorna N elementos aleatórios distintos de um array.
 */
export function pickRandomN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/**
 * Seleção ponderada — itens com maior peso têm mais chance.
 * @param {Array<{item: any, weight: number}>} items
 */
export function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (const entry of items) {
    random -= entry.weight;
    if (random <= 0) return entry.item;
  }
  return items[items.length - 1].item;
}

/**
 * Embaralha um array usando Fisher-Yates in-place.
 */
export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Gera um número aleatório entre min e max (inclusivo).
 */
export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gera um booleano com probabilidade especificada.
 * @param {number} probability - Chance de true (0 a 1)
 */
export function randomBool(probability = 0.5) {
  return Math.random() < probability;
}

/**
 * Slugify: converte string para slug URL-amigável.
 */
export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
