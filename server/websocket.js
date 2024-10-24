const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8008 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        //채팅방 id, 보낸 사람 이름, 메시지 내용
        const result = JSON.parse(message);

        //테스트용 임시로그
        console.log('채팅방 Received:', result.chatRoomId);
        console.log('보낸사람이름 Received:', result.senderName);
        console.log('보낸사람 Received:', result.senderId);
        console.log('메시지 Received:', result.message);

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

/*
io.sockets.on('connection', function(socket){
    console.log('Client connected');

    // 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌
    socket.on('newUser', function(name){

        socket.name = name;

        // 접속되어 있는 다른 유저들에게 알리기 위해 모든 소켓에게 이름 전송
        io.sockets.emit('update', {type: 'connect', name: '📢', message: name + '님이 접속하였습니다.'})
    });

    socket.on('message', function(data){
        // 받은 데이터에 누가 보냈는지 이름을 추가
        data.name = socket.name;

        // client에게 update 이벤트 발생
        socket.broadcast.emit('update', data);
    });
});
 */
module.exports = wss;