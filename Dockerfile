# Menggunakan image Node.js versi 18.12.1 sebagai base image
FROM node:18.12.1

# Menentukan direktori kerja di dalam container
WORKDIR /app/src

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstal dependensi aplikasi
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

# Menentukan environment variable untuk koneksi MongoDB
ENV MONGO_URL=mongodb://mongo:27017/test_case

# Menjalankan perintah saat container berjalan
CMD ["node", "server.js"]
