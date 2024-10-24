require('dotenv').config();
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

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
    getMessages
};