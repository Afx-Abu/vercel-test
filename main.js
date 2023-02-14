const express = require("express");
const router = express.Router();
const fs = require('fs')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://inrl:fasweeh@cluster0.l6mj2ez.mongodb.net/?retryWrites=true&w=majority')
 .then(() => console.log('Connected!')).catch((e)=> console.log(e));

const {makeid, vStore} = require('./Function');
const { toBuffer } = require("qrcode");
const { storedb } = require('./db')
const pino = require("pino");
const path = require('path');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, } = require("@adiwajshing/baileys");
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
app.get("/", async(req, res) => {
async function BotMd() {
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')
  try {
    let session = makeWASocket({
      printQRInTerminal: true,
      logger: pino({ level: "silent" }),
      browser: Browsers.macOS("Desktop"),
      auth: state
    });
    session.ev.on("connection.update", async (s) => {
      const { connection,lastDisconnect, qr } = s;
             if (qr) {
          res.sendFile(await toBuffer(qr))
        }
        if (connection == "open") {
        await delay(500);
            await vStore();
            let cc = 'Jsl~'+makeid().encryptedPlainText;
            await session.sendMessage(session.user.id, { text: cc });
            await require('child_process').exec('rm -rf auth_info_baileys')
            process.exit(1)
      }
      session.ev.on('creds.update', saveCreds)
      if (
        connection === "close" &&
        lastDisconnect &&
        lastDisconnect.error &&
        lastDisconnect.error.output.statusCode != 401
      ) {
        BotMd();
      }
    });
  } catch (err) {
    console.log(err);
    await require('child_process').exec('rm -rf auth_info_baileys')
    process.exit(1)
  }
}

BotMd();
});

module.exports = router;
