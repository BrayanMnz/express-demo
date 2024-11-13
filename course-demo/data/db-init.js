const { credentials } = require('../config')

const { Client } = require('pg')
const { connectionString } = credentials.postgres
const client = new Client({ connectionString })

const createScript = `
  CREATE TABLE USERS (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phoneNumber VARCHAR(20),
    terms VARCHAR(5)
    );
`

const getUserCount = async client => {
    const { rows } = await client.query('SELECT COUNT(*) FROM USERS')
    return Number(rows[0].count)
}

const insertUsers = async client => {
    const users = [
        ['John Doe', 'test@test.com', '123456', 'Autopista Duarte', '809-000-0000', 'on'],
        ['Jane Smith', 'jane.smith@test.com', 'password123', 'Calle 15, Zona Norte', '809-111-2222', 'on'],
        ['Sam Brown', 'sam.brown@test.com', 'mypassword', 'Avenida Independencia', '809-333-4444', 'off'],
        ['Emily White', 'emily.white@test.com', 'securePassword', 'Calle 6, Plaza Central', '809-555-6666', 'on'],
        ['Carlos Ruiz', 'carlos.ruiz@test.com', 'carlo1234', 'Calle Juan Pablo', '809-777-8888', 'off'],
        ['Sophia Lee', 'sophia.lee@test.com', 'sophia4321', 'Avenida de los Prados', '809-999-0000', 'on'],
        ['Lucas Martinez', 'lucas.martinez@test.com', 'lucas8765', 'Calle Central, Zona Sur', '809-111-9999', 'on'],
        ['Isabella Garcia', 'isabella.garcia@test.com', 'isabella5678', 'Avenida Los Conucos', '809-222-3333', 'off'],
        ['Ethan Scott', 'ethan.scott@test.com', 'ethan0987', 'Calle Principal, Sector 4', '809-444-5555', 'on'],
        ['Mia Johnson', 'mia.johnson@test.com', 'miapass123', 'Calle Los Laureles', '809-666-7777', 'off']
    ];

    const query = `
          INSERT INTO USERS (name, email, password, address, phoneNumber, terms)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;

    try {
        for (let i = 0; i < users.length; i++) {
            await client.query(query, users[i]);
        }
        console.log('Todos los usuarios fueron insertados');
    } catch (err) {
        console.error('Error insertando usuarios:', err);
    } finally {
        await client.end();
    }
}

client.connect().then(async () => {
    try {
        console.log('Creando schema de BBDD')
        await client.query(createScript)
        const userCount = await getUserCount(client)
        if (userCount === 0) {
            console.log('Agregando data inicial ')
            await insertUsers(client)
        }
    } catch (err) {
        console.log('ERROR: No se pudo iniciar la BBDD')
        console.log(err.message)
    } finally {
        client.end()
    }
})