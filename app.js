// State
let currentFilter = 'all';
let allPalpites = [];

const MATCH_DATA = {
  "brasil-japao": { 
    a: "Brasil", b: "Japão", flagA: "🇧🇷", flagB: "🇯🇵", 
    flagImgA: "bandeira-do-brasil.png", flagImgB: "bandeira-do-japao.png", 
    label: "🇧🇷 Brasil vs 🇯🇵 Japão (29/06 - 13h Cuiabá / 14h Brasília)", 
    timeText: "29/06 às 13h00 (Cuiabá) / 14h00 (Brasília) - NRG Stadium",
    deadline: "2026-06-29T17:00:00Z" 
  },
  "alemanha-paraguai": { 
    a: "Alemanha", b: "Paraguai", flagA: "🇩🇪", flagB: "🇵🇾", 
    flagImgA: "https://static.significados.com.br/flags/de.svg", flagImgB: "https://static.significados.com.br/flags/py.svg", 
    label: "🇩🇪 Alemanha vs 🇵🇾 Paraguai (29/06 - 16h30 Cuiabá / 17h30 Brasília)", 
    timeText: "29/06 às 16h30 (Cuiabá) / 17h30 (Brasília) - Gillette Stadium",
    deadline: "2026-06-29T20:30:00Z" 
  },
  "holanda-marrocos": { 
    a: "Holanda", b: "Marrocos", flagA: "🇳🇱", flagB: "🇲🇦", 
    flagImgA: "https://static.significados.com.br/flags/nl.svg", flagImgB: "https://static.significados.com.br/flags/ma.svg", 
    label: "🇳🇱 Holanda vs 🇲🇦 Marrocos (29/06 - 21h Cuiabá / 22h Brasília)", 
    timeText: "29/06 às 21h00 (Cuiabá) / 22h00 (Brasília) - Estádio BBVA",
    deadline: "2026-06-30T01:00:00Z" 
  },
  "costa-noruega": { 
    a: "Costa do Marfim", b: "Noruega", flagA: "🇨🇮", flagB: "🇳🇴", 
    flagImgA: "https://static.significados.com.br/flags/ci.svg", flagImgB: "https://static.significados.com.br/flags/no.svg", 
    label: "🇨🇮 Costa do Marfim vs 🇳🇴 Noruega (30/06 - 13h Cuiabá / 14h Brasília)", 
    timeText: "30/06 às 13h00 (Cuiabá) / 14h00 (Brasília) - AT&T Stadium",
    deadline: "2026-06-30T17:00:00Z" 
  },
  "franca-suecia": { 
    a: "França", b: "Suécia", flagA: "🇫🇷", flagB: "🇸🇪", 
    flagImgA: "https://static.significados.com.br/flags/fr.svg", flagImgB: "https://static.significados.com.br/flags/se.svg", 
    label: "🇫🇷 França vs 🇸🇪 Suécia (30/06 - 17h Cuiabá / 18h Brasília)", 
    timeText: "30/06 às 17h00 (Cuiabá) / 18h00 (Brasília) - MetLife Stadium",
    deadline: "2026-06-30T21:00:00Z" 
  },
  "mexico-equador": { 
    a: "México", b: "Equador", flagA: "🇲🇽", flagB: "🇪🇨", 
    flagImgA: "https://static.significados.com.br/flags/mx.svg", flagImgB: "https://static.significados.com.br/flags/ec.svg", 
    label: "🇲🇽 México vs 🇪🇨 Equador (30/06 - 21h Cuiabá / 22h Brasília)", 
    timeText: "30/06 às 21h00 (Cuiabá) / 22h00 (Brasília) - Estádio Azteca",
    deadline: "2026-07-01T01:00:00Z" 
  },
  "inglaterra-rdcongo": { 
    a: "Inglaterra", b: "RD Congo", flagA: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flagB: "🇨🇩", 
    flagImgA: "https://static.significados.com.br/flags/gb.svg", flagImgB: "https://static.significados.com.br/flags/cd.svg", 
    label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra vs 🇨🇩 RD Congo (01/07 - 12h Cuiabá / 13h Brasília)", 
    timeText: "01/07 às 12h00 (Cuiabá) / 13h00 (Brasília) - Mercedes-Benz Stadium",
    deadline: "2026-07-01T16:00:00Z" 
  },
  "belgica-senegal": { 
    a: "Bélgica", b: "Senegal", flagA: "🇧🇪", flagB: "🇸🇳", 
    flagImgA: "https://static.significados.com.br/flags/be.svg", flagImgB: "https://static.significados.com.br/flags/sn.svg", 
    label: "🇧🇪 Bélgica vs 🇸🇳 Senegal (01/07 - 16h Cuiabá / 17h Brasília)", 
    timeText: "01/07 às 16h00 (Cuiabá) / 17h00 (Brasília) - Lumen Field",
    deadline: "2026-07-01T20:00:00Z" 
  },
  "eua-bosnia": { 
    a: "Estados Unidos", b: "Bósnia", flagA: "🇺🇸", flagB: "🇧🇦", 
    flagImgA: "https://static.significados.com.br/flags/us.svg", flagImgB: "https://static.significados.com.br/flags/ba.svg", 
    label: "🇺🇸 Estados Unidos vs 🇧🇦 Bósnia (01/07 - 20h Cuiabá / 21h Brasília)", 
    timeText: "01/07 às 20h00 (Cuiabá) / 21h00 (Brasília) - Levi's Stadium",
    deadline: "2026-07-02T00:00:00Z" 
  },
  "espanha-austria": { 
    a: "Espanha", b: "Áustria", flagA: "🇪🇸", flagB: "🇦🇹", 
    flagImgA: "https://static.significados.com.br/flags/es.svg", flagImgB: "https://static.significados.com.br/flags/at.svg", 
    label: "🇪🇸 Espanha vs 🇦🇹 Áustria (02/07 - 15h Cuiabá / 16h Brasília)", 
    timeText: "02/07 às 15h00 (Cuiabá) / 16h00 (Brasília) - SoFi Stadium",
    deadline: "2026-07-02T19:00:00Z" 
  },
  "portugal-croacia": { 
    a: "Portugal", b: "Croácia", flagA: "🇵🇹", flagB: "🇭🇷", 
    flagImgA: "https://static.significados.com.br/flags/pt.svg", flagImgB: "https://static.significados.com.br/flags/hr.svg", 
    label: "🇵🇹 Portugal vs 🇭🇷 Croácia (02/07 - 19h Cuiabá / 20h Brasília)", 
    timeText: "02/07 às 19h00 (Cuiabá) / 20h00 (Brasília) - BMO Field",
    deadline: "2026-07-02T23:00:00Z" 
  },
  "suica-argelia": { 
    a: "Suíça", b: "Argélia", flagA: "🇨🇭", flagB: "🇩🇿", 
    flagImgA: "https://static.significados.com.br/flags/ch.svg", flagImgB: "https://static.significados.com.br/flags/dz.svg", 
    label: "🇨🇭 Suíça vs 🇩🇿 Argélia (02/07 23h Cuiabá / 03/07 00h Brasília)", 
    timeText: "02/07 às 23h00 (Cuiabá) / 03/07 às 00h00 (Brasília) - BC Place",
    deadline: "2026-07-03T03:00:00Z" 
  },
  "australia-egito": { 
    a: "Austrália", b: "Egito", flagA: "🇦🇺", flagB: "🇪🇬", 
    flagImgA: "https://static.significados.com.br/flags/au.svg", flagImgB: "https://static.significados.com.br/flags/eg.svg", 
    label: "🇦🇺 Austrália vs 🇪🇬 Egito (03/07 - 14h Cuiabá / 15h Brasília)", 
    timeText: "03/07 às 14h00 (Cuiabá) / 15h00 (Brasília) - AT&T Stadium",
    deadline: "2026-07-03T18:00:00Z" 
  },
  "argentina-caboverde": { 
    a: "Argentina", b: "Cabo Verde", flagA: "🇦🇷", flagB: "🇨🇻", 
    flagImgA: "https://static.significados.com.br/flags/ar.svg", flagImgB: "https://static.significados.com.br/flags/cv.svg", 
    label: "🇦🇷 Argentina vs 🇨🇻 Cabo Verde (03/07 - 18h Cuiabá / 19h Brasília)", 
    timeText: "03/07 às 18h00 (Cuiabá) / 19h00 (Brasília) - Hard Rock Stadium",
    deadline: "2026-07-03T22:00:00Z" 
  },
  "colombia-gana": { 
    a: "Colômbia", b: "Gana", flagA: "🇨🇴", flagB: "🇬🇭", 
    flagImgA: "https://static.significados.com.br/flags/co.svg", flagImgB: "https://static.significados.com.br/flags/gh.svg", 
    label: "🇨🇴 Colômbia vs 🇬🇭 Gana (03/07 - 21h30 Cuiabá / 22h30 Brasília)", 
    timeText: "03/07 às 21h30 (Cuiabá) / 22h30 (Brasília) - Arrowhead Stadium",
    deadline: "2026-07-04T01:30:00Z" 
  }
};

const TEAM_PLAYERS = {
  "Brasil": [
    "Vini Jr.", "Matheus Cunha", "Rayan", "Lucas Paquetá", 
    "Bruno Guimarães", "Casemiro", "Douglas Santos", 
    "Gabriel Magalhães", "Marquinhos", "Danilo", "Alisson", 
    "Rodrygo (Reserva)", "Endrick (Reserva)"
  ],
  "Japão": [
    "Ayase Ueda", "Daichi Kamada", "Junya Ito", "Keito Nakamura", 
    "Kaishu Sano", "Ao Tanaka", "Ritsu Doan", "Shogo Taniguchi", 
    "Tomiyasu", "Itakura", "Hiroki Ito", "Zion Suzuki", 
    "Takefusa Kubo (Desfalque/Lesionado)"
  ],
  "Alemanha": ["Jamal Musiala", "Florian Wirtz", "Kai Havertz", "Leroy Sané", "Joshua Kimmich", "Manuel Neuer"],
  "Paraguai": ["Miguel Almirón", "Julio Enciso", "Gustavo Gómez", "Antonio Sanabria", "Ángel Romero"],
  "Holanda": ["Cody Gakpo", "Xavi Simons", "Memphis Depay", "Virgil van Dijk", "Denzel Dumfries"],
  "Marrocos": ["Achraf Hakimi", "Hakim Ziyech", "Youssef En-Nesyri", "Brahim Díaz", "Sofyan Amrabat"],
  "Costa do Marfim": ["Sébastien Haller", "Franck Kessié", "Simon Adingra", "Nicolas Pépé", "Seko Fofana"],
  "Noruega": ["Erling Haaland", "Martin Ødegaard", "Alexander Sørloth", "Oscar Bobb", "Sander Berge"],
  "França": ["Kylian Mbappé", "Antoine Griezmann", "Ousmane Dembélé", "Marcus Thuram", "William Saliba"],
  "Suécia": ["Alexander Isak", "Viktor Gyökeres", "Dejan Kulusevski", "Anthony Elanga", "Victor Lindelöf"],
  "México": ["Santiago Giménez", "Hirving Lozano", "Julián Quiñones", "Edson Álvarez", "Guillermo Ochoa"],
  "Equador": ["Enner Valencia", "Moisés Caicedo", "Kendry Páez", "Jeremy Sarmiento", "Piero Hincapié"],
  "Inglaterra": ["Harry Kane", "Jude Bellingham", "Bukayo Saka", "Phil Foden", "Cole Palmer"],
  "RD Congo": ["Cédric Bakambu", "Yoane Wissa", "Théo Bongonda", "Chancel Mbemba", "Arthur Masuaku"],
  "Bélgica": ["Romelu Lukaku", "Kevin De Bruyne", "Jeremy Doku", "Leandro Trossard", "Amadou Onana"],
  "Senegal": ["Sadio Mané", "Nicolas Jackson", "Ismaïla Sarr", "Kalidou Koulibaly", "Édouard Mendy"],
  "Estados Unidos": ["Christian Pulisic", "Timothy Weah", "Folarin Balogun", "Giovanni Reyna", "Weston McKennie"],
  "Bósnia": ["Edin Džeko", "Ermedin Demirović", "Miralem Pjanić", "Sead Kolašinac", "Rade Krunić"],
  "Espanha": ["Lamine Yamal", "Nico Williams", "Álvaro Morata", "Dani Olmo", "Rodri", "Pedri"],
  "Áustria": ["Marcel Sabitzer", "Christoph Baumgartner", "Marko Arnautović", "Konrad Laimer", "David Alaba"],
  "Portugal": ["Cristiano Ronaldo", "Bruno Fernandes", "Bernardo Silva", "Rafael Leão", "Vitinha"],
  "Croácia": ["Luka Modrić", "Andrej Kramarić", "Lovro Majer", "Joško Gvardiol", "Mateo Kovačić"],
  "Suíça": ["Breel Embolo", "Xherdan Shaqiri", "Granit Xhaka", "Ruben Vargas", "Manuel Akanji"],
  "Argélia": ["Riyad Mahrez", "Saïd Benrahma", "Houssem Aouar", "Islam Slimani", "Ramy Bensebaini"],
  "Austrália": ["Mitchell Duke", "Craig Goodwin", "Jackson Irvine", "Harry Souttar", "Mathew Ryan"],
  "Egito": ["Mohamed Salah", "Omar Marmoush", "Trézéguet", "Mostafa Mohamed", "Mohamed Elneny"],
  "Argentina": ["Lionel Messi", "Julián Álvarez", "Lautaro Martínez", "Ángel Di María", "Alexis Mac Allister"],
  "Cabo Verde": ["Bebé", "Ryan Mendes", "Garry Rodrigues", "Jovane Cabral", "Vozinha"],
  "Colômbia": ["Luis Díaz", "James Rodríguez", "Jhon Córdoba", "Jhon Arias", "Davinson Sánchez"],
  "Gana": ["Mohammed Kudus", "Iñaki Williams", "Jordan Ayew", "Antoine Semenyo", "Thomas Partey"]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initUser();
  initMatchSelector();
  initTimer();
  fetchPalpites();
  setupEventListeners();
});

function initUser() {
  const savedName = localStorage.getItem('fifa_user_name');
  if (savedName) {
    const input = document.getElementById('user-name-input');
    input.value = savedName;
    showStatusMsg(`Olá novamente, craque <strong>${savedName}</strong>! Pronto para palpitar?`);
  }
}

function showStatusMsg(msg) {
  const box = document.getElementById('user-status-msg');
  box.innerHTML = msg;
  box.classList.remove('hidden');
}

function initMatchSelector() {
  const selector = document.getElementById('match-selector');
  if (!selector) return;
  selector.innerHTML = '';

  Object.keys(MATCH_DATA).forEach(key => {
    const m = MATCH_DATA[key];
    const opt = document.createElement('option');
    opt.value = key;
    opt.setAttribute('data-label', m.label);
    opt.textContent = `${m.label} [Limite: 2 palpites]`;
    selector.appendChild(opt);
  });

  const filterContainer = document.querySelector('.feed-filters');
  if (filterContainer) {
    filterContainer.innerHTML = `
      <button class="filter-btn active" data-filter="all">
        <div style="display: flex; flex-direction: column; align-items: center; line-height: 1.2;">
          <div style="font-size: 1.1rem; margin-bottom: 4px;">🌟</div>
          <span style="font-size: 0.8rem; font-weight: 700;">Todos</span>
        </div>
      </button>
    `;
    
    // Apenas jogos de hoje / mais próximos (29/06) nos botões para não poluir a tela
    const todaysMatches = ['brasil-japao', 'alemanha-paraguai', 'holanda-marrocos'];
    todaysMatches.forEach(key => {
      const m = MATCH_DATA[key];
      if (!m) return;
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.setAttribute('data-filter', key);
      const flagA = m.flagImgA ? `<img src="${m.flagImgA}" style="height:15px; width:22px; object-fit:cover; border-radius:2px;" alt="${m.a}">` : m.flagA;
      const flagB = m.flagImgB ? `<img src="${m.flagImgB}" style="height:15px; width:22px; object-fit:cover; border-radius:2px;" alt="${m.b}">` : m.flagB;
      btn.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; line-height: 1.2;">
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 4px;">
            ${flagA}
            <span style="font-size:0.7rem; color:rgba(255,255,255,0.6);">X</span>
            ${flagB}
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; white-space: nowrap;">${m.a} x ${m.b}</span>
        </div>
      `;
      filterContainer.appendChild(btn);
    });

    // Dropdown compacto para os outros jogos da rodada (botão seta emoji)
    const selectWrap = document.createElement('div');
    selectWrap.style.display = 'inline-flex';
    selectWrap.style.alignItems = 'center';
    let selectHtml = `<select class="custom-select filter-dropdown" title="Outras Rodadas" style="padding: 8px 12px; font-size: 1rem; width: auto; max-width: 160px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; border-radius: 30px; background: rgba(3,18,43,0.8); border: 1px solid var(--accent-lime); color: #FFF; cursor: pointer; text-align: center;">`;
    selectHtml += `<option value="">➡️</option>`;
    
    Object.keys(MATCH_DATA).forEach(key => {
      if (!todaysMatches.includes(key)) {
        const m = MATCH_DATA[key];
        const shortTime = m.timeText.split(' (')[0];
        selectHtml += `<option value="${key}">${m.a} x ${m.b} (${shortTime})</option>`;
      }
    });
    selectHtml += `</select>`;
    selectWrap.innerHTML = selectHtml;
    filterContainer.appendChild(selectWrap);

    const filterBtns = filterContainer.querySelectorAll('.filter-btn');
    const filterSelect = filterContainer.querySelector('.filter-dropdown');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (filterSelect) filterSelect.value = "";
        currentFilter = btn.getAttribute('data-filter');
        renderFeed();
      });
    });

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
          filterBtns.forEach(b => b.classList.remove('active'));
          currentFilter = val;
          renderFeed();
        }
      });
    }
  }

  selector.addEventListener('change', (e) => {
    updateMatchDisplay(e.target.value);
  });
  updateMatchDisplay(selector.value);
}

function updateMatchDisplay(matchId) {
  const data = MATCH_DATA[matchId] || { a: "Time A", b: "Time B", flagA: "⚽", flagB: "⚽" };
  
  if (data.flagImgA) {
    document.getElementById('flag-a').innerHTML = `<img src="${data.flagImgA}" class="flag-img" alt="${data.a}">`;
    document.getElementById('score-flag-a').innerHTML = `<img src="${data.flagImgA}" class="flag-img" alt="${data.a}">`;
  } else {
    document.getElementById('flag-a').textContent = data.flagA;
    document.getElementById('score-flag-a').textContent = data.flagA;
  }
  document.getElementById('name-a').textContent = data.a;
  document.getElementById('label-score-a').textContent = data.a;
  
  if (data.flagImgB) {
    document.getElementById('flag-b').innerHTML = `<img src="${data.flagImgB}" class="flag-img" alt="${data.b}">`;
    document.getElementById('score-flag-b').innerHTML = `<img src="${data.flagImgB}" class="flag-img" alt="${data.b}">`;
  } else {
    document.getElementById('flag-b').textContent = data.flagB;
    document.getElementById('score-flag-b').textContent = data.flagB;
  }
  document.getElementById('name-b').textContent = data.b;
  document.getElementById('label-score-b').textContent = data.b;

  const alertBox = document.getElementById('rule-alert');
  if (alertBox) {
    alertBox.innerHTML = `⚡ <strong>Regra do Jogo (16-avos):</strong> Limite de <strong>2 palpites por pessoa</strong>! Horário do jogo: <strong>${data.timeText || 'A definir'}</strong> (Envios bloqueados no início da partida).`;
    alertBox.classList.remove('hidden');
  }

  renderDynamicGoals();
}

function renderDynamicGoals() {
  const container = document.getElementById('dynamic-goals-container');
  if (!container) return;
  
  const matchId = document.getElementById('match-selector').value;
  const data = MATCH_DATA[matchId] || { a: "Time A", b: "Time B", flagA: "⚽", flagB: "⚽" };
  const goalsA = parseInt(document.getElementById('score-a-input').value) || 0;
  const goalsB = parseInt(document.getElementById('score-b-input').value) || 0;

  if (goalsA + goalsB === 0) {
    container.innerHTML = `
      <div class="zero-goals-box" style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; text-align: center; border: 1px dashed var(--border-color);">
        ⚖️ <strong>Placar 0 x 0 selecionado:</strong> Partida sem gols previstos!
      </div>
    `;
    return;
  }

  const playersA = TEAM_PLAYERS[data.a] || ["Estrela do Time", "Atacante Principal", "Outro jogador"];
  const playersB = TEAM_PLAYERS[data.b] || ["Estrela do Time", "Atacante Principal", "Outro jogador"];

  let html = `<h3 style="font-size: 1.05rem; margin-bottom: 12px; color: var(--accent-lime);">🎯 Detalhamento dos Gols (${goalsA + goalsB} no total):</h3><div class="dynamic-goals-list">`;

  // Render goals for Team A
  for (let i = 1; i <= goalsA; i++) {
    const flagDisplay = data.flagImgA ? `<img src="${data.flagImgA}" style="height:20px; vertical-align:middle;">` : data.flagA;
    html += `
      <div class="dynamic-goal-row" data-team="${data.a}" style="background: rgba(3,18,43,0.6); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 10px;">
        <div style="font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          ${flagDisplay} <span>${i}º Gol do <strong>${data.a}</strong></span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <select class="custom-select goal-player-select" style="padding: 10px;">
            <option value="">Marcador do gol...</option>
            ${playersA.map(p => `<option value="${p}">${p}</option>`).join('')}
            <option value="Gol Contra / Outro">Gol Contra / Outro</option>
          </select>
          <input type="text" class="goal-time-input" placeholder="Tempo (Ex: 23' 1ºT ou 78' 2ºT)" style="padding: 10px;">
        </div>
      </div>
    `;
  }

  // Render goals for Team B
  for (let i = 1; i <= goalsB; i++) {
    const flagDisplay = data.flagImgB ? `<img src="${data.flagImgB}" style="height:20px; vertical-align:middle;">` : data.flagB;
    html += `
      <div class="dynamic-goal-row" data-team="${data.b}" style="background: rgba(3,18,43,0.6); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 10px;">
        <div style="font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          ${flagDisplay} <span>${i}º Gol do <strong>${data.b}</strong></span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <select class="custom-select goal-player-select" style="padding: 10px;">
            <option value="">Marcador do gol...</option>
            ${playersB.map(p => `<option value="${p}">${p}</option>`).join('')}
            <option value="Gol Contra / Outro">Gol Contra / Outro</option>
          </select>
          <input type="text" class="goal-time-input" placeholder="Tempo (Ex: 14' 1ºT ou 89' 2ºT)" style="padding: 10px;">
        </div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function initTimer() {
  const timerEl = document.getElementById('countdown-timer');
  
  function updateClock() {
    const now = new Date();
    // Target today at 13:00:00
    const target = new Date();
    target.setHours(13, 0, 0, 0);

    const diff = target - now;
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      timerEl.innerHTML = `⏳ Faltam <strong>${hours}h ${mins}m ${secs}s</strong> para o jogão das 13:00!`;
    } else if (diff > -7200000) { // Within 2 hours after 13:00
      timerEl.innerHTML = `🔴 <strong>AO VIVO:</strong> Bola rolando para Brasil x Japão!`;
    } else {
      timerEl.innerHTML = `⚽ Palpites abertos para as próximas rodadas FIFA 2026!`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

const CLOUD_API = "https://firestore.googleapis.com/v1/projects/palpitejogos/databases/(default)/documents/bolao/feed?key=AIzaSyC_mwmLGmcIpfUyRLGRajTd27kYBsZez4c";

function getLocalPalpites() {
  const data = localStorage.getItem('fifa_2026_palpites_db');
  if (data) {
    try { 
      let parsed = JSON.parse(data);
      parsed = parsed.filter(p => !p.name.includes("Ronaldo") && !p.name.includes("Samurai"));
      localStorage.setItem('fifa_2026_palpites_db', JSON.stringify(parsed));
      return parsed; 
    } catch(e) {}
  }
  const sample = [];
  localStorage.setItem('fifa_2026_palpites_db', JSON.stringify(sample));
  return sample;
}

async function saveCloudPalpite(payload) {
  let palpites = getLocalPalpites();
  try {
    const cloudRes = await fetch(CLOUD_API);
    if (cloudRes.ok) {
      let resData = await cloudRes.json();
      let jsonStr = resData && resData.fields && resData.fields.json && resData.fields.json.stringValue;
      if (jsonStr) {
        let list = JSON.parse(jsonStr);
        if (Array.isArray(list)) palpites = list.filter(p => !p.name.includes("Ronaldo") && !p.name.includes("Samurai"));
      }
    }
  } catch(e) {}

  const count = palpites.filter(
    p => p.matchId === payload.matchId && p.name.trim().toLowerCase() === payload.name.trim().toLowerCase()
  ).length;

  if (count >= 2) {
    return { error: `Regra do Jogo: O limite é de no máximo 2 palpites por pessoa para cada jogo! Você já enviou ${count} palpites para esta partida com o nome "${payload.name}".` };
  }

  const entry = {
    id: Date.now(),
    ...payload,
    timestamp: new Date().toISOString()
  };
  palpites.unshift(entry);
  localStorage.setItem('fifa_2026_palpites_db', JSON.stringify(palpites));

  try {
    await fetch(CLOUD_API, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: { json: { stringValue: JSON.stringify(palpites) } } })
    });
  } catch(e) {}

  return { success: true, palpite: entry };
}

async function fetchPalpites() {
  try {
    const res = await fetch('/api/palpites');
    if (!res.ok) throw new Error("Offline ou GitHub Pages");
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Static server response");
    }
    let list = await res.json();
    allPalpites = list.filter(p => !p.name.includes("Ronaldo") && !p.name.includes("Samurai"));
    renderFeed();
  } catch (err) {
    // Busca online no Google Firebase Firestore para GitHub Pages
    try {
      const cloudRes = await fetch(CLOUD_API);
      if (cloudRes.ok) {
        let resData = await cloudRes.json();
        let jsonStr = resData && resData.fields && resData.fields.json && resData.fields.json.stringValue;
        if (jsonStr) {
          let list = JSON.parse(jsonStr);
          if (Array.isArray(list)) {
            allPalpites = list.filter(p => !p.name.includes("Ronaldo") && !p.name.includes("Samurai"));
            localStorage.setItem('fifa_2026_palpites_db', JSON.stringify(allPalpites));
            renderFeed();
            return;
          }
        }
      }
    } catch(e) {}
    allPalpites = getLocalPalpites();
    renderFeed();
  }
}

function renderFeed() {
  const listEl = document.getElementById('palpites-list');
  const countEl = document.getElementById('palpite-count');
  
  const filtered = currentFilter === 'all' 
    ? allPalpites 
    : allPalpites.filter(p => p.matchId === currentFilter);

  countEl.textContent = `${filtered.length} Palpites`;

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="loading-spinner" style="text-align:center; padding: 40px;">Nenhum palpite para este filtro ainda. Seja o primeiro a palpitar! 🚀</div>`;
    return;
  }

  listEl.innerHTML = filtered.map(p => {
    const matchInfo = MATCH_DATA[p.matchId] || { flagA: "⚽", flagB: "⚽", a: "A", b: "B" };
    const dateStr = new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `
      <div class="palpite-item">
        <div class="palpite-top">
          <div class="author-info">
            <div class="avatar">${p.name.charAt(0).toUpperCase()}</div>
            <span class="author-name">${p.name}</span>
          </div>
          <span class="match-tag">${p.matchLabel}</span>
        </div>

        <div class="palpite-score-badge">
          <div class="feed-team">
            <span class="feed-flag">${matchInfo.flagImgA ? `<img src="${matchInfo.flagImgA}" class="flag-img-feed" alt="${matchInfo.a}">` : matchInfo.flagA}</span>
            <span class="feed-name">${matchInfo.a}</span>
          </div>
          <span class="score-display">${p.scoreA} : ${p.scoreB}</span>
          <div class="feed-team">
            <span class="feed-flag">${matchInfo.flagImgB ? `<img src="${matchInfo.flagImgB}" class="flag-img-feed" alt="${matchInfo.b}">` : matchInfo.flagB}</span>
            <span class="feed-name">${matchInfo.b}</span>
          </div>
        </div>

        <div class="palpite-details" style="display:block;">
          ${p.goalsBreakdown && p.goalsBreakdown.length > 0 ? `
            <div style="background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-weight:700; color:var(--accent-lime); margin-bottom:6px; font-size: 0.9rem;">⚽ Detalhamento dos Gols:</div>
              ${p.goalsBreakdown.map((g, idx) => `
                <div style="font-size:0.85rem; margin-bottom:4px; color: #E0E8F5;">
                  • <strong>${g.team}</strong>: ${g.player} — ⏱️ <em>${g.time}</em>
                </div>
              `).join('')}
            </div>
          ` : `
            <span class="detail-pill" style="background: rgba(255,255,255,0.08); color: var(--accent-lime);">📊 ${p.scorer || 'Palpite focado no Placar Geral'}</span>
          `}
        </div>

        ${p.comment ? `<div class="palpite-comment">${p.comment}</div>` : ''}
        <div class="timestamp" style="margin-top: 8px; text-align: right;">Enviado às ${dateStr}</div>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  document.getElementById('score-a-input').addEventListener('input', renderDynamicGoals);
  document.getElementById('score-b-input').addEventListener('input', renderDynamicGoals);

  const toggleGoalsChk = document.getElementById('toggle-specific-goals');
  if (toggleGoalsChk) {
    toggleGoalsChk.addEventListener('change', (e) => {
      const container = document.getElementById('dynamic-goals-container');
      if (e.target.checked) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }
    });
  }

  const nameInput = document.getElementById('user-name-input');
  nameInput.addEventListener('change', (e) => {
    if (e.target.value.trim()) {
      localStorage.setItem('fifa_user_name', e.target.value.trim());
      showStatusMsg(`Nome salvo: <strong>${e.target.value.trim()}</strong>!`);
    }
  });

  const form = document.getElementById('palpite-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    if (!name) {
      showToast("Por favor, preencha o seu nome no Passo 1!");
      nameInput.focus();
      return;
    }

    localStorage.setItem('fifa_user_name', name);

    const matchId = document.getElementById('match-selector').value;
    const matchLabel = document.getElementById('match-selector').options[document.getElementById('match-selector').selectedIndex].getAttribute('data-label');
    const scoreA = document.getElementById('score-a-input').value;
    const scoreB = document.getElementById('score-b-input').value;
    const comment = document.getElementById('comment-input').value;

    const isSpecificChecked = toggleGoalsChk && toggleGoalsChk.checked;
    const goalsBreakdown = [];
    let scorerSummary = [];
    let timeSummary = [];

    if (!isSpecificChecked) {
      scorerSummary.push("Apenas Placar Geral");
      timeSummary.push("Não especificado");
    } else {
      const goalRows = document.querySelectorAll('.dynamic-goal-row');
      if (goalRows.length === 0) {
        scorerSummary.push("Partida sem gols (0x0)");
        timeSummary.push("0'");
      } else {
        goalRows.forEach(row => {
          const team = row.getAttribute('data-team');
          const player = row.querySelector('.goal-player-select').value || "Qualquer / Não especificado";
          const time = row.querySelector('.goal-time-input').value || "--'";
          goalsBreakdown.push({ team, player, time });
          scorerSummary.push(`${player} (${team})`);
          timeSummary.push(time);
        });
      }
    }
    const scorer = scorerSummary.join(', ');
    const timePeriod = timeSummary.join(', ');

    const payload = {
      name,
      matchId,
      matchLabel,
      scoreA,
      scoreB,
      scorer,
      timePeriod,
      comment,
      goalsBreakdown
    };

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const handleSuccess = () => {
      document.getElementById('comment-input').value = '';
      fetchPalpites();
      submitBtn.innerHTML = `<span>✅ PALPITE REGISTRADO COM SUCESSO!</span>`;
      setTimeout(() => {
        submitBtn.innerHTML = `<span>REGISTRAR MEU PALPITE</span><svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }, 3000);
    };

    try {
      const res = await fetch('/api/palpites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error("Fallback para GitHub Pages");
      }

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Erro ao registrar palpite.");
      } else {
        handleSuccess();
      }
    } catch (err) {
      // Modo nuvem online no GitHub Pages
      const localRes = await saveCloudPalpite(payload);
      if (localRes.error) {
        showToast(localRes.error);
      } else {
        handleSuccess();
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });

  document.getElementById('refresh-btn').addEventListener('click', () => {
    fetchPalpites();
  });

  document.getElementById('toast-close').addEventListener('click', hideToast);
}

function showToast(msg) {
  document.getElementById('toast-msg').textContent = msg;
  document.getElementById('toast-modal').classList.remove('hidden');
  setTimeout(hideToast, 6000);
}

function hideToast() {
  document.getElementById('toast-modal').classList.add('hidden');
}
