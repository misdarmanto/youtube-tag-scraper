import { Dimensions, PixelRatio } from "react-native";

export const widthPercentageToDP = (widthPercent) => {
  const width = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent) => {
  const height = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};
