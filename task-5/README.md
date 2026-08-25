# Docker Full Stack App - Task 5

This is my docker compose project with a Node.js frontend and Flask backend. The frontend has a contact form and it sends the data to the flask backend using an API call.

## what i built

- **Frontend**: Express.js server with EJS template for the contact form
- **Backend**: Flask API that receives form data and returns a response
- **Docker Compose**: ties everything together so both containers run on the same network

## project structure

```
task-5/
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── server.js
│   ├── views/
│   │   └── index.ejs
│   └── public/
│       └── style.css
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── app.py
│   └── requirements.txt
├── docker-compose.yaml
├── .gitignore
└── README.md
```

## how to run it

You need Docker and Docker Compose installed first.

```bash
# clone the repo
git clone <github-repo-url>
cd task-5

# build and start everything
docker-compose up --build

# to stop it
docker-compose down
```

Then open http://localhost:3000 for the frontend and http://localhost:5000 to check the backend directly.

## environment variables

| Variable | Used in | What it does |
|----------|---------|-------------|
| BACKEND_URL | frontend | tells the express server where flask is running. in docker compose this is set to `http://backend:5000` because docker compose lets you use the service name as hostname |

When running in docker compose, the containers are on a shared network (called `app-network`). So the frontend container can reach the backend just by using `http://backend:5000` - docker resolves "backend" to the right container IP. Without docker compose you would need to use `http://localhost:5000` instead.

## docker hub

```bash
# login first
docker login

# tag the images (replace with your username)
docker tag task-5-frontend yourusername/task5-frontend:latest
docker tag task-5-backend yourusername/task5-backend:latest

# push them
docker push yourusername/task5-frontend:latest
docker push yourusername/task5-backend:latest
```

## what i learned

- docker compose makes it way easier to run multiple containers together vs running `docker run` commands separately
- the networking part was confusing at first - i didnt realize that docker compose creates a network automatically and you can just use the service name as a hostname
- had to learn about CORS because the frontend and backend are different services - flask-cors fixed that
- dockerignore files help keep the image smaller by not copying stuff like node_modules or __pycache__
- health checks are useful so docker knows if a container is actually working and not just running

## problems i ran into

1. **CORS error** - when frontend tried to call backend i got a CORS error in the browser. had to add flask-cors to the backend
2. **backend not found** - at first i was using `localhost` for BACKEND_URL inside docker which doesnt work because each container has its own localhost. changed it to use the service name `backend`
3. **debug=True** - i had flask running with debug=True which is a security problem. changed to debug=False
4. **container startup order** - sometimes frontend started before backend was ready. fixed with depends_on and health checks in docker-compose

## tech stack

- Node.js + Express (frontend)
- Python Flask (backend)
- Docker + Docker Compose
- EJS templates
