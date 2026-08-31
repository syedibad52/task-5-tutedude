"""
Backend API Server (Flask)
==========================
This Flask application serves as the backend API for the Docker Full Stack App.
It exposes two endpoints:
  - GET  /         → Health check (returns JSON status)
  - POST /submit   → Accepts contact form data (name, email, message)

CORS is enabled so the frontend container can communicate with this backend
even though they run on different ports.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS  # Required for cross-origin requests from frontend

app = Flask(__name__)
CORS(app)


# ──────────────────────────────────────────────
# Health Check Endpoint
# ──────────────────────────────────────────────
@app.route("/")
def home():
    """Simple health check — used by Docker Compose health checks."""
    print("Health check: home route accessed")
    return jsonify({"message": "Backend is running!", "status": "ok"})


# ──────────────────────────────────────────────
# Form Submission Endpoint
# ──────────────────────────────────────────────
@app.route("/submit", methods=["POST"])
def submit():
    """
    Receives contact form data as JSON from the frontend.
    Expects: { "name": "...", "email": "...", "message": "..." }
    Returns: success/failure JSON response.
    """
    data = request.get_json()
    print("Received data from frontend:", data)

    # Extract fields with safe defaults
    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")

    # Validate — all fields are required
    if not name or not email or not message:
        print("Validation failed — one or more fields are empty")
        return jsonify({"success": False, "error": "Please fill all fields"}), 400

    # Log the submission (no database in this demo)
    print(f"  Name:    {name}")
    print(f"  Email:   {email}")
    print(f"  Message: {message}")

    return jsonify({
        "success": True,
        "message": "Form submitted successfully!",
        "data": {"name": name, "email": email, "message": message}
    })


# ──────────────────────────────────────────────
# Application Entry Point
# ──────────────────────────────────────────────
if __name__ == "__main__":
    # NOTE: debug=False for security in production.
    # debug=True exposes an interactive debugger which is a security risk.
    app.run(host="0.0.0.0", port=5000, debug=False)
