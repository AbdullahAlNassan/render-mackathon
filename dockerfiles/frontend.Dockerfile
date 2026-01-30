FROM node:20-alpine

WORKDIR /app

COPY frontend/Frontend-Mackathon/package*.json ./
RUN npm ci

COPY frontend/Frontend-Mackathon/ ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]