import Metrics from "./metrics";

const size = {
  font6: Metrics.screenWidth * (6 / 365),
  font8: Metrics.screenWidth * (8 / 365),
  font10: Metrics.screenWidth * (10 / 365),
  font12: Metrics.screenWidth * (12 / 365),
  font14: Metrics.screenWidth * (14 / 365),
  font16: Metrics.screenWidth * (16 / 365),
  font20: Metrics.screenWidth * (20 / 365),
};

const weight = {
  full: "900",
  semi: "600",
  low: "400",
  bold: "bold",
  normal: "normal",
};

const _fontConfig = {
  default: {
    regular: {
      fontFamily: "Montserrat-Regular",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Montserrat-Light",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Montserrat-Regular",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Montserrat-Light",
      fontWeight: "normal",
    },
  },
};

const fontConfig = {
    ios: _fontConfig,
    android: _fontConfig,
}

const type = {
  "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
  "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
};

export { size, weight, type, fontConfig };