import axios from "axios";
import { config, api } from "../config";

const profiles = {
  Rapide: {
    name: "Rapide",
    pri: "subway",
    sec: "bike",
    api: api.shortest.subway
  },
  Ecologie: {
    name: "Ecologie",
    pri: "bike",
    sec: "walk",
    api: api.shortest.bike
  },
  Confort: {
    name: "Confort",
    pri: "car",
    sec: "walk",
    api: api.shortest.car
  }
};

class Path {
  constructor(profileName) {
    this.profile = profiles[profileName];
  }

  getProfile() {
    return this.profile;
  }

  setProfile(profileName) {
    this.profile = profiles[profileName];
  }

  async findByProfil(departure, arrival) {
    console.log(departure, arrival);

    const vehicle = await axios.get(
      `http://vehicle.${config.NAMESPACE}.xp65.renault-digital.com/api/v1/vehicles`
    );
    console.log({ vehicle });
    console.log({ profile: this.profile });
    try {
      const data = await axios.post(this.profile.api, {
        departure: { x: departure.position.x, y: departure.position.y },
        arrival: { x: arrival.x, y: arrival.y },
        vehicles:
          this.profile.name === "Confort"
            ? [
                {
                  id: vehicle.data[0].id,
                  x: vehicle.data[0].attitude.position.x,
                  y: vehicle.data[0].attitude.position.y
                }
              ]
            : null
      });
      console.log(data.data.cars[0]);
      const path_queue = [];

      if (this.profile.name === "Confort") {
        path_queue.push({
          mean: this.profile.pri,
          to: {
            x: departure.position.x,
            y: departure.position.y
          }
        });

        path_queue.push({
          mean: this.profile.pri,
          to: {
            x: data.data.cars[0].paths[data.data.cars[0].paths.length - 1][0],
            y: data.data.cars[0].paths[data.data.cars[0].paths.length - 1][1]
          }
        });

        return path_queue;
      }

      if (
        Math.abs(
          data.data.cars[0].paths[0][0] - data.data.cars[0].paths[1][0]
        ) > 0.6 ||
        Math.abs(
          data.data.cars[0].paths[0][1] - data.data.cars[0].paths[1][1]
        ) > 0.6
      ) {
        path_queue.push({
          mean: this.profile.sec,
          to: {
            x: data.data.cars[0].paths[1][0],
            y: data.data.cars[0].paths[1][1]
          }
        });
      }

      path_queue.push({
        mean: this.profile.pri,
        to: {
          x: data.data.cars[0].paths[data.data.cars[0].paths.length - 1][0],
          y: data.data.cars[0].paths[data.data.cars[0].paths.length - 1][1]
        }
      });

      if (
        Math.abs(
          data.data.cars[0].paths[data.data.cars[0].paths.length - 1][0] -
            arrival.x
        ) > 0.6 ||
        Math.abs(
          data.data.cars[0].paths[data.data.cars[0].paths.length - 1][1] -
            arrival.y
        ) > 0.6
      ) {
        path_queue.push({
          mean: this.profile.sec,
          to: {
            x: arrival.x,
            y: arrival.y
          }
        });
      }

      return path_queue;
    } catch (e) {
      console.error(e);
      return [
        {
          mean: "walk",
          to: {
            x: arrival.x,
            y: arrival.y
          }
        }
      ];
    }
  }
}

export default Path;
