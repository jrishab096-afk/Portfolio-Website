import express from 'express';
import cors from 'cors';
import { generatePortfolioHTML } from './utils/portfolioGenerator.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolioforge';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Save Portfolio
app.post('/api/portfolio', async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!id || !data) return res.status(400).json({ error: 'ID and Data required' });

    // Upsert (update if exists, otherwise create)
    await Portfolio.findOneAndUpdate({ id }, { data }, { upsert: true, new: true });
    
    console.log(`✅ Saved portfolio: ${id}`);
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
});

// Serve Portfolio (Public View)
app.get('/p/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ id: req.params.id });
    if (!portfolio) return res.status(404).send('<h1>Portfolio Not Found</h1>');

    const html = generatePortfolioHTML(portfolio.data);
    res.send(html);
  } catch (error) {
    console.error('Error serving portfolio:', error);
    res.status(500).send('Server Error');
  }
});

// Download Portfolio
app.get('/download/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ id: req.params.id });
    if (!portfolio) return res.status(404).send('File not found');

    const html = generatePortfolioHTML(portfolio.data);
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename=portfolio-${req.params.id}.html`);
    res.send(html);
  } catch (error) {
    console.error('Error downloading portfolio:', error);
    res.status(500).send('Download Error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
