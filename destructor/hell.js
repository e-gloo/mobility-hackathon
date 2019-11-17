const mqtt = require('mqtt')
const axios = require('axios')

let client = mqtt.connect('wss://team07:vp2pv227if@mr1dns3dpz5mjj.messaging.solace.cloud:8443')

let roads = []
let subway = []

function loadGraph() {
  axios.get('http://graph.team07.xp65.renault-digital.com/processed/subway.json').then(response => {
    subway = response.data.elements.edges.map(e => ({ data: e.data }));
  })
  axios.get('http://graph.team07.xp65.renault-digital.com/processed/walk.json').then(response => {
    roads = response.data.elements.edges.map(e => ({ data: e.data }));
  })
}

loadGraph()
client.on('connect', () => {
  client.subscribe('team07/prod/user/mission')
  client.subscribe('team07/prod/user/situation')
  client.subscribe('team07/prod/user/objective-reached')
  client.subscribe('team07/prod/user/status')
  client.subscribe('team07/prod/context/change/weather')
  client.subscribe('team07/prod/context/change/air')
  client.subscribe('team07/prod/environment/change/roads_status​')
  client.subscribe('team07/prod/environment/change/lines_state')
  client.subscribe('team07/prod/environment/change/traffic_conditions')
  client.subscribe('team07/prod/environment/change/breakdown')

  console.log(subway);
  bringHellToTheWorld();
})

function bringHellToTheWorld() {
  setTimeout(() => {
    let edges = []
    for (var i = 0; i < 3; i++) {
      edges.push(subway[Math.floor(Math.random() * subway.length)])
    }

    const line_hell = edges.map(e => ({
      line: e.data.id,
      state: Math.random() >= 0.5 ? 'open' : 'close'
    }))

    client.publish('team07/prod/city/morph/lines_state', JSON.stringify(line_hell))

    let car = []
    for (var i = 0; i < 4; i++) {
      car.push(roads[Math.floor(Math.random() * roads.length)])
    }
    let bike = []
    for (var i = 0; i < 7; i++) {
      bike.push(roads[Math.floor(Math.random() * roads.length)])
    }
    let walk = []
    for (var i = 0; i < 7; i++) {
      walk.push(roads[Math.floor(Math.random() * roads.length)])
    }

    const road_hell = [
      {
        car: car.map(e => ({
          road: e.data.id,
          state: Math.random() >= 0.5 ? 'open' : 'close'
        }))
      },
      {
        bike: bike.map(e => ({
          road: e.data.id,
          state: Math.random() >= 0.5 ? 'open' : 'close'
        }))
      },
      {
        walk: walk.map(e => ({
          road: e.data.id,
          state: Math.random() >= 0.5 ? 'open' : 'close'
        }))
      }
    ];

    console.log(road_hell[0], road_hell[1], road_hell[2]);

    client.publish('team07/prod/city/morph/roads_status', JSON.stringify(road_hell))

    loadGraph()
    bringHellToTheWorld()
  }, 15000)
}


client.on('message', (topic, message) => {
  console.log(`${topic}: ${message.toString()}`)
})
