const express = require('express');
const searchRouter = express.Router();
const cors = require('cors');
searchRouter.use(cors());
const SearchController = require('../search.controller');
const searchController = new SearchController();

// 전체 조회 API 경로
searchRouter.get('/api/item/all', searchController.getAllItems);

// 카테고리별 상세 조회 API 경로
searchRouter.get('/api/item/search', searchController.searchItems);


module.exports = searchRouter;