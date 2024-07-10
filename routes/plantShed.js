import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const flowerImages = {
    'blue': 'http://localhost:8080/public/images/blue-flower.png',
    'orange': 'http://localhost:8080/public/images/orange-flower.png',
    'pink': 'http://localhost:8080/public/images/pink-flower.png',
    'red': 'http://localhost:8080/public/images/red-flower.png',
    'yellow': 'http://localhost:8080/public/images/yellow-flower.png',
}

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/plant-shed.json'));
    res.status(200).json(fileData);
})

router.post('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/plant-shed.json'));
    const newPlant = {
        id: uuidv4(),
        type: req.body.type,
        image: flowerImages[req.body.type]
    };
    const newPlantData = [...fileData, newPlant];
    fs.writeFileSync('./data/plant-shed.json', JSON.stringify(newPlantData));
    res.status(201).json(newPlant);
});

router.get('/types', (req, res) => {
    const types = Object.keys(flowerImages);
    res.status(200).json(types);
});

export default router;