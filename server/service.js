// service.js
require('dotenv').config();
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connect.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        throw err;
    }
    console.log('MySQL 연결 성공');
});

function getTemp() {
    return new Promise((resolve, reject) => {
        connect.query('select adddate(curdate(),1) as today',
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
    });
}


module.exports = {
    getTemp
};