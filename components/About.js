import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const About = ({ text }) => {
  return (
    <View style={styles.about}>
      <Text style={styles.title}>{text.title}</Text>
      <Text style={styles.content}>{text.content}</Text>

      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(text.linkedinUrl);
        }}
      >
        {text.linkedin}
      </Text>

      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(text.githubUrl);
        }}
      >
        {text.github}
      </Text>

      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(text.youtubeUrl);
        }}
      >
        {text.youtube}
      </Text>

      <View style={styles.infoBox}>
        <Text
          style={styles.info}
          onPress={() => {
            Linking.openURL(text.site);
          }}
        >
          {text.site}
        </Text>

        <Text style={styles.info}>{text.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  about: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: "#c3c3c3",
    marginTop: 40,
    textAlign: "center",
  },
  content: {
    fontSize: 22,
    color: "#c3c3c3",
    marginTop: 20,
    marginBottom: 60,
  },
  link: {
    fontSize: 20,
    color: "#2196f3",
    marginBottom: 10,
  },
  infoBox: {
    marginTop: 60,
    marginBottom: 40,
  },
  info: {
    textAlign: "center",
    fontSize: 20,
    color: "#c3c3c3",
    marginBottom: 10,
  },
});

export default About;
