const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');

const generateFilePath = (filename) => path.join(__dirname, '../../public', filename);

const generatePDF = (products, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.fontSize(18).text('Laporan Produk', { align: 'center' });
    doc.moveDown();
    products.forEach((p, i) => {
      doc.fontSize(12).text(`${i + 1}. ${p.name} - ${p.category} - Stok: ${p.stock}`);
    });
    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};

const generateCSV = (products, filePath) => {
  const parser = new Parser();
  const csv = parser.parse(products);
  fs.writeFileSync(filePath, csv);
};

exports.exportProductsPDF = async (req, res) => {
  try {
    const { rows: products } = await db.query(`SELECT * FROM products WHERE is_deleted = FALSE`);
    const filePath = generateFilePath('laporan-produk.pdf');

    await generatePDF(products, filePath);
    res.download(filePath);
  } catch (err) {
    console.error('Gagal export PDF:', err);
    res.status(500).json({ message: 'Gagal export PDF', error: err.message });
  }
};

exports.exportProductsCSV = async (req, res) => {
  try {
    const { rows: products } = await db.query(`SELECT * FROM products WHERE is_deleted = FALSE`);
    const filePath = generateFilePath('laporan-produk.csv');

    generateCSV(products, filePath);
    res.download(filePath);
  } catch (err) {
    console.error('Gagal export CSV:', err);
    res.status(500).json({ message: 'Gagal export CSV', error: err.message });
  }
};

exports.exportSuppliersPDF = async (req, res) => {
  try {
    const { rows: suppliers } = await db.query(`SELECT * FROM suppliers`);
    const filePath = generateFilePath('laporan-supplier.pdf');

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(18).text('Laporan Supplier', { align: 'center' });
    doc.moveDown();

    suppliers.forEach((s, i) => {
      doc.fontSize(12).text(`${i + 1}. ${s.name} - ${s.contact}`);
    });

    doc.end();

    stream.on('finish', () => res.download(filePath));
    stream.on('error', (err) => {
      throw err;
    });

  } catch (err) {
    console.error('Gagal export supplier PDF:', err);
    res.status(500).json({ message: 'Gagal export PDF', error: err.message });
  }
};

exports.exportSuppliersCSV = async (req, res) => {
  try {
    const { rows: suppliers } = await db.query(`SELECT * FROM suppliers`);
    const filePath = generateFilePath('laporan-supplier.csv');

    const parser = new Parser();
    const csv = parser.parse(suppliers);

    fs.writeFileSync(filePath, csv);
    res.download(filePath);
  } catch (err) {
    console.error('Gagal export supplier CSV:', err);
    res.status(500).json({ message: 'Gagal export CSV', error: err.message });
  }
};

exports.exportStocksPDF = async (req, res) => {
  try {
    const { rows: stocks } = await db.query(`
      SELECT s.id, p.name AS product_name, s.type, s.quantity, s.note, s.created_at
      FROM stocks s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.created_at DESC
    `);

    const filePath = generateFilePath('laporan-stok.pdf');
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(18).text('Laporan Transaksi Stok', { align: 'center' });
    doc.moveDown();

    stocks.forEach((s, i) => {
      doc.fontSize(12).text(`${i + 1}. [${s.type}] ${s.product_name} - Qty: ${s.quantity} - ${s.note}`);
    });

    doc.end();

    stream.on('finish', () => res.download(filePath));
    stream.on('error', (err) => {
      throw err;
    });
  } catch (err) {
    console.error('Gagal export stok PDF:', err);
    res.status(500).json({ message: 'Gagal export PDF', error: err.message });
  }
};

exports.exportStocksCSV = async (req, res) => {
  try {
    const { rows: stocks } = await db.query(`
      SELECT s.id, p.name AS product_name, s.type, s.quantity, s.note, s.created_at
      FROM stocks s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.created_at DESC
    `);

    const filePath = generateFilePath('laporan-stok.csv');
    const parser = new Parser();
    const csv = parser.parse(stocks);

    fs.writeFileSync(filePath, csv);
    res.download(filePath);
  } catch (err) {
    console.error('Gagal export stok CSV:', err);
    res.status(500).json({ message: 'Gagal export CSV', error: err.message });
  }
};
