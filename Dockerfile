# Multi-stage build for frontend and backend

# Stage 1: Build frontend
FROM node:20-alpine AS frontend_builder

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json* frontend/pnpm-lock.yaml* frontend/yarn.lock* ./
RUN npm install --legacy-peer-deps

COPY frontend . 
RUN npm run build

# Stage 2: Final image with both frontend and backend
FROM python:3.11-slim

# Install Node.js and npm
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg \
    libgomp1 \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install serve to run the frontend
RUN npm install -g serve

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install PyTorch CPU version
RUN pip install --no-cache-dir \
    torch --index-url https://download.pytorch.org/whl/cpu

# Copy and install backend requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend ./backend

# Copy built frontend from builder
COPY --from=frontend_builder /frontend/dist ./frontend_dist

# Create entrypoint script to run both services
RUN echo '#!/bin/bash\n\
set -e\n\
echo "Starting Backend..."\n\
gunicorn -w 1 -k uvicorn.workers.UvicornWorker backend.app.main:app -b 0.0.0.0:8000 &\n\
BACKEND_PID=$!\n\
sleep 2\n\
echo "Starting Frontend..."\n\
serve -s /app/frontend_dist -l 3000 &\n\
FRONTEND_PID=$!\n\
wait $BACKEND_PID $FRONTEND_PID' > /entrypoint.sh && chmod +x /entrypoint.sh

# Expose both ports
EXPOSE 3000 8000

ENTRYPOINT ["/entrypoint.sh"]
