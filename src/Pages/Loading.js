import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

export default function Loading(props) {
  const {
    questions,
    setQuestions,
    enableGetData,
    setEnableGetData,
    resetArray,
    setStepNumber,
    setRandom,
    setSeqCorrectCount,
    setCorrectArray,
    saveData,
    total,
    setTotal,
  } = props;
  const navigation = useNavigation();
  const taskURI = FileSystem.documentDirectory + "tasks.txt";
  useEffect(() => {
    const initialGetData = async () => {
      const taskFileInfo = await FileSystem.getInfoAsync(taskURI);
      // await FileSystem.deleteAsync(taskURI);

      const url = "https://pauker.dd.mrsoft.gmbh/auth";
      const email = "info@mrsoft.gmbh";
      const password = "ymgcNJpXqfkkPUP3oRt4xjzNCpeyv9VkNq40jaH71KY3Xuft9h";
      const res = await axios.post(url, { email, password });
      const token = res.data.token;
      const getAnswerUrl =
        "https://pauker.dd.mrsoft.gmbh/api/question_answers";
      const answerRes = await axios.get(getAnswerUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("------------------Get data --------------");
      setQuestions(answerRes.data);
      if (taskFileInfo.exists) {
        const data = await FileSystem.readAsStringAsync(taskURI);
        const myData = JSON.parse(data);
        setStepNumber(myData.stepnumber);
        setSeqCorrectCount(myData.seqcorrectcount);
        
        console.log("================ correctArray ==================", myData.correctarray)
         setCorrectArray(myData.correctarray);
        setTotal(myData.total);
      } else {
        console.log("----TaskFIle doesn't exist");
        resetArray();
        setStepNumber(0);
        setRandom(0);
        setSeqCorrectCount(0);
        console.log("---------total in loading===========", questions["hydra:totalItems"])
        setTotal(questions["hydra:totalItems"]);
        // saveData();
      }
        
      setEnableGetData(true);
      navigation.navigate("Learn");
    };

    !enableGetData && initialGetData();
  }, []);
  return (
    <View className="bg-[#120038] flex-1 pt-16 flex flex-col items-center">
      <View className="w-[200px] h-[200px] border-4 border-white rounded-3xl p-[5%] ">
        <Image
          source={require("../../assets/image/fish.png")}
          resizeMode={"stretch"}
          className="w-full h-full"
        ></Image>
      </View>
      <Text className="text-white text-[60px] font-bold text-center pt-8">
        Downloading assets
      </Text>
      <View className="w-full flex items-center mt-4">
        <Text className="text-white text-[25px]">Wait for some time ...</Text>
      </View>
    </View>
  );
}
