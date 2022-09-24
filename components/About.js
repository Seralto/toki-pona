import React from "react";
import { View, Text, StyleSheet } from "react-native";

const About = ({ text }) => {
  return (
    <View style={styles.about}>
      <Text style={styles.title}>{text.aboutMe}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  about: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
});

export default About;
