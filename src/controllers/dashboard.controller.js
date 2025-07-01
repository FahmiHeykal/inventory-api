const dashboardService = require('../services/dashboard.service');

const getSummary = async (req, res, next) => {
  try {
    console.log('[INFO] Memproses request dashboard summary...');

    const data = await dashboardService.getSummary();

    console.log('[INFO] Summary berhasil diambil:', data);

    res.status(200).json({
      message: 'Dashboard summary',
      data,
    });
  } catch (err) {
    console.error('[ERROR] Gagal ambil dashboard summary:', err.message);
    next(err);
  }
};

module.exports = {
  getSummary,
};
