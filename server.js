const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;

// Serve static files from public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const client = new MongoClient(MONGO_URL);

//docker status(get request)
app.get('/docker-status', async (req, res) => {
    res.status(500).send("Your app dockerized successfully");
});

// Create User (POST request)
app.post('/addUser', async (req, res) => {
    try {
        const userObj = req.body
        console.log(req.body);
        await client.connect(URL);
        console.log('Connected successfully to server');

        const db = client.db("users-db");
        const data = await db.collection('users').insertOne(userObj);
        console.log(data);
        console.log("data inserted in DB");
        res.status(201).send(data);
        client.close();
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

// Get All Users (GET request)
app.get('/getUsers', async (req, res) => {
    try {
        await client.connect(URL);
        console.log('Connected successfully to server');
    
        const db = client.db("users-db");
        const data = await db.collection('users').find({}).toArray();
        
        client.close();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
