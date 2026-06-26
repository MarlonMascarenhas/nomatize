/**
 * meanings.js — Banco de significados de nomes.
 * 
 * Mapeia nomes comuns a seus significados, origens e
 * personalidades famosas. Quando um nome gerado não está
 * no banco, o sistema constrói um significado dinâmico
 * baseado nos morfemas usados.
 */

export const NameMeanings = {
  // === MASCULINOS ===
  Arthur: {
    meaning: 'Urso nobre',
    origin: 'Celta',
    description: 'De origem celta "Artorius", significa "urso nobre" ou "rei urso". Famoso pelo lendário Rei Arthur da Távola Redonda.',
    famous: ['Arthur Conan Doyle (escritor)', 'Arthur Schopenhauer (filósofo)', 'Arthur Zanetti (ginasta olímpico)'],
    trend: 'rising',
  },
  Miguel: {
    meaning: 'Quem é como Deus?',
    origin: 'Hebraico',
    description: 'Do hebraico "Mikhael", uma pergunta retórica que afirma ninguém é como Deus. Arcanjo Miguel é o protetor.',
    famous: ['Miguel de Cervantes (escritor)', 'Miguel Ângelo (artista)', 'Miguel Falabella (ator)'],
    trend: 'rising',
  },
  Heitor: {
    meaning: 'O que segura, o guardião',
    origin: 'Grego',
    description: 'Do grego "Hektor", significa "o que segura firme". Herói troiano da Ilíada de Homero.',
    famous: ['Heitor Villa-Lobos (compositor)', 'Heitor dos Prazeres (músico)'],
    trend: 'rising',
  },
  Bernardo: {
    meaning: 'Forte como urso',
    origin: 'Germânico',
    description: 'Do germânico "Bernhard", união de "bern" (urso) + "hard" (forte, corajoso).',
    famous: ['São Bernardo de Claraval (santo)', 'Bernardo Guimarães (escritor)'],
    trend: 'rising',
  },
  Davi: {
    meaning: 'O amado, o querido',
    origin: 'Hebraico',
    description: 'Do hebraico "David", significa "amado" ou "predileto". Segundo rei de Israel e autor de salmos.',
    famous: ['Davi (rei bíblico)', 'David Bowie (músico)', 'David Beckham (jogador)'],
    trend: 'stable',
  },
  Gabriel: {
    meaning: 'Homem forte de Deus',
    origin: 'Hebraico',
    description: 'Do hebraico "Gavriel", significa "Deus é minha força". Arcanjo mensageiro.',
    famous: ['Gabriel García Márquez (escritor)', 'Gabriel Medina (surfista)'],
    trend: 'rising',
  },
  Pedro: {
    meaning: 'Pedra, rocha',
    origin: 'Grego/Latim',
    description: 'Do grego "Petros" (pedra). Jesus deu a Simão o nome Pedro como "a rocha" da igreja.',
    famous: ['Pedro Álvares Cabral (navegador)', 'Pedro II (imperador)', 'Pedro Cardoso (ator)'],
    trend: 'stable',
  },
  Luca: {
    meaning: 'Luminoso, o que ilumina',
    origin: 'Latim',
    description: 'Do latim "Lux" (luz). Variante moderna de Lucas, popular internacionalmente.',
    famous: ['Luca Guadagnino (cineasta)', 'Luca Pacioli (matemático)'],
    trend: 'rising',
  },
  Theo: {
    meaning: 'Deus',
    origin: 'Grego',
    description: 'Abreviação de "Theodore" ou "Theophilos", do grego "Theos" (Deus). Curto, moderno e forte.',
    famous: ['Theo de Almeida (ator)', 'Theo Walcott (jogador)'],
    trend: 'rising',
  },
  Gael: {
    meaning: 'Estrangeiro, celta',
    origin: 'Celta',
    description: 'Derivado de "Gael", povo celta da Escócia e Irlanda. Nome curto e musical.',
    famous: ['Gael García Bernal (ator)'],
    trend: 'rising',
  },
  Ravi: {
    meaning: 'Sol',
    origin: 'Sânscrito',
    description: 'Do sânscrito "Ravi", significa "sol". Nome curto, exótico e com sonoridade suave.',
    trend: 'rising',
  },
  Noah: {
    meaning: 'Descanso, consolação',
    origin: 'Hebraico',
    description: 'Do hebraico "Noach", significa "descanso" ou "conforto". Patriarca bíblico da Arca.',
    trend: 'rising',
  },
  Levi: {
    meaning: 'Unido, ligado',
    origin: 'Hebraico',
    description: 'Do hebraico "Levi", significa "ligado" ou "unido". Filho de Jacó e tribo sacerdotal.',
    trendy: 'rising',
  },
  Enzo: {
    meaning: 'Senhor da casa, príncipe',
    origin: 'Germânico/Italiano',
    description: 'Originalmente "Heinz", abreviação de Heinrich (senhor da casa). Popularizado na Itália.',
    famous: ['Enzo Ferrari (fundador)'],
    trend: 'rising',
  },
  Nicolas: {
    meaning: 'Vitória do povo',
    origin: 'Grego',
    description: 'Do grego "Nikolaos", de "nike" (vitória) + "laos" (povo). São Nicolau é o Papai Noel.',
    famous: ['Nicolas Cage (ator)', 'Nicolas Santos (nadador)'],
    trend: 'stable',
  },
  Rael: {
    meaning: 'Deus é meu pastor',
    origin: 'Hebraico',
    description: 'Do hebraico "Rael", combinação de "Ra" (pastor) e "El" (Deus).',
    trend: 'rising',
  },
  Benjamin: {
    meaning: 'Filho da mão direita',
    origin: 'Hebraico',
    description: 'Do hebraico "Binyamin", significa "filho da mão direita" (filho mais novo e protegido).',
    famous: ['Benjamin Franklin (inventor)', 'Benjamin Button (personagem)'],
    trend: 'rising',
  },
  Samuel: {
    meaning: 'Seu nome é Deus',
    origin: 'Hebraico',
    description: 'Do hebraico "Shemuel", significa "Deus ouviu" ou "nome de Deus". Profeta bíblico.',
    famous: ['Samuel L. Jackson (ator)', 'Samuel Ramos (filósofo)'],
    trend: 'rising',
  },
  Henrique: {
    meaning: 'Senhor do lar',
    origin: 'Germânico',
    description: 'Do germânico "Heimrich", de "heim" (lar) + "rich" (senhor, governante).',
    famous: ['Henrique (príncipe)', 'Henrique de Toulouse-Lautrec (pintor)'],
    trend: 'stable',
  },
  João: {
    meaning: 'Deus é gracioso',
    origin: 'Hebraico',
    description: 'Do hebraico "Yochanan", significa "Deus é cheio de graça". Um dos nomes mais universais.',
    famous: ['João Paulo II (papa)', 'João Gilberto (músico)', 'João Cabral de Melo Neto (poeta)'],
    trend: 'stable',
  },
  Victor: {
    meaning: 'Vencedor, conquistador',
    origin: 'Latim',
    description: 'Do latim "Victor", significa literalmente "vencedor" ou "conquistador".',
    famous: ['Victor Hugo (escritor)', 'Victor Brecheret (escultor)'],
    trend: 'stable',
  },
  Oliver: {
    meaning: 'Oliveira, pacífico',
    origin: 'Latim',
    description: 'Do latim "Oliva" (oliveira), símbolo de paz. Muito popular no mundo todo.',
    famous: ['Oliver Cromwell (líder)', 'Oliver Stone (cineasta)'],
    trend: 'rising',
  },

  // === FEMININOS ===
  Alice: {
    meaning: 'Nobre, de linhagem nobre',
    origin: 'Germânico',
    description: 'Do germânico "Adalheidis", significa "nobreza" ou "de linhagem nobre". Imortalizada por Lewis Carroll.',
    famous: ['Alice (personagem)', 'Alice Braga (atriz)', 'Alice Munro (escritora)'],
    trend: 'rising',
  },
  Sophia: {
    meaning: 'Sabedoria',
    origin: 'Grego',
    description: 'Do grego "Sophia", significa "sabedoria". Um dos nomes mais populares do mundo.',
    famous: ['Sophia Loren (atriz)', 'Sofia Helena (princesa)'],
    trend: 'rising',
  },
  Helena: {
    meaning: 'A reluzente, tocha',
    origin: 'Grego',
    description: 'Do grego "Helene", significa "tocha" ou "reluzente". Helena de Troia era considerada a mulher mais bela.',
    famous: ['Helena (mitologia)', 'Helena Blavatsky (escritora)', 'Helena Rocha (poetisa)'],
    trend: 'rising',
  },
  Valentina: {
    meaning: 'Forte, saudável, valente',
    origin: 'Latim',
    description: 'Do latim "Valens" (forte, vigoroso). Versão feminina de Valentim, santo dos namorados.',
    famous: ['Valentina Tereshkova (cosmonauta)', 'Valentina Sampaio (modelo)'],
    trend: 'rising',
  },
  Laura: {
    meaning: 'Louvreiro, vitoriosa',
    origin: 'Latim',
    description: 'Do latim "Laurus" (loureiro), símbolo de vitória e glória na Roma Antiga.',
    famous: ['Laura Pausini (cantora)', 'Laura de Vison (poetisa)'],
    trend: 'rising',
  },
  Isabella: {
    meaning: 'Deus é meu juramento',
    origin: 'Hebraico/Italiano',
    description: 'Variante italiana de Isabel, do hebraico "Elisheba" (Deus é meu juramento).',
    famous: ['Isabella, Princesa Imperial', 'Isabella Rossellini (atriz)'],
    trend: 'rising',
  },
  Maria: {
    meaning: 'Senhora soberana, amada',
    origin: 'Hebraico',
    description: 'Do hebraico "Miryam", significado debatido entre "senhora soberana" e "amada de Deus". Nome mais universal.',
    famous: ['Maria (mãe de Jesus)', 'Maria Callas (cantora)', 'Maria Bethânia (cantora)'],
    trend: 'stable',
  },
  Luna: {
    meaning: 'Lua',
    origin: 'Latim',
    description: 'Do latim "Luna", a deusa romana da lua. Nome curto, místico e crescente em popularidade.',
    trend: 'rising',
  },
  Maya: {
    meaning: 'Ilusão, magia',
    origin: 'Sânscrito/Hebraico',
    description: 'No sânscrito significa "ilusão" ou "magia", na cultura hebraica significa "água". Plural e multicultural.',
    trend: 'rising',
  },
  Aurora: {
    meaning: 'Amanhecer, alvorada',
    origin: 'Latim',
    description: 'Do latim "Aurora", a deusa do amanhecer. Nome poético associado à princesa da Bela Adormecida.',
    trend: 'rising',
  },
  Eloá: {
    meaning: 'Deus, divindade',
    origin: 'Hebraico/Tupi',
    description: 'No hebraico bíblico "Eloah" significa Deus. Também nome de origem tupi-guarani.',
    trend: 'rising',
  },
  Liz: {
    meaning: 'Deus é meu juramento',
    origin: 'Hebraico/Inglês',
    description: 'Abreviação de Elizabeth, do hebraico "Elisheba". Curto, moderno e internacional.',
    trend: 'rising',
  },
  Chloe: {
    meaning: 'Broto verde, floração',
    origin: 'Grego',
    description: 'Do grego "Chloe", significa "broto verde" ou "floração". Epíteto da deusa Deméter.',
    famous: ['Chloë Sevigny (atriz)'],
    trend: 'rising',
  },
  Sofia: {
    meaning: 'Sabedoria',
    origin: 'Grego',
    description: 'Variante de Sophia. Do grego "sophia" (sabedoria). Elegante e clássico.',
    famous: ['Sofia Loren (atriz)', 'Sofia Coppola (cineasta)'],
    trend: 'rising',
  },
  Julia: {
    meaning: 'Jovem, de Júpiter',
    origin: 'Latim',
    description: 'Feminino de Júlio, do latim "Iulius" (pertencente a Júpiter). Nome clássico romano.',
    famous: ['Julia Roberts (atriz)', 'Julia Child (chef)', 'Julia M. (artista)'],
    trend: 'stable',
  },
  Beatriz: {
    meaning: 'Aquela que traz felicidade',
    origin: 'Latim',
    description: 'Do latim "Beatrix" (viajante) ou "Beatus" (abençoada, feliz). Imortalizada por Dante.',
    famous: ['Beatriz (musa de Dante)', 'Beatriz Segall (atriz)'],
    trend: 'stable',
  },
  Manuela: {
    meaning: 'Deus está conosco',
    origin: 'Hebraico',
    description: 'Do hebraico "Immanuel" (Deus conosco). Versão feminina e portuguesa de Emanuel.',
    trend: 'rising',
  },
  Ana: {
    meaning: 'Cheia de graça',
    origin: 'Hebraico',
    description: 'Do hebraico "Hannah", significa "graça" ou "favor". Mãe de Maria na tradição cristã.',
    famous: ['Ana (avó de Jesus)', 'Ana de Armas (atriz)', 'Ana Maria Braga (apresentadora)'],
    trend: 'stable',
  },
  Clara: {
    meaning: 'Brilhante, clara, ilustre',
    origin: 'Latim',
    description: 'Do latim "Clarus" (claro, brilhante). Santa Clara de Assis é a padroeira da televisão.',
    famous: ['Clara Schumann (pianista)', 'Clara Nunes (cantora)'],
    trend: 'stable',
  },
  Cecilia: {
    meaning: 'Cega, mas guiada pela luz divina',
    origin: 'Latim',
    description: 'Do latim "Caecilia". Santa Cecília é a padroeira dos músicos.',
    famous: ['Cecilia Meireles (poetisa)', 'Cecilia Bartoli (cantora)'],
    trend: 'stable',
  },
  Giovanna: {
    meaning: 'Deus é gracioso',
    origin: 'Hebraico/Italiano',
    description: 'Versão italiana de Joana, do hebraico "Yochanan" (Deus é gracioso).',
    trend: 'rising',
  },
  Maitê: {
    meaning: 'Amada',
    origin: 'Francês/Tupi',
    description: 'Do francês "Maîtresse" (amada) ou adaptação tupi. Nome musical e moderno.',
    famous: ['Maitê Proença (atriz)'],
    trend: 'rising',
  },
  Olivia: {
    meaning: 'Oliveira, paz',
    origin: 'Latim',
    description: 'Do latim "Oliva" (oliveira). Símbolo de paz. Muito popular internacionalmente.',
    famous: ['Olivia de Havilland (atriz)', 'Olivia Palermo (socialite)'],
    trend: 'rising',
  },
  Ayla: {
    meaning: 'Luar, luz da lua',
    origin: 'Hebraico/Turco',
    description: 'No hebraico significa "cervo" ou "carvalho", no turco significa "luar". Nome exótico e musical.',
    trend: 'rising',
  },
  Isis: {
    meaning: 'Trono, deusa do Egito',
    origin: 'Egípcio',
    description: 'Deusa egípcia da maternidade, magia e fertilidade. Nome de força e poder feminino.',
    trend: 'rising',
  },
};

/**
 * Retorna o significado de um nome, ou gera um dinâmico se não encontrado.
 */
export function getNameMeaning(name) {
  const entry = NameMeanings[name];
  if (entry) return entry;

  // Gera significado dinâmico baseado na terminação
  const lastLetter = name.slice(-1).toLowerCase();
  const lastTwo = name.slice(-2).toLowerCase();

  if (lastLetter === 'o') {
    return {
      meaning: 'Nome de origem latina/germânica',
      origin: 'Latim/Germânico',
      description: `"${name}" é um nome de sonoridade forte e clássica, típico de origens latinas e germânicas. Combinado perfeitamente com sobrenomes brasileiros.`,
      trend: ['rising', 'stable', 'classic'][Math.floor(Math.random() * 3)],
    };
  }
  if (lastLetter === 'a') {
    return {
      meaning: 'Nome de origem latina/hebraica',
      origin: 'Latim/Hebraico',
      description: `"${name}" possui terminação feminina típica, com sonoridade suave e presença marcante. Nome versátil que funciona em várias culturas.`,
      trend: ['rising', 'stable'][Math.floor(Math.random() * 2)],
    };
  }
  if (['el', 'il', 'al'].includes(lastTwo)) {
    return {
      meaning: 'Nome de origem hebraica',
      origin: 'Hebraico',
      description: `"${name}" tem terminação teofórica ("-el" = Deus em hebraico), comum em nomes bíblicos e angélicos.`,
      trend: 'classic',
    };
  }

  return {
    meaning: 'Nome de origem multicultural',
    origin: 'Multicultural',
    description: `"${name}" é um nome moderno e versátil, com sonoridade agradável em português e outros idiomas. Perfeito para quem busca um nome único.`,
    trend: 'rising',
  };
}

export default NameMeanings;
