import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/locations.json'));
    res.status(200).json(fileData);
})

export default router;