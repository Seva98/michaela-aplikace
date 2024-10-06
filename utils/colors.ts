export function hexToRgba(hex: string, alpha: number): string {
  let cleanedHex = hex.replace(/^#/, '');
  let r: number, g: number, b: number;

  if (cleanedHex.length === 3) {
    r = parseInt(cleanedHex[0] + cleanedHex[0], 16);
    g = parseInt(cleanedHex[1] + cleanedHex[1], 16);
    b = parseInt(cleanedHex[2] + cleanedHex[2], 16);
  } else if (cleanedHex.length === 6) {
    r = parseInt(cleanedHex.substring(0, 2), 16);
    g = parseInt(cleanedHex.substring(2, 4), 16);
    b = parseInt(cleanedHex.substring(4, 6), 16);
  } else {
    throw new Error('Invalid HEX color.');
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
