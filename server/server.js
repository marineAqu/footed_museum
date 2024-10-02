//server.js
const express = require('express');
const app = express();
const service = require('./service.js');
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const test = require('./Router/router');

app.use('/api', test);

const port = 3002; //node 서버가 사용할 포트 번호

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/temp', async (req, res) => {
    try {
        const getTemp = await service.getTemp();

        console.log("res: " + JSON.stringify({ getTemp }));
        res.json({ getTemp });
    } catch (error) {
        console.error("에러 발생: " + error);
        res.status(500).json({ error: "서버 내부 오류 발생" });
    }
});
