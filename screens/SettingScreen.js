import React, { useContext } from "react";
import Layout from "../Global/Layout";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Global/Dimensions";
import { grayColor } from "../Global/Color";
import * as StoreReview from "expo-store-review";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextApi } from "../Global/Context";

const SettingScreen = () => {
  const { changeState, setChangeState } = useContext(ContextApi);

  const riviewPlayStore = async () => {
    if (await StoreReview.hasAction()) {
      StoreReview.requestReview();
    }
  };

  const deleteAllCollection = async () => {
    setChangeState(!changeState);
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <TouchableOpacity style={styles.list} onPress={riviewPlayStore}>
        <AntDesign
          name="star"
          size={30}
          color="black"
          style={{ marginRight: widthPercentageToDP(5) }}
        />
        <Text style={styles.text}>Beri Kami Bintang Lima</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.list} onPress={deleteAllCollection}>
        <MaterialIcons
          name="auto-delete"
          size={35}
          color="black"
          style={{ marginRight: widthPercentageToDP(5) }}
        />

        <Text style={styles.text}>Hapus Semua Koleksi</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: grayColor,
    height: heightPercentageToDP(10),
    borderRadius: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: widthPercentageToDP(5),
    marginBottom: heightPercentageToDP(2),
  },
  text: {
    fontSize: 18,
    fontFamily: "lato"
  },
});
export default SettingScreen;
