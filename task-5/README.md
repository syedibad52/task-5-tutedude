# Docker Full Stack App

A simple multi-container application with Node.js/Express frontend and Python/Flask backend, managed with Docker Compose.

## Overview

This project shows how to containerize a full-stack app with two separate services. The frontend is a Node.js Express server that serves a contact form, and the backend is a Python Flask API that processes form submissions. Both run in Docker containers and communicate over a shared network.

## Architecture

```
Frontend (Express, port 3000)
           |
           v
Backend (Flask, port 5000)
```

The frontend sends form data to the backend via HTTP. Both services run in their own containers but can communicate because they're on the same Docker network.

## Project Structure

```
task-5/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── views/
│   │   └── index.ejs
│   └── public/
│       └── style.css
├── backend/
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
└── docker-compose.yaml
```

## Running the App

```bash
# Build and run
docker-compose up --build

# Stop
docker-compose down
```

The frontend will be at http://localhost:3000 and the backend at http://localhost:5000.

## How It Works

1. User opens http://localhost:3000 and sees a contact form
2. User fills out the form and clicks submit
3. The Express server sends the data to the Flask backend at http://backend:5000/submit
4. Flask validates the data and returns a response
5. The response is displayed to the user

The key is that the frontend and backend are on the same Docker network, so they can find each other using service names (e.g., `http://backend:5000` instead of localhost).

## Pushing to Docker Hub

```bash
docker login
docker build -t myusername/task5-frontend:latest -f frontend/Dockerfile frontend/
docker build -t myusername/task5-backend:latest -f backend/Dockerfile backend/
docker push myusername/task5-frontend:latest
docker push myusername/task5-backend:latest
```

Replace `myusername` with your Docker Hub username.

## Tech Stack

- **Frontend**: Node.js, Express, EJS
- **Backend**: Python, Flask
- **Orchestration**: Docker Compose
- **Networking**: Docker bridge network
| Backend | Python 3.9 + Flask 3.0 |
| HTTP Client | Axios 1.6 |
| Containerization | Docker + Docker Compose |
| Template Engine | EJS |
| CORS | flask-cors 4.0 |

---

## 📄 License

This project was created as part of the **TuteDude Docker Assignment (Task 5)**.
