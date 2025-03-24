const isObjectEmpty = (obj) => {
  return JSON.stringify(obj) === "{}";
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const bodyParts = [
  "core",
  "arms",
  "back",
  "chest",
  "legs",
  "shoulders",
  "other",
  "full body",
];
const categories = [
  "barbell",
  "dumbell",
  "cable",
  "machine",
  "bodyweight",
  "cardio",
  "duration",
  "distance",
  "other",
];

const isGoodBodyPart = (bodyPart) => {
  if (!bodyParts.includes(bodyPart)) return false;
  return true;
};

const isGoodCategory = (category) => {
  if (!categories.includes(category)) return false;
  return true;
};

const setTypes = ["warm-up", "dropset", "failure", "/"];

const isGoodSetType = (setType) => {
  if (!setTypes.includes(setType)) return false;
  return true;
};

module.exports = {
  isObjectEmpty,
  validateEmail,
  isGoodBodyPart,
  isGoodCategory,
  isGoodSetType,
};
