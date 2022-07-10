import React from "react";
import { TouchableOpacity, View } from "react-native";
import { grayColor } from "../Global/Color";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Global/Dimensions";
import { AntDesign } from "@expo/vector-icons";

const Badged = ({ children, onPress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignitem: "center",
        backgroundColor: "#F6F6F6",
        borderRadius: 20,
        paddingTop: heightPercentageToDP(0.8),
        paddingBottom: heightPercentageToDP(0.5),
        paddingLeft: widthPercentageToDP(3),
        paddingRight: widthPercentageToDP(2),
        marginHorizontal: widthPercentageToDP(1),
        marginVertical: heightPercentageToDP(1),
      }}
    >
      {children}
      <TouchableOpacity onPress={onPress}>
        <AntDesign
          name="closecircle"
          size={24}
          color="gray"
          style={{ padding: 1, marginLeft: widthPercentageToDP(2) }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Badged;
