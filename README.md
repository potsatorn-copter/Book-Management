# 📚 Book Management

ระบบจัดการหนังสืออย่างง่าย (Book Management) ที่พัฒนาโดยใช้ **Go (Fiber Framework)** เป็นฝั่ง Backend และ **React** เป็นฝั่ง Frontend  
พร้อมเชื่อมต่อฐานข้อมูล **PostgreSQL** และใช้ **UUID** แทนการนับ ID อัตโนมัติ เพื่อความปลอดภัยและป้องกันข้อมูลซ้ำ  

---

## 🚀 Features

- ✅ CRUD (Create / Read / Update / Delete) หนังสือครบทุกฟังก์ชัน  
- 🌞🌙 Light / Dark Mode Toggle   
- 🧩 ใช้ UUID เป็นรหัสหนังสือไม่ซ้ำกัน  
- ⚙️ Backend ด้วย Go Fiber Framework  
- 💾 เชื่อมต่อ PostgreSQL ด้วย GORM ORM  
- 🧱 Frontend ใช้ React + Axios สื่อสารกับ API  


---

## 🧠 System Flow

1. ผู้ใช้เปิดเว็บ React ที่รันบนพอร์ต `5173`
2. React ดึงข้อมูลหนังสือทั้งหมดจาก API `http://localhost:8080/books`
3. สามารถเพิ่ม แก้ไข หรือลบหนังสือได้:
   - ➕ `POST /books` → เพิ่มหนังสือใหม่ (UUID ถูกสร้างใน backend อัตโนมัติ)
   - ✏️ `PUT /books/:id` → แก้ไขข้อมูลหนังสือตาม UUID
   - ❌ `DELETE /books/:id` → ลบหนังสือออกจากฐานข้อมูลจริง
4. React จะรีเฟรชข้อมูลจาก Database หลัง CRUD ทุกครั้ง  

---


## ⚙️ วิธีติดตั้งและรันโปรเจกต์

> 🔧 **หมายเหตุ:** ต้องติดตั้ง **Go**, **Node.js**, และ **PostgreSQL** ก่อนเริ่ม

### 🐘 1. ตั้งค่า Database (PostgreSQL)

1. เปิด **pgAdmin** หรือใช้ command line ก็ได้  
2. สร้างฐานข้อมูลใหม่ชื่อ `bookdb`  
   ```sql
   CREATE DATABASE bookdb;
   จดชื่อผู้ใช้ (username) และรหัสผ่าน (password) ไว้
เพราะต้องใช้ในไฟล์ .env

### 2.ตั้งค่า Backend (Go + Fiber)
 ```bash
cd backend
go mod tidy
 ```

สร้างไฟล์ .env แล้วใส่ค่าดังนี้
 ```bash
PORT=8080
DB_HOST=localhost
DB_USER=ตั้งเอง
DB_PASS=ตั้งเอง
DB_NAME=bookdb
DB_PORT=5432

 ```
อย่าลืมเปลี่ยน username และ password
และสั่ง go 
 ```bash
run main.go
 ```

### 3.ตั้งค่า Frontend (React + Vite)
 ```bash
cd frontend
npm install
npm run dev
 ```
เปิดเบราว์เซอร์เข้าไปที่:
👉 http://localhost:5173

