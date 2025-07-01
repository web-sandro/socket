import express from 'express';
import path from 'path';
import routes from './routes.js';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

let connections = [];

wss.on('connection', ws => {
  console.log('🔌 Cliente conectado');
  connections.push(ws);

  ws.on('message', msg => {
    console.log('📨 Mensagem recebida:', msg.toString());
    connections.forEach(conn => {
      if (conn !== ws && conn.readyState === ws.OPEN) {
        conn.send(msg);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Cliente desconectado');
    connections = connections.filter(conn => conn !== ws);
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
