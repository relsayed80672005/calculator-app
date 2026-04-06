const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

function calculate(expression) {
  try {
    // Replace x with * and ÷ with /
    let expr = expression.replace(/x/g, '*').replace(/÷/g, '/');
    // Use Function constructor for safer eval
    const result = new Function('return ' + expr)();
    return result.toString();
  } catch (error) {
    return 'Error';
  }
}

app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  if (!expression) {
    return res.status(400).json({ error: 'Expression is required' });
  }
  const result = calculate(expression);
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});