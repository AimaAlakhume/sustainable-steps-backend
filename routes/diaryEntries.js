import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/diary-entries.json'));
    res.status(200).json(fileData);
})

router.get('/:diaryEntryId', (req, res) => {
    const { diaryEntryId } = req.params;
    const fileData = JSON.parse(fs.readFileSync('./data/diary-entries.json'));
    const selectedDiaryEntry = fileData.find(entry => entry.id === diaryEntryId);
    if (selectedDiaryEntry) {
        res.status(200).json(selectedDiaryEntry);
    } else {
        res.status(404).json({ error: 'Requested entry does not exist.' });
    }
})

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
        date: formatDate(new Date()),
        item: '',
        category: '',
        quantity: '',
        action_taken: ''
    };
    const newDiaryEntryData = [...fileData, newDiaryEntry];
    fs.writeFileSync('./data/diary-entries.json', JSON.stringify(newDiaryEntryData));
    res.sendStatus(201);
});

export default router;