import express from 'express';
import diaryEntryRoutes from './routes/diaryEntries.js';
import wasteGuideRoutes from './routes/wasteGuide.js';
import 'dotenv/config';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());
app.use('/public/images/',express.static('public/images'));
app.use(cors());

app.use('/entries', diaryEntryRoutes);
app.use('/guide', wasteGuideRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
