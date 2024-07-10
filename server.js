import express from 'express';
import diaryEntryRoutes from './routes/diaryEntries.js';
import wasteGuideRoutes from './routes/wasteGuide.js';
import userGoalRoutes from './routes/userGoals.js';
import plantShedRoutes from './routes/plantShed.js';
import locationRoutes from './routes/locations.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use('/public/images/',express.static('public/images'));
app.use(cors());

app.use('/entries', diaryEntryRoutes);
app.use('/guide', wasteGuideRoutes);
app.use('/goals', userGoalRoutes);
app.use('/shed', plantShedRoutes);
app.use('/locations', locationRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
