const express = require('express');
const registerRouter = express.Router();
const cors = require('cors');
registerRouter.use(cors());
const RegisterController = require('../register.controller');
const registerController = new RegisterController();


registerRouter.get("/tempmakeQr", registerController.makeQrCode);
registerRouter.post("/tempRegister", registerController.resister);
registerRouter.get("/tempTestDir", registerController.tempTestDir);

module.exports = registerRouter;