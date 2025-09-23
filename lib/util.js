const path = require('path')

module.exports = {
  maskId: (id) => {
    return Buffer.from(id).toString('base64url')
  },

  unmaskId: (mask) => {
    return Buffer.from(mask, 'base64url').toString()
  },

  generateFileName: (originalName) => {
    const ext = path.extname(originalName)
    return `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
  },

  paginate: (data, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return data.slice(startIndex, endIndex);
  }
}