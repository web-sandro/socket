  const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
  const socket = new WebSocket(protocol + location.host);

  function enviar() {
    const input = document.getElementById('mensagem');
    const msg = input.value.trim();
    if (msg) {
      socket.send(msg);
      input.value = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('mensagem');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          enviar();
        }
      });
    }
  });

    socket.onmessage = async (event) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');

  const text = await event.data.text();

  li.textContent = text;
  ul.appendChild(li);
};