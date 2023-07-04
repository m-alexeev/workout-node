import Exercise from "./exercise";
import { Realm } from "@realm/react";


class TargetMuscle extends Realm.Object<TargetMuscle> {
  name!: string;
  exercises!: Realm.List<Exercise> 

  static schema = {
    name: "TargetMuscle",
    properties: {
      name: {type: 'string', indexed: true},
      exercises: 'Exercise[]',
    }
  }
}
export default TargetMuscle