const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// this is the url for the flask backend
// when running in docker compose, "backend" is the service name
// docker compose creates a network so containers can find each other by name
// if running locally without docker, falls back to localhost
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
console.log("Backend URL is set to:", BACKEND_URL);

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// using ejs for templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// home page - shows the form
app.get("/", (req, res) => {
  console.log("home page loaded");
  res.render("index", { response: null, error: null });
});

// when user submits the form, we send data to flask backend
app.post("/submit", async (req, res) => {
  console.log("form submitted with data:", req.body);

  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  try {
    // sending data to flask backend
    console.log("sending to backend at:", BACKEND_URL + "/submit");
    const result = await axios.post(BACKEND_URL + "/submit", {
      name: name,
      email: email,
      message: message
    });

    console.log("got response from backend:", result.data);
    res.render("index", { response: result.data, error: null });

  } catch (err) {
    // if backend is down or returns error
    console.log("error connecting to backend:", err.message);
    let errorMsg = "Could not connect to backend. Is it running?";
    if (err.response && err.response.data && err.response.data.error) {
      errorMsg = err.response.data.error;
    }
    res.render("index", { response: null, error: errorMsg });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Frontend running on http://localhost:" + PORT);
});
