# Simple Expense Tracker (Backend)

Backend API sederhana untuk mencatat pengeluaran harian menggunakan:
- Node.js
- Hapi.js framework
- SQLite sebagai database
- Validasi dengan Joi
- Autentikasi JWT
- Export ke CSV

## Fitur Utama
- Autentikasi pengguna (register & login)
- CRUD data pengeluaran (expense)
- Filter berdasarkan tanggal, bulan, tahun, dan kategori
- Reset password
- Export data ke CSV
- Validasi input menggunakan Joi
- Menyimpan data persist di SQLite

## Instalasi
```bash
git clone https://github.com/saabet/simple-expense-tracker.git
cd simple-expense-tracker
npm install
```

## Konfigurasi .env
```env
PORT=5000
JWT_SECRET=your_secret_key
```

## Menjalankan Server
```bash
node server.js
```
Server akan berjalan di :
```
http://localhost:5000
```

## Autentikasi
Gunakan header berikut untuk endpoint yang memerlukan login:
```makefile
Authorization: Bearer <your_token>
```

## Endpoint API
### Auth
| Method | Endpoint | Keterangan |
| --- | --- | --- |
| POST | `/auth/register` | Daftar user baru |
| POST | `/auth/login` | Login user |
| POST | `/auth/reset-password` | Ganti password |

### Expenses
| Method | Endpoint | Keterangan |
| --- | --- | --- |
| POST | `/expenses` | Tambah pengeluaran |
| GET | `/expenses` | Lihat semua pengeluaran |
| GET | `/expenses/{id}` | Lihat detail pengeluaran tertentu |
| GET | `/expenses/summary` | Lihat ringkasan total & per kategori |
| GET | `/expenses/export/csv` | Unduh pengeluaran sebagai CSV
| PUT | `/expenses/{id}` | Edit pengeluaran |
| DELETE | `/expenses/{id}` | Hapus pengeluaran |

#### Query Parameters:
- `startDate` / `endDate` &#8594; filter berdasarkan rentang tanggal
- `month` / `year` &#8594; filter berdasarkan bulan/tahun
- `category` &#8594; filter berdasarkan kategori

### Struktur Folder
```pgsql
.
├── server.js
├── .env
├── exports/
|   └── expenses/
|       └── expenses.csv
└── src/
    ├── api/
    │   ├── auth/
    |   |   ├── handler.js
    |   |   ├── index.js
    |   |   └── routes.js
    │   └── expenses/
    |       ├── handler.js
    |       ├── index.js
    |       └── routes.js
    ├── db/
    │   └── database.js
    ├── services/
    |   ├── expensesService.js
    |   └── userService.js
    ├── utils/
    |   ├── responseBuider.js
    |   ├── responseWrapper.js
    |   └── tokenUtils.js
    └── validations/
        ├── authValidations.js
        └── expenseValidation.js
```

### Contoh Format CSV (Output)
```csv
Date,Title,Category,Amount
2025-07-01,Jalan jalan,Belanja,25000
2025-07-01,makan siang,Makanan,50000
2025-07-01,makan malam,Makanan,15000
```

### Note
- Semua data disimpan secara lokal di SQLite (`/data/expenses.db`)
- Folder `/exports` akan dibuat secara otomatis jika belum ada



