/**
 * rpg-names.js — Gerador de nomes para personagens de RPG.
 *
 * Suporta múltiplos cenários: fantasia medieval, cyberpunk,
 * terror gótico, e permite combinar prefixos, sufixos e
 * títulos para criar nomes épicos.
 */

import { pickRandom, randomBetween, randomBool } from '../utils/random.js';
import { capitalize } from '../utils/string.js';

const RPG_Lexicon = {
  medieval: {
    male: [
      'Aragorn', 'Legolas', 'Gimli', 'Thorin', 'Elrond', 'Balin',
      'Dwalin', 'Bard', 'Boromir', 'Faramir', 'Eomer', 'Theoden',
      'Gandalf', 'Radagast', 'Smaug', 'Beorn', 'Celeborn', 'Cirdan',
      'Dain', 'Durin', 'Fingolfin', 'Finrod', 'Glorfindel', 'Haldir',
      'Luthien', 'Thranduil', 'Treebeard', 'Aldaron', 'Barahir', 'Beren',
      'Curufin', 'Ecthelion', 'Eol', 'Feanor', 'Fingon', 'Finwe',
      'Gwindor', 'Huor', 'Hurin', 'Idril', 'Ingwe', 'Lalaith',
      'Maedhros', 'Maglor', 'Morgoth', 'Orodreth', 'Orome', 'Ruud',
      'Turin', 'Turgon', 'Tyelko', 'Ungoliant', 'Vorondil', 'Arador',
      'Arathorn', 'Arvedui', 'Aragost', 'Aragorn', 'Argonui', 'Celebrian',
      'Denethor', 'Ecthelion', 'Elendil', 'Elrohir', 'Elladan', 'Finduilas',
      'Gil-galad', 'Hador', 'Hallatan', 'Halmir', 'Hareth', 'Hundar',
      'Hunthor', 'Hunter', 'Hyarmendacil', 'Ilmandur', 'Isildur', 'Kings',
      'Linhir', 'Lothiriel', 'Mablung', 'Malbeth', 'Minardil', 'Minalcar',
      'Mundburg', 'Narmacil', 'Ohtar', 'Ondoher', 'Orodreth', 'Pelendur',
      'Rian', 'Rohir', 'Sador', 'Saeldir', 'Saelon', 'Sagroth',
      'Sangahyando', 'Seregon', 'Silmariën', 'Simbelmynë', 'Sinahir', 'Stybba',
      'Sulim', 'Surion', 'Saelir', 'Saelon', 'Talagan', 'Tal-Elmar',
      'Tarcil', 'Tarondor', 'Telemnar', 'Telumehtar', 'Tindómë', 'Tolkin',
      'Tuor', 'Turambar', 'Ufthak', 'Ulfast', 'Uldor', 'Ulfang',
      'Ulgath', 'Umlot', 'Undin', 'Urol', 'Uvatha', 'Valacar', 'Valandur',
      'Vardamir', 'Vëantur', 'Vëan', 'Vëannë', 'Vëatur', 'Vëatu',
      'Vëanë', 'Vëanyë', 'Vëanyë', 'Vëanyë', 'Vëanyë', 'Vëanyë',
    ],
    female: [
      'Arwen', 'Galadriel', 'Eowyn', 'Tauriel', 'Luthien', 'Melian',
      'Idril', 'Nienor', 'Finduilas', 'Morwen', 'Haleth', 'Elwing',
      'Aredhel', 'Celebrian', 'Earwen', 'Indis', 'Nerdanel', 'Varda',
      'Yavanna', 'Nienna', 'Este', 'Vaire', 'Vana', 'Nessa',
      'Luthien', 'Arien', 'Tilion', 'Uinen', 'Ossë', 'Lúthien',
      'Tinuviel', 'Elenwë', 'Anairë', 'Eärwen', 'Amarië', 'Míriel',
      'Tar-Míriel', 'Berúthiel', 'Castamir', 'Erendis', 'Esterte', 'Farawyn',
      'Firella', 'Galdor', 'Glorendil', 'Hareth', 'Hunthor', 'Isilmë',
      'Lothwen', 'Lothlaurë', 'Lothriel', 'Luinil', 'Lumion', 'Luneth',
      'Mareth', 'Mariën', 'Melian', 'Meriadoc', 'Mithrellas', 'Moriel',
      'Morwen', 'Narwendil', 'Nessa', 'Nienor', 'Nimbrethil', 'Nimloth',
      'Ninquelótë', 'Noldorin', 'Olórin', 'Oloriel', 'Ondoriel', 'Orophin',
      'Orophiel', 'Oromë', 'Oromendil', 'Oromanë', 'Oromëanë', 'Oromëanë',
      'Oromëanë', 'Oromëanë', 'Oromëanë', 'Oromëanë', 'Oromëanë', 'Oromëanë',
    ],
    surnames: [
      'the Brave', 'Ironfist', 'Oakenshield', 'Swiftbow', 'the Wise',
      'Shadowalker', 'Lightbringer', 'Dragonslayer', 'the Strong', 'the Swift',
      'Silverleaf', 'Starlight', 'Deepdelver', 'Firebeard', 'Stonehelm',
      'the Bold', 'the Fair', 'the Dark', 'the White', 'the Grey',
      'the Mighty', 'the Just', 'the Great', 'the Valiant', 'the Pious',
      'the Undying', 'the Hunter', 'the Seeker', 'the Keeper', 'the Watcher',
      'Hammerhand', 'Bowmaster', 'Steelheart', 'Ironwill', 'Goldmane',
      'Stormbringer', 'Doomhammer', 'Ashvale', 'Briarthorn', 'Dawnweaver',
      'Frostwind', 'Gloomwarden', 'Ironbark', 'Moonshadow', 'Nightwhisper',
      'Ravencrest', 'Silverstream', 'Stormwind', 'Thornfield', 'Wintermist',
    ],
    titles: [
      'Rei', 'Rainha', 'Príncipe', 'Princesa', 'Cavaleiro', 'Mago',
      'Guerreiro', 'Ladino', 'Clérigo', 'Bardo', 'Druida', 'Paladino',
      'Arqueiro', 'Feiticeira', 'Encantador', 'Guardião', 'Capitão', 'Lord',
      'Lady', 'Duque', 'Barão', 'Conde', 'Visconde', 'Marquês',
    ],
  },

  cyberpunk: {
    male: [
      'Neo', 'Jace', 'Zane', 'Kael', 'Ryker', 'Jax', 'Dash',
      'Orion', 'Nova', 'Silas', 'Finn', 'Knox', 'Kade', 'Zephyr',
      'Jett', 'Rex', 'Nash', 'Cruz', 'Dax', 'Kian', 'Raze',
      'Vex', 'Zero', 'Ace', 'Blade', 'Cypher', 'Decker', 'Eclipse',
      'Fenix', 'Glitch', 'Havoc', 'Zenith', 'Kilo', 'Lynx', 'Maverick',
      'Onyx', 'Pixel', 'Quantum', 'Reaper', 'Shadow', 'Titan', 'Umbra',
      'Viper', 'Wraith', 'Xenon', 'Yaku', 'Zion', 'Ash', 'Byte',
    ],
    female: [
      'Trinity', 'Nova', 'Lyra', 'Zoya', 'Rya', 'Nix', 'Kira',
      'Jade', 'Zara', 'Quinn', 'Skye', 'Lexa', 'Xena', 'Rhea',
      'Veda', 'Cleo', 'Yara', 'Ziva', 'Kori', 'Sage', 'Echo',
      'Astra', 'Blaire', 'Chrome', 'Dahlia', 'Ember', 'Fury', 'Glimmer',
      'Harlow', 'Iris', 'Jinx', 'Karma', 'Lumen', 'Mirage', 'Nyx',
      'Onyx', 'Pixel', 'Queen', 'Raven', 'Seraph', 'Tess', 'Umbriel',
      'Violet', 'Wren', 'Xia', 'Yuki', 'Zelda', 'Siren', 'Pixel',
    ],
    surnames: [
      'Null', 'Void', 'Glitch', 'Hack', 'Byte', 'Cipher', 'Neon',
      'Chrome', 'Wire', 'Mesh', 'Grid', 'Core', 'Pulse', 'Synth',
      'Flux', 'Spark', 'Drift', 'Shift', 'Zero', 'Echo', 'Blade',
      'Circuit', 'Data', 'Digital', 'Error', 'Fiber', 'Fusion', 'Ghost',
      'Hyde', 'Ion', 'Laser', 'Matrix', 'Metal', 'Pixel', 'Plasma',
      'Proto', 'Radar', 'Silicon', 'Steel', 'System', 'Turbo', 'Ultra',
      'Vapor', 'Virtual', 'Wave', 'Wire', 'Xeno', 'Zone',
    ],
    prefixes: [
      'Neuro', 'Cyber', 'Techno', 'Mega', 'Hyper', 'Ultra', 'Synth',
      'Bio', 'Mecha', 'Nano', 'Robo', 'Digi', 'Electro', 'Photon',
      'Plas', 'Neon', 'Chrome', 'Holo', 'Vector', 'Vertex',
    ],
  },

  horror: {
    male: [
      'Victor', 'Alistair', 'Dorian', 'Silas', 'Lucius', 'Barnabas',
      'Gideon', 'Edgar', 'Arthur', 'Edward', 'William', 'Charles',
      'Thomas', 'Henry', 'George', 'James', 'Richard', 'Joseph',
      'John', 'Robert', 'Vincent', 'Mortimer', 'Percival', 'Reginald',
      'Sebastian', 'Theodore', 'Ulysses', 'Walter', 'Ambrose', 'Bartholomew',
      'Cornelius', 'Caspian', 'Dante', 'Erasmus', 'Fabian', 'Gregory',
      'Ignatius', 'Jasper', 'Lazarus', 'Magnus', 'Nigel', 'Octavius',
      'Phineas', 'Quincy', 'Roderick', 'Sylvester', 'Thaddeus', 'Virgil',
    ],
    female: [
      'Victoria', 'Beatrice', 'Eleanor', 'Genevieve', 'Ophelia', 'Cordelia',
      'Evangeline', 'Josephine', 'Charlotte', 'Clara', 'Alice', 'Florence',
      'Grace', 'Lily', 'Rose', 'Mary', 'Sarah', 'Emma', 'Margaret',
      'Anne', 'Agatha', 'Bernadette', 'Catherine', 'Dorothea', 'Edith',
      'Francesca', 'Gwendolyn', 'Harriet', 'Isadora', 'Jocelyn', 'Katherine',
      'Lucinda', 'Matilda', 'Natalia', 'Odette', 'Penelope', 'Rosalind',
      'Sabrina', 'Tabitha', 'Ursula', 'Veronica', 'Wilhelmina', 'Xenia',
      'Yvaine', 'Zelda', 'Annabelle', 'Bridget', 'Celeste', 'Desdemona',
    ],
    surnames: [
      'Blackwood', 'Ravenscroft', 'Bloodgood', 'Nightshade', 'Graves',
      'Vane', 'Thorne', 'Crane', 'Hyde', 'Jekyll', 'Frankenstein',
      'Dracula', 'Harker', 'Van Helsing', 'Seward', 'Holmwood', 'Morris',
      'Westenra', 'Murray', 'Renfield', 'Arkwright', 'Barrow', 'Crowley',
      'Darkmore', 'Eldritch', 'Fallow', 'Grimshaw', 'Holloway', 'Knight',
      'Lovelace', 'Marrow', 'Nightingale', 'Pendleton', 'Quill', 'Raven',
      'Shadowmere', 'Sinclair', 'Sorrow', 'Stonebridge', 'Vale',
      'Wick', 'Whitmore', 'Wolfe', 'Wraith', 'Wright', 'Wynter',
    ],
    epithets: [
      'o Amaldiçoado', 'o Sombrio', 'o Maldito', 'a Bruxa', 'o Assombrado',
      'o Eterno', 'o Amaldiçoado', 'o Esquecido', 'o Maldito', 'o Sanguinário',
      'the Cursed', 'the Damned', 'the Eternal', 'the Forgotten', 'the Bound',
      'o Necromante', 'a Fúria', 'o Abismo', 'a Sombra', 'o Pesadelo',
    ],
  },
};

/**
 * Gera nomes de RPG.
 *
 * @param {Object} options
 * @param {string} options.style - medieval | cyberpunk | horror
 * @param {string} options.gender - male | female
 * @param {boolean} options.includeTitle - Incluir título (ex: "Cavaleiro")
 * @param {number} options.count
 * @returns {Array<Object>}
 */
export function generateRPGNames(options = {}) {
  const { style = 'medieval', gender = 'male', includeTitle = true, count = 10 } = options;

  const lexicon = RPG_Lexicon[style];
  if (!lexicon) return [];

  const names = [];
  const usedNames = new Set();

  for (let i = 0; i < count * 5 && names.length < count; i++) {
    const firstName = pickRandom(lexicon[gender] || lexicon.male);
    const surname = randomBool(0.7) ? pickRandom(lexicon.surnames || lexicon.surnames) : '';
    const title = includeTitle && randomBool(0.4) ? pickRandom(lexicon.titles || ['']) : '';

    // Gera prefixo cyberpunk adicional
    const prefix = style === 'cyberpunk' && randomBool(0.3)
      ? pickRandom(lexicon.prefixes || [])
      : '';

    let fullName = '';
    if (prefix) fullName = `${prefix}${firstName}`;
    else fullName = firstName;

    if (surname) fullName += ` ${surname}`;
    if (title) fullName = `${title} ${fullName}`;

    if (!usedNames.has(fullName)) {
      usedNames.add(fullName);
      names.push({
        name: fullName,
        firstName,
        surname,
        title,
        style,
        gender,
        epithet: style === 'horror' && randomBool(0.5) ? pickRandom(lexicon.epithets || []) : null,
      });
    }
  }

  return names;
}

export default RPG_Lexicon;
