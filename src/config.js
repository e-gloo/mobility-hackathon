// Env demo test
// config = {
//   TOPIC: "project-65",
//   NAMESPACE: "p65-dev",
//   BROKER_DOMAIN: "mr1dns3dpz5mjj.messaging.solace.cloud",
//   BROKER_USER: "team-demo",
//   BROKER_PASSWORD: "ljkbjg56",
//   BROKER_MQTT_PORT: 8443,
//   BROKER_TCP_PORT: 1883
// };

const config = {
  TOPIC: "team07",
  NAMESPACE: "team07",
  BROKER_DOMAIN: "mr1dns3dpz5mjj.messaging.solace.cloud",
  BROKER_USER: "team07",
  BROKER_PASSWORD: "vp2pv227if",
  BROKER_MQTT_PORT: 8443,
  BROKER_TCP_PORT: 1883
};

const topics = {
  mission: config.TOPIC + "/prod/user/mission",
  situation: config.TOPIC + "/prod/user/situation",
  objective: config.TOPIC + "/prod/user/objective-reached",
  status: config.TOPIC + "/prod/user/status",
  weather: config.TOPIC + "/prod/context/change/weather",
  air: config.TOPIC + "/prod/context/change/air",
  road: config.TOPIC + "/prod/environment/change/roads_status",
  lines: config.TOPIC + "/prod/environment/change/lines_status",
  traffic: config.TOPIC + "/prod/environment/change/traffic_conditions",
  breakdown: config.TOPIC + "/prod/environment/change/breakdown"
};

export { config, topics };
