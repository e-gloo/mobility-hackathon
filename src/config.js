// Env demo test
// const config = {
//   TOPIC: "project-65",
//   NAMESPACE: "p65-dev",
//   BROKER_DOMAIN: "mr1dns3dpz5mjj.messaging.solace.cloud",
//   BROKER_USER: "team-prod",
//   BROKER_PASSWORD: "megane",
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
  breakdown: config.TOPIC + "/prod/environment/change/breakdown",

  //move
  moveTo: config.TOPIC + "/prod/user/path",
  carState: config.TOPIC + "/prod/0000000000000000/status/attitude",
  stop: config.TOPIC + "/prod/user/stop"
};

const api = {
  last:
    "http://agent-controller." +
    config.NAMESPACE +
    ".xp65.renault-digital.com/api/user/situation/last",
  weather:
    "http://context-controller." +
    config.NAMESPACE +
    ".xp65.renault-digital.com/api/context/weather/current",
  air:
    "http://context-controller." +
    config.NAMESPACE +
    ".xp65.renault-digital.com/api/context/air/current",
  shortest: {
    walk:
      "http://graph." +
      config.NAMESPACE +
      ".xp65.renault-digital.com/road_graph/shortest_path/walk",
    bike:
      "http://graph." +
      config.NAMESPACE +
      ".xp65.renault-digital.com/road_graph/shortest_path/bike",
    subway:
      "http://graph." +
      config.NAMESPACE +
      ".xp65.renault-digital.com/road_graph/shortest_path/subway",
    car:
      "http://graph." +
      config.NAMESPACE +
      ".xp65.renault-digital.com/road_graph/shortest_path/car"
  }
};

export { config, topics, api };
