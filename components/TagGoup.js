import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Badged from "./Badged";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../Global/Dimensions";
import { grayColor } from "../Global/Color";
import IconStyle from "./IconStyle";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToolTip from "./Tooltip";
import * as Clipboard from "expo-clipboard";


const TagGroup = ({ children, tag, title, deleteList, height }) => {
  const [displayCopyTooltip, setDisplayCopyTooltip] = useState(false);
  const [displayDeleteTooltip, setDisplayDeleteTooltip] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => setTags(tag), [tag]);

  const sortTag = (id) => {
    setTags(tags.filter((tag) => tag !== id));
  };

  const copyToClipboard = () => {
    if (tags.length === 0) return;
    setDisplayCopyTooltip(true);
    Clipboard.setString(tags.join(", "));
    setTimeout(() => setDisplayCopyTooltip(false), 1000);
  };

  const deleteTags = () => {
    if (tags.length === 0) return;
    setDisplayDeleteTooltip(true);
    deleteList();
    setTimeout(() => setDisplayDeleteTooltip(false), 1000);
  };

  return (
    <View style={[styles.content, { height: height }]}>
      {/* tooltp */}
      <View style={styles.tooltipStyles}>
        {displayCopyTooltip && <ToolTip title={"Copied to Clipboard"} />}
        {displayDeleteTooltip && <ToolTip title={"Delete All Tags"} />}
      </View>

      {/* icons */}
      <View style={styles.iconsStyles}>
        <Text style={{fontFamily: "lato", fontSize: 16}}>{title.length > 25 ? title.slice(0, 25) + "..." : title}</Text>
        <View style={{ flexDirection: "row" }}>
          <IconStyle onPress={copyToClipboard}>
            <Ionicons name="md-copy-outline" size={24} color="gray" />
          </IconStyle>
          <IconStyle onPress={deleteTags}>
            <MaterialCommunityIcons
              name="delete-forever"
              size={30}
              color="gray"
            />
          </IconStyle>
        </View>
      </View>

      {/* tags container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tagsContainer}>
          {tags.length === 0 ? (
            <View style={styles.noResultStyle}>{children}</View>
          ) : (
            tags.map((tag, index) => (
              <Badged key={index} onPress={() => sortTag(tag)}>
                <Text style={{ color: "gray", fontFamily: "lato" }}>{tag}</Text>
              </Badged>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    borderColor: grayColor,
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: 20,
    height: heightPercentageToDP(35),
    marginTop: heightPercentageToDP(3),
    backgroundColor: "#FFF",
  },
  tooltipStyles: {
    position: "absolute",
    bottom: heightPercentageToDP(15),
  },
  iconsStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: heightPercentageToDP(1),
  },
  tagsContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  noResultStyle: {
    flex: 1,
    marginTop: heightPercentageToDP(20),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TagGroup;
