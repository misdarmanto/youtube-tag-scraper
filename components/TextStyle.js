import React from "react";
import { Text } from "react-native";
import { grayColor } from "../Global/Color";

const TextStyle = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontSize: 20,
          fontWeight: "bold",
          color: "gray",
          textAlign: "center",
          fontFamily: "myFont"
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextStyle;
