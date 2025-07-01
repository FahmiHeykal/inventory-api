# Inventory Management API

Inventory Management API adalah backend RESTful berbasis Node.js, Express.js, dan PostgreSQL yang dibangun untuk mengelola data produk, supplier, dan transaksi stok barang. Proyek ini mendukung autentikasi JWT, otorisasi role-based, validasi input, ekspor data ke PDF dan CSV, serta dokumentasi Swagger.

## Teknologi
- Node.js & Express.js sebagai server backend
- PostgreSQL sebagai relational database
- JWT untuk autentikasi
- Joi untuk validasi input
- Swagger (OpenAPI 3.0) untuk dokumentasi API
- Jest untuk unit testing
- Cronjob untuk low-stock monitoring
- PDFKit dan json2csv untuk ekspor data

## Fitur
1. Autentikasi & Otorisasi
   - Login dan register user dengan JWT
   - Role-based access control: admin & staff
   - Middleware untuk validasi token dan hak akses

2. Manajemen Produk
   - CRUD produk dengan validasi
   - Soft delete : produk tidak dihapus dari database
   - Filter produk berdasarkan kategori, supplier, dan level stok
   - Pagination dan search support

3. Manajemen Supplier
   - CRUD data supplier
   - Relasi produk dengan supplier via foreign key

4. Transaksi Stok
   - Menambahkan transaksi stok IN (masuk) dan OUT (keluar)
   - Otomatis menambah atau mengurangi jumlah stok
   - Riwayat mutasi stok per produk

5. Ekspor Data
   - Ekspor data produk dan stok dalam format PDF dan CSV
   - File tersimpan sementara dalam folder /public

6. Dashboard
   - Ringkasan data : total produk, supplier, transaksi stok, dan produk dengan stok rendah

7. Validasi
   - Menggunakan Joi untuk validasi semua input
   - Penanganan error dengan middleware centralized

8. Cronjob
   - Cron berjalan tiap 1 menit untuk mengecek produk dengan stok < 10
   - Menampilkan warning log di console jika ditemukan

9. Dokumentasi API
   - Swagger UI di endpoint /api/docs
   - Menampilkan semua endpoint beserta parameter, response, dan contoh
  
10. Testing
   - Unit testing pada modul auth dan produk menggunakan Jest
   - Mocking database agar test efisien

## Struktur Folder
```
inventory-api/
├── src/
│   ├── config/               # Konfigurasi environment dan koneksi database
│   ├── controllers/          # HTTP handler
│   ├── docs/                 # Swagger setup
│   ├── jobs/                 # Cronjob untuk stok rendah
│   ├── middlewares/          # Auth, error, validator
│   ├── models/               # Query PostgreSQL
│   ├── routes/               # Routing per fitur
│   ├── services/             # Business logic per modul
│   ├── utils/                # Helper (jwt, response, logger)
│   ├── validators/           # Validasi menggunakan Joi
│   ├── app.js                # Setup express app
│   └── server.js             # Menjalankan server
├── database/
│   ├── migrations/           # File SQL pembuatan tabel
│   └── seeders/              # Data awal jika perlu
├── public/                   # Tempat menyimpan hasil ekspor
├── tests/                    # Unit test dengan Jest
├── .env                      # Environment config
├── .gitignore
├── package.json
└── README.md
```

## Instalasi
1. Clone repository
```bash
git clone https://github.com/username/inventory-api.git
cd inventory-api
```

2. Install dependencies :
```bash
npm install
```

4. Setup environment :
```
.env
```

5. Isi file .env :
```env
PORT=3000
DB_URL=postgresql://postgres:yourpassword@localhost:5432/inventory_db
JWT_SECRET=---
```

6. Setup database :
   - Buat database bernama inventory_db
   - Jalankan semua file SQL di folder database/migrations

7. Jalankan aplikasi :
```bash
npm run dev
```

Aplikasi akan berjalan di : 
```bash
http://localhost:3000
```

## Dokumentasi API
Buka dokumentasi Swagger di browser:
```bash
http://localhost:3000/api/docs
```

## Endpoint Penting

Authentication:
- POST /api/auth/register
- POST /api/auth/login

Produk:
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

Supplier:
- GET /api/suppliers
- POST /api/suppliers
- PUT /api/suppliers/:id
- DELETE /api/suppliers/:id

Stok:
- POST /api/stocks
- GET /api/stocks/:product_id

Dashboard:
- GET /api/dashboard/summary

Ekspor Data:
- GET /api/export/products/pdf
- GET /api/export/products/csv
- GET /api/export/stocks/pdf

## Testing
Untuk menjalankan unit test :
```bash
npm test
```
