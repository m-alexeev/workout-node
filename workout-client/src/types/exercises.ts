export type exerciseType = {
  id: string;
  bodyPart: bodyPartType;
  equipment: equipmentType;
  gifUrl: string;
  name: string;
  target: targetType;
};

export type targetType =
  | "abductors"
  | "abs"
  | "adductors"
  | "biceps"
  | "calves"
  | "cardiovascular system"
  | "delts"
  | "forearms"
  | "glutes"
  | "hamstrings"
  | "lats"
  | "levator scapulae"
  | "pectorals"
  | "quads"
  | "serratus anterior"
  | "spine"
  | "traps"
  | "triceps"
  | "upper back";

export type equipmentType =
  | "assisted"
  | "band"
  | "barbell"
  | "body weight"
  | "bosu ball"
  | "cable"
  | "dumbbell"
  | "elliptical machine"
  | "ez barbell"
  | "hammer"
  | "kettlebell"
  | "leverage machine"
  | "medicine ball"
  | "olympic barbell"
  | "resistance band"
  | "roller"
  | "rope"
  | "skierg machine"
  | "sled machine"
  | "smith machine"
  | "stability ball"
  | "stationary bike"
  | "stepmill machine"
  | "tire"
  | "trap bar"
  | "upper body ergometer"
  | "weighted"
  | "wheel roller";

export type bodyPartType =
  | "back"
  | "cardio"
  | "chest"
  | "lower arms"
  | "lower legs"
  | "neck"
  | "shoulders"
  | "upper arms"
  | "upper legs"
  | "waist";
