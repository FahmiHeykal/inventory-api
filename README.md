# Inventory Management API

Inventory Management API is a RESTful backend built with Node.js, Express.js, and PostgreSQL to manage product data, suppliers, and stock transactions. This project supports JWT authentication, role-based authorization, input validation, data export to PDF and CSV, and Swagger documentation.

## Technologies
- Node.js & Express.js 
- PostgreSQL
- JWT 
- Joi
- Swagger 
- Jest 
- Cronjob 
- PDFKit and json2csv 

## Features
1. Authentication & Authorization  
   - User login and register with JWT  
   - Role-based access control: admin & staff  
   - Middleware for token validation and access rights  

2. Product Management  
   - Product CRUD with validation  
   - Soft delete: product is not removed from the database  
   - Filter products by category, supplier, and stock level  
   - Pagination and search support  

3. Supplier Management  
   - CRUD operations for supplier data  
   - Product relation to supplier via foreign key  

4. Stock Transactions  
   - Add stock IN (incoming) and OUT (outgoing) transactions  
   - Automatically increase or decrease stock quantity  
   - Stock mutation history per product  

5. Data Export  
   - Export product and stock data in PDF and CSV formats  
   - Files temporarily stored in `/public` folder  

6. Dashboard  
   - Data summary: total products, suppliers, stock transactions, and low-stock products  

7. Validation  
   - Using Joi to validate all inputs  
   - Error handling with centralized middleware  

8. Cronjob  
   - Runs every 1 minute to check products with stock < 10  
   - Displays warning log in console if any found  

9. API Documentation  
   - Swagger UI available at `/api/docs` endpoint  
   - Displays all endpoints with parameters, responses, and examples  

10. Testing  
   - Unit testing for auth and product modules using Jest  
   - Database mocking for efficient test runs

## Struktur Folder
```
inventory-api/
├── src/
│   ├── config/               
│   ├── controllers/         
│   ├── docs/                
│   ├── jobs/                 
│   ├── middlewares/        
│   ├── models/               
│   ├── routes/               
│   ├── services/             
│   ├── utils/               
│   ├── validators/          
│   ├── app.js                
│   └── server.js             
├── database/
│   ├── migrations/           
├── public/                   
├── tests/                    
├── .env                      
├── .gitignore
├── package.json
└── README.md
```

## Installation
1. Clone repository
```bash
git clone https://github.com/username/inventory-api.git
cd inventory-api
```

2. Install dependencies :
```bash
npm install
```

3. Setup environment :
```
.env
```

4. Fill the .env file :
```env
PORT=3000
DB_URL=postgresql://postgres:yourpassword@localhost:5432/inventory_db
JWT_SECRET=---
```

5. Setup database :
   - Create a database named `inventory_db`
   - Execute all SQL files in the `database/migrations` folder

6. Run the application :
```bash
npm run dev
```

The app will run on : 
```bash
http://localhost:3000
```

## API Documentation
Open Swagger documentation in the browser :
```bash
http://localhost:3000/api/docs
```

## Key Endpoints

Authentication :
- POST /api/auth/register
- POST /api/auth/login

Products :
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

Suppliers :
- GET /api/suppliers
- POST /api/suppliers
- PUT /api/suppliers/:id
- DELETE /api/suppliers/:id

Stock :
- POST /api/stocks
- GET /api/stocks/:product_id

Dashboard :
- GET /api/dashboard/summary

Data Export :
- GET /api/export/products/pdf
- GET /api/export/products/csv
- GET /api/export/stocks/pdf

## Testing
To run unit tests :
```bash
npm test
```
