require('dotenv').config();
const mysql = require("mysql");


const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


//TODO
// 임시 found_status를 status로 수정

//전체 분실물 목록 조회
function getAllItems() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Posts.post_id,
                   Posts.title,
                   Posts.content,
                   Posts.image_url,
                   Categories.category_name,
                   Posts.found_status
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
                   Posts.image_url,
                   Categories.category_name,
                   Posts.found_status
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
                   Posts.image_url,
                   Categories.category_name,
                   Posts.found_status
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
                   Posts.image_url,
                   Categories.category_name,
                   Posts.found_status,
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


module.exports = {
    getAllItems,
    searchItemsByCategory,
    searchItemsByKeyword,
    searchItemsByFilters
}