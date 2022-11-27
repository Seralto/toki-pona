import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const About = ({ pageTexts }) => {
  return (
    <View style={styles.about}>
      <Text style={styles.title}>{pageTexts.title}</Text>
      <Text style={styles.content}>{pageTexts.content}</Text>

      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(pageTexts.linkedinUrl);
        }}
      >
        {pageTexts.linkedin}
      </Text>

      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(pageTexts.githubUrl);
        }}
      >
        {pageTexts.github}
      </Text>

      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(pageTexts.youtubeUrl);
        }}
      >
        {pageTexts.youtube}
      </Text>

      <View style={styles.infoBox}>
        <Text
          style={styles.info}
          onPress={() => {
            Linking.openURL(pageTexts.site);
          }}
        >
          {pageTexts.site}
        </Text>

        <Text style={styles.info}>{pageTexts.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  about: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#c3c3c3",
    marginTop: 40,
    textAlign: "center",
  },
  content: {
    fontSize: 18,
    color: "#c3c3c3",
    marginTop: 20,
    marginBottom: 60,
  },
  link: {
    fontSize: 18,
    color: "#2196f3",
    marginBottom: 10,
  },
  infoBox: {
    marginTop: 60,
    marginBottom: 40,
  },
  info: {
    textAlign: "center",
    fontSize: 18,
    color: "#c3c3c3",
    marginBottom: 10,
  },
});

export default About;
