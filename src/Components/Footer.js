import { View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

export default function Footer(props) {
  const { page, setPage } = props;
  const navigation = useNavigation();
  const onLearn = () => {
    setPage("Learn");
    navigation.navigate("Learn");
  };

  return (
    <View className="flex flex-row gap-[7%] justify-center bg-[#120038]">
      {page === "hidden" ? (
        <></>
      ) : (
        <>
          <TouchableOpacity className="w-[25%]" onPress={() => onLearn()}>
            <View
              className={`${
                page === "Learn" ? "bg-[#7dd957]" : "bg-[#e35904]"
              } px-[20%] py-2 rounded-3xl`}
            >
              <Image
                source={require("../../assets/image/learn.png")}
                resizeMode={"stretch"}
                className="w-full h-[50px]"
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[25%]"
            onPress={() => navigation.navigate("Chart")}
          >
            <View
              className={`${
                page === "Chart" ? "bg-[#7dd957]" : "bg-[#e35904]"
              } px-[20%] py-2 rounded-3xl`}
            >
              <Image
                source={require("../../assets/image/chart.png")}
                resizeMode={"stretch"}
                className="w-full h-[50px]"
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[25%]"
            onPress={() => navigation.navigate("Setting")}
          >
            <View
              className={`${
                page === "Setting" ? "bg-[#7dd957]" : "bg-[#e35904]"
              } px-[20%] py-2 rounded-3xl`}
            >
              <Image
                source={require("../../assets/image/setting.png")}
                resizeMode={"stretch"}
                className="w-full h-[50px]"
              ></Image>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
