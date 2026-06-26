/**
 * core.js — Algoritmo central de geração combinatória de nomes.
 *
 * DIFERENCIAL: Este não é um sorteador de lista. Ele constrói nomes
 * combinatorialmente a partir de sílabas, morfemas e regras fonotáticas
 * específicas de cada origem linguística.
 *
 * Capacidade: centenas de milhares de combinações únicas.
 */

import { Syllables, generateSyllable } from '../data/syllables.js';
import { Surnames, getRandomSurname } from '../data/surnames.js';
import { getNameMeaning } from '../data/meanings.js';
import { pickRandom, randomBetween, randomBool } from '../utils/random.js';
import { countSyllables, capitalize } from '../utils/string.js';

/**
 * Gera um nome a partir de sílabas de uma origem específica.
 *
 * @param {Object} options
 * @param {string} options.origin - Origem linguística (latin, germanic, hebrew, greek, norse, slavic, celtic, arabic, japanese, tupi)
 * @param {number} options.syllables - Número desejado de sílabas (2-4)
 * @param {string} options.gender - 'masculino' | 'feminino' | 'unissex'
 * @param {string} options.startLetter - Letra inicial desejada (opcional)
 * @returns {{ name: string, syllables: number, origin: string }}
 */
export function generateName(options = {}) {
  const {
    origin = null,
    syllables = randomBetween(2, 3),
    gender = 'masculino',
    startLetter = null,
  } = options;

  // Escolhe origem se não especificada — favorece origens comuns para bebês
  const origins = origin ? [origin] : ['latin', 'latin', 'hebrew', 'hebrew', 'greek', 'tupi', 'germanic', 'celtic', 'arabic', 'japanese'];
  const selectedOrigin = pickRandom(origins);
  const lang = Syllables[selectedOrigin];

  if (!lang) {
    return generateFallbackName(gender, syllables, startLetter);
  }

  // Constrói o nome combinatorialmente
  let name = '';
  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    attempts++;
    name = buildNameFromSyllables(lang, syllables, selectedOrigin, gender, startLetter);

    // Validações
    if (name.length < 2) continue;
    if (name.length > 12) continue;

    // Verifica letra inicial (já forçada na construção, mas mantém como fallback)
    if (startLetter && !name.toLowerCase().startsWith(startLetter.toLowerCase())) continue;

    // Verifica terminação de acordo com gênero
    if (gender === 'feminino' && !/[aã]$/i.test(name) && randomBool(0.5)) continue;
    if (gender === 'masculino' && /[aã]$/i.test(name) && randomBool(0.4) && selectedOrigin !== 'japanese') continue;

    // Filtro de legibilidade: rejeita caracteres especiais não-latinos
    // a menos que a origem seja explicitamente nórdica ou eslava
    if (!origin || (origin !== 'norse' && origin !== 'slavic')) {
      if (/[^a-zA-ZáéíóúâêîôûãõàèìòùäëïöüñçA-Z]/i.test(name)) continue;
    }
    
    // Máximo de 3 consoantes consecutivas
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name)) continue;

    break;
  }

  if (!name) {
    return generateFallbackName(gender, syllables, startLetter);
  }

  const suffix = pickRandom(lang.suffixes || ['o', 'a']);
  const finalName = capitalize(name + (randomBool(0.4) ? '' : ''));

  return {
    name: finalName,
    syllables: countSyllables(finalName),
    origin: selectedOrigin,
    meaning: getNameMeaning(finalName),
  };
}

/**
 * Constrói um nome combinatorialmente a partir de sílabas.
 * Se startLetter for fornecido, força a primeira consoante/vogal.
 */
function buildNameFromSyllables(lang, numSyllables, origin, gender, startLetter = null) {
  let name = '';

  for (let i = 0; i < numSyllables; i++) {
    const pattern = pickRandom(lang.patterns);
    const partKey = i === 0 ? 'start' : i === numSyllables - 1 ? 'end' : 'mid';
    const part = pattern[partKey] || 'CV';

    for (const type of part) {
      if (type === 'C') {
        // Força letra inicial na primeira consoante
        if (i === 0 && name.length === 0 && startLetter) {
          const filtered = lang.onset.filter(c => c.toLowerCase().startsWith(startLetter.toLowerCase()));
          if (filtered.length > 0) {
            name += pickRandom(filtered);
          } else {
            // Nenhuma consoante com essa letra — tenta vogal no lugar
            const vowelFiltered = lang.nucleus.filter(v => v.toLowerCase().startsWith(startLetter.toLowerCase()));
            if (vowelFiltered.length > 0) {
              name += pickRandom(vowelFiltered);
            } else {
              name += pickRandom(lang.onset);
            }
          }
        } else {
          name += pickRandom(lang.onset);
        }
      } else if (type === 'V') {
        // Força letra inicial na primeira vogal (se nome ainda vazio)
        if (i === 0 && name.length === 0 && startLetter) {
          const filtered = lang.nucleus.filter(v => v.toLowerCase().startsWith(startLetter.toLowerCase()));
          if (filtered.length > 0) {
            name += pickRandom(filtered);
          } else {
            // Tenta consoante
            const conFiltered = lang.onset.filter(c => c.toLowerCase().startsWith(startLetter.toLowerCase()));
            if (conFiltered.length > 0) {
              name += pickRandom(conFiltered);
            } else {
              name += pickRandom(lang.nucleus);
            }
          }
        } else {
          name += pickRandom(lang.nucleus);
        }
      }
    }
  }

  // Aplica sufixo de gênero quando apropriado
  if (gender === 'feminino' && !name.endsWith('a') && !name.endsWith('e') && randomBool(0.5)) {
    name += 'a';
  } else if (gender === 'masculino' && name.endsWith('a') && randomBool(0.3) && origin !== 'japanese') {
    name = name.slice(0, -1) + 'o';
  }

  return name;
}

/**
 * Gera nome completo com sobrenome.
 */
export function generateFullName(options = {}) {
  const {
    origin = null,
    syllables = randomBetween(2, 3),
    gender = 'masculino',
    startLetter = null,
    surnameOrigin = null,
  } = options;

  const nameResult = generateName({ origin, syllables, gender, startLetter });
  const surname = getRandomSurname(surnameOrigin || (origin === 'japanese' ? 'japanese' : 'brazilian'));
  const secondSurname = randomBool(0.4) ? ` ${getRandomSurname('brazilian')}` : '';

  return {
    ...nameResult,
    firstName: nameResult.name,
    surname,
    fullName: `${nameResult.name} ${surname}${secondSurname}`,
  };
}

/**
 * Gera múltiplos nomes de uma vez.
 */
export function generateNames(count = 5, options = {}) {
  const names = [];
  const usedNames = new Set();

  for (let i = 0; i < count * 3 && names.length < count; i++) {
    const result = generateFullName(options);
    if (!usedNames.has(result.firstName)) {
      usedNames.add(result.firstName);
      names.push(result);
    }
  }

  return names;
}

/**
 * Fallback: gera nomes a partir de listas de prefixos conhecidos
 * combinados de forma única (milhares de combinações).
 */
function generateFallbackName(gender, syllables, startLetter) {
  const prefixes = {
    masculino: ['Al','An','Ar','Ad','Ab','Ac','Af','Ag','Aj','Am','Ap','As','At','Au','Av','Az','Ben','Ber','Bran','Ca','Ce','Cé','Da','Dan','El','En','Er','Es','Fer','Fi','Flor','Fran','Ga','Gab','Gal','Gas','Gil','Gon','Gu','Gus','He','Hen','Her','Hi','Hug','Ig','Igo','Ivo','Ja','Jac','Jan','Je','Jer','Jo','Jor','Ju','Lau','Le','Leo','Li','Lor','Lou','Lu','Lú','Luci','Ma','Man','Mar','Mat','Mi','Mig','Mo','Mur','Na','Nat','Nel','Ni','No','Nor','Oct','Ol','Or','Os','Ot','Pa','Pat','Pe','Ped','Pie','Pon','Qui','Raf','Ra','Re','Rei','Ri','Rob','Rod','Rog','Rom','Ro','Ru','Sál','Sam','San','Sans','Se','Ser','Sér','Si','Sil','Sim','So','Ste','Tá','Tau','Te','Ter','The','To','Tom','U','Val','Van','Vas','Ven','Vi','Vic','Vin','Vir','Wag','Wal','Wil'],
    feminino: ['Adu','Adri','Ág','Agn','Al','Ale','Alex','Ali','Ama','Ana','And','Andr','Ani','Ant','Apo','Ara','Ari','Arl','Arq','Aur','Aux','Ava','Aza','Ba','Bar','Bat','Bea','Bel','Bem','Ber','Bia','Bib','Bla','Bran','Bri','Bru','Ca','Cai','Cal','Cam','Can','Car','Cas','Cat','Cau','Ce','Ceci','Cél','Ces','Ci','Cic','Cif','Cim','Cin','Cir','Cla','Clar','Clau','Cle','Clem','Cli','Clo','Cora','Crem','Cris','Da','Daf','Dal','Dan','De','Deb','Del','Den','Di','Dil','Dol','Dom','Don','Dor','Dri','Du','Dul','Ed','Edi','Edu','Ei','El','Ele','Eli','Elv','Ema','Emm','Em','Ena','Ene','Eni','Eri','Erm','Ern','Esm','Est','Eu','Eva','Eve','Ev','Fa','Fá','Fai','Fal','Fan','Far','Fe','Fel','Fen','Fer','Fi','Fil','Fir','Fla','Flo','Flor','Flu','For','Fran','Fred','Ga','Gab','Gai','Gal','Gan','Gar','Gas','Gau','Gen','Ger','Ges','Gil','Gin','Gla','Gle','Gli','Glo','Glor','Go','Gol','Gon','Gra','Grac','Gre','Gri','Gu','Gue','Gui','Gus','Ha','Hei','Hel','Hen','Her','Hi','Ho','Ia','Ias','Ibi','Ida','Ide','Idi','Ila','Ile','Ili','Ima','Ime','Imi','Ina','Ine','Ini','Ira','Ire','Iri','Isa','Ise','Isi','Ita','Ite','Iti','Iva','Ive','Ivi','Ja','Jac','Jad','Jan','Je','Jo','Joa','Job','Jol','Jon','Jor','Ju','Jua','Jud','Jul','Jun','Ka','Kai','Kal','Kam','Kar','Ke','Keli','Kely','Ki','Kim','Kin','Kri','La','Lai','Lar','Lau','Lav','Le','Lei','Lel','Lena','Les','Let','Li','Lia','Lic','Lid','Lil','Lim','Lin','Lis','Lo','Lor','Lou','Lu','Luc','Lud','Lul','Lum','Lun','Luz','Ly','Ma','Mab','Mad','Mai','Mal','Man','Mar','Mat','Mau','Me','Mec','Meg','Mei','Mel','Men','Mer','Mes','Mi','Mia','Mib','Mig','Mil','Mim','Min','Mir','Mis','Mo','Moi','Mol','Mon','Mor','Mos','Mu','Muc','Mul','Mun','Mur','My','Na','Nad','Nai','Nan','Nar','Nat','Ne','Nec','Ned','Nei','Nel','Nen','Neo','Ner','Nes','Ni','Nia','Nic','Nil','Nim','Nin','Nir','No','Noa','Nob','Noc','Noe','Noi','Nol','Non','Nor','Nos','Not','Nu','Nuc','Nun','Nur','Nus','Ny','Oc','Od','Ode','Odi','Ola','Ole','Oli','Olo','Oma','Ome','Omi','Ona','One','Oni','Ora','Ore','Ori','Orn','Os','Osa','Osm','Ota','Ote','Oti','Ou','Our','Ov','Pa','Pad','Pai','Pal','Pan','Par','Pas','Pat','Pau','Pe','Ped','Pei','Pel','Pen','Per','Pes','Pet','Pi','Pia','Pie','Pil','Pin','Pir','Pis','Pla','Ple','Pli','Po','Pol','Pom','Pon','Por','Pri','Pro','Psi','Pu','Pul','Pun','Pur','Py','Qua','Que','Qui','Ra','Rad','Rai','Ral','Ram','Ran','Rar','Ras','Rat','Rau','Re','Reb','Rec','Red','Rei','Rel','Rem','Ren','Reo','Rep','Res','Ret','Ri','Ria','Rib','Ric','Rid','Rig','Ril','Rim','Rin','Rip','Ris','Riv','Ro','Rob','Rod','Rog','Roi','Rom','Ron','Ror','Ros','Rot','Ru','Rub','Rud','Ruf','Rui','Rul','Rum','Rut','Sa','Sab','Sac','Sad','Saf','Sag','Sal','Sam','San','Sap','Sar','Sat','Se','Seb','Sec','Sed','See','Seg','Sei','Sel','Sem','Sen','Seo','Ser','Ses','Set','Si','Sib','Sid','Sie','Sig','Sil','Sim','Sin','Sip','Sir','Sis','Sit','So','Sof','Sol','Som','Son','Sop','Sor','Sos','Sot','Su','Sub','Sud','Sue','Sul','Sum','Sun','Sup','Sur','Sus','Ta','Tab','Tac','Tad','Tai','Tal','Tam','Tan','Tap','Tar','Tas','Tat','Tau','Te','Teb','Tec','Ted','Tei','Tel','Tem','Ten','Teo','Ter','Tes','Tet','Ti','Tia','Tib','Tic','Tie','Tif','Tig','Til','Tim','Tin','Tip','Tir','Tis','Tit','To','Tob','Toc','Toi','Tol','Tom','Ton','Top','Tor','Tos','Tot','Tou','Tri','Tro','Tru','Tsai','Tu','Tub','Tuc','Tud','Tui','Tul','Tum','Tun','Tur','Tus','Tut','Ua','Ual','Uba','Ube','Ubi','Uca','Uce','Uci','Uda','Ude','Udi','Udu','Ufa','Ufe','Ufi','Uga','Uge','Ugi','Ugo','Ugu','Ula','Ule','Uli','Ulo','Uma','Ume','Umi','Umu','Una','Une','Uni','Uno','Ura','Ure','Uri','Uro','Usa','Use','Usi','Uta','Ute','Uti','Uva','Uve','Uvi','Uza','Uze','Uzi','Va','Val','Van','Var','Vas','Vau','Ve','Vel','Ven','Ver','Ves','Vi','Via','Vic','Vid','Vie','Vil','Vin','Vir','Vis','Vit','Viú','Viv','Vo','Voi','Vol','Von','Vor','Vu','Vul','Vur','Wan','We','Wi','Xa','Xan','Xan','Xe','Xi','Ya','Yan','Yas','Ye','Yi','Yo','Za','Zai','Zan','Ze','Zel','Zen','Zi','Zil','Zim','Zin','Zo','Zoe','Zoi','Zom','Zor','Zu'],
    unissex: ['Alex','Ari','Ariel','Ash','Aza','Ami','Ani','Ary','Ba','Bai','Bri','Ca','Chi','Cris','Da','Di','Do','Du','Eli','Emi','Era','Es','Fa','Fi','Flo','Ga','Ge','Gi','Gin','Gu','Ha','He','Hi','Ho','Hu','Ia','Ila','Ili','In','Io','Ira','Iri','Is','Izi','Ja','Je','Ji','Jo','Ju','Ka','Ke','Ki','Ko','Ku','La','Le','Li','Lo','Lu','Ma','Me','Mi','Mo','Mu','Na','Ne','Ni','No','Nu','Pa','Pe','Pi','Po','Qui','Ra','Re','Ri','Ro','Ru','Sa','Se','Si','So','Su','Ta','Te','Ti','To','Tu','U','Va','Ve','Vi','Vu','Wa','We','Wi','Xa','Xe','Xi','Ya','Ye','Yi','Za','Ze','Zi'],
  };

  const pool = prefixes[gender] || prefixes.unissex;
  const prefix = pickRandom(pool);

  // Filtra por letra inicial se necessário
  let filtered = pool;
  if (startLetter) {
    filtered = pool.filter(p => p.toLowerCase().startsWith(startLetter.toLowerCase()));
    if (filtered.length === 0) filtered = pool;
  }

  const p = pickRandom(filtered);
  const suffixes = gender === 'feminino'
    ? ['a','ia','ina','ara','ana','ela','ila','inda','ilda','ina','ira','osa','una']
    : ['o','io','ino','elo','ilo','ando','endo','ildo','ardo','erto','ino','iso','ito','oso','uno'];

  const s = pickRandom(suffixes);
  const name = capitalize(p + s);

  return {
    name,
    syllables: countSyllables(name),
    origin: 'multicultural',
    meaning: getNameMeaning(name),
  };
}
