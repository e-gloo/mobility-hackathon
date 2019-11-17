import client from "../events";
import { topics } from "../config";

class Move {
  static move(target) {
    console.log("data sent", target);
    client.publish(topics.moveTo, JSON.stringify(target));
  }
}

export default Move;
