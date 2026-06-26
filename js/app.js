/**
 * app.js — Controlador principal do Nomatize.
 *
 * Gerencia navegação SPA, inicialização dos geradores,
 * renderização de resultados e integração entre serviços.
 */

import { generateBabyNames, getNameDetails } from './generators/baby-names.js';
import { generateCompanyNames } from './generators/company-names.js';
import { generateRPGNames } from './generators/rpg-names.js';
import { generatePersona } from './generators/persona.js';
import { getFavorites, toggleFavorite as toggleFav, isFavorite, getFavoriteCount, removeFavorite } from './services/favorites.js';
import { addToHistory, getHistory } from './services/history.js';
import { processQuizAnswers, Questions } from './services/quiz.js';
import { checkAvailability } from './services/checker.js';
import { getChartData, getRisingNames, getFallingNames } from './data/trends.js';

// ===== State =====
const state = {
  currentPage: 'home',
  currentTab: 'baby',
  lastBasicName: '',
  lastGeneratedData: null,
  quizAnswers: [],
  quizStep: 0,
  currentTrend: 'masculino',
  trendChart: null,
};

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initGenerator();
  initNavigation();
  initQuiz();
  initTrending();
  initChecker();
  initFavorites();
  initSearch();
  updateFavCount();
  renderInitialFilters();
});

// ===== Theme =====
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function updateIcon() {
    toggle.innerHTML = html.classList.contains('dark') ? sunIcon : moonIcon;
  }

  toggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    updateIcon();
  });

  updateIcon();
}

// ===== Navigation =====
function initNavigation() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(el.dataset.page);
    });
  });
}

window.showPage = function(page) {
  state.currentPage = page;

  // Hide all pages
  document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));

  // Show target page
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('fade-in');
  }

  // Update nav links
  document.querySelectorAll('.nav-link, .bottom-nav-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Special init
  if (page === 'trending') setTimeout(initTrendingChart, 100);
  if (page === 'favorites') renderFavoritesPage();
};

// ===== Tabs =====
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentTab = btn.dataset.target;

      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.color = '';
      });
      btn.classList.add('active');
      btn.style.color = '';

      if (state.currentTab === 'persona') {
        btn.style.color = '#d97706';
      }

      renderFilters(state.currentTab);
      hideResult();
    });
  });
}

function renderFilters(tab) {
  const container = document.getElementById('filters-container');
  container.style.opacity = '0';

  setTimeout(() => {
    container.innerHTML = getFilterHTML(tab);
    container.style.opacity = '1';
  }, 150);
}

function getFilterHTML(tab) {
  switch (tab) {
    case 'baby':
      return getBabyFilters();
    case 'company':
      return getCompanyFilters();
    case 'rpg':
      return getRPGFilters();
    case 'persona':
      return getPersonaFilters();
    default:
      return '';
  }
}

function getBabyFilters() {
  const origins = {
    '': 'Todas as origens', latin: 'Latina / Romance', germanic: 'Germânica',
    hebrew: 'Hebraica / Bíblica', greek: 'Grega', norse: 'Nórdica',
    slavic: 'Eslava', celtic: 'Celta', arabic: 'Árabe',
    japanese: 'Japonesa', tupi: 'Tupi / Indígena BR',
  };
  const letters = ['', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  return `
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gênero</label>
      <select id="babyGender" class="select">
        <option value="masculino">👦 Masculino</option>
        <option value="feminino">👧 Feminino</option>
        <option value="unissex">👤 Unissex</option>
      </select>
    </div>
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Origem</label>
      <select id="babyOrigin" class="select">
        ${Object.entries(origins).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}
      </select>
    </div>
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Letra Inicial</label>
      <select id="babyLetter" class="select">
        ${letters.map(l => `<option value="${l}">${l || 'Qualquer'}</option>`).join('')}
      </select>
    </div>
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sílabas</label>
      <select id="babySyllables" class="select">
        <option value="">Qualquer</option>
        <option value="2">2 sílabas (curto)</option>
        <option value="3">3 sílabas (médio)</option>
        <option value="4">4+ sílabas (longo)</option>
      </select>
    </div>
    <div class="md:col-span-2 space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Compatível com sobrenome</label>
      <input id="babySurname" class="input" placeholder="Ex: Silva, Oliveira..." maxlength="30">
    </div>
  `;
}

function getCompanyFilters() {
  return `
    <div class="md:col-span-2 space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nicho da Empresa</label>
      <select id="companyNiche" class="select">
        <option value="tech">💻 Tecnologia, SaaS & Inovação</option>
        <option value="fashion">👗 Moda, Beleza & Estética</option>
        <option value="food">🍔 Alimentação & Gastronomia</option>
        <option value="finance">💰 Finanças & Consultoria</option>
        <option value="health">🏥 Saúde & Bem-Estar</option>
        <option value="education">📚 Educação & Ensino</option>
      </select>
    </div>
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estilo do Nome</label>
      <select id="companyStyle" class="select">
        <option value="">Moderno</option>
        <option value="compound">Composto (ex: TechFlow)</option>
        <option value="abstract">Abstract / Inventado</option>
      </select>
    </div>
  `;
}

function getRPGFilters() {
  return `
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cenário</label>
      <select id="rpgStyle" class="select">
        <option value="medieval">⚔️ Fantasia Medieval</option>
        <option value="cyberpunk">🤖 Cyberpunk & Sci-Fi</option>
        <option value="horror">🧛 Terror Gótico</option>
      </select>
    </div>
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gênero</label>
      <select id="rpgGender" class="select">
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
      </select>
    </div>
  `;
}

function getPersonaFilters() {
  return `
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gênero</label>
      <select id="personaGender" class="select">
        <option value="random">🎲 Aleatório</option>
        <option value="masculino">👦 Masculino</option>
        <option value="feminino">👧 Feminino</option>
      </select>
    </div>
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Faixa Etária</label>
      <select id="personaAge" class="select">
        <option value="adult">Adulto (25-50 anos)</option>
        <option value="young">Jovem (18-24 anos)</option>
        <option value="senior">Sênior (50+ anos)</option>
      </select>
    </div>
  `;
}

function renderInitialFilters() {
  renderFilters('baby');
}

// ===== Generator =====
function initGenerator() {
  document.getElementById('generateBtn').addEventListener('click', generate);
}

window.generate = function() {
  const tab = state.currentTab;

  switch (tab) {
    case 'baby':
      generateBaby();
      break;
    case 'company':
      generateCompany();
      break;
    case 'rpg':
      generateRPG();
      break;
    case 'persona':
      generatePersonaAction();
      break;
  }
};

function generateBaby() {
  const gender = document.getElementById('babyGender').value;
  const origin = document.getElementById('babyOrigin').value || null;
  const letter = document.getElementById('babyLetter').value || null;
  const syllables = document.getElementById('babySyllables').value
    ? parseInt(document.getElementById('babySyllables').value) : null;
  const surname = document.getElementById('babySurname').value.trim() || null;

  const results = generateBabyNames({
    gender, origin, startLetter: letter, syllables, compatibleWith: surname, count: 8,
  });

  if (results.length === 0) return;

  state.lastGeneratedData = results;
  showBasicResults(results, 'baby');
}

function generateCompany() {
  const niche = document.getElementById('companyNiche').value;
  const style = document.getElementById('companyStyle').value || null;

  const results = generateCompanyNames({ niche, style, count: 8 });

  state.lastGeneratedData = results;
  showBasicResults(results, 'company');
}

function generateRPG() {
  const style = document.getElementById('rpgStyle').value;
  const gender = document.getElementById('rpgGender').value;

  const results = generateRPGNames({ style, gender, count: 8 });

  state.lastGeneratedData = results;
  showBasicResults(results, 'rpg');
}

function generatePersonaAction() {
  const gender = document.getElementById('personaGender').value;
  const ageGroup = document.getElementById('personaAge').value;

  const persona = generatePersona({ gender, ageGroup });

  state.lastGeneratedData = persona;
  showPersonaResult(persona);
}

// ===== Display Results =====
function showBasicResults(results, type) {
  const box = document.getElementById('resultBox');
  const container = document.getElementById('basicResultContainer');
  const personaContainer = document.getElementById('personaCardContainer');

  personaContainer.classList.add('hidden');
  container.classList.remove('hidden');

  const list = Array.isArray(results) ? results : [results];

  container.innerHTML = `
    <div class="w-full space-y-4">
      <div class="flex items-center gap-2 justify-center mb-2">
        <span class="pulse-dot available"></span>
        <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">${list.length} nomes gerados</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${list.map((item, idx) => {
          const name = item.fullName || item.name || item.firstName || '';
          const meaning = item.meaning?.meaning || item.slogan || '';
          const origin = item.meaning?.origin || item.niche || item.style || '';
          const syllables = item.syllables || '';
          const compat = item.compatibility !== undefined ? item.compatibility : null;

          return `
            <div class="result-card bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all ${idx === 0 ? 'md:col-span-2 ring-2 ring-blue-500/20' : ''}">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white truncate ${idx === 0 ? 'text-2xl md:text-3xl' : ''}">${name}</h3>
                  ${meaning ? `<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${meaning}</p>` : ''}
                  <div class="flex flex-wrap gap-1.5 mt-2">
                    ${origin ? `<span class="result-badge badge-origin">${origin}</span>` : ''}
                    ${syllables ? `<span class="result-badge badge-syllables">${syllables} sílabas</span>` : ''}
                    ${compat !== null ? `<span class="result-badge ${compat >= 70 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : compat >= 40 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}">${compat}% compatível</span>` : ''}
                  </div>
                </div>
                <div class="flex gap-1 flex-shrink-0">
                  <button onclick="window.toggleFavName('${name.replace(/'/g, "\\'")}')" class="fav-btn ${isFavorite(name) ? 'active' : ''}" title="Favoritar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="${isFavorite(name) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  <button onclick="window.copyText('${name.replace(/'/g, "\\'")}')" class="p-1.5 text-slate-400 hover:text-blue-500 transition-colors" title="Copiar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      ${type === 'baby' ? `
        <div class="flex justify-center mt-4">
          <button onclick="window.toggleFavName('${list[0]?.fullName || list[0]?.name || ''}')" class="btn btn-sm btn-ghost">
            ❤️ Favoritar "${list[0]?.fullName || list[0]?.name || ''}"
          </button>
          <button onclick="showPage('checker')" class="btn btn-sm btn-ghost ml-2">
            🔍 Verificar disponibilidade
          </button>
        </div>
      ` : ''}
    </div>
  `;

  // Add to history
  list.slice(0, 3).forEach(item => {
    addToHistory({ name: item.fullName || item.name || item.firstName || '', type });
  });
  renderHistory();

  box.classList.remove('hidden');
  box.style.display = 'flex';
  box.classList.remove('fade-in');
  void box.offsetWidth;
  box.classList.add('fade-in');
}

function showPersonaResult(p) {
  const box = document.getElementById('resultBox');
  const container = document.getElementById('basicResultContainer');
  const personaContainer = document.getElementById('personaCardContainer');

  container.classList.add('hidden');
  personaContainer.classList.remove('hidden');

  const initial = p.name.charAt(0).toUpperCase();

  personaContainer.innerHTML = `
    <div class="w-full bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-900/50 rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-amber-500 text-white text-xs font-bold text-center py-2 px-4 uppercase tracking-wider">
        ⚠️ DADOS GERADOS ALEATORIAMENTE. SEM VALIDADE LEGAL.
      </div>
      <div class="p-6 relative">
        <button onclick="window.copyPersona()" class="absolute top-8 right-6 p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full hover:bg-blue-200 hover:scale-105 transition-all text-blue-600 dark:text-blue-400" title="Copiar Ficha">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>

        <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 border-b border-slate-100 dark:border-slate-700 pb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg flex-shrink-0">${initial}</div>
          <div class="text-center md:text-left">
            <h3 class="text-2xl font-black text-slate-900 dark:text-white">${p.name}</h3>
            <p class="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">${p.profession}</p>
            <p class="text-slate-500 dark:text-slate-400 text-xs mt-1">${p.address}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">📋 Dados Pessoais</h4>
            <div class="grid grid-cols-2 gap-2">
              ${renderField('CPF', p.cpf, 'font-mono text-blue-600')}
              ${renderField('RG', p.rg, 'font-mono')}
              ${renderField('Nascimento', p.birth)}
              ${renderField('Idade', p.age)}
              ${renderField('Mãe', p.mother)}
            </div>
          </div>
          <div class="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-teal-600 dark:text-teal-400 text-xs uppercase tracking-wider">📞 Contato</h4>
            <div class="grid grid-cols-2 gap-2">
              ${renderField('Celular', p.phone, 'font-mono')}
              ${renderField('Email', p.email, 'text-blue-500 text-xs break-all')}
              ${renderField('Usuário', p.user, 'font-mono text-xs')}
              ${renderField('Senha', p.pass, 'font-mono text-xs')}
            </div>
          </div>
          <div class="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-wider">💳 Financeiro</h4>
            <div class="grid grid-cols-2 gap-2">
              ${renderField('Cartão', `${p.cardFlag} ${p.cardNumber}`, 'font-mono')}
              ${renderField('Validade', p.cardExp, 'font-mono')}
              ${renderField('CVV', p.cardCvv, 'font-mono')}
              ${renderField('Empresa', p.company)}
              ${renderField('Renda', p.salary, 'text-emerald-600 font-bold')}
            </div>
          </div>
          <div class="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-purple-600 dark:text-purple-400 text-xs uppercase tracking-wider">🧬 Físico & Misc</h4>
            <div class="grid grid-cols-2 gap-2">
              ${renderField('Altura', p.height)}
              ${renderField('Peso', p.weight)}
              ${renderField('Sangue', p.blood, 'text-red-500 font-bold')}
              ${renderField('Signo', p.zodiac)}
              ${renderField('Cor', p.color)}
              ${renderField('Placa', p.plate, 'font-mono')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Store for copy
  state.lastPersona = p;

  addToHistory({ name: p.name, type: 'persona', extra: p.profession });
  renderHistory();

  box.classList.remove('hidden');
  box.style.display = 'flex';
  box.classList.remove('fade-in');
  void box.offsetWidth;
  box.classList.add('fade-in');
}

function renderField(label, value, extraClass = '') {
  return `
    <div class="${label === 'Email' ? 'col-span-2' : ''}">
      <span class="text-slate-400 dark:text-slate-500 font-bold uppercase text-[9px] tracking-wider block">${label}</span>
      <span class="text-slate-800 dark:text-slate-200 font-medium ${extraClass}">${value || '-'}</span>
    </div>
  `;
}

function hideResult() {
  const box = document.getElementById('resultBox');
  box.classList.add('hidden');
  box.style.display = 'none';
}

// ===== Clipboard =====
window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => showToast('📋 Copiado!')).catch(() => {});
};

window.copyPersona = function() {
  const p = state.lastPersona;
  if (!p) return;

  const text = `[ DADOS PESSOAIS ]
Nome: ${p.name}
Mãe: ${p.mother}
CPF: ${p.cpf}
RG: ${p.rg}
Nascimento: ${p.birth} (${p.age})
Certidão: ${p.cert}

[ CONTATO ]
Endereço: ${p.address}
Celular: ${p.phone}
Email: ${p.email}
Usuário: ${p.user}
Senha: ${p.pass}

[ PROFISSIONAL & FINANCEIRO ]
Profissão: ${p.profession}
Empresa: ${p.company}
Renda: ${p.salary}
Cartão: ${p.cardFlag} ${p.cardNumber}
Validade: ${p.cardExp} | CVV: ${p.cardCvv}

[ FÍSICO ]
Altura: ${p.height} | Peso: ${p.weight}
Sangue: ${p.blood} | Signo: ${p.zodiac}
Cor: ${p.color} | Placa: ${p.plate}

* Gerado via Nomatize (Dados 100% Fictícios) *`;

  navigator.clipboard.writeText(text).then(() => showToast('📋 Ficha da Persona Copiada!'));
};

// ===== Favorites =====
window.toggleFavName = function(name) {
  const nowFav = toggleFav(name, state.currentTab);
  showToast(nowFav ? `❤️ "${name}" favoritado!` : `💔 "${name}" removido dos favoritos`);
  updateFavCount();

  // Re-render current results to update heart icons
  if (state.lastGeneratedData) {
    if (state.currentTab === 'persona') {
      showPersonaResult(state.lastGeneratedData);
    } else {
      showBasicResults(state.lastGeneratedData, state.currentTab);
    }
  }
};

function updateFavCount() {
  const count = getFavoriteCount();
  const badge = document.getElementById('favCount');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }
}

function initFavorites() {
  // Re-render when favorites page is shown
}

function renderFavoritesPage() {
  const container = document.getElementById('favoritesList');
  const empty = document.getElementById('favoritesEmpty');
  const favorites = getFavorites();

  if (favorites.length === 0) {
    container.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  container.innerHTML = favorites.map((fav, idx) => `
    <div class="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
      <div>
        <h4 class="font-bold text-slate-900 dark:text-white">${fav.name}</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          ${fav.type === 'baby' ? '👶' : fav.type === 'company' ? '🏢' : fav.type === 'rpg' ? '🐉' : '👤'} ${fav.type}
          · ${new Date(fav.date).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <div class="flex gap-2">
        <button onclick="window.copyText('${fav.name.replace(/'/g, "\\'")}')" class="btn btn-sm btn-ghost">📋</button>
        <button onclick="window.removeFav('${fav.name.replace(/'/g, "\\'")}')" class="btn btn-sm btn-danger">✕</button>
      </div>
    </div>
  `).join('');
}

window.removeFav = function(name) {
  removeFavorite(name);
  updateFavCount();
  renderFavoritesPage();
  showToast(`💔 "${name}" removido`);
};

// ===== History =====
function renderHistory() {
  const container = document.getElementById('historyContainer');
  const history = getHistory();

  if (history.length === 0) {
    container.innerHTML = '<p class="text-slate-500 dark:text-slate-400 text-sm italic">O histórico aparecerá aqui...</p>';
    return;
  }

  container.innerHTML = history.slice(0, 8).map(item => `
    <button onclick="window.copyText('${item.name.replace(/'/g, "\\'")}')" class="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-500 transition-all whitespace-nowrap">
      ${item.extra ? `${item.name} (${item.extra})` : item.name}
    </button>
  `).join('');
}

// ===== Quiz =====
function initQuiz() {
  renderQuizQuestion(0);
}

function renderQuizQuestion(step) {
  const container = document.getElementById('quizContent');
  const q = Questions[step];
  if (!q) return;

  container.innerHTML = `
    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">${q.question}</h3>
    <div class="space-y-3">
      ${q.options.map((opt, idx) => `
        <div class="quiz-option ${state.quizAnswers[step]?.value === opt.value ? 'selected' : ''}"
             onclick="selectQuizOption(${step}, '${opt.value}', this)">
          ${opt.label}
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('quizProgress').style.width = `${((step + 1) / Questions.length) * 100}%`;
  document.getElementById('quizStep').textContent = `${step + 1}/${Questions.length}`;
  document.getElementById('quizPrevBtn').classList.toggle('hidden', step === 0);
  document.getElementById('quizNextBtn').textContent = step === Questions.length - 1 ? '🎯 Descobrir!' : 'Continuar →';
}

window.selectQuizOption = function(step, value, el) {
  state.quizAnswers[step] = { questionId: Questions[step].id, value };
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
};

window.quizNext = function() {
  if (!state.quizAnswers[state.quizStep]) {
    showToast('⚠️ Selecione uma opção antes de continuar');
    return;
  }

  if (state.quizStep === Questions.length - 1) {
    finishQuiz();
    return;
  }

  state.quizStep++;
  renderQuizQuestion(state.quizStep);
};

window.quizPrev = function() {
  if (state.quizStep > 0) {
    state.quizStep--;
    renderQuizQuestion(state.quizStep);
  }
};

function finishQuiz() {
  const result = processQuizAnswers(state.quizAnswers);

  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');
  document.getElementById('quizResultName').textContent = result.name;
  document.getElementById('quizResultReason').textContent = result.reason;
}

window.resetQuiz = function() {
  state.quizAnswers = [];
  state.quizStep = 0;
  document.getElementById('quizContainer').classList.remove('hidden');
  document.getElementById('quizResult').classList.add('hidden');
  renderQuizQuestion(0);
};

// ===== Trending =====
function initTrending() {
  // Chart will be initialized when page is shown
}

function initTrendingChart() {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;

  // Destroy old chart
  if (state.trendChart) {
    state.trendChart.destroy();
  }

  const names = Object.keys(getChartData('', state.currentTrend)?.datasets || {}).length > 0
    ? Object.keys(getRisingNames(state.currentTrend, 8).reduce((acc, n) => { acc[n.name] = true; return acc; }, {}))
    : ['Miguel', 'Arthur', 'Heitor', 'Davi', 'Bernardo', 'Theo', 'Gael', 'Noah'];

  const chartData = getChartData(names, state.currentTrend);
  if (!chartData) return;

  const ctx = canvas.getContext('2d');
  state.trendChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b', font: { size: 11 } },
        },
      },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' }, beginAtZero: false },
      },
    },
  });

  // Render top lists
  renderTrendLists(state.currentTrend);
}

window.switchTrendView = function(gender) {
  state.currentTrend = gender;

  document.querySelectorAll('.trend-toggle').forEach(btn => {
    btn.classList.remove('bg-blue-100', 'dark:bg-blue-900/30', 'text-blue-600', 'dark:text-blue-400');
    btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-500', 'dark:text-slate-400');
  });

  // Find and activate clicked button
  document.querySelectorAll('.trend-toggle').forEach(btn => {
    if (btn.textContent.toLowerCase().includes(gender === 'masculino' ? 'masculinos' : 'femininos')) {
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-500', 'dark:text-slate-400');
      btn.classList.add('bg-blue-100', 'dark:bg-blue-900/30', 'text-blue-600', 'dark:text-blue-400');
    }
  });

  initTrendingChart();
};

function renderTrendLists(gender) {
  const rising = getRisingNames(gender, 5);
  const falling = getFallingNames(gender, 3);

  const upContainer = document.getElementById('trendingUp');
  const downContainer = document.getElementById('trendingDown');

  upContainer.innerHTML = rising.map((n, i) => `
    <div class="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
      <span class="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">${i + 1}</span>
      <span class="flex-1 font-medium text-sm text-slate-800 dark:text-slate-200">${n.name}</span>
      <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">+${n.growth}</span>
    </div>
  `).join('');

  downContainer.innerHTML = falling.map((n, i) => `
    <div class="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
      <span class="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">${i + 1}</span>
      <span class="flex-1 font-medium text-sm text-slate-800 dark:text-slate-200">${n.name}</span>
      <span class="text-xs font-bold text-red-600 dark:text-red-400">${n.growth}</span>
    </div>
  `).join('');
}

// ===== Checker =====
function initChecker() {
  document.getElementById('checkBtn')?.addEventListener('click', runChecker);
  document.getElementById('checkInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runChecker();
  });
}

window.runChecker = async function() {
  const input = document.getElementById('checkInput');
  const name = input.value.trim();
  if (!name) { showToast('⚠️ Digite um nome para verificar'); return; }

  const resultsContainer = document.getElementById('checkResults');
  resultsContainer.innerHTML = '<div class="text-center py-8"><div class="skeleton h-8 w-48 mx-auto mb-4"></div><div class="skeleton h-4 w-64 mx-auto"></div></div>';
  resultsContainer.classList.remove('hidden');

  try {
    const results = await checkAvailability(name);

    resultsContainer.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center gap-2 mb-4">
          <h3 class="font-bold text-slate-800 dark:text-slate-200">Resultados para "${name}"</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${results.map(r => `
            <div class="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div class="flex items-center gap-3">
                <span class="text-lg">${r.icon}</span>
                <div>
                  <p class="font-medium text-sm text-slate-800 dark:text-slate-200">${r.platform}</p>
                  <p class="text-xs text-slate-400">${r.url}</p>
                </div>
              </div>
              <span class="flex items-center gap-1.5 text-sm font-bold ${r.available ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}">
                <span class="pulse-dot ${r.available ? 'available' : 'unavailable'}"></span>
                ${r.available ? 'Disponível' : 'Indisponível'}
              </span>
            </div>
          `).join('')}
        </div>
        <p class="text-xs text-slate-400 text-center mt-4">* Verificação simulada. Para resultados reais, consulte cada plataforma diretamente.</p>
      </div>
    `;
  } catch (err) {
    resultsContainer.innerHTML = '<p class="text-red-500 text-center">Erro ao verificar disponibilidade.</p>';
  }
};

// ===== Search =====
function initSearch() {
  document.getElementById('globalSearch')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchName();
  });
}

window.searchName = function() {
  const input = document.getElementById('globalSearch');
  const name = input.value.trim();
  if (!name) return;

  const details = getNameDetails(name);
  showSearchResult(details);
};

window.quickSearch = function(name) {
  const input = document.getElementById('globalSearch');
  if (input) input.value = name;
  searchName();
};

function showSearchResult(details) {
  // Switch to home page and show result
  showPage('home');

  const box = document.getElementById('resultBox');
  const container = document.getElementById('basicResultContainer');
  const personaContainer = document.getElementById('personaCardContainer');

  personaContainer.classList.add('hidden');
  container.classList.remove('hidden');

  container.innerHTML = `
    <div class="w-full text-center">
      <span class="pulse-dot available"></span>
      <span class="text-sm text-slate-500 dark:text-slate-400 font-medium ml-2">Significado do Nome</span>
      <h3 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-4">${details.name}</h3>
      <p class="text-lg text-slate-600 dark:text-slate-300 mt-2 font-medium">${details.meaning}</p>
      <div class="flex flex-wrap justify-center gap-2 mt-3">
        <span class="result-badge badge-origin">${details.origin}</span>
        ${details.trend ? `<span class="result-badge ${details.trend === 'rising' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : details.trend === 'stable' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}">${details.trend === 'rising' ? '📈 Em alta' : details.trend === 'stable' ? '📊 Estável' : '📚 Clássico'}</span>` : ''}
      </div>
      <p class="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-4 text-sm leading-relaxed">${details.description}</p>
      ${details.famous && details.famous.length > 0 ? `
        <div class="mt-4">
          <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Personalidades Famosas</p>
          <div class="flex flex-wrap justify-center gap-2">
            ${details.famous.map(f => `<span class="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">${f}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      <div class="flex justify-center gap-3 mt-6">
        <button onclick="window.toggleFavName('${details.name.replace(/'/g, "\\'")}')" class="btn btn-sm ${isFavorite(details.name) ? 'btn-danger' : 'btn-ghost'}">
          ${isFavorite(details.name) ? '❤️ Favoritado' : '🤍 Favoritar'}
        </button>
        <button onclick="showPage('checker')" class="btn btn-sm btn-ghost">🔍 Verificar disponibilidade</button>
      </div>
    </div>
  `;

  box.classList.remove('hidden');
  box.style.display = 'flex';
}

// ===== Articles =====
window.showArticle = function(articleId) {
  showPage('home');
  showToast('📝 Conteúdo em desenvolvimento');
  return false;
};

// ===== Toast =====
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}
