const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to the Database
// This sets up a "Notebook" called productivityDB on your computer
mongoose.connect('mongodb://127.0.0.1:27017/productivityDB')
    .then(() => console.log("✅ Database Connected!"))
    .catch(err => console.log("❌ DB Error: Make sure MongoDB is installed & running"));

// 2. The Data Structure (What we are saving)
const Activity = mongoose.model('Activity', {
    domain: String,
    category: String,
    timestamp: { type: Date, default: Date.now }
});

// 3. The "Productive" List
const PRO_SITES = ['github.com', 'stackoverflow.com', 'linkedin.com', 'coursera.org'];

// 4. The Route to receive data from Chrome
app.post('/track', async (req, res) => {
    const { domain } = req.body;
    const category = PRO_SITES.includes(domain) ? 'Productive' : 'Unproductive';

    const entry = new Activity({ domain, category });
    await entry.save();

    console.log(`Saved: ${domain} [${category}]`);
    res.send({ status: "Success", category });
});

// 5. Start the Server
app.listen(5000, () => {
    console.log("🚀 Server started on http://localhost:5000");
});