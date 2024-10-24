const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8008 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const result = JSON.parse(message);
        console.log('Received:', result.message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(result.message);
            }
            else{
                console.error('server: WebSocket is not open');
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

module.exports = wss;