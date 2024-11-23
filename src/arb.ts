export const REALISTIC_THINKING_TIME_MS = 420;

const RESPONSE_CHANCE = 0.01;
const RESPONSES = [
  "oof",
  "pog",
  "poggers",
  "poggers moment",
  "yeet",
  "nice",
  "lit",
  "omg this",
  "😂",
  "pogchamp",
  "rip",
  "sheeeeeeeesh",
  "julia who??",
  "someday Emily will too",
  "so true, bestie",
  "swond",
  "OK, I failed at that.",
  "immigrants,, they get the job done",
  "you must not be talking about *women*",
  "OR SHE",
  "This is indeed 'sus'.",
];

export function getResponse() {
  return RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
}

export function shouldRespond() {
  return Math.random() <= RESPONSE_CHANCE;
}
