export default function millisecondsToRelativeTimeString(time: number): string {
  const cd = 24 * 60 * 60 * 1000;
  const ch = 60 * 60 * 1000;

  const days = Math.floor(time / cd);
  const hours = Math.floor((time - days * cd) / ch);
  const minutes = Math.ceil((time - days * cd - hours * ch) / 60000);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}