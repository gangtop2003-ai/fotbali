// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000;

// توکن خودت را اینجا قرار بده
const TOKEN = "be3f2637d321403183375f3578badab9";

// اجازه همه origin ها (برای dev)
app.use(cors());

app.get("/api/competitions", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions", {
      headers: { "X-Auth-Token": TOKEN }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/competitions/:id/teams", async (req, res) => {
  const compId = req.params.id;
  try {
    const response = await fetch(`https://api.football-data.org/v4/competitions/${compId}/teams`, {
      headers: { "X-Auth-Token": TOKEN }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
