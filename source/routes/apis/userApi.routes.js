const {Router} = require('express');
const router = Router();

const {all, oneUser, process, userDestroy} = require('../../controllers/apis/usersApi');

router.get('/', all);

router.get('/:id', oneUser);

router.post('/', process);

router.delete('/:id', userDestroy);

module.exports = router;