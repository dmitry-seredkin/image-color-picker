export const convertRgbToHex = (...rgb: number[]): string =>
  rgb.reduce((hex, value, index) => {
    if (index > 3) return hex;

    value = Math.min(255, Math.max(0, value));

    return `${hex}${value.toString(16).padStart(2, "0")}`;
  }, "#");
