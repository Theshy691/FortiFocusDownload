const activeDays = [
  0, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24,
  25, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 41,
];

export function buildStreakGrid() {
  const container = document.querySelector(".streak-showcase");

  if (!container || container.children.length > 0) {
    return;
  }

  for (let index = 0; index < 42; index += 1) {
    const day = document.createElement("div");
    day.className = `s-day${activeDays.includes(index) ? " active" : ""}${index === 41 ? " today" : ""}`;
    container.appendChild(day);
  }
}
