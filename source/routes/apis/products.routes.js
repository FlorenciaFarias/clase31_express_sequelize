const {Router} = require('express');
const router = Router();
const {all} = require('../../controllers/apis/products')

router.get('/',all)

module.exports = router