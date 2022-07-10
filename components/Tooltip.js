import React from "react";
import { View, Text } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Global/Dimensions";

const ToolTip = ({title}) => {
  return (
    <View
      style={{
        backgroundColor: "#8E8E8E",
        borderRadius: 30,
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(6),
        height: heightPercentageToDP(5),
        left: widthPercentageToDP(25),
        position: "absolute",
        zIndex: 1
      }}
    >
      <Text style={{ color: "#FFF" }}>{title}</Text>
    </View>
  );
};

export default ToolTip;
