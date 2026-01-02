function getTodayDate() {
  // Get events happening today (any time) in "2024-01-15" format
  const today = new Date().toISOString().split("T")[0];

  return today;
}

function getTomorrowDate() {
  const today = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow = tomorrow.toISOString().split("T")[0]; // "2024-01-16"
  return tomorrow;
}
