from flask import Flask, request, jsonify
from flask_cors import CORS  # need this so frontend can talk to backend

app = Flask(__name__)
CORS(app)

# basic home route - just to check if backend is running
@app.route("/")
def home():
    print("someone hit the home route")  # just for debugging
    return jsonify({"message": "Backend is running!", "status": "ok"})


# this route handles the form submission from frontend
@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    print("got data from frontend:", data)  # checking what we receive

    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")

    # make sure all fields are filled
    # spent a while figuring out the validation part
    if not name or not email or not message:
        print("validation failed - some field is empty")
        return jsonify({"success": False, "error": "please fill all fields"}), 400

    # just printing to console for now, not saving to db
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Message: {message}")

    return jsonify({
        "success": True,
        "message": "form submitted!",
        "data": {"name": name, "email": email, "message": message}
    })


if __name__ == "__main__":
    # NOTE: using debug=False here, had it as True before but thats
    # a security risk in production (mentor pointed this out)
    app.run(host="0.0.0.0", port=5000, debug=False)
