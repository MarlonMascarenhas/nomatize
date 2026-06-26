/**
 * checker.js — Verificador de disponibilidade de marca.
 *
 * Simula verificação em Registro.br e redes sociais.
 * Como é client-side, faz verificações simuladas com base
 * em padrões e disponibilidade de domínio .com.br.
 *
 * Observação: Uma versão real exigiria backend com API calls.
 * Esta versão simula o comportamento para demonstração.
 */

import { randomBool } from '../utils/random.js';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '📸', baseUrl: 'https://instagram.com/' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', baseUrl: 'https://tiktok.com/@' },
  { id: 'twitter', name: 'X / Twitter', icon: '🐦', baseUrl: 'https://twitter.com/' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', baseUrl: 'https://youtube.com/@' },
  { id: 'facebook', name: 'Facebook', icon: '📘', baseUrl: 'https://facebook.com/' },
  { id: 'registro', name: 'Registro.br (.com.br)', icon: '🌐', baseUrl: 'https://registro.br/v2/whois/' },
  { id: 'github', name: 'GitHub', icon: '💻', baseUrl: 'https://github.com/' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', baseUrl: 'https://linkedin.com/company/' },
  { id: 'pinterest', name: 'Pinterest', icon: '📌', baseUrl: 'https://pinterest.com/' },
  { id: 'twitch', name: 'Twitch', icon: '🎮', baseUrl: 'https://twitch.tv/' },
];

/**
 * Simula a verificação de disponibilidade de um nome em várias plataformas.
 *
 * @param {string} name - Nome a ser verificado
 * @param {Array<string>} platforms - Plataformas específicas (ou todas)
 * @returns {Promise<Array<{platform: string, icon: string, available: boolean, url: string}>>}
 */
export async function checkAvailability(name, platforms = null) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const targets = platforms
    ? PLATFORMS.filter(p => platforms.includes(p.id))
    : PLATFORMS;

  // Simula latência de rede (200-800ms)
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));

  return targets.map(platform => {
    let available;

    switch (platform.id) {
      case 'registro':
        // .com.br geralmente mais disponível para nomes compostos/inventados
        available = !isCommonWord(cleanName) && randomBool(0.4);
        break;
      case 'instagram':
      case 'tiktok':
      case 'twitter':
        // Redes sociais populares: nomes curtos são menos disponíveis
        available = cleanName.length > 5 ? randomBool(0.5) : randomBool(0.2);
        break;
      case 'youtube':
        available = randomBool(0.35);
        break;
      default:
        available = randomBool(0.5);
    }

    return {
      platform: platform.name,
      icon: platform.icon,
      id: platform.id,
      available,
      url: platform.baseUrl + cleanName,
      checking: false,
    };
  });
}

/**
 * Verifica apenas o domínio .com.br via whois simulado.
 */
export async function checkDomain(name) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

  return {
    domain: `${cleanName}.com.br`,
    available: !isCommonWord(cleanName) && randomBool(0.35),
    alternativeDomains: [
      `${cleanName}.com`,
      `${cleanName}.net`,
      `${cleanName}.store`,
      `${cleanName}.online`,
    ],
  };
}

/**
 * Sugere alternativas para o nome.
 */
export function suggestAlternatives(name) {
  const suffixes = ['app', 'tech', 'hub', 'pro', 'online', 'studio', 'shop', 'lab', 'digital', 'web'];
  const prefix = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  return suffixes.map(s => `${prefix}${s}`);
}

/**
 * Verifica se é uma palavra muito comum (menos disponível).
 */
function isCommonWord(name) {
  const commonWords = [
    'amor', 'casa', 'vida', 'sol', 'mar', 'rio', 'lua', 'fogo', 'ar',
    'terra', 'paz', 'alma', 'bem', 'mal', 'dia', 'noite', 'azul',
    'rosa', 'ouro', 'prata', 'som', 'luz', 'cor', 'arte', 'fim',
    'ana', 'bela', 'carla', 'joao', 'pedro', 'lucas', 'maria',
  ];
  return commonWords.includes(name);
}

export { PLATFORMS };
