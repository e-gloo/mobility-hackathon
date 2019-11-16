const mqtt = require("mqtt");
const axios = require("axios");
let client = mqtt.connect(
  "wss://team07:vp2pv227if@mr1dns3dpz5mjj.messaging.solace.cloud:8443"
);
let mission = [];
let position = { x: 0.0, y: 0.0 };
let paths = [];

client.on("connect", () => {
  client.publish(
    "team07/prod/user/mission",
    JSON.stringify({
      mission: "Yo !",
      positions: [
        { x: 8.6, y: 3.8 },
        { x: 0.2, y: 2.0 }
        // { x: 4.9, y: 3.8 },
      ]
    })
  );
});
