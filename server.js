const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3050;
const PALPITES_FILE = path.join(__dirname, 'palpites.json');

// Initial FIFA teams scraped from FIFA official site
const TEAMS = [
  "Brasil", "Japão", "Canadá", "EUA", "México", "Alemanha", "Argentina", 
  "Espanha", "França", "Inglaterra", "Portugal", "Holanda", "Uruguai", 
  "Colômbia", "Itália", "Bélgica", "Croácia", "Marrocos", "Senegal", "Coreia do Sul"
];

// Initial players for featured teams
const PLAYERS = {
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
  "Outros": ["Estrela do Time", "Atacante Principal", "Meio-campista", "Zagueiro Elementar"]
};

const MATCH_DEADLINES = {
  "brasil-japao": "2026-06-29T17:00:00Z",
  "alemanha-paraguai": "2026-06-29T20:30:00Z",
  "holanda-marrocos": "2026-06-30T01:00:00Z",
  "costa-noruega": "2026-06-30T17:00:00Z",
  "franca-suecia": "2026-06-30T21:00:00Z",
  "mexico-equador": "2026-07-01T01:00:00Z",
  "inglaterra-rdcongo": "2026-07-01T16:00:00Z",
  "belgica-senegal": "2026-07-01T20:00:00Z",
  "eua-bosnia": "2026-07-02T00:00:00Z",
  "espanha-austria": "2026-07-02T19:00:00Z",
  "portugal-croacia": "2026-07-02T23:00:00Z",
  "suica-argelia": "2026-07-03T03:00:00Z",
  "australia-egito": "2026-07-03T18:00:00Z",
  "argentina-caboverde": "2026-07-03T22:00:00Z",
  "colombia-gana": "2026-07-04T01:30:00Z"
};

// Ensure palpites.json exists with empty data
if (!fs.existsSync(PALPITES_FILE)) {
  fs.writeFileSync(PALPITES_FILE, JSON.stringify([], null, 2), 'utf8');
}

function getPalpites() {
  try {
    const data = fs.readFileSync(PALPITES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

const CLOUD_API = "https://jsonblob.com/api/jsonBlob/019f1415-df75-7fe2-be48-882d34e713ca";

function savePalpites(palpites) {
  fs.writeFileSync(PALPITES_FILE, JSON.stringify(palpites, null, 2), 'utf8');
  if (typeof fetch !== 'undefined') {
    fetch(CLOUD_API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(palpites)
    }).catch(() => {});
  }
}

const server = http.createServer((req, res) => {
  // CORS headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url.split('?')[0];

  // API Endpoints
  if (url === '/api/palpites' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(getPalpites()));
    return;
  }

  if (url === '/api/metadata' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ teams: TEAMS, players: PLAYERS }));
    return;
  }

  if (url === '/api/palpites' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const newPalpite = JSON.parse(body);
        const { name, matchId, scoreA, scoreB, scorer, timePeriod, comment, matchLabel } = newPalpite;

        if (!name || !matchId || scoreA === undefined || scoreB === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: "Nome, jogo e placar são obrigatórios!" }));
          return;
        }

        const palpites = getPalpites();

        // Enforce deadline check
        const deadline = MATCH_DEADLINES[matchId];
        if (deadline && Date.now() >= new Date(deadline).getTime()) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ 
            error: "O horário limite para enviar palpites para esta partida já encerrou (Jogo em andamento ou finalizado)!" 
          }));
          return;
        }

        // Enforce limit of 2 palpites per person for ALL matches
        const userPalpitesCount = palpites.filter(
          p => p.matchId === matchId && p.name.trim().toLowerCase() === name.trim().toLowerCase()
        ).length;

        if (userPalpitesCount >= 2) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ 
            error: `Regra do Jogo: O limite é de no máximo 2 palpites por pessoa para cada jogo! Você já enviou ${userPalpitesCount} palpites para esta partida com o nome "${name}".` 
          }));
          return;
        }

        const palpiteEntry = {
          id: Date.now(),
          name: name.trim(),
          matchId,
          matchLabel: matchLabel || matchId,
          scoreA: Number(scoreA),
          scoreB: Number(scoreB),
          scorer: scorer || "Qualquer jogador",
          timePeriod: timePeriod || "Qualquer tempo",
          comment: comment || "",
          timestamp: new Date().toISOString()
        };

        palpites.unshift(palpiteEntry); // Add to top of feed
        savePalpites(palpites);

        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, palpite: palpiteEntry }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: "Erro interno ao processar palpite." }));
      }
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, 'public', url === '/' ? 'index.html' : url);
  const extname = path.extname(filePath);
  let contentType = 'text/html; charset=utf-8';

  switch (extname) {
    case '.js': contentType = 'text/javascript; charset=utf-8'; break;
    case '.css': contentType = 'text/css; charset=utf-8'; break;
    case '.json': contentType = 'application/json; charset=utf-8'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpg'; break;
    case '.ico': contentType = 'image/x-icon'; break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando localmente em http://localhost:${PORT}`);
  console.log(`⚽ Copa do Mundo FIFA 2026 - Palpites Ativos!`);
});
