const sleepQualityOptions = [
  { label: "Rossz", value: "poor" },
  { label: "Átlagos", value: "average" },
  { label: "Jó", value: "good" },
  { label: "Kiváló", value: "excellent" },
];

const sleepQualityLabels = {
  poor: "Rossz",
  average: "Átlagos",
  good: "Jó",
  excellent: "Kiváló",
};

const bodyPartLabels = {
  core: "Törzs",
  arms: "Kar",
  back: "Hát",
  chest: "Mell",
  legs: "Láb",
  shoulders: "Váll",
  other: "Egyéb",
  "full body": "Teljes test",
};

const categoryLabels = {
  barbell: "Rúd",
  dumbell: "Kézi súlyzó",
  cable: "Kábel/Csiga",
  machine: "Gép",
  bodyweight: "Testsúly",
  cardio: "Kardió",
  duration: "Időtartam",
  distance: "Távolság",
  other: "Egyéb",
};

const setTypes = {
  "warm-up": "W",
  dropset: "D",
  failure: "F",
  "/": "/",
};

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

const mealLabels = {
  breakfast: "Reggeli",
  lunch: "Ebéd",
  dinner: "Vacsora",
  snack: "Snack",
};

export {
  bodyPartLabels,
  categoryLabels,
  mealLabels,
  mealTypes,
  setTypes,
  sleepQualityLabels,
  sleepQualityOptions,
};
