import mqtt from "mqtt";
import { config, topics } from "./config";

const client = mqtt.connect(
  `wss://${config.BROKER_USER}:${config.BROKER_PASSWORD}@${config.BROKER_DOMAIN}:${config.BROKER_MQTT_PORT}`
);

client.on("connect", () => {
  client.subscribe(topics.mission);
  client.subscribe(topics.situation);
  client.subscribe(topics.objective);
  client.subscribe(topics.status);
  client.subscribe(topics.weather);
  client.subscribe(topics.air);
  client.subscribe(topics.road);
  client.subscribe(topics.lines);
  client.subscribe(topics.traffic);
  client.subscribe(topics.breakdown);
});

export default client;
