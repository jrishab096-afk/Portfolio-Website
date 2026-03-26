import express from 'express';
import cors from 'cors';
import { generatePortfolioHTML } from './utils/portfolioGenerator.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Portfolio from './models/Portfolio.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes('cluster.mongodb.net')) {
  console.error('❌ MONGODB_URI is not set or is still the placeholder.');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB Atlas');
      console.log('Database Name:', mongoose.connection.name);
    })
    .catch(err => {
      console.error('❌ MongoDB Connection Error:', err);
      console.error('Check your MONGODB_URI in the environment variables.');
    });
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Root Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'PortfolioForge Backend is running!',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    endpoints: ['/api/health', '/api/portfolio', '/p/:id', '/download/:id']
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
});

// Save Portfolio
app.post('/api/portfolio', async (req, res) => {
  try {
    // Be flexible: check for {id, data} or if the body itself is the data
    let { id, data } = req.body;
    
    // If 'data' field is missing, the whole body might be the portfolio data
    if (!data) {
      data = req.body;
      delete data.id; // remove id if it was accidentally part of the data
    }

    // Generate a short unique ID if not provided
    if (!id || id === 'undefined') {
      id = Math.random().toString(36).substring(2, 10);
      console.log(`✨ Generated new ID: ${id}`);
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Portfolio data is required' });
    }

    // Upsert (update if exists, otherwise create)
    const savedPortfolio = await Portfolio.findOneAndUpdate({ id }, { data }, { upsert: true, new: true });
    
    if (!savedPortfolio) {
      console.error(`❌ Failed to save/update portfolio: ${id}`);
      return res.status(500).json({ error: 'Database save failed' });
    }

    console.log(`✅ Saved portfolio: ${id}`);
    res.json({ success: true, id });
  } catch (error) {
    console.error('❌ Error saving portfolio:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
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
