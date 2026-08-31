/**
 * Frontend Server (Express.js)
 * ============================
 * This Express server serves the contact form UI and proxies form submissions
 * to the Flask backend API. In Docker Compose, it communicates with the backend
 * using the service name "backend" as the hostname.
 *
 * Routes:
 *   GET  /        → Render the contact form page
 *   POST /submit  → Forward form data to Flask backend and display result
 */

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// ──────────────────────────────────────────────
// Backend URL Configuration
// ──────────────────────────────────────────────
// In Docker Compose, the BACKEND_URL environment variable is set to
// "http://backend:5000" — Docker resolves "backend" to the container's IP
// via its internal DNS on the shared bridge network (app-network).
// When running locally (without Docker), it falls back to localhost.
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
console.log("Backend URL configured as:", BACKEND_URL);

// ──────────────────────────────────────────────
// Middleware Setup
// ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Template engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ──────────────────────────────────────────────
// Routes
// ──────────────────────────────────────────────

/**
 * GET / — Render the contact form page
 */
app.get("/", (req, res) => {
  console.log("Serving contact form page");
  res.render("index", { response: null, error: null });
});

/**
 * POST /submit — Handle form submission
 * Forwards the form data to the Flask backend and renders the result.
 */
app.post("/submit", async (req, res) => {
  console.log("Form submitted with data:", req.body);

  const { name, email, message } = req.body;

  try {
    // Forward the form data to the Flask backend as JSON
    console.log("Forwarding to backend at:", BACKEND_URL + "/submit");
    const result = await axios.post(BACKEND_URL + "/submit", {
      name,
      email,
      message,
    });

    console.log("Backend response:", result.data);
    res.render("index", { response: result.data, error: null });
  } catch (err) {
    // Handle backend errors or connection failures
    console.error("Error connecting to backend:", err.message);
    let errorMsg = "Could not connect to backend. Is it running?";
    if (err.response && err.response.data && err.response.data.error) {
      errorMsg = err.response.data.error;
    }
    res.render("index", { response: null, error: errorMsg });
  }
});

// ──────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});
