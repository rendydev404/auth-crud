# CRUD & Authentication API (Node.js - Express - MySQL)

Sebuah RESTful API sederhana namun fungsional untuk mengelola CRUD User dan Sistem Otentikasi (Authentication) menggunakan Node.js, Express, dan database MySQL. Proyek ini dilengkapi dengan keamanan berbasis enkripsi kata sandi (bcrypt) dan JSON Web Token (JWT).

---

## 🚀 Fitur Utama

- **Registrasi Pengguna (Register)**: Mendaftarkan pengguna baru dengan enkripsi password menggunakan `bcryptjs`.
- **Autentikasi (Login)**: Verifikasi kredensial pengguna dan pembuatan token JWT (`jsonwebtoken`) yang berlaku selama 1 hari.
- **Manajemen Pengguna (CRUD)**:
  - Melihat semua daftar user (terproteksi JWT).
  - Melihat satu user berdasarkan ID (terproteksi JWT).
  - Mengubah informasi nama dan email user (terproteksi JWT).
  - Mengubah password user (terproteksi JWT).
  - Menghapus akun user (terproteksi JWT).
- **Security Middleware**: Proteksi rute sensitif menggunakan Authorization Bearer Token.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) (`mysql2`)
- **Security & Auth**: `bcryptjs` & `jsonwebtoken` (JWT)
- **Development Tool**: `nodemon` (auto-restart server)

---

## 📋 Prasyarat (Prerequisites)

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal aplikasi berikut:
- **Node.js** (versi 14 ke atas recommended)
- **MySQL Server** (XAMPP / Laragon / MySQL Workbench)
- **Postman** (untuk uji coba API)

---

## ⚙️ Cara Instalasi & Menjalankan Proyek

### 1. Kloning Repositori
```bash
git clone https://github.com/rendydev404/auth-crud.git
cd auth-crud
```

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal modul-modul yang dibutuhkan:
```bash
npm install
```

### 3. Konfigurasi Database
1. Buka MySQL Server Anda (misal lewat phpMyAdmin).
2. Buat database baru bernama `crudauth_db`.
3. Jalankan query SQL berikut untuk membuat tabel `users`:

```sql
CREATE DATABASE IF NOT EXISTS `crudauth_db`;
USE `crudauth_db`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

> **Catatan**: Jika kredensial database Anda berbeda dengan bawaan (Host: `localhost`, User: `root`, Password: ``), sesuaikan konfigurasinya pada file [config/db.js](file:///c:/Users/AK/Desktop/crud-auth/config/db.js).

### 4. Konfigurasi Environment Variables (`.env`)
Buat file bernama `.env` di root folder proyek ini (sejajar dengan `package.json`) lalu isi dengan port server:
```env
PORT=3000
```

### 5. Jalankan Server
Jalankan server dalam mode development menggunakan perintah:
```bash
npm start
```
Server akan berjalan di `http://localhost:3000`. Jika koneksi database berhasil, Anda akan melihat pesan:
```text
Database connected
Server running on port 3000
```

---

## 🛡️ Dokumentasi API Endpoints

Semua endpoint API memiliki prefix `/api`. 
Rute yang ditandai **Ya** pada kolom **Butuh Token?** memerlukan header `Authorization: Bearer <your_jwt_token>`.

| HTTP Method | Endpoint | Butuh Token? | Deskripsi |
| :--- | :--- | :---: | :--- |
| **POST** | `/api/register` | Tidak | Mendaftarkan akun user baru (body: `name`, `email`, `password`) |
| **POST** | `/api/login` | Tidak | Login user & mendapatkan JWT Token (body: `email`, `password`) |
| **GET** | `/api/users` | **Ya** | Mendapatkan semua data user |
| **GET** | `/api/users/:id` | **Ya** | Mendapatkan detail data satu user berdasarkan ID |
| **PUT** | `/api/users/:id` | **Ya** | Mengupdate data user (body: `name`, `email`) |
| **PUT** | `/api/change-password/:id` | **Ya** | Mengubah password user (body: `oldPassword`, `newPassword`) |
| **DELETE** | `/api/users/:id` | **Ya** | Menghapus user berdasarkan ID |

---

## 🧪 Pengujian Menggunakan Postman

Proyek ini telah dilengkapi dengan file koleksi Postman untuk mempermudah pengujian.

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** lalu pilih file `postman_collection.json` dari folder proyek ini.
3. Koleksi **CURD Auth API** akan muncul di sidebar Postman Anda.
4. Koleksi ini telah dikonfigurasi menggunakan variabel dinamis:
   - `{{base_url}}`: Otomatis mengarah ke `http://localhost:3000/api`.
   - `{{token}}`: Nilai token JWT akan **otomatis tersimpan** di variabel koleksi setelah Anda berhasil melakukan request **Login User**.
   - `{{userId}}`: Silakan sesuaikan dengan ID user yang ingin diuji untuk operasi detail, update, ubah password, atau hapus.

---

## 📁 Struktur Folder Proyek

```text
crud-auth/
├── config/
│   └── db.js                 # Koneksi database MySQL
├── controllers/
│   └── userController.js     # Logika bisnis utama (Auth & CRUD)
├── middleware/
│   └── authMiddleware.js     # Verifikasi token JWT
├── models/
│   └── userModel.js          # Query database MySQL (User Model)
├── routes/
│   └── userRoutes.js         # Definisi rute API
├── .gitignore                # File / folder yang diabaikan oleh Git
├── app.js                    # Entry point aplikasi Express
├── package.json              # Informasi proyek & dependensi npm
├── postman_collection.json   # Koleksi uji coba API Postman
└── README.md                 # Dokumentasi proyek
```

---
Dibuat dengan 💻 oleh [rendydev404](https://github.com/rendydev404).
