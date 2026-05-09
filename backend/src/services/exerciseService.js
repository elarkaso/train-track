const exerciseRepository = require("../repositories/exerciseRepository");

async function listExercises() {
  const itemList = await exerciseRepository.listExercises();

  return {
    itemList,
    uuAppErrorMap: {}
  };
}

module.exports = {
  listExercises
};