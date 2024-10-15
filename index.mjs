
// require('dotenv').config();
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

// const express = require('express');
// const fetch = require('node-fetch');
// const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apikey = process.env.API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if(!city){
        return res.status(400).json({error: "City name is required" });
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
        if(!response.ok){
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        res.json(data);
    }catch(error){
        res.status(500).json({error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
