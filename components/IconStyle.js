import React from "react";
import { TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Global/Dimensions";

const IconStyles = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 50,
          height: heightPercentageToDP(6),
          width: widthPercentageToDP(11.5),
          margin: 3,
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconStyles;
