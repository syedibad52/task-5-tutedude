from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"status": "ok", "message": "Backend service is running"})

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields (name, email, message) are required."}), 400

    print(f"Form submission received: Name={name}, Email={email}")
    return jsonify({
        "success": True,
        "message": "Form submitted successfully!",
        "data": {
            "name": name,
            "email": email,
            "message": message
        }
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

