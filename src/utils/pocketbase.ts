import PocketBase from "pocketbase";
import { Position } from "../types";

const pb = new PocketBase(import.meta.env.POCKETBASE_URL);

function insertPlayerLocation(data: Position) {
  return pb.collection("player_locations").create(data);
}

export { insertPlayerLocation };
