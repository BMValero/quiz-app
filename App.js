import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Learn from "./src/Pages/Learn";
import Chart from "./src/Pages/Chart";
import Loading from "./src/Pages/Loading";
import Setting from "./src/Pages/Setting";
import Test from "./src/Pages/Test";
import * as FileSystem from "expo-file-system";
import Footer from "./src/Components/Footer";
import { Audio } from "expo-av";

const Stack = createNativeStackNavigator();

export default function App() {
  const [questions, setQuestions] = useState("");
  const [total, setTotal] = useState(0);
  const [enableGetData, setEnableGetData] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [random, setRandom] = useState(0);
  const [page, setPage] = useState("hidden");
  const [testNumber, setTestNumber] = useState(0);
  const [testCorrect, setTestCorrect] = useState(0);
  const [correctArray, setCorrectArray] = useState(
    Array.from({ length: 2000 })
  );
  const [soundStatus, setSoundStatus] = useState(true);
  const [seqCorrectCount, setSeqCorrectCount] = useState(0);
  const [correctSound, setCorrectSound] = useState();
  const [wrongSound, setWrongSound] = useState();
  const taskURI = FileSystem.documentDirectory + "tasks.txt";
  const resetArray = () => {
    let temp = [];
    for (let i = 0; i < 2000; i++) temp[i] = 0;
    setCorrectArray(temp);
  };
  const saveData = async () => {
    try {
      let task = `{"stepnumber" : ${stepNumber}, "seqcorrectcount": ${seqCorrectCount}, "correctarray": [`;
      for (let i = 0; i < total; i++) {
        task = task + correctArray[i];
        if (i != total - 1) task = task + ",";
      }
      task = task + "],";
      task = task + `"total":${total} }`;
      console.log("------------------------SaveData----------------", task);
      await FileSystem.writeAsStringAsync(taskURI, task);
    } catch (e) {
      console.error("Couldn't save string:", task, e);
    }
  };
  useEffect(() => {
    const asyncLoadSound = async () => {
      const tempCorrectSound = new Audio.Sound();
      await tempCorrectSound.loadAsync(require("./assets/sound/right.mp3"));
      const tempWrongSound = new Audio.Sound();
      await tempWrongSound.loadAsync(require("./assets/sound/wrong.mp3"));
      setCorrectSound(tempCorrectSound);
      setWrongSound(tempWrongSound);
    };
    asyncLoadSound();
  }, []);

  const LoadingComponent = () => 
    <Loading
      questions={questions}
      setQuestions={setQuestions}
      enableGetData={enableGetData}
      setEnableGetData={setEnableGetData}
      resetArray={resetArray}
      setStepNumber={setStepNumber}
      setRandom={setRandom}
      setSeqCorrectCount={setSeqCorrectCount}
      setCorrectArray={setCorrectArray}
      saveData={saveData}
      total={total}
      setTotal={setTotal}
    />
  
  const LearnComponent = () =>
    <Learn
      questions={questions}
      stepNumber={stepNumber}
      setStepNumber={setStepNumber}
      random={random}
      setRandom={setRandom}
      seqCorrectCount={seqCorrectCount}
      setSeqCorrectCount={setSeqCorrectCount}
      correctArray={correctArray}
      setCorrectArray={setCorrectArray}
      saveData={saveData}
      correctSound={correctSound}
      wrongSound={wrongSound}
      setPage={setPage}
      soundStatus={soundStatus}
    />

  const ChartComponent = () => 
    <Chart 
      correctArray={correctArray}
      total={total}
      stepNumber={stepNumber}
      setPage={setPage}
    />

  const TestComponent = () =>
    <Test 
      questions={questions}
      testNumber={testNumber}
      setTestNumber={setTestNumber}
      testCorrect={testCorrect}
      setTestCorrect={setTestCorrect}
      random={random}
      setRandom={setRandom}
      correctSound={correctSound}
      wrongSound={wrongSound}
      soundStatus={soundStatus}
    />

  const SettingComponent = () =>
    <Setting 
      setStepNumber={setStepNumber}
      setCorrectArray={setCorrectArray}
      setSeqCorrectCount={setSeqCorrectCount}
      saveData={saveData}
      resetArray={resetArray}
      setPage={setPage}
      soundStatus={soundStatus}
      setSoundStatus={setSoundStatus}
    />
  return (
    <View className="bg-[#120038] flex-1 px-5 pt-5 pb-2">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Loading"
            component={LoadingComponent}
          />
          <Stack.Screen
            name="Learn"
            component={LearnComponent}
          />
          <Stack.Screen
            name="Test"
            component={TestComponent}
          />
          <Stack.Screen
            name="Chart"
            component={ChartComponent}
          />
          <Stack.Screen
            name="Setting"
            component={SettingComponent}
          />
        </Stack.Navigator>
        <Footer page={page} setPage={setPage} />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});
