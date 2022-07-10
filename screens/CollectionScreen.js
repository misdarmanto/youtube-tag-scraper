import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../Global/Layout";
import { FlatList, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import TagGoup from "../components/TagGoup";
import { heightPercentageToDP } from "../Global/Dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { ContextApi } from "../Global/Context";
import { grayColor } from "../Global/Color";
import BannerAdd from "../Adds/BannerAdd";

export default collectionScreen = () => {
  const [list, setList] = useState([]);
  const { changeState, setChangeState } = useContext(ContextApi);

  const deleteList = async (id, key) => {
    setList(list.filter((list) => list.id !== id));
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
    // await AsyncStorage.clear()
  };

  const getData = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(e);
    }
    let values;
    try {
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log(e);
    }
    let result = [];
    values.forEach((list) => {
      const obj = JSON.parse(list[1]);
      result.push(obj);
    });
    setList(result);
  };

  useEffect(() => {
    const unsub = getData();
    return () => unsub;
  }, [changeState]);

  return (
    <Layout>
      {list.length === 0 ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <MaterialIcons name="event-note" size={50} color={"gray"} />
          <Text style={{ color: "gray", fontFamily: "lora" }}>
            Belum ada koleksi{" "}
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TagGoup
                tag={item.list}
                title={item.title}
                deleteList={() => deleteList(item.id, item.title)}
                showButton={true}
              />
            )}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BannerAdd />
          </View>
        </>
      )}
      <StatusBar style="auto" />
    </Layout>
  );
};
