// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const path = require('path');
const app = express();

// Webseite aus dem /public Ordner bereitstellen
app.use(express.static(path.join(__dirname, "public")));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

const PORT = 3000;
const ONLINE_USERS = new Map();

// <-- DEINE DISCORD USER IDs -->
const TARGET_IDS = {
  "The_Pandora07": "950809951402610759",
  "Skyfox2": "837664312977653849",
  "HerrPlanet": "659459599317073940",
  "MFB_Kris": "958768074075570268",
  "SpeziKasten": "846079863148249118",
  "Alelx_": "698085078412165151",
  "Kobix": "1188805546049015880",
  "Icerice9": "965512624190136350"
};

// Discord Bot start
client.on('ready', async () => {
  console.log(`✅ Bot online als ${client.user.tag}`);

  const guild = client.guilds.cache.first();
  await guild.members.fetch(); // Mitglieder-Status laden

  setInterval(() => {
    for (const [name, id] of Object.entries(TARGET_IDS)) {
      const member = guild.members.cache.get(id);
      const status = member?.presence?.status ?? "offline";
      ONLINE_USERS.set(name, status);
    }
  }, 5000); // Aktualisiert alle 5 Sekunden
});

// API für die Website
app.get("/status", (req, res) => {
  res.json(Object.fromEntries(ONLINE_USERS));
});

// Server + Bot starten
client.login("MTM4NDEyMjcyMDcxOTA4MTU2Mg.G1Cym6.64f5B0ldKs9qfafIToCVuNUjSsosm3rWIW2yek");

app.listen(PORT, () =>
  console.log(`🌍 Webserver läuft → http://localhost:${PORT}`)
);
