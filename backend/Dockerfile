FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate

# Make startup script executable
RUN chmod +x start.sh

EXPOSE 5000

# Automatically runs migrations then starts the server
CMD ["sh", "start.sh"]
