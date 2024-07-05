import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/waste-guide.json'));
    res.status(200).json(fileData);
})

export default router;