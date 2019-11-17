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
    sev: "walk",
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
    console.log("In findByProfile");
    console.log(departure, arrival);

    const vehicle = await axios.get(
      `http://vehicle.${config.NAMESPACE}.xp65.renault-digital.com/api/v1/vehicles`
    );
    console.log({ vehicle });
    console.log({ profile: this.profile });
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
    console.log(data.data);
    const paths = data.data.cars[0].paths;
    return paths;
  }
}

export default Path;
