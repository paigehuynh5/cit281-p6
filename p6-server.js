// ✅ Import required modules
const express = require('express');
const app = express();
const PORT = 3000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Serve static files from 'public' folder
app.use(express.static('public'));

// ✅ In-memory array to store items
let items = [
  { id: 1, name: 'Sample Item' },
];

// ✅ GET /items – Return all items
app.get('/items', (req, res) => {
  res.json(items);
});

// ✅ POST /items – Add a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: Date.now(), // Unique ID
    name: req.body.name,
  };
  if (!newItem.name) {
    // ✅ Error handling with console output
    console.error('POST /items error: Item name is required');
    return res.status(400).json({ error: 'Item name is required' });
  }
  items.push(newItem);
  res.status(201).json(newItem);
});

// ✅ PUT /items/:id – Update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedName = req.body.name;
  const item = items.find(i => i.id === itemId);
  if (!item) {
    console.error(`PUT /items/${itemId} error: Item not found`);
    return res.status(404).json({ error: 'Item not found' });
  }
  if (!updatedName) {
    console.error(`PUT /items/${itemId} error: Updated name is required`);
    return res.status(400).json({ error: 'Updated name is required' });
  }
  item.name = updatedName;
  res.json(item);
});

// ✅ DELETE /items/:id – Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === itemId);
  if (index === -1) {
    console.error(`DELETE /items/${itemId} error: Item not found`);
    return res.status(404).json({ error: 'Item not found' });
  }
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

// ✅ Catch-all route for 404 errors
app.use((req, res) => {
  console.error(`404 error: Not found - ${req.originalUrl}`);
  res.status(404).json({ error: 'Not found' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


