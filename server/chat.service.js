require('dotenv').config();
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

function chatlist(userid) {
    //Posts 테이블과 조인

    return new Promise((resolve, reject) => {
        const modifiedQuery = `SELECT 
    chatrooms.room_id AS roomid,
    chatrooms.post_id AS postid,  
    DATE_FORMAT(chatrooms.room_created_at, '%Y년 %m월 %d일 %H시 %i분') AS created_at,
    chatrooms.user1_id,
    chatrooms.user_id2,
    posts.title AS title,
    posts.content AS content,
    min(messages.message_content) AS lastMessage
FROM 
    chatrooms
JOIN 
    posts
ON 
    posts.post_id = chatrooms.post_id
JOIN
    messages
ON
    messages.room_id = chatrooms.room_id
WHERE 
    (chatrooms.user1_id = ? OR chatrooms.user_id2 = ?)
GROUP BY messages.room_id
    `;

        const query = `select chatrooms.room_id as roomid, chatrooms.post_id as postid, 
            DATE_FORMAT(room_created_at, \'%Y년 %m월 %d일 %H시 %i분\') AS created_at, user1_id, user_id2, 
            posts.title as title, posts.content as content
            from ChatRooms, posts, messages
            where posts.post_id = chatrooms.post_id
              and chatrooms.room_id = messages.room_id
              and (user1_id = ? or user_id2 = ?)
              and (
                SELECT
                    messages.room_id,
                    MIN(sent_at) AS sent_at
                FROM
                    messages
                GROUP BY
                    messages.room_id
            )`;


            connect.query(modifiedQuery, [userid, userid],
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