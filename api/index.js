import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import EducationRoutes from './routes/education.route.js';
import ExperienceRoute from './routes/experience.route.js'; 
import SkillsRoute from './routes/skills.route.js'; 
import ProjectRoute from './routes/project.route.js'
import cookieParser from 'cookie-parser';
import Aicreate from './controllers/aiblog.controller.js';
import path from 'path';
import cors from 'cors';
import cron from "node-cron";

cron.schedule("0 13 * * *", () => {
  console.log(`Image downloaded at 1 PM`);
  Aicreate()
   
});
// cron.schedule('*/1 * * * *', () => {
//   console.log(`Task executed every minute: Image downloaded at ${new Date().toLocaleTimeString()}`);
//   Aicreate();
// });
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
app.use(cors({ origin: "http://localhost:5173" }));
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/', EducationRoutes);
app.use('/api/', ExperienceRoute);
app.use('/api/', SkillsRoute);
app.use('/api/' , ProjectRoute)
 app.use(express.static(path.join(__dirname, '/client/dist')));

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
