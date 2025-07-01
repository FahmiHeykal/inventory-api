const info = (...msg) => console.log('[INFO]', ...msg);
const warn = (...msg) => console.warn('[WARN]', ...msg);
const error = (...msg) => console.error('[ERROR]', ...msg);

module.exports = { info, warn, error };
