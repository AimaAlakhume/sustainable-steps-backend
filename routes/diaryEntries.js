import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/diary-entries.json'));

    const dateFilter = req.query.date;
    const year = parseInt(req.query.year);
    const month = parseInt(req.query.month) - 1;

    let filteredEntries = fileData;

    if (dateFilter) {
        filteredEntries = filteredEntries.filter(entry => entry.date === dateFilter);
    }

    if (year && !isNaN(month)) {
        filteredEntries = filteredEntries.filter(entry => {
            const [entryYear, entryMonth] = entry.date.split('-').map(Number);
        });
    }

    res.status(200).json(filteredEntries);
});

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

router.post('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/diary-entries.json'));
    const newDiaryEntry = {
        id: uuidv4(),
        item: req.body.item,
        category: req.body.category,
        quantity: req.body.quantity,
        action_taken: req.body.action_taken,
        date: formatDate(new Date())
    };
    const newDiaryEntryData = [...fileData, newDiaryEntry];
    fs.writeFileSync('./data/diary-entries.json', JSON.stringify(newDiaryEntryData));
    res.sendStatus(201);
});

export default router;