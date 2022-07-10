import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Global/Dimensions";
import { grayColor } from "../Global/Color";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Layout from "../Global/Layout";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getLinkPreview } from "link-preview-js";
import TextStyle from "../components/TextStyle";
import BannerAdd from "../Adds/BannerAdd";
import RewardedAdd from "../Adds/RewardedAdd";
import TagGroup from "../components/TagGoup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextApi } from "../Global/Context";
import { MaterialIcons } from "@expo/vector-icons";
import ToolTip from "../components/Tooltip";
import interstitialAdd from "../Adds/InterstitialAdd";

export default function HomeScreen() {
  const [tags, setTags] = useState([]);
  const [inputUrl, setInputUrl] = useState("");
  const [title, setTittle] = useState("");
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const { changeState, setChangeState, isOffline } = useContext(ContextApi);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(title, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTags = () => {
    if (tags.length === 0) return;
    setTittle("");
    setInputUrl("");
    setTags([]);
  };

  const getTags = async () => {
    setLoading(true);
    const fectData = await fetch("https://hashtagscraper.herokuapp.com/tags", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: inputUrl,
      }),
    });

    const result = await fectData.json();
    setTags(result);
    setLoading(false);
    const random = Math.floor(Math.random() * 5);
    if (random === 0) {
      setTimeout(() => RewardedAdd(), 3000);
    } else {
      setTimeout(() => interstitialAdd(), 3000);
    }
  };

  const random = Math.floor(Math.random() * 5);
  console.log(random);

  const onSubmit = () => {
    if (isOffline) {
      setOffline(true);
      setTimeout(() => setOffline(false), 2000);
      return;
    }
    if (inputUrl === "") return;

    setTags([]);
    Keyboard.dismiss();
    getLinkPreview(inputUrl).then((data) => {
      setTittle(data.title);
    });
    getTags();
  };

  useEffect(() => {
    if (tags.length !== 0) {
      storeData({ list: tags, title: title, id: Date.now() });
      setChangeState(!changeState);
    }
  }, [tags]);

  return (
    <Layout>
      {/* search */}
      <View style={styles.searchConatiner}>
        <TextInput
          style={styles.urlField}
          onChangeText={setInputUrl}
          value={inputUrl}
          placeholder="Paste video link..."
        />
        <TouchableOpacity onPress={onSubmit}>
          <Ionicons name="md-search-sharp" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      {offline && <ToolTip title={"anda sedang offline"} />}
      {/* content */}
      <TagGroup
        tag={tags}
        title={title}
        deleteList={deleteTags}
        height={heightPercentageToDP(60)}
      >
        {!loading && (
          <MaterialIcons name="event-note" size={50} color={grayColor} />
        )}
        {loading && <TextStyle>Loading...</TextStyle>}
      </TagGroup>

      {/* banner Ads */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: heightPercentageToDP(5),
        }}
      >
        <BannerAdd />
      </View>
      <StatusBar style="auto" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  urlField: {
    textAlign: "center",
    color: "gray",
    fontSize: 17,
    fontFamily: "lato",
  },
  searchConatiner: {
    height: heightPercentageToDP(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: grayColor,
    paddingHorizontal: widthPercentageToDP(2),
    backgroundColor: "#FFF",
  },
  iconsStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: heightPercentageToDP(1),
  },
});
