import { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Footer from "../Components/Footer";
import { Audio } from "expo-av";

export default function Learn(props) {
  const {
    questions,
    stepNumber,
    setStepNumber,
    random,
    setRandom,
    seqCorrectCount,
    setSeqCorrectCount,
    correctArray,
    setCorrectArray,
    saveData,
    correctSound,
    wrongSound,
    setPage,
    soundStatus,
  } = props;
  const [title, setTitle] = useState("");
  const [aAnswer, setAAnswer] = useState("");
  const [bAnswer, setBAnswer] = useState("");
  const [cAnswer, setCAnswer] = useState("");
  const [flag, setFlag] = useState([0, 0, 0]);
  const [canSelect, setCanSelect] = useState(1);

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
      setPage("Learn");
    };
    init();
  }, [questions]);

  useEffect (() => {
    console.log("learn")
    setPage("Learn");
  }, [])

  const _nextStep = () => {
    if (canSelect == 0) {
      setStepNumber(stepNumber + 1);
      if (flag[0] + flag[1] + flag[2] == 1) {
        const newCorrectArray = [...correctArray];
        newCorrectArray[random] += 1;
        setCorrectArray(newCorrectArray);
        setSeqCorrectCount(seqCorrectCount + 1);
      } else setSeqCorrectCount(0);
      const total = questions["hydra:totalItems"];
      const temp = Math.floor(Math.random() * total);
      setRandom(temp);
      setStep();
      saveData();
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
  return (
    <View className="flex flex-col bg-[#120038] flex-1 pt-6">
      <ScrollView className="">
        <View className="flex flex-row justify-between gap-8">
          <Text className="font-bold text-[50px] text-white">Learning</Text>
          {seqCorrectCount && (
            <View className="bg-[#7dd957] rounded-2xl w-[30%]">
              <Text className="text-white font-normal text-[50px] text-center">
                {seqCorrectCount}
              </Text>
            </View>
          )}
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
      {/* <Footer active="1" /> */}
    </View>
  );
}
