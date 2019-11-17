const mqtt = require('mqtt')
const axios = require('axios')

let client = mqtt.connect('wss://team07:vp2pv227if@mr1dns3dpz5mjj.messaging.solace.cloud:8443')

let position = { x: false, y: false }
let subway = { nodes: [], edges: [], stations: [] }
let mission = []
let path_queue = []

axios.get('http://agent-controller.team07.xp65.renault-digital.com/api/user/situation/last').then(response => {
  position = response.data.position
})
axios.get('http://graph.team07.xp65.renault-digital.com/subway/stations').then(response => {
  subway.stations = response.data
})
axios.get('http://graph.team07.xp65.renault-digital.com/processed/subway.json').then(response => {
  subway.nodes = response.data.elements.nodes.map(n => { return { data: n.data, position: n.position }});
  subway.edges = response.data.elements.edges.map(e => { return { data: e.data }});
})

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
})

function bringHellToTheWorld() {
  setTimeout(() => {
    for (var i = 0; i < 10; i++) {

    }
    bringHellToTheWorld()
  }, 2000)
}

function move() {
  console.log('MOVE');
  console.log(path_queue);
  let move = path_queue.shift()
  client.publish('team07/prod/user/path', JSON.stringify({
    vehicle_type: move.mean,
    target: move.to
  }))
}

client.on('message', (topic, message) => {
  console.log(`${topic}: ${message.toString()}`)

  if (topic === 'team07/prod/user/mission') {
    mission = JSON.parse(message).positions

    axios.post('http://graph.team07.xp65.renault-digital.com/road_graph/shortest_path/subway', {
      departure: { x: position.x, y: position.y },
      arrival: { x: mission[0].x, y: mission[0].y }
    }).then(response => {
      let path = response.data.cars[0].paths

      if (!subway.stations.filter(s => s.x == path[0][0] && s.y == path[0][1]).length) {
        path_queue.push({ mean: 'bike', to: { x: path[1][0], y: path[1][1] } })
      }

      path_queue.push({ mean: 'subway', to: { x: path[path.length-1][0], y: path[path.length-1][1] } })

      if (path[path.length-1].x != mission[0].x && path[path.length-1].y != mission[0].y)  {
        path_queue.push({ mean: 'bike', to: { x: mission[0].x, y: mission[0].y } })
      }

      console.log(path_queue);
      move()
    })

  }

  if (topic === 'team07/prod/user/status' && JSON.parse(message).status == 'stopped') {
    move()
  }
})
