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
function getThisWeekendDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday

  // Calculate days until Friday
  let daysUntilFriday;
  if (dayOfWeek <= 5) {
    // Sunday(0) through Friday(5)
    daysUntilFriday = 5 - dayOfWeek;
  } else {
    // Saturday(6)
    daysUntilFriday = 5 - dayOfWeek + 7;
  }

  // Calculate Friday and Sunday dates
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysUntilFriday);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  // Format dates for API
  const fridayStr = friday.toISOString().split("T")[0];
  const sundayStr = sunday.toISOString().split("T")[0];

  return {
    start: fridayStr,
    end: sundayStr,
  };
}
