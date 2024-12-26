import express, { type Application } from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import tasksRoutes from './src/routes/tasksRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api', tasksRoutes);

app.listen(process.env.APPPORT, () => console.log(`Server is running on port ${process.env.APPPORT}`))

export default app;