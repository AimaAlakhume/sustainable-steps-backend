import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/diary-entries.json'));

    const dateFilter = req.query.date;

    if (dateFilter) {
        const filteredEntries = fileData.filter(entry => entry.date === dateFilter);
        res.status(200).json(filteredEntries);
    } else {
        res.status(200).json(fileData);
    }
});

router.get('/:diaryEntryId', (req, res) => {
    const { diaryEntryId } = req.params;
    const fileData = JSON.parse(fs.readFileSync('./data/diary-entries.json'));
    const selectedDiaryEntry = fileData.find(entry => entry.id === diaryEntryId);
    if (selectedDiaryEntry) {
        res.status(200).json(selectedDiaryEntry);
    } else {
        res.status(404).json({ error: 'Requested entry does not exist.' });
    }
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