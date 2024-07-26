# Gunakan base image Alpine Linux
FROM node:14-alpine

# Tetapkan direktori kerja
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin sisa kode aplikasi
COPY . .

# Tetapkan izin eksekusi untuk skrip di node_modules/.bin
RUN chmod +x node_modules/.bin/*

# Definisikan variabel lingkungan
ENV NODE_ENV=production

# Bangun aplikasi
RUN npm run build

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
