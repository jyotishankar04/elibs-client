export function timeElapsedSince(dateString: string): string {
  const givenDate = new Date(dateString);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate.getTime() - givenDate.getTime();

  const millisecondsInASecond = 1000;
  const millisecondsInAMinute = millisecondsInASecond * 60;
  const millisecondsInAnHour = millisecondsInAMinute * 60;
  const millisecondsInADay = millisecondsInAnHour * 24;
  const millisecondsInAMonth = millisecondsInADay * 30.4375; // Average days in a month
  const millisecondsInAYear = millisecondsInADay * 365.25; // Average days in a year

  const years = Math.floor(diffInMilliseconds / millisecondsInAYear);
  if (years > 0) {
    return `${years} years ago`;
  }

  const months = Math.floor(diffInMilliseconds / millisecondsInAMonth);
  if (months > 0) {
    return `${months} months ago`;
  }

  const days = Math.floor(diffInMilliseconds / millisecondsInADay);
  if (days > 0) {
    return `${days} days ago`;
  }

  const hours = Math.floor(diffInMilliseconds / millisecondsInAnHour);
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  const minutes = Math.floor(diffInMilliseconds / millisecondsInAMinute);
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }

  return "Just now";
}
