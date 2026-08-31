# ============================================================
# Backend Dockerfile — Python Flask API
# ============================================================
# Base Image: python:3.9-slim (minimal Debian with Python 3.9)
# Exposes:    Port 5000
# Entrypoint: python app.py
# ============================================================

FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements first — this layer is cached unless
# requirements.txt changes, speeding up rebuilds.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code
COPY . .

# Document the port this container listens on
EXPOSE 5000

# Start the Flask application
CMD ["python", "app.py"]
