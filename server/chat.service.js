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
        connect.query('select * from ChatRooms where user1_id = ? or user_id2 = ?',
            [userid, userid],
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
        connect.query('INSERT INTO ChatRooms (user1_id, user_id2) values (?, ?)',
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

function findRoom(user1, user2){
    console.log('user1 and 2: ', user1, user2);

    return new Promise((resolve, reject) => {
        connect.query('Select room_id from chatrooms where user1_id = ? and user_id2 = ?',
            [user1, user2],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    console.log('result: ', result);
                    resolve(result[0]);
                }
            });
    });
}

function sendMessage(chatRoomId, senderId, message) {
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO Messages (room_id, sender_id, message_content) VALUES (?, ?, ?)',
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
        connect.query('SELECT sender_id as senderId, message_content as message FROM Messages WHERE room_id = ? ORDER BY sent_at ASC',
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
    findRoom
};