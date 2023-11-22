import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Footer from "../Components/Footer";

export default function Setting(props) {
  const {
    setStepNumber,
    resetArray,
    setSeqCorrectCount,
    saveData,
    setPage,
    soundStatus,
    setSoundStatus,
  } = props;
  const resetData = () => {
    setStepNumber(0);
    resetArray();
    setSeqCorrectCount(0);
    saveData();
  };
  useEffect(() => {
    setPage("Setting");
  }, []);
  return (
    <View className="flex flex-1">
      <View className="bg-[#120038] flex-1 pt-2">
        <Text className="font-bold text-[50px] text-white">Setting</Text>
        <TouchableOpacity className="mt-8 " onPress={() => resetData()}>
          <View className="bg-[#e35904] rounded-2xl">
            <Text className="text-white font-normal text-[20px] text-center py-4">
              Reset app and delete progress
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-8 ">
          <View className="bg-[#e35904] rounded-2xl">
            <Text className="text-white font-normal text-[20px] text-center py-4">
              English
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-8 "
          onPress={() => setSoundStatus(!soundStatus)}
        >
          <View
            className={`${
              soundStatus ? "bg-[#7dd957]" : "bg-[#e35904]"
            } rounded-2xl`}
          >
            <Text className="text-white font-normal text-[20px] text-center py-4">
              {soundStatus ? "Sound on" : "Sound off"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <Footer active="3" /> */}
    </View>
  );
}
