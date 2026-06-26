/**
 * history.js — Serviço de Histórico de nomes gerados.
 * Persiste no sessionStorage para a sessão atual.
 */

const STORAGE_KEY = 'nomatize_history';
const MAX_ITEMS = 20;

/**
 * Retorna o histórico de nomes gerados na sessão atual.
 */
export function getHistory() {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Adiciona um nome ao histórico.
 */
export function addToHistory(item) {
  const history = getHistory();

  // Evita duplicatas consecutivas
  if (history.length > 0 && history[0].name === item.name) return;

  history.unshift({
    name: item.name,
    type: item.type || 'baby',
    date: new Date().toISOString(),
    extra: item.extra || null,
  });

  if (history.length > MAX_ITEMS) history.pop();

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Limpa o histórico.
 */
export function clearHistory() {
  sessionStorage.removeItem(STORAGE_KEY);
}
