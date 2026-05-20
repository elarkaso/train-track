function getCurrentYearRange() {
  const now = new Date();

  const from = new Date(now.getFullYear(), 0, 1);
  const to = new Date(now.getFullYear(), 11, 31);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

function getCurrentMonthRange() {
  const now = new Date();

  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export {
  getCurrentYearRange,
  getCurrentMonthRange,
  getTodayDate,
};