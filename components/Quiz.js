import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { Audio } from "expo-av";

const NUM_OPTIONS = 4;

const Quiz = ({
  pageTexts,
  dictionary,
  score,
  language,
  onChangeScore,
  screenWidth,
}) => {
  const [randomWord, setRandomWord] = useState("");
  const [options, setOptions] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [startNewGame, setStartNewGame] = useState(true);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showNextButton, setshowNextButton] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [muted, setMuted] = useState(false);

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 16 : 18;
  const padding = screenWidth < 400 ? 14 : 20;
  const buttonPadding = screenWidth < 400 ? 10 : 14;

  const soundObject = new Audio.Sound();

  const playSound = async (result) => {
    if (muted) {
      return;
    }

    try {
      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        soundObject.unloadAsync();
      });

      if (result == "right") {
        await soundObject.loadAsync(require("../assets/right-answer.wav"));
      } else {
        await soundObject.loadAsync(require("../assets/wrong-answer.wav"));
      }
      await soundObject.playAsync();
    } catch (_error) {}
  };

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
      playSound("right");
      onChangeScore();

      setTimeout(() => {
        setCheckAnswer(false);
        setStartNewGame(true);
        setOptionsDisabled(false);
      }, 1500);
    } else {
      playSound("wrong");
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

  const formatScore = (score) => {
    if (language === "en") {
      return score.toLocaleString("en-US");
    } else {
      return score.toLocaleString("pt-BR");
    }
  };

  const handleSound = () => {
    setMuted(!muted);
  };

  if (startNewGame) {
    setshowNextButton(false);
    setStartNewGame(false);
    newWordsSet();
  }

  return (
    <View style={styles.quiz}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {pageTexts.title}
      </Text>

      <View style={styles.headerBox}>
        <Text style={[styles.score, { fontSize: fontSize }]}>
          Score: {formatScore(score)}
        </Text>

        {/* Sound  */}
        <TouchableOpacity onPress={handleSound}>
          <Image
            style={[muted ? styles.soundOff : styles.soundOn]}
            source={require("../assets/volume.png")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Word */}
        <Text
          style={[styles.randomWord, { fontSize: fontSize, padding: padding }]}
        >
          {reversed ? randomWord : dictionary[randomWord]}
        </Text>

        {/* Options */}
        <View>
          {options.map((key) => (
            <TouchableOpacity onPress={() => matchUserAnswer(key)} key={key}>
              <Text
                style={[
                  getOptionStyle(key),
                  { fontSize: fontSize, padding: padding },
                ]}
              >
                {reversed ? dictionary[key] : key}
              </Text>
            </TouchableOpacity>
          ))}

          {showNextButton && (
            <TouchableOpacity onPress={nextQuestion}>
              <Text
                style={[
                  styles.nextButton,
                  { fontSize: fontSize, paddingVertical: buttonPadding },
                ]}
              >
                {pageTexts.next}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  quiz: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  title: {
    color: "#c3c3c3",
    marginVertical: 10,
    textAlign: "center",
  },
  headerBox: {
    flexDirection: "row",
    marginBottom: 20,
  },
  score: {
    fontWeight: "bold",
    color: "#4a9373",
    backgroundColor: "#323545",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: "auto",
    textAlign: "center",
    minWidth: 80,
  },
  soundOn: {
    width: 26,
    height: 26,
  },
  soundOff: {
    width: 26,
    height: 26,
    opacity: 0.2,
  },
  randomWord: {
    color: "#323545",
    backgroundColor: "#c3c3c3",
    borderRadius: 10,
    marginBottom: 25,
  },
  option: {
    backgroundColor: "#323545",
    color: "#c3c3c3",
    borderColor: "#292b38",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  rightOption: {
    backgroundColor: "#023220",
    color: "#c3c3c3",
    borderColor: "#006c00",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  wrongOption: {
    backgroundColor: "#560707",
    color: "#c3c3c3",
    borderColor: "#8d0a0a",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: "#2196f3",
    color: "#fff",
    textAlign: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Quiz;
