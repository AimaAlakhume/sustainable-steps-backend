import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/user-goals.json'));
    res.status(200).json(fileData);
})

router.post('/', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/user-goals.json'));
    const newGoal = {
        id: uuidv4(),
        goal: req.body.goal,
        isComplete: false
    };
    const newGoalData = [...fileData, newGoal];
    fs.writeFileSync('./data/user-goals.json', JSON.stringify(newGoalData));
    res.sendStatus(201);
});

router.put('/:id', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/user-goals.json'));
    const newData = fileData.map(goal => {
        if (goal.id === req.params.id) {
            return req.body;
        } else {
            return goal;
        }
    });
    fs.writeFileSync('./data/user-goals.json', JSON.stringify(newData));
    res.json(fileData);
});

router.delete('/:id', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./data/user-goals.json'));
    const filteredData = fileData.filter((user) => user.id !== req.params.id);
    fs.writeFileSync('./data/user-goals.json', JSON.stringify(filteredData));
    res.sendStatus(204);
});

export default router;