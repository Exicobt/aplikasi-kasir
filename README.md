## 1. Clone repo 
```git clone https://github.com/Exicobt/aplikasi-kasir.git```
```cd aplikasi-kasir```

## 2. Install dependensi
```npm install```

## 3. Buat file .env
Buat file ```.env``` di root folder dan isi:
```DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/NAMA_DATABASE"```

## 4. Buat file .env.local
Buat file ```.env.local``` di root folder dan isi:
```xIrtrCeSrGJy7KJm3ub5Ej2fe1CYU9Pyyk6BhvYsdS0```

## 5. Import sql
Buka folder ```script/db_warkop.sql```
Kemudian import ke mysql

## 6. Generate prisma client
```npx prisma generate```

## 7. Jalankan migrasi database
```npx prisma migrate dev --name init```

## 8. Jalankan program
```npm run dev```
Lalu buka http://localhost:3000

