const ALLOWED_MUSCLE_GROUPS = [
  "CHEST",
  "BACK",
  "LEGS",
  "SHOULDERS",
  "ARMS",
  "CORE"
];

function isValidMuscleGroup(value) {
  return ALLOWED_MUSCLE_GROUPS.includes(value.toUpperCase());
}

module.exports = {
  ALLOWED_MUSCLE_GROUPS,
  isValidMuscleGroup
};