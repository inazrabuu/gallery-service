const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// In-memory storage for gallery items
let galleryItems = [
  {
    id: 1,
    type: 'image',
    caption: 'Sample image',
    path: '/uploads/sample.jpg',
    geotag: '40.7128,-74.0060'
  }
];

// Routes
app.get('/api/gallery', (req, res) => {
  res.json(galleryItems);
});

app.get('/api/gallery/:id', (req, res) => {
  const item = galleryItems.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.post('/api/gallery', upload.single('file'), (req, res) => {
  const { type, caption, geotag } = req.body;
  const filePath = req.file ? '/uploads/' + req.file.filename : null;
  
  const newItem = {
    id: galleryItems.length + 1,
    type: type || 'unknown',
    caption: caption || '',
    path: filePath,
    geotag: geotag || ''
  };
  
  galleryItems.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/gallery/:id', (req, res) => {
  const item = galleryItems.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  
  const { type, caption, geotag } = req.body;
  
  if (type) item.type = type;
  if (caption) item.caption = caption;
  if (geotag) item.geotag = geotag;
  
  res.json(item);
});

app.delete('/api/gallery/:id', (req, res) => {
  const index = galleryItems.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  
  galleryItems.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Gallery service running on port ${PORT}`);
});