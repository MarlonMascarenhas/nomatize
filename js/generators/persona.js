/**
 * persona.js — Gerador de Personas Fictícias completas.
 *
 * Gera dados completos e consistentes: nome, CPF válido, RG, endereço,
 * contato, dados financeiros e características físicas.
 * Todos os dados são 100% fictícios e gerados aleatoriamente.
 */

import { generateFullName } from './core.js';
import { pickRandom, randomBetween, randomBool } from '../utils/random.js';
import { removeAccents, generatePassword } from '../utils/string.js';

/** Dados de suporte para construção de personas */
const PersonaData = {
  professions: [
    'Analista de Sistemas', 'Desenvolvedor(a) Front-end', 'Engenheiro(a) de Software',
    'Designer Gráfico', 'Gerente de Projetos', 'Analista de Marketing',
    'Contador(a)', 'Advogado(a)', 'Médico(a) Clínico', 'Enfermeiro(a)',
    'Arquiteto(a)', 'Engenheiro(a) Civil', 'Professor(a)', 'Fotógrafo(a)',
    'Chef de Cozinha', 'Jornalista', 'Psicólogo(a)', 'Consultor(a) Financeiro',
    'Administrador(a)', 'Eletricista', 'Motorista de App', 'Analista de Dados',
    'Cientista de Dados', 'Veterinário(a)', 'Farmacêutico(a)', 'Diretor(a) de Arte',
    'Product Manager', 'UX Designer', 'Redator(a) Publicitário', 'Músico(a)',
    'Personal Trainer', 'Dentista', 'Biomédico(a)', 'Assistente Social',
    'Economista', 'Historiador(a)', 'Tradutor(a)', 'Relações Públicas',
    'Publicitário(a)', 'Sociólogo(a)', 'Geógrafo(a)', 'Meteorologista',
    'Oceanógrafo(a)', 'Astrônomo(a)', 'Físico(a)', 'Químico(a)', 'Biólogo(a)',
    'Zootecnista', 'Engenheiro(a) Ambiental', 'Engenheiro(a) Mecânico',
    'Engenheiro(a) Elétrico', 'Engenheiro(a) Químico', 'Engenheiro(a) Produção',
    'Técnico(a) de Enfermagem', 'Fisioterapeuta', 'Terapeuta Ocupacional',
    'Fonoaudiólogo(a)', 'Nutricionista', 'Educador(a) Físico', 'Cientista Político',
  ],

  addressData: {
    prefixes: ['Rua', 'Avenida', 'Praça', 'Alameda', 'Travessa', 'Rodovia', 'Via', 'Largo', 'Vila', 'Beco'],
    names: [
      'das Flores', 'dos Ipês', 'das Acácias', 'das Palmeiras', 'Central',
      'Principal', 'do Sol', 'da Lua', 'Castelo Branco', 'Tiradentes',
      'Sete de Setembro', 'Getúlio Vargas', 'Santo Antônio', 'São José',
      'da Paz', 'da Esperança', 'do Comércio', 'Bandeirantes', 'São Paulo',
      'Brasil', 'Quinze de Novembro', 'Rui Barbosa', 'Machado de Assis',
      'Amazonas', 'Pará', 'Minas Gerais', 'Rio Grande do Sul', 'Bahia',
      'Ceará', 'Pernambuco', 'Goiás', 'Mato Grosso', 'Santa Catarina',
      'Paraná', 'Maranhão', 'Rio de Janeiro', 'Espírito Santo', 'Piauí',
      'Alagoas', 'Sergipe', 'Rondônia', 'Tocantins', 'Acre', 'Amapá',
      'Roraima', 'dos Andradas', 'das Oliveiras', 'dos Pinheiros', 'do Porto',
      'da Praia', 'da Serra', 'do Vale', 'das Nações', 'Universidade',
      'Industrial', 'Comercial', 'Residencial', 'Parque', 'Jardim',
    ],
    cities: [
      'São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Curitiba/PR',
      'Porto Alegre/RS', 'Salvador/BA', 'Fortaleza/CE', 'Recife/PE',
      'Brasília/DF', 'Goiânia/GO', 'Manaus/AM', 'Belém/PA',
      'Florianópolis/SC', 'Vitória/ES', 'Natal/RN', 'Campinas/SP',
      'Ribeirão Preto/SP', 'Uberlândia/MG', 'Londrina/PR', 'João Pessoa/PB',
      'Maceió/AL', 'Aracaju/SE', 'Cuiabá/MT', 'Campo Grande/MS',
      'São Luís/MA', 'Teresina/PI', 'Porto Velho/RO', 'Boa Vista/RR',
      'Macapá/AP', 'Rio Branco/AC', 'Palmas/TO', 'Santos/SP',
      'São Bernardo do Campo/SP', 'Santo André/SP', 'Osasco/SP', 'Guarulhos/SP',
      'Niterói/RJ', 'Duque de Caxias/RJ', 'Nova Iguaçu/RJ', 'São Gonçalo/RJ',
      'Contagem/MG', 'Betim/MG', 'Juiz de Fora/MG', 'Uberaba/MG',
      'Sorocaba/SP', 'Jundiaí/SP', 'Piracicaba/SP', 'Bauru/SP',
      'São José dos Campos/SP', 'Taubaté/SP', 'Mogi das Cruzes/SP',
    ],
  },

  emails: ['@gmail.com', '@yahoo.com.br', '@hotmail.com', '@outlook.com', '@live.com', '@uol.com.br', '@bol.com.br'],
  bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  zodiacs: ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'],
  colors: ['Azul', 'Vermelho', 'Verde', 'Preto', 'Branco', 'Amarelo', 'Roxo', 'Laranja', 'Cinza', 'Rosa', 'Marrom', 'Vinho', 'Turquesa', 'Lavanda', 'Dourado', 'Prata', 'Bronze', 'Coral', 'Marfim', 'Pérola'],
  mothersPrefix: ['Ana', 'Maria', 'Clara', 'Sofia', 'Helena', 'Laura', 'Lúcia', 'Rosa', 'Rita', 'Teresa', 'Joana', 'Sandra', 'Luzia', 'Margarida', 'Dulce', 'Fátima', 'Carmem', 'Elisa', 'Heloísa', 'Eunice'],
};

/**
 * Gera uma persona completa.
 *
 * @param {Object} options
 * @param {string} options.gender - 'masculino' | 'feminino' | 'random'
 * @param {string} options.ageGroup - 'young' | 'adult' | 'senior'
 * @returns {Object} Persona com todos os dados
 */
export function generatePersona(options = {}) {
  const { gender: reqGender = 'random', ageGroup = 'adult' } = options;
  const gender = reqGender === 'random' ? (randomBool() ? 'masculino' : 'feminino') : reqGender;

  // Gera nome
  const nameResult = generateFullName({
    gender,
    syllables: randomBetween(2, 3),
    surnameOrigin: 'brazilian',
  });

  const firstName = nameResult.firstName;
  const surname = nameResult.surname;
  const fullName = nameResult.fullName;

  // Dados pessoais
  const mother = `${pickRandom(PersonaData.mothersPrefix)} ${surname}`;
  const birthData = generateBirthData(ageGroup);
  const cpf = generateValidCPF();
  const rg = generateFakeRG();
  const cert = generateFakeCert();

  // Contato
  const address = generateAddress();
  const phone = generatePhone();
  const cleanFirst = removeAccents(firstName).toLowerCase();
  const cleanLast = removeAccents(surname).toLowerCase();
  const username = `${cleanFirst}.${cleanLast}${randomBetween(10, 999)}`;
  const email = `${username}${pickRandom(PersonaData.emails)}`;
  const password = generatePassword(12);

  // Profissional
  const profession = pickRandom(PersonaData.professions);

  // Financeiro
  const card = generateCreditCard();
  const company = generateFakeCompany();
  const salary = `R$ ${randomBetween(2, 25)}.${randomBetween(100, 999)},00`;

  // Físico
  const physical = generatePhysical(gender);

  // Veículo
  const plate = generateLicensePlate();

  // Misc
  const zodiac = PersonaData.zodiacs[birthData.month - 1];
  const color = pickRandom(PersonaData.colors);

  return {
    name: fullName,
    firstName,
    surname,
    mother,
    cpf,
    rg,
    birth: birthData.date,
    age: `${birthData.age} anos`,
    zodiac,
    cert,
    profession,
    address,
    phone,
    email,
    user: username,
    pass: password,
    cardFlag: card.flag,
    cardNumber: card.number,
    cardExp: card.exp,
    cardCvv: card.cvv,
    company,
    salary,
    height: physical.height,
    weight: physical.weight,
    blood: physical.blood,
    color,
    plate,
    gender,
  };
}

// === Funções auxiliares ===

function generateValidCPF() {
  const n = (max) => Math.round(Math.random() * max);
  const mod = (d, v) => Math.round(d - (Math.floor(d / v) * v));

  let n1 = n(9), n2 = n(9), n3 = n(9), n4 = n(9), n5 = n(9);
  let n6 = n(9), n7 = n(9), n8 = n(9), n9 = n(9);

  let d1 = n9*2 + n8*3 + n7*4 + n6*5 + n5*6 + n4*7 + n3*8 + n2*9 + n1*10;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 = d1*2 + n9*3 + n8*4 + n7*5 + n6*6 + n5*7 + n4*8 + n3*9 + n2*10 + n1*11;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
}

function generateFakeRG() {
  return `${randomBetween(10, 99)}.${randomBetween(100, 999)}.${randomBetween(100, 999)}-${randomBetween(0, 9)}`;
}

function generateBirthData(ageGroup) {
  const ranges = { young: [18, 24], adult: [25, 49], senior: [50, 80] };
  const [minAge, maxAge] = ranges[ageGroup] || ranges.adult;
  const age = randomBetween(minAge, maxAge);
  const year = new Date().getFullYear() - age;
  const month = randomBetween(1, 12);
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = randomBetween(1, daysInMonth);

  return {
    date: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
    age,
    month,
    year,
  };
}

function generateFakeCert() {
  return `Livro A-${randomBetween(10, 99)}, Fls ${randomBetween(100, 999)}, Termo ${randomBetween(1000, 9999)}`;
}

function generateAddress() {
  const addr = PersonaData.addressData;
  const prefix = pickRandom(addr.prefixes);
  const name = pickRandom(addr.names);
  const num = randomBetween(10, 9999);
  const cityState = pickRandom(addr.cities);
  const cep = `${String(randomBetween(10000, 99999))}-${String(randomBetween(100, 999)).padStart(3, '0')}`;

  return `${prefix} ${name}, ${num} - ${cityState} - CEP: ${cep}`;
}

function generatePhone() {
  const ddd = randomBetween(11, 99);
  const p1 = randomBetween(1000, 9999);
  const p2 = randomBetween(1000, 9999);
  return `(${ddd}) 9${p1}-${p2}`;
}

function generateCreditCard() {
  const isVisa = randomBool();
  const flag = isVisa ? 'Visa' : 'Mastercard';
  const start = isVisa ? '4' : '5';

  const n1 = start + String(randomBetween(100, 999));
  const n2 = String(randomBetween(1000, 9999));
  const n3 = String(randomBetween(1000, 9999));
  const n4 = String(randomBetween(1000, 9999));

  const month = String(randomBetween(1, 12)).padStart(2, '0');
  const year = String(new Date().getFullYear() + randomBetween(1, 5)).slice(2);

  return {
    flag,
    number: `${n1} ${n2} ${n3} ${n4}`,
    exp: `${month}/${year}`,
    cvv: String(randomBetween(100, 999)),
  };
}

function generateFakeCompany() {
  const types = ['Ltda', 'S.A.', 'MEI', 'EIRELI', 'LTDA'];
  const prefixes = ['Alpha', 'Beta', 'Global', 'Prime', 'Nexus', 'Core', 'Sigma', 'Delta', 'Omega', 'Apex'];
  const suffixes = ['Consulting', 'Solutions', 'Serviços', 'Comércio', 'Indústria', 'Tecnologia', 'Gestão'];

  return `${pickRandom(prefixes)} ${pickRandom(suffixes)} ${pickRandom(types)}`;
}

function generatePhysical(gender) {
  const hMin = gender === 'masculino' ? 165 : 155;
  const hMax = gender === 'masculino' ? 190 : 175;
  const height = randomBetween(hMin, hMax) / 100;
  const imc = randomBetween(190, 280) / 10;
  const weight = (imc * (height * height)).toFixed(1);

  return {
    height: height.toFixed(2) + 'm',
    weight: weight + 'kg',
    blood: pickRandom(PersonaData.bloodTypes),
  };
}

function generateLicensePlate() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getLetter = () => letters[Math.floor(Math.random() * letters.length)];

  // Formato Mercosul: ABC1D23
  return `${getLetter()}${getLetter()}${getLetter()}${randomBetween(0, 9)}${getLetter()}${randomBetween(0, 9)}${randomBetween(0, 9)}`;
}

export default generatePersona;
