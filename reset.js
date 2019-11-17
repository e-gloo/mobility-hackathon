const mqtt = require("mqtt");

let client = mqtt.connect(
  "wss://team07:vp2pv227if@mr1dns3dpz5mjj.messaging.solace.cloud:8443"
);

client.on("connect", () => {
  client.publish("team07/prod/city/reset", null);
  client.publish(
    "team07/prod/user/path-to-target",
    JSON.stringify({
      vehicle_type: "car",
      path: [[1.9, 3.8], [2.0, 3.8]],
      costs: [0.0, 0.0]
    })
  );
  // client.publish(
  //   "team07/prod/user/path-to-target",
  //   JSON.stringify({
  //     vehicle_type: "walk",
  //     path: [[5.5, 3.8], [5.6, 3.8]],
  //     costs: [0.0, 0.0]
  //   })
  // );
  client.publish(
    "team07/prod/context/change/weather",
    JSON.stringify({
      condition: "normal"
    })
  );
  client.publish(
    "team07/prod/context/change/air",
    JSON.stringify({
      condition: "normal"
    })
  );

  client.end();
});
