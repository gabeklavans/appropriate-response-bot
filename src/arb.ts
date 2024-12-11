export const REALISTIC_THINKING_TIME_MS = 420;

const RESPONSE_CHANCE = 0.01;
const RESPONSES = [
  "oof",
  "pog",
  "poggers",
  "poggers moment",
  "nice",
  "haha yeah",
  "😂",
  "pogchamp",
  "rip",
  "sheeeeeeeesh",
  // "julia who??",
  "OK, I failed at that.",
  "OR SHE",
  "This is indeed 'sus'.",
];

export function getResponse() {
  return RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
}

export function shouldRespond() {
  return Math.random() <= RESPONSE_CHANCE;
}
