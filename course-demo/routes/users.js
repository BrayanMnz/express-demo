const express = require('express');
const fs = require('fs/promises')
const router = express.Router();
const path = require('path')

router.get('/', async function (req, res, next) {
    try {
        const users = await getUsers(res);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/:name/:gender/:email', async function (req, res, next) {
    const name = req.params.name
    const gender = req.params.gender
    const email = req.params.email

    try {
        const users = await getUsers(res);
        let user = {
            "name": name,
            "gender": gender,
            "id": users.length,
            "email": email
        }
        users.push(user);

        // Escribiendo al archivo users.json
        const filePath = path.join(__dirname, '..', 'data', 'users.json');

        fs.writeFile(filePath,  JSON.stringify(users), (err) => {
            if (err){ 
                console.log(err);
                throw err;
            }
            console.log(`Nuevo usuario ${name} ha sido agregado al archivo`);
        });

        res.status(200).send(`Nuevo usuario ${name} ha sido agregado al archivo`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:userId', async function (req, res, next) {
    const userId = req.params.userId
    try {
        const users = await getUsers(res);
        if(userId >= users.length) res.status(400).send(`No existe ningún usuario con el id ${userId}`);
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