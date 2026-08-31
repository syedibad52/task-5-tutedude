Docker Task 5 - Multi-Container Web Application
This repository contains a containerized full-stack web application built using Node.js (Express) for the frontend and Python (Flask) for the backend, orchestrated with Docker Compose.

🏗️ Architecture & Networking
+-------------------------------------------------------------------+
|                        Docker Bridge Network                      |
|                                                                   |
|   +-----------------------+           +-----------------------+   |
|   |   Frontend Service    |  HTTP     |    Backend Service    |   |
|   |  (Node.js / Express)  | --------> |    (Python / Flask)   |   |
|   |     Port: 3000        |  POST     |      Port: 5000       |   |
|   +-----------------------+           +-----------------------+   |
|               ^                                                   |
+---------------+---------------------------------------------------+
                |
          Host Browser (http://localhost:3000)
Key Technical Details
Frontend: Express server renders an HTML form using EJS. When a user submits the form, Express makes a server-side POST request to http://backend:5000/submit.
Backend: Flask API endpoint /submit processes and validates JSON data, returning a status message.
No CORS Needed: Because form submissions are handled server-to-server between containers inside the internal Docker bridge network (app-network), browser CORS restrictions do not apply, and flask-cors is intentionally omitted.
📁 Project Structure
task-5/
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── public/
│   │   └── style.css
│   └── views/
│       └── index.ejs
├── screenshots/
│   ├── 01-project-structure.png
│   ├── 02-architecture-diagram.png
│   ├── 03-contact-form-ui.png
│   ├── 04-docker-compose-running.png
│   ├── 05-docker-hub-push.png
│   └── 06-github-push.png
├── docker-compose.yaml
└── README.md
🚀 Local Deployment Instructions
Clone the repository:

git clone https://github.com/syedibad52/task-5-tutedude.git
cd task-5
Start containers with Docker Compose:

docker-compose up --build
Access the application:

Frontend UI: http://localhost:3000
Backend API: http://localhost:5000
Stop the containers:

docker-compose down
📦 Proof of Pushing Images to Docker Hub
The frontend and backend images have been built, tagged, and pushed to Docker Hub repositories.

Build and Push Commands
# Login to Docker Hub
docker login

# Build images
docker build -t syedibad52/task5-frontend:latest ./frontend
docker build -t syedibad52/task5-backend:latest ./backend

# Push images to Docker Hub
docker push syedibad52/task5-frontend:latest
docker push syedibad52/task5-backend:latest
Docker Hub Repositories
Frontend Image: docker.io/syedibad52/task5-frontend:latest
Backend Image: docker.io/syedibad52/task5-backend:latest
(Screenshot evidence of pushed images is stored in screenshots/05-docker-hub-push.png)

🐙 Proof of Pushing Code to GitHub
The complete source code and project configuration have been committed and pushed to GitHub.

Git Commands Executed
git add .
git commit -m "Fix mentor feedback: remove CORS, simplify comments, add deployment evidence"
git push origin master
GitHub Repository Link
Repository URL: https://github.com/syedibad52/task-5-tutedude
(Screenshot evidence of GitHub repository and commit history is stored in screenshots/06-github-push.png)
