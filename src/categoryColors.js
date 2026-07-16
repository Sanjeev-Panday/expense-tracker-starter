export const categoryColors = {
  food: "#6b9080",
  housing: "#c9a227",
  utilities: "#b87333",
  transport: "#3a7563",
  entertainment: "#8a6ba8",
  salary: "#e7c767",
  other: "#7c8a80",
};

export const categories = Object.keys(categoryColors);

export function getCategoryColor(category) {
  return categoryColors[category] ?? categoryColors.other;
}
