const { DateTime } = require("luxon");

module.exports = function dateFilter(value) {
  if (!value) {
    return "";
  }

  const asDate =
    value instanceof Date
      ? DateTime.fromJSDate(value, { zone: "utc" })
      : DateTime.fromISO(String(value), { zone: "utc" });

  if (!asDate.isValid) {
    return "";
  }

  return asDate.toFormat("LLLL d, yyyy");
};
