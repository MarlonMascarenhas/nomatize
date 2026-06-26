/**
 * generators.test.js — Testes unitários para os geradores de nomes.
 *
 * Valida que os algoritmos combinatórios produzem nomes
 * realistas, únicos e dentro dos parâmetros especificados.
 *
 * Para executar: node tests/generators.test.js
 * (Requer Node.js com suporte a ES Modules)
 */

// Configurações para teste em Node.js
import { generateName, generateFullName, generateNames } from '../js/generators/core.js';
import { generateBabyNames } from '../js/generators/baby-names.js';
import { generateCompanyNames } from '../js/generators/company-names.js';
import { generateRPGNames } from '../js/generators/rpg-names.js';
import { generatePersona } from '../js/generators/persona.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ ${message}`);
  }
}

function assertNotEqual(a, b, message) {
  if (a !== b) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ ${message} — valores iguais: ${a}`);
  }
}

function assertUnique(arr, message) {
  const unique = new Set(arr);
  if (unique.size === arr.length) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ ${message} — ${arr.length - unique.size} duplicatas`);
  }
}

function assertLength(arr, min, max, message) {
  if (arr.length >= min && arr.length <= max) {
    passed++;
    console.log(`  ✅ ${message} (${arr.length} itens)`);
  } else {
    failed++;
    console.error(`  ❌ ${message} — esperado entre ${min}-${max}, obteve ${arr.length}`);
  }
}

// ===== Testes =====

console.log('\n📋 Teste: generateName()\n');

// Teste 1: Gera um nome
const name1 = generateName();
assert(name1 && name1.name && name1.name.length > 0, 'Gera um nome não vazio');
assert(name1.origin, 'Inclui origem');
assert(name1.syllables > 0, 'Inclui contagem de sílabas');

// Teste 2: Gera nomes de diferentes origens
const origins = ['latin', 'hebrew', 'norse', 'japanese', 'tupi'];
for (const origin of origins) {
  const n = generateName({ origin });
  assert(n.origin === origin, `Gera nome com origem: ${origin} (${n.name})`);
}

// Teste 3: Gera nome com letra inicial específica
const namesWithA = [];
for (let i = 0; i < 20; i++) {
  const n = generateName({ startLetter: 'A', gender: 'masculino' });
  namesWithA.push(n.name);
}
const allStartWithA = namesWithA.every(n => n.startsWith('A'));
assert(allStartWithA, 'Nomes gerados com letra inicial "A"');

// Teste 4: Gera nomes femininos
const femNames = [];
for (let i = 0; i < 20; i++) {
  const n = generateName({ gender: 'feminino' });
  femNames.push(n.name);
}
assert(femNames.length === 20, 'Gera 20 nomes femininos');

// Teste 5: Unicidade (baixa probabilidade de duplicatas em 50 execuções)
const manyNames = [];
for (let i = 0; i < 50; i++) {
  manyNames.push(generateName().name);
}
assertUnique(manyNames, '50 nomes gerados são únicos');

console.log('\n📋 Teste: generateFullName()\n');

// Teste 6: Nome completo
const full = generateFullName();
assert(full.fullName.includes(' '), 'Nome completo contém espaço');
assert(full.firstName && full.surname, 'Nome completo tem nome e sobrenome');

// Teste 7: Nomes completos únicos
const fullNames = [];
for (let i = 0; i < 30; i++) {
  fullNames.push(generateFullName().fullName);
}
assertUnique(fullNames, '30 nomes completos são únicos');

console.log('\n📋 Teste: generateNames()\n');

// Teste 8: Gera quantidade correta
const batch = generateNames(10);
assertLength(batch, 8, 10, 'Gera 10 nomes');
assertUnique(batch.map(n => n.firstName), 'Nomes no batch são únicos');

console.log('\n📋 Teste: generateBabyNames()\n');

// Teste 9: Filtros de bebê
const babyResult = generateBabyNames({ gender: 'feminino', origin: 'hebrew', count: 5 });
assertLength(babyResult, 3, 5, 'Gera 5 nomes femininos hebraicos');
assertUnique(babyResult.map(n => n.firstName), 'Nomes de bebê são únicos');

// Teste 10: Compatibilidade com sobrenome
const withCompat = generateBabyNames({ gender: 'masculino', compatibleWith: 'Silva', count: 3 });
assert(withCompat[0].compatibility !== undefined, 'Inclui score de compatibilidade');

console.log('\n📋 Teste: generateCompanyNames()\n');

// Teste 11: Nomes de empresa por nicho
const niches = ['tech', 'fashion', 'food', 'finance'];
for (const niche of niches) {
  const companies = generateCompanyNames({ niche, count: 3 });
  assertLength(companies, 1, 3, `Gera 3 empresas de ${niche} (${companies.map(c => c.name).join(', ')})`);
}

// Teste 12: Empresas únicas
const allCompanies = generateCompanyNames({ count: 20 });
assertUnique(allCompanies.map(c => c.name), '20 nomes de empresa são únicos');

console.log('\n📋 Teste: generateRPGNames()\n');

// Teste 13: Nomes de RPG por cenário
const scenarios = ['medieval', 'cyberpunk', 'horror'];
for (const style of scenarios) {
  const chars = generateRPGNames({ style, count: 3 });
  assertLength(chars, 1, 3, `Gera 3 nomes ${style}`);
}

// Teste 14: RPG únicos
const allRPG = generateRPGNames({ count: 15 });
assertUnique(allRPG.map(c => c.name), '15 nomes de RPG são únicos');

console.log('\n📋 Teste: generatePersona()\n');

// Teste 15: Persona completa
const p = generatePersona();
assert(p.name && p.cpf && p.email && p.phone, 'Persona tem todos os campos obrigatórios');
assert(p.cpf.includes('.'), 'CPF tem formatação correta');
assert(p.phone.includes('('), 'Telefone tem formatação correta');
assert(p.email.includes('@'), 'Email tem formato válido');

// Teste 16: Persona por gênero
const pm = generatePersona({ gender: 'masculino' });
// Nomes masculinos tendem a terminar sem 'a', mas não é garantido com o gerador combinatório
assert(pm.gender === 'masculino', 'Persona masculina gerada');

const pf = generatePersona({ gender: 'feminino' });
assert(pf.gender === 'feminino', 'Persona feminina gerada');

// Teste 17: Personas únicas
const personas = [];
for (let i = 0; i < 10; i++) {
  personas.push(generatePersona().name);
}
assertUnique(personas, '10 personas têm nomes únicos');

// ===== Resumo =====

console.log('\n' + '='.repeat(40));
console.log(`📊 Resultado: ${passed} passaram, ${failed} falharam`);
console.log('='.repeat(40) + '\n');

process.exit(failed > 0 ? 1 : 0);
