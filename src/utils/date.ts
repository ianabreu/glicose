function subtractDate(date: Date, numberOfDays: number = 7): Date {
  date.setDate(date.getDate() - numberOfDays);
  return date;
}
function addDate(date: Date, numberOfDays: number = 7): Date {
  date.setDate(date.getDate() + numberOfDays);
  return date;
}
function formatDate(date: Date) {
  return date.toLocaleString('pt-br', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export { subtractDate, addDate, formatDate };
