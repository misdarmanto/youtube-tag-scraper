import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import CollectionScreen from "./screens/CollectionScreen";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { heightPercentageToDP, widthPercentageToDP } from "./Global/Dimensions";
import { ContextApi } from "./Global/Context";
import SettingScreen from "./screens/SettingScreen";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import NetInfo from "@react-native-community/netinfo";

const Tab = createBottomTabNavigator();

const HeaderRightComponent = () => {
  return (
    <TouchableOpacity>
      <Ionicons
        name="share-social-sharp"
        size={35}
        color="gray"
        style={{ marginRight: widthPercentageToDP(5) }}
      />
    </TouchableOpacity>
  );
};

const HeaderLeftComponent = () => {
  return (
    <TouchableOpacity>
      <Ionicons
        name="ios-menu"
        size={40}
        color="gray"
        style={{ marginLeft: widthPercentageToDP(3) }}
      />
    </TouchableOpacity>
  );
};

export default function App() {
  const [changeState, setChangeState] = useState(false);
  const [isOffline, setIsOfflineStatus] = useState(false);

  useEffect(() => {
    const getNetInfo = NetInfo.addEventListener((state) => {
      setIsOfflineStatus(!state.isConnected || !state.isInternetReachable);
    });
    return () => getNetInfo();
  }, [isOffline]);


  const [loaded] = useFonts({
    myFont: require("./assets/ShadowsIntoLight-Regular.ttf"),
    lora: require("./assets/Lora-VariableFont_wght.ttf"),
    lato: require("./assets/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ContextApi.Provider value={{ changeState, setChangeState, isOffline }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // headerLeft: () => <HeaderLeftComponent />,
            // headerRight: () => <HeaderRightComponent />,
            headerTitleStyle: {fontFamily: "lato"},
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => {
              if (route.name === "Home") {
                return <Octicons name="home" size={30} color={color} />;
              } else if (route.name === "Collection") {
                return <MaterialIcons name="history" size={35} color={color} />;
              } else {
                return <AntDesign name="setting" size={30} color={color} />;
              }
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "#B0B0B0",
            tabBarStyle: { height: heightPercentageToDP(8) },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Collection" component={CollectionScreen} />
          <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ContextApi.Provider>
  );
}
