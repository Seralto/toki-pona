import { useFonts } from "expo-font";

const LARGE_FONT_OFFSET = 4;
const NARROW_SCREEN_WIDTH = 400;

export const fontOffset = (fontSizeId) => (fontSizeId === "large" ? LARGE_FONT_OFFSET : 0);

export const bodyFontSize = (screenWidth, fontSizeId) =>
  (screenWidth < NARROW_SCREEN_WIDTH ? 15 : 17) + fontOffset(fontSizeId);

// Loads the sitelen pona glyph font; expo-font caches it across components.
export const useGlyphFont = () => {
  const [fontsLoaded] = useFonts({ "sitelen-pona": require("../assets/fonts/linja-pona.otf") });
  return fontsLoaded;
};
