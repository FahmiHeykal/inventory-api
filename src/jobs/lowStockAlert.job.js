const cron = require('node-cron');
const db = require('../config/db');
const logger = require('../utils/logger');
const LOW_STOCK_THRESHOLD = 10;

const checkLowStock = async () => {
  try {
    const result = await db.query(
      `SELECT id, name, stock FROM products
       WHERE is_deleted = FALSE AND stock < $1`,
      [LOW_STOCK_THRESHOLD]
    );

    const lowStockItems = result.rows;

    if (lowStockItems.length > 0) {
      logger.warn(`ALERT: Ada ${lowStockItems.length} produk dengan stok rendah:`);
      lowStockItems.forEach(item => {
        logger.warn(`- [${item.id}] ${item.name}: ${item.stock}`);
      });
    } else {
      logger.info('Semua stok dalam kondisi aman.');
    }
  } catch (err) {
    logger.error('Gagal memeriksa stok rendah:', err.message);
  }
};

const startLowStockJob = () => {
  cron.schedule('* * * * *', checkLowStock); 
  logger.info('Cronjob stok rendah aktif (interval: tiap 1 menit)');
};

module.exports = { startLowStockJob };
