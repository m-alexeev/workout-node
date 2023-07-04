import Exercise from "./exercise";
import { Realm } from "@realm/react";

class Equipment extends Realm.Object<Equipment> {
  name!: string;
  exercises!: Realm.List<Exercise>;

  static schema = {
    name: "Equipment",
    properties: {
      name: { type: "string", indexed: true },
      exercises: "Exercise[]",
    },
  };
}

export default Equipment
