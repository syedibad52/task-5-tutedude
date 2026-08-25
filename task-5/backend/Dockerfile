# using python slim image to keep it small
FROM python:3.9-slim

WORKDIR /app

# copy requirements first so docker can cache this layer
# (learned this from the docker docs - saves time on rebuilds)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# now copy the rest of the app code
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
