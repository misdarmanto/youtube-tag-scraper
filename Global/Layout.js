import React from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "./Dimensions";

export default function Layout({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(3),
    paddingTop: heightPercentageToDP(3),
    backgroundColor: "#F8FCFE",
  },
});
