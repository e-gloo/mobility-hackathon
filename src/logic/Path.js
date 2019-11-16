import axios from "axios";

import { api } from "../config";

class Path {
  static async find(departure, arrival) {
    try {
      const data = await axios.post(api.shortest.walk, {
        departure: { x: departure.x, y: departure.y },
        arrival: { x: arrival.x, y: arrival.y }
      });
      const paths = data.data.cars[0].paths;
      return paths;
    } catch (e) {
      alert("Error !!!!");
      console.log(e);
    }
  }
}

export default Path;
