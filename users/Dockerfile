# Gunakan base image yang sesuai
FROM node:14-alpine

# Tetapkan direktori kerja
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin kode aplikasi
COPY . .

# Definisikan variabel lingkungan (sesuaikan jika diperlukan)
ENV NODE_ENV=production

# Fase build
RUN npm run build

# Mulai aplikasi
CMD ["npm", "start"]
