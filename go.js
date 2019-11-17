const mqtt = require("mqtt");
const axios = require("axios");
let client = mqtt.connect(
  "wss://team07:vp2pv227if@mr1dns3dpz5mjj.messaging.solace.cloud:8443"
);
let mission = [];
let position = { x: 0.0, y: 0.0 };
let paths = [];
axios
  .get(
    "http://agent-controller.team07.xp65.renault-digital.com/api/user/situation/last"
  )
  .then(response => {
    console.log("api/user/situation/last", response.data);
    position = response.data.position;
  });
axios
  .get(
    "http://context-controller.team07.xp65.renault-digital.com/api/context/weather/current"
  )
  .then(response => {
    console.log("api/context/weather/current", response.data);
  });
axios
  .get(
    "http://context-controller.team07.xp65.renault-digital.com/api/context/air/current"
  )
  .then(response => {
    console.log("api/context/air/current", response.data);
  });
axios
  .get("http://graph.team07.xp65.renault-digital.com/road_graph/line_state")
  .then(response => {
    console.log("road_graph/line_state", response.data);
  });
axios
  .get("http://graph.team07.xp65.renault-digital.com/subway/stations")
  .then(response => {
    console.log("subway/stations", response.data);
  });
axios
  .get(
    "http://graph.team07.xp65.renault-digital.com/road_graph/traffic_conditions"
  )
  .then(response => {
    console.log("road_graph/traffic_conditions", response.data);
  });
axios
  .get("http://graph.team07.xp65.renault-digital.com/processed/subway.json")
  .then(response => {
    console.log(
      "processed/subway",
      response.data.elements.nodes.map(n => {
        return { data: n.data, position: n.position };
      }),
      response.data.elements.edges.map(e => {
        return { data: e.data };
      })
    );
  });
client.on("connect", () => {
  client.subscribe("team07/prod/user/mission");
  client.subscribe("team07/prod/user/situation");
  client.subscribe("team07/prod/user/objective-reached");
  client.subscribe("team07/prod/user/status");
  client.subscribe("team07/prod/context/change/weather");
  client.subscribe("team07/prod/context/change/air");
  client.subscribe("team07/prod/environment/change/roads_status​");
  client.subscribe("team07/prod/environment/change/lines_state");
  client.subscribe("team07/prod/environment/change/traffic_conditions");
  client.subscribe("team07/prod/environment/change/breakdown");
  client.publish(
    "team07/prod/user/mission",
    JSON.stringify({
      mission: "Yo !",
      positions: [
        { x: 0.2, y: 2.0 },
        { x: 7.4, y: 3.8 },
        { x: 13.9, y: 3.8 },
        { x: 21.0, y: 5.8 },
      ]
    })
  );
});
// function solveMission() {
//   if (mission.length > 0) {
//     console.log("trying to go to the next mission by walk", {
//       departure: { x: position.x, y: position.y },
//       arrival: { x: mission[0].x, y: mission[0].y }
//     });
//     axios
//       .post(
//         "http://graph.team07.xp65.renault-digital.com/road_graph/shortest_path/walk",
//         {
//           departure: { x: position.x, y: position.y },
//           arrival: { x: mission[0].x, y: mission[0].y }
//         }
//       )
//       .then(response => {
//         console.log("shortest_path/walk", response.data);
//         // response.data.cars[0].paths.shift()
//         // paths.push(... response.data.cars[0].paths)
//         // nextMove()
//       });
//     //
//     // axios.post('http://graph.team07.xp65.renault-digital.com/road_graph/shortest_path/bike', {
//     //   departure: { x: position.x, y: position.y },
//     //   arrival: { x: mission[0].x, y: mission[0].y }
//     // })
//     // .then(response => {
//     //   console.log('shortest_path/bike', response.data)
//     // })
//     // axios.post('http://graph.team07.xp65.renault-digital.com/road_graph/shortest_path/subway', {
//     //   departure: { x: position.x, y: position.y },
//     //   arrival: { x: mission[0].x, y: mission[0].y }
//     // })
//     // .then(response => {
//     //   console.log('shortest_path/subway', response.data.cars[0].paths)
//     // })
//     client.publish(
//       "team07/prod/user/path",
//       JSON.stringify({
//         vehicle_type: "subway",
//         target: {
//           x: mission[0].x,
//           y: mission[0].y
//         }
//       })
//     );
//   }
// }
// function nextMove() {
//   if (paths.length > 0) {
//     let path = paths.shift();
//     client.publish(
//       "team07/prod/user/path",
//       JSON.stringify({
//         vehicle_type: "walk",
//         target: {
//           x: path[0],
//           y: path[1]
//         }
//       })
//     );
//   }
// }
// client.on("message", (topic, message) => {
//   console.log(`${topic}: ${message.toString()}`);
//   if (topic === "team07/prod/user/mission") {
//     mission = JSON.parse(message).positions;
//     console.log(mission);
//     solveMission();
//   }
//   if (topic === "team07/prod/user/status") {
//     // if (JSON.parse(message).status === 'stopped') {
//     //   nextMove();
//     // }
//   }
//   if (topic === "team07/prod/user/objective-reached") {
//     const r = JSON.parse(message);
//     mission = mission.filter(p => p.x !== r.x && p.y !== r.y);
//     console.log(mission);
//     solveMission();
//   }
//   if (topic === "team07/prod/user/status") {
//     position = JSON.parse(message).situation.position;
//     console.log(position);
//   }
// });
