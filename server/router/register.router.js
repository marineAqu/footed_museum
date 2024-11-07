const express = require('express');
const registerRouter = express.Router();
const cors = require('cors');
registerRouter.use(cors());
const RegisterController = require('../register.controller');
const registerController = new RegisterController();
const multer = require('multer');
const upload = multer();

registerRouter.get("/tempmakeQr", registerController.makeQrCode);
registerRouter.post("/tempRegister", upload.none(), registerController.resister);
registerRouter.get("/tempTestDir", registerController.tempTestDir);
registerRouter.post("/tempReal", registerController.reeealTemp);
registerRouter.post("/visionTest", upload.single('image'), registerController.visionAPI);

module.exports = registerRouter;