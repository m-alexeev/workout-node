import { Realm } from "@realm/react";
import Exercise from "./exercise";

class BodyPart extends Realm.Object<BodyPart> {
  name!: string;
  exercises!: Realm.List<Exercise>;

  static schema = {
    name: "BodyPart",
    properties: {
      name: { type: "string", indexed: true },
      exercises: "Exercise[]",
    },
  };
}

export default BodyPart;
