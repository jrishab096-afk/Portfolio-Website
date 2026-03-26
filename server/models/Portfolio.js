import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  data: { 
    type: Object, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
