const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8008 });
const ChatService = require('./chat.service');

wss.on('connection', (ws) => {
    console.log('Client connected');

    //클라이언트로부터 메시지를 받았을 때
    ws.on('message', (message) => {
        //채팅방 id, 보낸 사람 이름, 메시지 내용
        const result = JSON.parse(message);

        //테스트용 임시로그
        console.log('채팅방 Received:', result.chatRoomId);
        console.log('보낸사람이름 Received:', result.senderName);
        console.log('보낸사람 Received:', result.senderId);
        console.log('메시지 Received:', result.message);

        //클라이언트로 메시지 전송 & DB에 메시지 저장
        //한 번만 저장되면 되므로 forEach 밖에서 실행
        ChatService.sendMessage(result.chatRoomId, result.senderId, result.message);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(result));
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