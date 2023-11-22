import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PieChart from "react-native-expo-pie-chart";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "../Components/Footer";

export default function Chart(props) {
  const navigation = useNavigation();
  const { stepNumber, total, correctArray,setPage } = props;
  const [oneCount, setOneCount] = useState(0);
  const [twoCount, setTwoCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);

  useEffect(() => {
    let tempOne = 0,
      tempTwo = 0,
      tempFalse = 0;
    for (let i = 0; i < total; i++) {
      if (correctArray[i] == 1) tempOne++;
      else if (correctArray[i] >= 2) tempTwo++;
    }
    setPage("Chart");
    setOneCount(tempOne);
    setTwoCount(tempTwo);
    setFalseCount(stepNumber - tempOne - tempTwo);
    console.log(stepNumber, oneCount, twoCount);
  }, [correctArray]);

  return (
    <View className="flex flex-col flex-1">
      <ScrollView className="bg-[#120038] flex flex-col flex-1 pt-2">
        <Text className="font-bold text-[40px] text-white">
          Statistics & Progress
        </Text>
        <View className="mt-8 ">
          <PieChart
            data={[
              {
                key: "First Data",
                count: twoCount,
                color: "#05919c",
              },
              {
                key: "Second Data",
                count: oneCount,
                color: "#fee266",
              },
              {
                key: "Forth Data",
                count: falseCount,
                color: "#d95804",
              },
            ]}
            length={250}
          />
        </View>
        <View className="pt-8">
          <Text className="text-center p-2 text-[#05919c] text-[30px] ">
            Questions two times correct
          </Text>
          <Text className="text-center p-2 text-[#fee266] text-[30px] ">
            Questions one time correct
          </Text>
          <Text className=" text-center p-2 text-[#d95804] text-[30px]">
            Questions false
          </Text>
        </View>
        <TouchableOpacity
          className="mt-8 pb-8"
          onPress={() => navigation.navigate("Test")}
        >
          <View className="bg-[#e35904] rounded-2xl">
            <Text className="text-white font-normal text-[20px] text-center py-4">
              Simulate exam
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {/* <Footer active="2" /> */}
    </View>
  );
}
