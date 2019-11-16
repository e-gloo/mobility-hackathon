const mqtt = require('mqtt')

let client = mqtt.connect('wss://team07:vp2pv227if@mr1dns3dpz5mjj.messaging.solace.cloud:8443')

client.on('connect', () => {
  client.publish('team07/prod/city/reset', null);
  client.publish('team07/prod/user/path-to-target', JSON.stringify({
    vehicle_type: "walk",
    path: [
      [5, 0.2],
      [5.1, 0.2]
    ],
    costs: [0.0, 0.0]
  }))
  client.publish('team07/prod/context/change/weather', JSON.stringify({
    condition: 'normal'
  }))
  client.publish('team07/prod/context/change/air', JSON.stringify({
    condition: 'normal'
  }))

  client.end()
})
