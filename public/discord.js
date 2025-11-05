// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers] });

const PORT = 3000;
const ONLINE_USERS = new Map();

const TARGET_IDS = {
  'The_Pandora07': '123456789012345678',
  'Skyfox2': '234567890123456789',
  'HerrPlanet': '345678901234567890',
  'MFB_Kris': '456789012345678901',
  'Hebli': '567890123456789012',
  'Alelx_': '678901234567890123',
  'DistJubo': '789012345678901234',
  'Kobix': '890123456789012345'
};

client.on('ready', async () => {
  console.log(`Bot ist online als ${client.user.tag}`);
  const guild = client.guilds.cache.first();
  await guild.members.fetch(); // Cache alle Member

  setInterval(() => {
    for (const [name, id] of Object.entries(TARGET_IDS)) {
      const member = guild.members.cache.get(id);
      if (!member) continue;

      const status = member.presence?.status ?? 'offline';
      ONLINE_USERS.set(name, status);
    }
  }, 10000); // alle 10 Sekunden
});

// API-Endpunkt für Frontend
app.get('/status', (req, res) => {
  const response = {};
  for (const [name, status] of ONLINE_USERS.entries()) {
    response[name] = status;
  }
  res.json(response);
});

client.login('DEIN_BOT_TOKEN');
app.listen(PORT, () => console.log(`API läuft auf Port ${PORT}`));
