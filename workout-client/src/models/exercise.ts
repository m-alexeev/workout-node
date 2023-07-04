import BodyPart from "./bodyPart";
import Equipment from "./equipment";
import TargetMuscle from "./targetMuscle";

class Exercise extends Realm.Object<Exercise> {
  _id!: string;
  name!: string;
  bodyPart!: BodyPart;
  equipment!: Equipment;
  targetMuscle!: TargetMuscle;
  gifId!: string;

  static schema = {
    name: "Exercise",
    properties: {
      _id: "string",
      name: "string",
      gifId: "string",
      bodyPart: "BodyPart",
      equipment: "Equipment",
      targetMuscle: "TargetMuscle",
    },
    primaryKey: '_id',
  };
}

export default Exercise;
