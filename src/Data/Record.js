import { useState, useEffect } from "react";
//import fs from "fs";
export default function Record() {
  const [questions, setQuestions] = useState("");
  const [startNumber, setStartNumber] = useState(4);
  const [correctCount, setCorrectCount] = useState(0);
  const [middleCount, setMiddleCount] = useState(0);
  // useEffect(() => {
  //   readData();
  // }, []);

  function getQuestions() {
    return questions;
  }
  function getStartNumber() {
    return startNumber;
  }

  return {
    getQuestions,
    getStartNumber,
    setQuestions,
    setStartNumber,
    setCorrectCount,
    setMiddleCount,
  };

  // export function readData() {
  //   fs.readFile("./pro.json", function read(err, data) {
  //     if (err) throw err;
  //     const content = data;
  //     setStartNumber(content.startnumber);
  //     setCorrectCount(content.correctcount);
  //     setMiddleCount(content.middlecount);
  //   });
  // }

  // export function updateData() {
  //   var content = "{\n";
  //   content += '"startnumber": ' + startNumber + ",";
  //   content += '"correctcount": ' + correctCount + ",";
  //   content += '"middlecount": ' + correctCount + "\n}";
  //   fs.writeFile("./pro.json", content, (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //   });
  // }
}
