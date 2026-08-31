const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { response: null, error: null });
});

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await axios.post(`${BACKEND_URL}/submit`, {
      name,
      email,
      message,
    });
    res.render("index", { response: response.data, error: null });
  } catch (err) {
    const errorMsg =
      err.response?.data?.error || "Failed to communicate with backend server";
    res.render("index", { response: null, error: errorMsg });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend server listening on port ${PORT}`);
});

