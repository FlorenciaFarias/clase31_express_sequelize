const {Router} = require('express');
const router = Router();
const { home } = require('../controllers/main.controller');

router.get('/', home);



module.exports = router