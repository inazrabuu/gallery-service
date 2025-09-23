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
  }
}