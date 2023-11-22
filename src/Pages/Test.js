import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  NavigatorIOS,
} from "react-native";
import PieChart from "react-native-expo-pie-chart";
import Footer from "../Components/Footer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function Test(props) {
  const {
    questions,
    testNumber,
    setTestNumber,
    testCorrect,
    setTestCorrect,
    random,
    setRandom,
    correctSound,
    wrongSound,
    soundStatus,
  } = props;
  const [title, setTitle] = useState("");
  const [aAnswer, setAAnswer] = useState("");
  const [bAnswer, setBAnswer] = useState("");
  const [cAnswer, setCAnswer] = useState("");
  const [flag, setFlag] = useState([0, 0, 0]);
  const [canSelect, setCanSelect] = useState(1);
  const navigation = useNavigation();

  const setStep = () => {
    console.log("------------------------------------", random);
    setTitle(questions["hydra:member"][random].question);
    setAAnswer(questions["hydra:member"][random].answer_a);
    setBAnswer(questions["hydra:member"][random].answer_b);
    setCAnswer(questions["hydra:member"][random].answer_c);
  };
  useEffect(() => {
    const init = () => {
      if (questions) {
        setStep();
      }
    };
    init();
  }, [questions]);

  const _nextStep = () => {
    if (canSelect == 0) {
      setTestNumber(testNumber + 1);
      const total = questions["hydra:totalItems"];
      const temp = Math.floor(Math.random() * total);
      if (flag[0] + flag[1] + flag[2] == 1) {
        setTestCorrect(testCorrect + 1);
      }
      setRandom(temp);
      setStep();
      setCanSelect(1);
      const newFlag = [...flag];
      newFlag[0] = newFlag[1] = newFlag[2] = 0;
      setFlag(newFlag);
    }
  };
  const answerPress = async (index) => {
    const correct = questions["hydra:member"][random].correctAnswer;
    if (canSelect) {
      if (
        (index == 0 && correct == "A") ||
        (index == 1 && correct == "B") ||
        (index == 2 && correct == "C")
      ) {
        const newFlag = [...flag];
        newFlag[index] = 1;
        setFlag(newFlag);
        if (soundStatus) await correctSound.replayAsync();
      } else {
        const newFlag = [...flag];
        newFlag[index] = 2;
        setFlag(newFlag);
        if (soundStatus) await wrongSound.replayAsync();
      }
      setCanSelect(0);
    }
  };
  const restart = () => {
    setTestCorrect(0);
    setTestNumber(0);
  };
  return (
    <View className="flex flex-col bg-[#120038] flex-1">
      {testNumber < 50 ? (
        <ScrollView className="">
          <View className="flex flex-row justify-between gap-8">
            <Text className="font-bold text-[50px] text-white">Test</Text>
          </View>
          <View className="flex justify-center pt-16">
            <Text className="text-center text-white text-[30px] font-bold">
              {title}
            </Text>
          </View>
          <View className="pt-8">
            <TouchableOpacity onPress={() => answerPress(0)}>
              <Text
                className={`${
                  flag[0] == 0
                    ? "bg-[#d9d9d9]"
                    : flag[0] == 1
                    ? "bg-[#7dd957]"
                    : "bg-[#ff1616]"
                } text-center p-4 text-[#201c16] text-[20px] mt-8 rounded-lg`}
              >
                {aAnswer}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => answerPress(1)}>
              <Text
                className={`${
                  flag[1] == 0
                    ? "bg-[#d9d9d9]"
                    : flag[1] == 1
                    ? "bg-[#7dd957]"
                    : "bg-[#ff1616]"
                } text-center p-4 text-[#201c16] text-[20px] mt-8 rounded-lg`}
              >
                {bAnswer}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => answerPress(2)}>
              <Text
                className={`${
                  flag[2] == 0
                    ? "bg-[#d9d9d9]"
                    : flag[2] == 1
                    ? "bg-[#7dd957]"
                    : "bg-[#ff1616]"
                } text-center p-4 text-[#201c16] text-[20px] mt-8 rounded-lg`}
              >
                {cAnswer}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="mt-8 mb-8" onPress={() => _nextStep()}>
            <View className="bg-[#e35904] rounded-2xl">
              <Text className="text-white font-normal text-[20px] text-center py-4">
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView className="bg-[#120038] flex flex-col flex-1 ">
          <Text className="font-bold text-[40px] text-white">
            Statistics & Progress
          </Text>
          <View className="mt-8 ">
            <PieChart
              data={[
                {
                  key: "First Data",
                  count: testCorrect,
                  color: "#05919c",
                },
                {
                  key: "Second Data",
                  count: 50 - testCorrect,
                  color: "#fee266",
                },
              ]}
              length={250}
            />
          </View>
          <View className="pt-8">
            <Text className="text-center p-2 text-[#05919c] text-[30px] ">
              Questions Correct: {testCorrect}
            </Text>
            <Text className="text-center p-2 text-[#fee266] text-[30px] ">
              Questions false: {50 - testCorrect}
            </Text>
          </View>
          <TouchableOpacity className="mt-8 " onPress={() => restart()}>
            <View className="bg-[#e35904] rounded-2xl">
              <Text className="text-white font-normal text-[20px] text-center py-4">
                Restart
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-8 pb-8"
            onPress={() => navigation.navigate("Learn")}
          >
            <View className="bg-[#e35904] rounded-2xl">
              <Text className="text-white font-normal text-[20px] text-center py-4">
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
      {/* <Footer active="1" /> */}
    </View>
  );
}
