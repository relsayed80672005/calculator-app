const express = require('express');
const app = express();

app.use(express.json());

app.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression) {
      return res.status(400).json({ error: 'Expression is required' });
    }

    // Replace x with * and ÷ with /
    let expr = expression.replace(/x/g, '*').replace(/÷/g, '/');
    // Use Function constructor for safer eval
    const result = new Function('return ' + expr)();

    res.json({ result: result.toString() });
  } catch (error) {
    res.json({ result: 'Error' });
  }
});

app.get('/calculate', (req, res) => {
  res.json({ message: 'Use POST to calculate' });
});

module.exports = app;