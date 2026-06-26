/**
 * quiz.js — Motor do Quiz Interativo.
 *
 * Quiz de personalidade para descobrir o nome ideal
 * baseado nas respostas do usuário.
 */

import { pickRandom, weightedRandom } from '../utils/random.js';
import { generateName } from '../generators/core.js';

const Questions = [
  {
    id: 1,
    question: 'Qual estilo combina mais com você?',
    options: [
      { label: 'Clássico e Tradicional', value: 'classic', weight: { masculine: 0.3, feminine: 0.3, unissex: 0.2 } },
      { label: 'Moderno e Inovador', value: 'modern', weight: { masculine: 0.4, feminine: 0.3, unissex: 0.5 } },
      { label: 'Exótico e Único', value: 'exotic', weight: { masculine: 0.2, feminine: 0.3, unissex: 0.2 } },
      { label: 'Internacional', value: 'international', weight: { masculine: 0.1, feminine: 0.1, unissex: 0.1 } },
    ],
  },
  {
    id: 2,
    question: 'Qual som você prefere?',
    options: [
      { label: 'Sons suaves (terminação em "a")', value: 'soft', weight: { masculine: 0.1, feminine: 0.5, unissex: 0.3 } },
      { label: 'Sons fortes (terminação em "o")', value: 'strong', weight: { masculine: 0.5, feminine: 0.1, unissex: 0.2 } },
      { label: 'Sons neutros e modernos', value: 'neutral', weight: { masculine: 0.3, feminine: 0.3, unissex: 0.4 } },
      { label: 'Sons com "r" vibrante', value: 'vibrant', weight: { masculine: 0.1, feminine: 0.1, unissex: 0.1 } },
    ],
  },
  {
    id: 3,
    question: 'Qual origem te atrai mais?',
    options: [
      { label: 'Latina / Italiana', value: 'latin', weight: { masculine: 0.3, feminine: 0.3, unissex: 0.2 } },
      { label: 'Bíblica / Hebraica', value: 'hebrew', weight: { masculine: 0.2, feminine: 0.2, unissex: 0.1 } },
      { label: 'Germânica / Nórdica', value: 'germanic', weight: { masculine: 0.2, feminine: 0.1, unissex: 0.2 } },
      { label: 'Indígena / Tupi', value: 'tupi', weight: { masculine: 0.1, feminine: 0.1, unissex: 0.2 } },
      { label: 'Qualquer origem!', value: 'any', weight: { masculine: 0.2, feminine: 0.3, unissex: 0.3 } },
    ],
  },
  {
    id: 4,
    question: 'Quantas sílabas você prefere?',
    options: [
      { label: 'Curto (2 sílabas)', value: '2', weight: { masculine: 0.3, feminine: 0.2, unissex: 0.4 } },
      { label: 'Médio (3 sílabas)', value: '3', weight: { masculine: 0.4, feminine: 0.4, unissex: 0.3 } },
      { label: 'Longo (4+ sílabas)', value: '4', weight: { masculine: 0.2, feminine: 0.3, unissex: 0.2 } },
      { label: 'Não importa', value: 'any', weight: { masculine: 0.1, feminine: 0.1, unissex: 0.1 } },
    ],
  },
  {
    id: 5,
    question: 'Para quem é o nome?',
    options: [
      { label: 'Menino', value: 'masculine', weight: { masculine: 1, feminine: 0, unissex: 0 } },
      { label: 'Menina', value: 'feminine', weight: { masculine: 0, feminine: 1, unissex: 0 } },
      { label: 'Pode ser qualquer gênero', value: 'unissex', weight: { masculine: 0, feminine: 0, unissex: 1 } },
    ],
  },
];

/**
 * Processa as respostas do quiz e retorna um nome recomendado.
 *
 * @param {Array<{questionId: number, value: string}>} answers
 * @returns {{ name: string, reason: string, details: Object }}
 */
export function processQuizAnswers(answers) {
  // Calcula pesos para cada gênero baseado nas respostas
  let scores = { masculine: 0, feminine: 0, unissex: 0 };

  for (const answer of answers) {
    const question = Questions.find(q => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options.find(o => o.value === answer.value);
    if (!option) continue;

    scores.masculine += option.weight.masculine;
    scores.feminine += option.weight.feminine;
    scores.unissex += option.weight.unissex;
  }

  // Determina gênero baseado nos pesos
  const total = scores.masculine + scores.feminine + scores.unissex;
  const rand = Math.random() * total;
  let gender = 'masculino';
  let cumulative = scores.masculine;
  if (rand <= cumulative) gender = 'masculino';
  else if (rand <= cumulative + scores.feminine) gender = 'feminino';
  else gender = 'unissex';

  // Encontra a origem e sílabas preferidas
  const originAnswer = answers.find(a => a.questionId === 3);
  const syllableAnswer = answers.find(a => a.questionId === 4);

  const originMap = {
    latin: 'latin', hebrew: 'hebrew', germanic: 'germanic',
    norse: 'norse', tupi: 'tupi',
  };
  const origin = originAnswer && originMap[originAnswer.value] ? originMap[originAnswer.value] : null;

  const syllableCount = syllableAnswer && syllableAnswer.value !== 'any'
    ? parseInt(syllableAnswer.value)
    : null;

  // Gera o nome
  const nameResult = generateName({
    gender: gender === 'unissex' ? pickRandom(['masculino', 'feminino']) : gender,
    origin,
    syllables: syllableCount || undefined,
  });

  // Gera razão personalizada
  const reasons = [
    `Baseado nas suas preferências, "${nameResult.name}" é o nome perfeito! Sua sonoridade combina com seu estilo.`,
    `Analisamos suas respostas e "${nameResult.name}" se destaca como a melhor escolha para você!`,
    `Com origem ${nameResult.origin} e ${nameResult.syllables} sílabas, "${nameResult.name}" tem tudo a ver com você!`,
    `Seu estilo único combina perfeitamente com "${nameResult.name}". Um nome especial para uma pessoa especial!`,
    `Descobrimos que "${nameResult.name}" é o nome ideal! Ele reflete sua personalidade e gostos.`,
  ];

  return {
    name: nameResult.name,
    reason: pickRandom(reasons),
    details: nameResult,
    gender,
  };
}

export { Questions };
