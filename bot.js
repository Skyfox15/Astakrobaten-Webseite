require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const path = require('path');
const app = express();

// Statischer Ordner
app.use(express.static(path.join(__dirname, "public")));

// Optional: Wenn jemand die Root-URL aufruft
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Discord Bot Setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

const PORT = process.env.PORT || 3000;
const ONLINE_USERS = new Map();

const TARGET_IDS = {
  "The_Pandora07": "950809951402610759",
  "Skyfox2": "837664312977653849",
  "HerrPlanet": "659459599317073940",
  "MFB_Kris": "958768074075570268",
  "SpeziKasten": "846079863148249118",
  "Alelx_": "698085078412165151",
  "Kobix": "1188805546049015880",
  "Icerice9": "965512624190136350"
  "Shinoby_qp": "1243873178066092082",
  "Justen187": "1037827807469916241"

};

client.on('ready', async () => {
  console.log(`✅ Bot online als ${client.user.tag}`);
  const guild = client.guilds.cache.first();
  await guild.members.fetch();

  setInterval(() => {
    for (const [name, id] of Object.entries(TARGET_IDS)) {
      const member = guild.members.cache.get(id);
      const status = member?.presence?.status ?? "offline";
      ONLINE_USERS.set(name, status);
    }
  }, 5000);
});

app.get("/status", (req, res) => {
  res.json(Object.fromEntries(ONLINE_USERS));
});

// Token aus .env laden
client.login(process.env.DISCORD_TOKEN);

app.listen(PORT, () =>
  console.log(`🌍 Webserver läuft → http://localhost:${PORT}`)
);

