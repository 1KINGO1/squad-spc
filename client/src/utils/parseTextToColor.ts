type Salt = "id" | "groups" | "clan" | "unknown";

const calculatedValues = new Map<string, [string, string]>();

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function hexColorFromHash(hash: number): string {
  const color = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "00000".substring(0, 6 - color.length) + color;
}

function adjustColorBrightness(color: string): string {
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  const brightness = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  const desiredBrightness = 128;
  const brightnessFactor = brightness / desiredBrightness;

  if (brightnessFactor < 1) {
    r = Math.min(255, Math.floor(Math.max(0, r / brightnessFactor)));
    g = Math.min(255, Math.floor(Math.max(0, g / brightnessFactor)));
    b = Math.min(255, Math.floor(Math.max(0, b / brightnessFactor)));
  }

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  return rHex + gHex + bHex;
}

function parseTextToColor(text: string, salt: Salt): [string, string] {
  const accessKey = text + "#" + salt;

  if (calculatedValues.has(accessKey)) {
    return calculatedValues.get(accessKey) as [string, string];
  }

  const combinedInput = text + salt;
  const hash = hashCode(combinedInput);
  let hexColor = hexColorFromHash(hash);
  hexColor = adjustColorBrightness(hexColor);

  calculatedValues.set(accessKey, [`#${hexColor + 10}`, `#${hexColor + 60}`]);
  return [`#${hexColor + 10}`, `#${hexColor + 60}`];
}

export default parseTextToColor;