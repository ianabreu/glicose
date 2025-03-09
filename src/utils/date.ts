function subtractDate(date: Date, numberOfDays: number = 7): Date {
  date.setDate(date.getDate() - numberOfDays);
  return date;
}
function addDate(date: Date, numberOfDays: number = 7): Date {
  date.setDate(date.getDate() + numberOfDays);
  return date;
}

export { subtractDate, addDate };
