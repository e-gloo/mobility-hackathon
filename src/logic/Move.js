import client from "../events";
import { topics } from "../config";

class Move {
  static move(target) {
    console.log("data sent", target);
    client.publish(topics.moveTo, JSON.stringify({
      vehicle_type: target.mean,
      target: target.to,
    }));
  }
}

export default Move;
