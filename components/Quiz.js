import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NUM_OPTIONS = 4;

const Quiz = ({ pageTexts, dictionary, score, onChangeScore }) => {
  const [randomWord, setRandomWord] = useState("");
  const [options, setOptions] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [startNewGame, setStartNewGame] = useState(true);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showNextButton, setshowNextButton] = useState(false);
  const [reversed, setReversed] = useState(false);

  const getRandomWord = () => {
    return Object.keys(dictionary)[
      Math.floor(Math.random() * Object.keys(dictionary).length)
    ];
  };

  const shuffle = (options) => {
    return (options = options.sort(() => 0.5 - Math.random()));
  };

  const getOptionStyle = (key) => {
    if (key === randomWord && checkAnswer) {
      return styles.rightOption;
    } else if (key !== randomWord && key === userAnswer && checkAnswer) {
      return styles.wrongOption;
    }

    return styles.option;
  };

  const matchUserAnswer = (answer) => {
    if (optionsDisabled) {
      return;
    }

    setOptionsDisabled(true);
    setUserAnswer(answer);
    setCheckAnswer(true);

    if (answer === randomWord) {
      onChangeScore();

      setTimeout(() => {
        setCheckAnswer(false);
        setStartNewGame(true);
        setOptionsDisabled(false);
      }, 1500);
    } else {
      setshowNextButton(true);
    }
  };

  const nextQuestion = () => {
    setCheckAnswer(false);
    setStartNewGame(true);
    setOptionsDisabled(false);
  };

  const setDirections = () => {
    return Math.random() < 0.5;
  };

  const newWordsSet = () => {
    const newWord = getRandomWord();
    setRandomWord(newWord);

    let newOptions = [newWord];
    while (newOptions.length < NUM_OPTIONS) {
      const option = getRandomWord();
      if (option !== newWord && !newOptions.includes(option)) {
        newOptions.push(option);
      }
    }

    setOptions(shuffle(newOptions));
    setReversed(setDirections());
  };

  if (startNewGame) {
    setshowNextButton(false);
    setStartNewGame(false);
    newWordsSet();
  }

  return (
    <View style={styles.quiz}>
      <Text style={styles.title}>{pageTexts.title}</Text>

      <Text style={styles.score}>{score}</Text>

      <Text style={styles.randomWord}>
        {reversed ? randomWord : dictionary[randomWord]}
      </Text>

      <View>
        {options.map((key) => (
          <TouchableOpacity onPress={() => matchUserAnswer(key)} key={key}>
            <Text style={getOptionStyle(key)}>
              {reversed ? dictionary[key] : key}
            </Text>
          </TouchableOpacity>
        ))}

        {showNextButton && (
          <TouchableOpacity onPress={nextQuestion}>
            <Text style={styles.nextButton}>{pageTexts.next}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quiz: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a9373",
    backgroundColor: "#323545",
    borderRadius: 20,
    marginBottom: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: "auto",
    textAlign: "center",
    minWidth: 60,
  },
  randomWord: {
    fontSize: 18,
    color: "#323545",
    backgroundColor: "#c3c3c3",
    borderRadius: 10,
    marginBottom: 30,
    padding: 20,
  },
  option: {
    fontSize: 18,
    backgroundColor: "#323545",
    color: "#c3c3c3",
    borderColor: "#292b38",
    borderStyle: "solid",
    borderWidth: 3,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  rightOption: {
    backgroundColor: "#023220",
    color: "#c3c3c3",
    fontSize: 18,
    borderColor: "#006c00",
    borderStyle: "solid",
    borderWidth: 3,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  wrongOption: {
    backgroundColor: "#560707",
    color: "#c3c3c3",
    fontSize: 18,
    borderColor: "#8d0a0a",
    borderStyle: "solid",
    borderWidth: 3,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: "#2196f3",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Quiz;
