# Gallery Service

A simple REST API service for managing gallery items with type, caption, path, and geotag fields.

## Features
- CRUD operations for gallery items
- File upload support
- In-memory storage (replace with database for production)

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get specific gallery item
- `POST /api/gallery` - Create new gallery item (with file upload)
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

## Gallery Item Schema

```json
{
  "id": 1,
  "type": "image",
  "caption": "Sample image",
  "path": "/uploads/sample.jpg",
  "geotag": "40.7128,-74.0060"
}
```