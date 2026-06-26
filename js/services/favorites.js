/**
 * favorites.js — Serviço de Favoritos com persistência em localStorage.
 *
 * Permite salvar, remover e listar nomes favoritos sem necessidade de login.
 * Os dados ficam apenas no navegador do usuário.
 */

const STORAGE_KEY = 'nomatize_favorites';

/**
 * Retorna a lista de favoritos do localStorage.
 * @returns {Array<{name: string, date: string, type: string}>}
 */
export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Adiciona um nome aos favoritos.
 * @param {string} name - Nome a ser favoritado
 * @param {string} type - Categoria (baby, company, rpg, persona)
 * @returns {boolean} true se adicionou, false se já existia
 */
export function addFavorite(name, type = 'baby') {
  const favorites = getFavorites();
  const cleanName = name.trim();

  if (favorites.some(f => f.name.toLowerCase() === cleanName.toLowerCase())) {
    return false; // Já favoritado
  }

  favorites.unshift({
    name: cleanName,
    date: new Date().toISOString(),
    type,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return true;
}

/**
 * Remove um nome dos favoritos.
 * @param {string} name
 * @returns {boolean}
 */
export function removeFavorite(name) {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => f.name.toLowerCase() !== name.toLowerCase());

  if (filtered.length === favorites.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Alterna o estado de favorito de um nome.
 */
export function toggleFavorite(name, type = 'baby') {
  if (isFavorite(name)) {
    removeFavorite(name);
    return false;
  } else {
    addFavorite(name, type);
    return true;
  }
}

/**
 * Verifica se um nome está nos favoritos.
 */
export function isFavorite(name) {
  return getFavorites().some(f => f.name.toLowerCase() === name.toLowerCase());
}

/**
 * Retorna a contagem de favoritos.
 */
export function getFavoriteCount() {
  return getFavorites().length;
}

/**
 * Limpa todos os favoritos.
 */
export function clearFavorites() {
  localStorage.removeItem(STORAGE_KEY);
}
