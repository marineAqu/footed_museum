require('dotenv').config();
const mysql = require("mysql");


const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT post_id, title, content, post_date, status
            FROM Posts
            WHERE user_id = ?
        `;
        connect.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// 유저 게시글에 대한 알림 조회
function getPostNotifications(userId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Posts.post_id, Posts.title, Posts.status, '게시글 알림' AS type
            FROM Posts
            WHERE user_id = ?
              AND found_status = 'found' -- 예시로 물건을 찾은 경우에만 알림
        `;
        connect.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// 유저 채팅 알림 조회
function getChatNotifications(userId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT ChatRooms.room_id, '새로운 채팅 메시지' AS type
            FROM ChatRooms
            WHERE user1_id = ?
               OR user_id2 = ? -- 유저가 참여 중인 채팅방에서 새 메시지가 있는 경우
        `;
        connect.query(query, [userId, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// 유저 키워드 알림 조회
function getKeywordNotifications(userId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Posts.post_id, Posts.title, '키워드 알림' AS type
            FROM Posts
                     JOIN UserKeywords ON Posts.title LIKE CONCAT('%', UserKeywords.keyword, '%')
            WHERE UserKeywords.user_id = ? -- 설정된 키워드가 포함된 게시물
        `;
        connect.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getUserPosts,
    getPostNotifications,
    getChatNotifications,
    getKeywordNotifications
}