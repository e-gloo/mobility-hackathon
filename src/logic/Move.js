import client from "../events";
import { topics } from "../config";

class Move {
  static move(destination) {
    client.publish(
      topics.moveTo,
      JSON.stringify({
        vehicle_type: "bike",
        target: {
          x: destination.x,
          y: destination.y
        }
      })
    );
  }
}

export default Move;
