const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const DARK_FOREGROUND = "#000000";
const LIGHT_FOREGROUND = "#ffffff";
const LIGHT_BACKGROUND_THRESHOLD = 0.179;

export const isHexColor = (value: unknown): value is string =>
  typeof value === "string" && HEX_COLOR_PATTERN.test(value);

const normalizeHexColor = (hexColor: string) => hexColor.toUpperCase();

const parseHexChannel = (hexColor: string, startIndex: number) =>
  Number.parseInt(hexColor.slice(startIndex, startIndex + 2), 16) / 255;

const convertChannelToLinearLight = (channel: number) =>
  channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;

const calculateRelativeLuminance = (hexColor: string) => {
  const channels = [1, 3, 5].map((startIndex) =>
    convertChannelToLinearLight(parseHexChannel(hexColor, startIndex)),
  );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

export const getAccessibleForegroundColor = (hexColor: string) =>
  calculateRelativeLuminance(hexColor) > LIGHT_BACKGROUND_THRESHOLD
    ? DARK_FOREGROUND
    : LIGHT_FOREGROUND;

export const createColorResult = (value: unknown) => {
  const hexColor =
    typeof value === "object" && value !== null && "hex" in value
      ? value.hex
      : undefined;

  return isHexColor(hexColor)
    ? { hex: normalizeHexColor(hexColor) }
    : undefined;
};
