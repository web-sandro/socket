  const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
  const socket = new WebSocket(protocol + location.host);



    function enviar() {
      const msg = document.getElementById('mensagem').value;
      socket.send(msg);
    }

    socket.onmessage = async (event) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');

  // Converte o Blob em texto
  const text = await event.data.text();

  li.textContent = text;
  ul.appendChild(li);
};