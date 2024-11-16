require('dotenv').config();
const mysql = require("mysql2");


const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//전체 분실물 목록 조회
function getAllItems() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Posts.post_id,
                   Posts.title,
                   Posts.content,
                   Posts.image,
                   Posts.post_date,
                   Categories.category_name,
                   Posts.status
            FROM Posts
                     LEFT JOIN PostCategory ON Posts.post_id = PostCategory.post_id
                     LEFT JOIN Categories ON PostCategory.category_id = Categories.category_id
        `;
        connect.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function searchItemsByCategory(category_id) {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT Posts.post_id,
                   Posts.title,
                   Posts.content,
                   Posts.image,
                   Categories.category_name,
                   Posts.status
                   Posts.location
            FROM Posts
                     LEFT JOIN PostCategory ON Posts.post_id = PostCategory.post_id
                     LEFT JOIN Categories ON PostCategory.category_id = Categories.category_id
            WHERE Categories.category_id IN (?) AND Posts.location LIKE ?
        `;

        const locationPattern = `%${location}%`;

        connect.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// 임시 키워드를 이용한 검색
function searchItemsByKeyword(keyword) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Posts.post_id,
                   Posts.title,
                   Posts.content,
                   Posts.image,
                   Categories.category_name,
                   Posts.status
            FROM Posts
                     LEFT JOIN PostCategory ON Posts.post_id = PostCategory.post_id
                     LEFT JOIN Categories ON PostCategory.category_id = Categories.category_id
            WHERE Posts.title LIKE ?
               OR Posts.content LIKE ?
        `;

        const keywordPattern = `%${keyword}%`;  // 키워드를 SQL LIKE 구문에 맞춰 변환

        connect.query(query, [keywordPattern, keywordPattern], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//상세 조회 수정(선택적 필터링)
function searchItemsByFilters(categories, location, keyword) {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT Posts.post_id,
                   Posts.title,
                   Posts.content,
                   Posts.image,
                   Categories.category_name,
                   Posts.status,
                   Posts.location
            FROM Posts
                     LEFT JOIN PostCategory ON Posts.post_id = PostCategory.post_id
                     LEFT JOIN Categories ON PostCategory.category_id = Categories.category_id
            WHERE 1 = 1
        `;

        const params = [];

        // category_id가 있을 경우
        if (categories && categories.length > 0) {
            query += ` AND Categories.category_id IN (?)`;
            params.push(categories);
        }

        // location이 있을 경우
        if (location) {
            query += ` AND Posts.location LIKE ?`;
            params.push(`%${location}%`);
        }

        // keyword가 있을 경우
        if (keyword) {
            query += ` AND (Posts.title LIKE ? OR Posts.content LIKE ?)`;
            params.push(`%${keyword}%`, `%${keyword}%`);
        }

        connect.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getItemDetailById(postId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                Posts.title,
                Posts.content,
                COALESCE(Posts.image, 'default_image.png') AS image,
                Posts.status,
                DATE_FORMAT(Posts.post_date, '%Y-%m-%d') AS date,
                GROUP_CONCAT(Categories.category_name) AS keywords
            FROM Posts
                LEFT JOIN PostCategory ON Posts.post_id = PostCategory.post_id
                LEFT JOIN Categories ON PostCategory.category_id = Categories.category_id
            WHERE Posts.post_id = ?
            GROUP BY Posts.post_id
        `;

        connect.query(query, [postId], (error, results) => {
            if (error) {
                return reject(error);
            } else {

            }
            resolve(results[0]);
        });
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                Posts.post_id,
                Posts.title,
                Posts.content,
                COALESCE(Posts.image, 'default_image.png') AS image,
                DATE_FORMAT(Posts.post_date, '%Y-%m-%d') AS post_date,
                Posts.status,
                GROUP_CONCAT(Categories.category_name) AS category_name
            FROM Posts
                     LEFT JOIN PostCategory ON Posts.post_id = PostCategory.post_id
                     LEFT JOIN Categories ON PostCategory.category_id = Categories.category_id
            WHERE Posts.user_id = ?
            GROUP BY Posts.post_id
        `;

        connect.query(query, [userId], (error, results) => {
            if (error) {
                return reject(error); // 에러 발생 시 리젝트
            }
            resolve(results); // 결과 반환
        });
    });
}




module.exports = {
    getAllItems,
    searchItemsByCategory,
    searchItemsByKeyword,
    searchItemsByFilters,
    getItemDetailById,
    getUserPosts
}