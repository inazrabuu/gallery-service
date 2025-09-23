module.exports = {
  maskId: (id) => {
    return Buffer.from(id).toString('base64url');
  },
  
  unmaskId: (mask) => {
    return Buffer.from(mask, 'base64url').toString();
  }
}