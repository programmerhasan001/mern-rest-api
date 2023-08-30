const { Router } = require('express');
const { createCategory, getAllCategory } = require('../controllers/categoryController');

const categoryRoutes = Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getAllCategory);

module.exports = categoryRoutes;