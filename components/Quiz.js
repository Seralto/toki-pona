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
  theme,
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
  const th = theme ?? {};

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
      return {
        backgroundColor: th.quizRightBg, color: th.quizOptionText,
        borderColor: th.quizRightBorder, borderStyle: "solid", borderWidth: 2,
        paddingHorizontal: 20, borderRadius: 15, marginBottom: 15,
      };
    } else if (key !== randomWord && key === userAnswer && checkAnswer) {
      return {
        backgroundColor: th.quizWrongBg, color: th.quizOptionText,
        borderColor: th.quizWrongBorder, borderStyle: "solid", borderWidth: 2,
        paddingHorizontal: 20, borderRadius: 15, marginBottom: 15,
      };
    }
    return {
      backgroundColor: th.quizOptionBg, color: th.quizOptionText,
      borderColor: th.quizOptionBorder, borderStyle: "solid", borderWidth: 2,
      paddingHorizontal: 20, borderRadius: 15, marginBottom: 15,
    };
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
      <Text style={[styles.title, { fontSize: titleFontSize, color: th.textMuted }]}>
        {pageTexts.title}
      </Text>

      <View style={styles.headerBox}>
        <Text style={[styles.score, { fontSize, color: th.quizScoreText, backgroundColor: th.quizScoreBg }]}>
          Score: {formatScore(score)}
        </Text>

        <TouchableOpacity onPress={handleSound}>
          <Image
            style={[muted ? styles.soundOff : styles.soundOn]}
            source={require("../assets/volume.png")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={[styles.randomWord, { fontSize, padding, color: th.quizWordText, backgroundColor: th.quizWordBg }]}>
          {reversed ? randomWord : dictionary[randomWord]}
        </Text>

        <View>
          {options.map((key) => (
            <TouchableOpacity onPress={() => matchUserAnswer(key)} key={key}>
              <Text style={[getOptionStyle(key), { fontSize, padding }]}>
                {reversed ? dictionary[key] : key}
              </Text>
            </TouchableOpacity>
          ))}

          {showNextButton && (
            <TouchableOpacity onPress={nextQuestion}>
              <Text style={[styles.nextButton, { fontSize, paddingVertical: buttonPadding, backgroundColor: th.accent }]}>
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
  quiz: { paddingHorizontal: 20, marginBottom: 50 },
  title: { marginVertical: 10, textAlign: "center" },
  headerBox: { flexDirection: "row", marginBottom: 20 },
  score: {
    fontWeight: "bold",
    borderRadius: 20, paddingVertical: 5, paddingHorizontal: 15,
    marginRight: "auto", textAlign: "center", minWidth: 80,
  },
  soundOn: { width: 26, height: 26 },
  soundOff: { width: 26, height: 26, opacity: 0.2 },
  randomWord: { borderRadius: 10, marginBottom: 25 },
  nextButton: {
    color: "#fff", textAlign: "center",
    borderRadius: 5, marginTop: 10, marginBottom: 20,
  },
});

export default Quiz;
