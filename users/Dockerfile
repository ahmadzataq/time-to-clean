# Gunakan image Node.js yang sesuai
FROM node:14

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode ke dalam container
COPY . .

# Ekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi dengan pengaturan memori yang lebih besar
CMD ["node", "--max-old-space-size=4096", "node_modules/.bin/react-scripts", "start"]
