from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!", "status": "ok"})

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")

    if not name or not email or not message:
        return jsonify({"success": False, "error": "Please fill all fields"}), 400

    print(f"Form submitted - Name: {name}, Email: {email}")
    return jsonify({
        "success": True,
        "message": "Form submitted successfully!",
        "data": {"name": name, "email": email, "message": message}
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
