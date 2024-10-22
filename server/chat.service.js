require('dotenv').config();
const mysql = require("mysql");
//const WebSocketServer = require('ws');

//const websocket = new WebSocketServer({ port: 8080 });

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//on은 데이터 받기, emit은 데이터 전송
/*websocket.on('connection', (ws) => {
    console.log('커넥션 발생');

    websocket.on('message', (message) => {
        console.log('Received:', message);
        // Broadcast the message to all clients
        websocket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    websocket.on('close', () => {
        console.log('Client disconnected');
    });
});

 */

function chatlist(userid) {
    return new Promise((resolve, reject) => {
        connect.query('select * from ChatRooms where user_id = ?',
            [userid],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });
}

function makeNewRoom(user1, user2){
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO ChatRooms (user1_id, user2_id) values (?, ?)',
            [user1, user2],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

function sendMessage(chatRoomId, senderId, message) {
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO Messages (chat_room_id, sender_id, message) VALUES (?, ?, ?)',
            [chatRoomId, senderId, message],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

function getMessages(chatRoomId) {
    return new Promise((resolve, reject) => {
        connect.query('SELECT * FROM Messages WHERE chat_room_id = ? ORDER BY created_at ASC',
            [chatRoomId],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });
}

module.exports = {
    chatlist,
    makeNewRoom,
    sendMessage,
    getMessages,
    //websocket
};