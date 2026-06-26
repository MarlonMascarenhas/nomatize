/**
 * baby-names.js — Gerador de nomes para bebês.
 *
 * Usa o algoritmo combinatório central para gerar milhares de nomes únicos,
 * com filtros por origem, letra inicial, quantidade de sílabas e
 * compatibilidade com sobrenome.
 */

import { generateName, generateFullName, generateNames } from './core.js';
import { NameMeanings } from '../data/meanings.js';
import { pickRandom, randomBetween } from '../utils/random.js';
import { countSyllables } from '../utils/string.js';

const ORIGIN_LABELS = {
  latin: 'Latina / Romance',
  germanic: 'Germânica',
  hebrew: 'Hebraica / Bíblica',
  greek: 'Grega',
  norse: 'Nórdica / Escandinava',
  slavic: 'Eslava',
  celtic: 'Celta',
  arabic: 'Árabe',
  japanese: 'Japonesa',
  tupi: 'Tupi / Indígena Brasileira',
  multicultural: 'Multicultural',
};

/**
 * Gera nomes de bebê com filtros avançados.
 *
 * @param {Object} filters
 * @param {string} filters.gender - 'masculino' | 'feminino' | 'unissex'
 * @param {string} filters.origin - Origem linguística
 * @param {string} filters.startLetter - Letra inicial
 * @param {number} filters.syllables - Quantidade de sílabas
 * @param {string} filters.compatibleWith - Sobrenome para testar compatibilidade
 * @param {number} filters.count - Quantos nomes gerar
 * @returns {Array<Object>}
 */
export function generateBabyNames(filters = {}) {
  const {
    gender = 'masculino',
    origin = null,
    startLetter = null,
    syllables = null,
    compatibleWith = null,
    count = 10,
  } = filters;

  const names = generateNames(count, {
    origin: origin || undefined,
    gender,
    startLetter: startLetter || undefined,
    syllables: syllables || undefined,
  });

  // Avalia compatibilidade com sobrenome, se fornecido
  if (compatibleWith) {
    names.forEach(n => {
      n.compatibility = evaluateCompatibility(n.firstName, compatibleWith);
    });
    // Ordena por compatibilidade (melhores primeiro)
    names.sort((a, b) => b.compatibility - a.compatibility);
  }

  return names;
}

/**
 * Avalia a compatibilidade sonora entre nome e sobrenome.
 * Retorna score 0-100.
 */
function evaluateCompatibility(name, surname) {
  let score = 50;

  const nameEnd = name.slice(-1).toLowerCase();
  const surnameStart = surname.charAt(0).toLowerCase();

  // Evita repetição de som (ex: "Lucas Santos" é melhor que "Lucas Silva")
  if (nameEnd === surnameStart) score -= 15;

  // Nomes longeros combinam com sobrenomes longos
  const nameLen = name.length;
  const surnameLen = surname.length;
  if (Math.abs(nameLen - surnameLen) <= 2) score += 10;

  // Nomes terminando em vogal combinam bem com sobrenomes começando com consoante
  if (/[aeiouáéíóú]$/i.test(name) && !/^[aeiouáéíóú]/i.test(surname)) score += 15;
  if (!/[aeiouáéíóú]$/i.test(name) && /^[aeiouáéíóú]/i.test(surname)) score += 10;

  // Fluência (alternância consoante-vogal entre nome e sobrenome)
  if (/[aeiou]$/i.test(name) && /^[^aeiou]/i.test(surname)) score += 15;
  if (/[^aeiou]$/i.test(name) && /^[aeiou]/i.test(surname)) score += 10;

  return Math.min(100, Math.max(0, score));
}

/**
 * Gera um nome específico com significado completo.
 */
export function getNameDetails(name) {
  const entry = NameMeanings[name];
  if (entry) {
    return {
      name,
      meaning: entry.meaning,
      origin: entry.origin,
      description: entry.description,
      famous: entry.famous || [],
      trend: entry.trend,
    };
  }

  // Fallback: usa o gerador para criar um nome similar
  const generated = generateName({ gender: name.endsWith('a') ? 'feminino' : 'masculino' });
  return {
    name,
    meaning: generated.meaning?.meaning || 'Nome de origem diversa',
    origin: generated.meaning?.origin || 'Multicultural',
    description: generated.meaning?.description || `${name} é um nome com sonoridade única e marcante.`,
    famous: [],
    trend: 'stable',
  };
}

export { ORIGIN_LABELS };
