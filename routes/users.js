const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const path = require('path')

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const users = await getUsers(res);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:userId', async  function (req, res, next) {
   const userId = req.params.userId
    try {
        const users = await getUsers(res);
        res.status(200).send(users[userId]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

async function getUsers() {
    const filePath = path.join(__dirname, '..', 'data', 'users.json');
    try {
        const users = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(users);
    } catch (error) {
        console.log(error)
        throw new Error("Users cannot be read", err);
    }
}

module.exports = router;