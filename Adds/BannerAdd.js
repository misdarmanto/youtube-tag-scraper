import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { View } from "react-native";


const test = "ca-app-pub-3940256099942544/6300978111" //test ad
const production = "ca-app-pub-8095237298596091/7017089471"
function BannerAdd(){
  return (
    <View>
      <AdMobBanner
        adUnitID={production}
        bannerSize={"banner"}
        onDidFailToReceiveAdWithError={() => console.log("error")}
      />
    </View>
  );
};

export default BannerAdd