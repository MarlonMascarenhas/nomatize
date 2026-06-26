/**
 * company-names.js — Gerador de nomes para empresas, marcas e startups.
 *
 * Usa combinação de prefixos, sufixos e palavras-chave específicas de
 * cada nicho para gerar milhares de nomes de empresas únicos.
 */

import { pickRandom, randomBetween, randomBool } from '../utils/random.js';
import { capitalize } from '../utils/string.js';

/** Banco de morfemas para nomes de empresas organizados por nicho */
const CompanyLexicon = {
  tech: {
    prefixes: [
      'Tech', 'Inno', 'Nova', 'Data', 'Cloud', 'Sync', 'Cyber', 'Omni',
      'Meta', 'Nexus', 'Code', 'Byte', 'Logic', 'Net', 'Sys', 'Web',
      'App', 'Dev', 'Soft', 'Quant', 'Virtu', 'Aero', 'Bio', 'Digi',
      'Electro', 'Flux', 'Grid', 'Hyper', 'Intelli', 'Kilo', 'Micro',
      'Neo', 'Opti', 'Pixel', 'Quantum', 'Robo', 'Sonic', 'Tera',
      'Ultra', 'Velo', 'Zen', 'Alpha', 'Beta', 'Gamma', 'Delta',
      'Echo', 'Ion', 'Nano', 'Photon', 'Plasma', 'Vector', 'Wave',
      'Xeno', 'Zeta', 'Arc', 'Core', 'Edge', 'Fuse', 'Hive',
    ],
    roots: [
      'base', 'flow', 'ify', 'ly', 'onics', 'ware', 'hub', 'works',
      'labs', 'matrix', 'sphere', 'gen', 'x', 'ops', 'it', 'sync',
      'link', 'net', 'tech', 'com', 'cast', 'grid', 'node', 'mind',
      'path', 'pulse', 'rise', 'scope', 'shift', 'space', 'spin',
      'stack', 'stream', 'suite', 'sys', 'view', 'ware', 'ark',
      'bit', 'bridge', 'chip', 'craft', 'dock', 'drive', 'engine',
    ],
    styles: ['modern', 'compound', 'abstract'],
    suffixes: ['Tecnologia', 'Sistemas', 'Soluções', 'Digital', 'Inteligente', 'Tech', 'Labs', 'Corp'],
  },

  fashion: {
    prefixes: [
      'Bella', 'Glam', 'Luxe', 'Aura', 'Vogue', 'Chic', 'Elegance',
      'Style', 'Trend', 'Mode', 'Pura', 'Diva', 'Nova', 'Haute',
      'Silk', 'Velvet', 'Satin', 'Pearl', 'Jewel', 'Crown', 'Aesthet',
      'Chroma', 'Blush', 'Cash', 'Drape', 'Flare', 'Gleam', 'Glow',
      'Lace', 'Loom', 'Lustr', 'Muse', 'Plush', 'Ritz', 'Shine',
      'Sleek', 'Smooth', 'Swan', 'Voga', 'Ward',
    ],
    roots: [
      'Boutique', 'Studio', 'Salon', 'Atelier', 'Concept', 'Collection',
      'Wear', 'Apparels', 'Beauty', 'Spa', 'Care', 'Looks', 'Threads',
      'Stitches', 'Wardrobe', 'Closet', 'Garments', 'Style', 'Fashion',
      'Design', 'House', 'Line', 'Place', 'Shop', 'Store', 'Vogue',
      'Chic', 'Trend', 'Luxe', 'Glow', 'Drape',
    ],
    styles: ['elegant', 'modern', 'compound'],
    suffixes: ['Moda', 'Estilo', 'Atelier', 'Boutique', 'Studio', 'Store', 'Concept'],
  },

  food: {
    prefixes: [
      'Sabor', 'Gusto', 'Delícia', 'Chef', 'Grill', 'Fresh', 'Doce',
      'Sal', 'Aroma', 'Nutri', 'Veg', 'Meat', 'Bakes', 'Brew',
      'Spice', 'Herb', 'Taste', 'Food', 'Bite', 'Snack', 'Palate',
      'Crave', 'Feast', 'Panela', 'Forno', 'Grelha', 'Caldo', 'Crisp',
      'Gourmet', 'Honey', 'Juice', 'Kettle', 'Mistura', 'Pan', 'Pitada',
      'Queijo', 'Rango', 'Salsa', 'Table', 'Thermal', 'Uva', 'Vinho',
      'Wok', 'Yeast', 'Zest',
    ],
    roots: [
      'Burger', 'Pizza', 'Sushi', 'Bistro', 'Cafe', 'Restô', 'Express',
      'Delivery', 'Kitchen', 'House', 'Spot', 'Bar', 'Lounge', 'Station',
      'Point', 'Corner', 'Hub', 'Shack', 'Truck', 'Box', 'Eats', 'Dine',
      'Grill', 'Bakery', 'Brew', 'Deli', 'Farm', 'Garden', 'Market',
      'Plate', 'Table', 'Wine',
    ],
    styles: ['appetizing', 'modern', 'compound'],
    suffixes: ['Alimentos', 'Gastronomia', 'Bistrô', 'Café', 'Restaurante', 'Delivery', 'Express'],
  },

  finance: {
    prefixes: [
      'Alpha', 'Prime', 'Apex', 'Summit', 'Vertex', 'Capital', 'Trust',
      'Wealth', 'Valor', 'Equinox', 'Nexus', 'Core', 'Global', 'Pro',
      'Elite', 'Secure', 'Clear', 'Smart', 'True', 'Next', 'Aegis',
      'Fort', 'Crest', 'Allied', 'Bench', 'Bridge', 'Bright', 'Citadel',
      'Crest', 'Everest', 'Fidelity', 'First', 'Golden', 'Guardian',
      'Heritage', 'Integra', 'Key', 'Merit', 'Navigator', 'Optimum',
      'Pacific', 'Pillar', 'Premier', 'Principal', 'Reliance', 'Royal',
      'Sage', 'Sanctuary', 'Sentry', 'Shield', 'Solid', 'Spectrum',
      'Sterling', 'Summit', 'Superior', 'Titan', 'Tower', 'Triumph',
    ],
    roots: [
      'Consulting', 'Partners', 'Advisors', 'Group', 'Capital', 'Holdings',
      'Ventures', 'Solutions', 'Strategies', 'Management', 'Finance',
      'Wealth', 'Invest', 'Trust', 'Bank', 'Credit', 'Funds', 'Assets',
      'Broker', 'Associates', 'Advisory', 'Alliance', 'Capital', 'Equity',
      'Financial', 'Global', 'Investments', 'Securities', 'Services',
    ],
    styles: ['serious', 'trust', 'compound'],
    suffixes: ['Financeira', 'Consultoria', 'Investimentos', 'Corretora', 'Gestão', 'Crédito', 'Seguros'],
  },

  health: {
    prefixes: [
      'Vita', 'Sana', 'Bem', 'Saúde', 'Vida', 'Cura', 'Derme', 'Cardio',
      'Neuro', 'Fisio', 'Terapi', 'Nutri', 'Med', 'Clinic', 'Bios',
      'Hige', 'Puri', 'Aliv', 'Equi', 'Flex', 'Mobi', 'Natu',
      'Pharma', 'Quanti', 'Reabil', 'Recu', 'Relax', 'Remed', 'Renov',
      'Respir', 'Revit', 'Seren', 'Sleep', 'Sorri', 'Terap', 'Therm',
      'Tonic', 'Tox', 'Trans', 'Trat', 'Trip', 'Ultr', 'Uni',
      'Vasc', 'Vent', 'Vert', 'Vig', 'Vir', 'Vis', 'Viv',
    ],
    roots: [
      'Clinic', 'Care', 'Health', 'Med', 'Center', 'Plus', 'Life',
      'Therapy', 'Wellness', 'Fit', 'Vital', 'Prime', 'Assist', 'Doctor',
      'Saúde', 'Bem-Estar', 'Cuidado', 'Farma', 'Hospital', 'Laser',
      'Pilates', 'Recovery', 'Rehab', 'Relax', 'Sleep', 'Spa', 'Sport',
      'Surgery', 'Vida',
    ],
    styles: ['trust', 'modern', 'compound'],
    suffixes: ['Saúde', 'Clínica', 'Bem-Estar', 'Terapias', 'Cuidados', 'Fisioterapia', 'Nutrição'],
  },

  education: {
    prefixes: [
      'Edu', 'Sabe', 'Lern', 'Mente', 'Alpha', 'Prime', 'Cogni',
      'Aprender', 'Saber', 'Ensi', 'Lumi', 'Luz', 'Nova', 'Futur',
      'Mestre', 'Sábio', 'Cresc', 'Desen', 'Evol', 'Forma', 'Gênio',
      'Habil', 'Idei', 'Infan', 'Inte', 'Jovem', 'Kid', 'Learn',
      'Letr', 'Libr', 'Ling', 'Liter', 'Magic', 'Mater', 'Melhor',
      'Ment', 'Métod', 'Mind', 'Motiv', 'Multi', 'Mundi', 'Nurtur',
      'Orient', 'Pensa', 'Play', 'Pré', 'Prog', 'Prom', 'Raiz',
      'Rede', 'Sab', 'Seed', 'Skill', 'Smart', 'Social', 'Super',
      'Teach', 'Tecno', 'Top', 'Trans', 'Tutor', 'Uni', 'Virt',
    ],
    roots: [
      'Ensino', 'Educação', 'Aprendizado', 'Colégio', 'Escola', 'Curso',
      'Academy', 'School', 'Learning', 'Center', 'Plus', 'Colegial',
      'Cursos', 'Desenvolvimento', 'Educacional', 'Estudos', 'Formação',
      'Idiomas', 'Infantil', 'Knowledge', 'Letramento', 'Profissionalizante',
      'Saber', 'Tech', 'Training', 'Tutoring', 'Universitário',
    ],
    styles: ['trust', 'modern', 'compound'],
    suffixes: ['Educação', 'Ensino', 'Colégio', 'Cursos', 'Formação', 'Academy', 'School'],
  },
};

/**
 * Gera nomes de empresa para um nicho específico.
 *
 * @param {Object} options
 * @param {string} options.niche - tech | fashion | food | finance | health | education
 * @param {string} options.style - modern | classic | compound
 * @param {number} options.count - Quantos nomes gerar
 * @returns {Array<Object>}
 */
export function generateCompanyNames(options = {}) {
  const { niche = 'tech', style = null, count = 10 } = options;

  const lexicon = CompanyLexicon[niche] || CompanyLexicon.tech;
  const names = [];
  const usedNames = new Set();

  for (let i = 0; i < count * 5 && names.length < count; i++) {
    const name = generateSingleCompany(lexicon, style, niche);
    if (!usedNames.has(name.name)) {
      usedNames.add(name.name);
      names.push(name);
    }
  }

  return names;
}

/**
 * Gera um único nome de empresa.
 */
function generateSingleCompany(lexicon, preferredStyle, niche) {
  const style = preferredStyle || pickRandom(lexicon.styles);
  let name = '';
  let type = '';

  switch (style) {
    case 'compound': {
      // Combinação prefixo + raiz (ex: TechFlow, NovaCode)
      const prefix = pickRandom(lexicon.prefixes);
      const root = pickRandom(lexicon.roots);
      name = `${prefix}${capitalize(root)}`;
      type = 'compound';
      break;
    }
    case 'abstract': {
      // Palavra inventada com som de tecnologia
      const syllables = ['ix', 'ox', 'ux', 'ax', 'ex', 'yx', 'um', 'on', 'ic', 'os', 'is', 'io', 'eo', 'eo', 'ix'];
      const starts = ['X', 'Z', 'Q', 'V', 'N', 'M', 'K', 'P', 'T', 'F', 'L', 'R', 'S', 'C'];
      name = pickRandom(starts) + pickRandom(syllables);
      if (randomBool(0.3)) name += pickRandom(['ify', 'ly', 'io', 'ix', 'um', 'on']);
      type = 'abstract';
      break;
    }
    default: {
      // Moderno: prefixo + sufixo curto
      const prefix = pickRandom(lexicon.prefixes);
      const useSuffix = randomBool(0.5);
      if (useSuffix) {
        const suffix = pickRandom(lexicon.roots.filter(r => r.length < 7));
        name = `${prefix}${capitalize(suffix)}`;
      } else {
        name = prefix + (randomBool(0.4) ? pickRandom(['ify', 'ly', 'io', 'a', 'e', 'o']) : '');
      }
      type = 'modern';
      break;
    }
  }

  // Gera um slogan baseado no nicho
  const slogan = generateSlogan(name, niche);

  return {
    name,
    niche,
    style: type,
    slogan,
    available: {
      'com': randomBool(0.3),
      'com.br': randomBool(0.4),
    },
  };
}

/**
 * Gera slogan para o nome da empresa.
 */
function generateSlogan(name, niche) {
  const slogans = {
    tech: [
      `${name}: Inovação que conecta.`,
      `${name}: Tecnologia para o futuro.`,
      `${name}: Soluções inteligentes.`,
      `${name}: Transformando ideias em código.`,
      `${name}: Sua parceira digital.`,
      `Acelere com ${name}.`,
      `${name}: Simplesmente inteligente.`,
    ],
    fashion: [
      `${name}: Elegância que inspira.`,
      `${name}: Seu estilo, sua marca.`,
      `${name}: Moda com personalidade.`,
      `${name}: Vista-se bem.`,
      `Descubra o luxo em ${name}.`,
      `${name}: Tendência é aqui.`,
    ],
    food: [
      `${name}: Sabor que encanta.`,
      `${name}: Comida de verdade.`,
      `${name}: O sabor da sua vida.`,
      `${name}: Prazer em cada mordida.`,
      `Delícias que só ${name} tem.`,
    ],
    finance: [
      `${name}: Confiança que rende.`,
      `${name}: Seu futuro financeiro.`,
      `${name}: Investindo em você.`,
      `${name}: Segurança e crescimento.`,
      `${name}: Parceiro das suas conquistas.`,
    ],
    health: [
      `${name}: Cuide de quem importa.`,
      `${name}: Saúde em primeiro lugar.`,
      `${name}: Bem-estar para todos.`,
      `${name}: Sua saúde, nossa missão.`,
    ],
    education: [
      `${name}: Saber transforma.`,
      `${name}: O futuro se aprende aqui.`,
      `${name}: Educação que inspira.`,
      `${name}: Aprender é evoluir.`,
    ],
  };

  const pool = slogans[niche] || slogans.tech;
  return pickRandom(pool);
}

export { CompanyLexicon };
