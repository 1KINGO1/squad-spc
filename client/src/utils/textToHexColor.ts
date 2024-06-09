export default function textToRGBAColor(text: string): [string, string] {
  const hash = text.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  const color = '#' + '00000'.substring(0, 6 - c.length) + c;

  // 10 - color opacity
  return [color + 10, color + 80];
}